'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

export default function NewPartnerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: '',
    website: '',
  });

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/verify');
      if (!response.ok) {
        router.push('/admin/login');
      }
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Партнёр успешно добавлен!');
        router.push('/admin/partners');
      } else {
        alert('Ошибка при добавлении партнёра');
      }
    } catch (error) {
      alert('Ошибка при добавлении партнёра');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => router.push('/admin/partners')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <FiArrowLeft />
            <span>Назад к списку</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900">Добавить партнёра</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Название компании"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Краткое описание партнёра"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Логотип
              </label>
              
              {/* Загрузка с компьютера */}
              <div className="mb-3">
                <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors">
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold text-green-600">Загрузить логотип</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG до 5MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.size > 5 * 1024 * 1024) {
                        alert('Файл слишком большой! Максимум 5MB');
                        return;
                      }
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({ ...formData, logo: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">или</span>
                </div>
              </div>

              <input
                type="url"
                value={formData.logo.startsWith('data:') ? '' : formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                className="mt-3 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="https://example.com/logo.png"
              />

              {formData.logo && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Предпросмотр:</p>
                  <img src={formData.logo} alt="Preview" className="w-32 h-32 object-contain border-2 border-gray-200 rounded-lg" onError={(e) => e.currentTarget.style.display = 'none'} />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, logo: '' })}
                    className="mt-2 text-sm text-red-600 hover:text-red-700"
                  >
                    Удалить логотип
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Веб-сайт
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg hover:shadow-lg disabled:opacity-50"
            >
              <FiSave />
              <span>{loading ? 'Сохранение...' : 'Сохранить'}</span>
            </button>
            
            <button
              type="button"
              onClick={() => router.push('/admin/partners')}
              className="px-8 py-3 border text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

