'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

interface Medicine {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string | null;
  inStock: boolean;
  category: {
    id: string;
    name: string;
  };
}

export default function MedicinesPage() {
  const router = useRouter();
  const t = useTranslations('admin');
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchMedicines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/verify');
      if (!response.ok) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/admin/login');
    }
  };

  const fetchMedicines = async () => {
    try {
      const response = await fetch('/api/medicines');
      const data = await response.json();
      setMedicines(data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить это лекарство?')) return;
    
    try {
      const response = await fetch(`/api/medicines/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchMedicines();
      }
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/admin')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <FiArrowLeft />
            <span>Назад к панели</span>
          </button>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('medicines')}
              </h1>
              <p className="text-gray-600 mt-2">
                Управление лекарствами и товарами
              </p>
            </div>
            
            <button
              onClick={() => router.push('/admin/medicines/new')}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              <FiPlus />
              <span>Добавить лекарство</span>
            </button>
          </div>
        </div>

        {/* Medicines Grid */}
        {medicines.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">
              Пока нет лекарств в базе данных
            </p>
            <p className="text-gray-400 text-sm">
              Используйте Prisma Studio для добавления данных:<br/>
              <code className="bg-gray-100 px-2 py-1 rounded">npx prisma studio</code>
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {medicines.map((medicine) => (
              <div
                key={medicine.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-6">
                  {medicine.image && (
                    <img
                      src={medicine.image}
                      alt={medicine.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {medicine.name}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {medicine.category.name}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => router.push(`/admin/medicines/${medicine.id}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Редактировать"
                        >
                          <FiEdit2 size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(medicine.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Удалить"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {medicine.description}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-blue-600">
                        {medicine.price}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        medicine.inStock
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {medicine.inStock ? 'В наличии' : 'Нет в наличии'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

