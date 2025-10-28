'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2, FiExternalLink } from 'react-icons/fi';

interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string | null;
  website: string | null;
}

export default function PartnersPage() {
  const router = useRouter();
  const t = useTranslations('admin');
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchPartners();
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

  const fetchPartners = async () => {
    try {
      const response = await fetch('/api/partners');
      const data = await response.json();
      setPartners(data);
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить этого партнёра?')) return;
    
    try {
      const response = await fetch(`/api/partners/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchPartners();
      }
    } catch (error) {
      console.error('Error deleting partner:', error);
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
                {t('partners')}
              </h1>
              <p className="text-gray-600 mt-2">
                Управление партнёрами
              </p>
            </div>
            
            <button
              onClick={() => alert('Функция добавления партнёра будет доступна после настройки БД')}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              <FiPlus />
              <span>Добавить партнёра</span>
            </button>
          </div>
        </div>

        {partners.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">
              Пока нет партнёров в базе данных
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  {partner.logo && (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                  )}
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {partner.name}
                      </h3>
                      
                      <button
                        onClick={() => handleDelete(partner.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 mb-3">
                      {partner.description}
                    </p>
                    
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                      >
                        <FiExternalLink />
                        <span>Сайт партнёра</span>
                      </a>
                    )}
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

