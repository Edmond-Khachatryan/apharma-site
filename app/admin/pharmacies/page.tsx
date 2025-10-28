'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { FiArrowLeft, FiPlus, FiTrash2, FiPhone, FiClock } from 'react-icons/fi';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  image: string | null;
}

export default function PharmaciesPage() {
  const router = useRouter();
  const t = useTranslations('admin');
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchPharmacies();
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

  const fetchPharmacies = async () => {
    try {
      const response = await fetch('/api/pharmacies');
      const data = await response.json();
      setPharmacies(data);
    } catch (error) {
      console.error('Error fetching pharmacies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить эту аптеку?')) return;
    
    try {
      const response = await fetch(`/api/pharmacies/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchPharmacies();
      }
    } catch (error) {
      console.error('Error deleting pharmacy:', error);
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
                {t('pharmacies')}
              </h1>
              <p className="text-gray-600 mt-2">
                Управление аптеками
              </p>
            </div>
            
            <button
              onClick={() => alert('Функция добавления аптеки будет доступна после настройки БД')}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              <FiPlus />
              <span>Добавить аптеку</span>
            </button>
          </div>
        </div>

        {pharmacies.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">
              Пока нет аптек в базе данных
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {pharmacies.map((pharmacy) => (
              <div
                key={pharmacy.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {pharmacy.image && (
                  <img
                    src={pharmacy.image}
                    alt={pharmacy.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {pharmacy.name}
                    </h3>
                    
                    <button
                      onClick={() => handleDelete(pharmacy.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-gray-600">
                      {pharmacy.address}
                    </p>
                    
                    <div className="flex items-center gap-2 text-gray-700">
                      <FiPhone className="text-blue-600" />
                      <span>{pharmacy.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-700">
                      <FiClock className="text-green-600" />
                      <span>{pharmacy.hours}</span>
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

