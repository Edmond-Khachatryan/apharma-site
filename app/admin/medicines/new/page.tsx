'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

interface Category {
  id: string;
  name: string;
}

export default function NewMedicinePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'ru' | 'en' | 'hy'>('ru');
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    nameHy: '',
    description: '',
    descriptionEn: '',
    descriptionHy: '',
    image: '',
    categoryId: '',
    inStock: true,
  });

  useEffect(() => {
    checkAuth();
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, categoryId: data[0].id }));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/medicines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Лекарство успешно добавлено!');
        router.push('/admin/medicines');
      } else {
        alert('Ошибка при добавлении лекарства');
      }
    } catch (error) {
      console.error('Error creating medicine:', error);
      alert('Ошибка при добавлении лекарства');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/admin/medicines')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <FiArrowLeft />
            <span>Назад к списку</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900">
            Добавить лекарство
          </h1>
          <p className="text-gray-600 mt-2">
            Заполните все поля формы
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-6">
            {/* Вкладки языков */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  type="button"
                  onClick={() => setActiveTab('ru')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === 'ru'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <img src="https://flagcdn.com/w40/ru.png" alt="Russia" className="w-6 h-4 object-cover rounded" />
                  <span>Русский *</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('en')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === 'en'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <img src="https://flagcdn.com/w40/gb.png" alt="English" className="w-6 h-4 object-cover rounded" />
                  <span>English</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('hy')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === 'hy'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <img src="https://flagcdn.com/w40/am.png" alt="Armenian" className="w-6 h-4 object-cover rounded" />
                  <span>Հայերեն</span>
                </button>
              </nav>
            </div>

            {/* Название */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название лекарства {activeTab === 'ru' ? '*' : '(необязательно)'}
              </label>
              <input
                type="text"
                required={activeTab === 'ru'}
                value={activeTab === 'ru' ? formData.name : activeTab === 'en' ? formData.nameEn : formData.nameHy}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  [activeTab === 'ru' ? 'name' : activeTab === 'en' ? 'nameEn' : 'nameHy']: e.target.value 
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={activeTab === 'ru' ? 'Например: Парацетамол' : activeTab === 'en' ? 'Example: Paracetamol' : 'Օրինակ: Պարացետամոլ'}
              />
            </div>

            {/* Описание */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание {activeTab === 'ru' ? '*' : '(необязательно)'}
              </label>
              <textarea
                required={activeTab === 'ru'}
                rows={4}
                value={activeTab === 'ru' ? formData.description : activeTab === 'en' ? formData.descriptionEn : formData.descriptionHy}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  [activeTab === 'ru' ? 'description' : activeTab === 'en' ? 'descriptionEn' : 'descriptionHy']: e.target.value 
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={activeTab === 'ru' ? 'Опишите показания к применению, дозировку и т.д.' : activeTab === 'en' ? 'Describe indications, dosage, etc.' : 'Նկարագրեք ցուցումները, դոզան և այլն'}
              />
              <p className="text-sm text-gray-500 mt-1">
                {activeTab === 'ru' ? 'Обязательное поле' : 'Если не заполнить, будет показан русский текст'}
              </p>
            </div>

            {/* Категория */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категория *
              </label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Изображение */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Изображение
              </label>
              
              {/* Загрузка с компьютера */}
              <div className="mb-3">
                <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold text-blue-600">Загрузить с компьютера</span> или перетащите файл
                    </p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP до 5MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      
                      if (file.size > 5 * 1024 * 1024) {
                        alert('Файл слишком большой! Максимум 5MB');
                        return;
                      }

                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({ ...formData, image: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
              </div>

              {/* Или вставить ссылку */}
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
                value={formData.image.startsWith('data:') ? '' : formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="mt-3 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-sm text-gray-500 mt-1">
                Вставьте ссылку на изображение из интернета
              </p>

              {/* Preview */}
              {formData.image && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Предпросмотр:</p>
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-lg border-2 border-gray-200"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: '' })}
                    className="mt-2 text-sm text-red-600 hover:text-red-700"
                  >
                    Удалить изображение
                  </button>
                </div>
              )}
            </div>

            {/* В наличии */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="inStock"
                checked={formData.inStock}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="inStock" className="ml-3 text-sm font-medium text-gray-700">
                В наличии
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSave />
              <span>{loading ? 'Сохранение...' : 'Сохранить'}</span>
            </button>
            
            <button
              type="button"
              onClick={() => router.push('/admin/medicines')}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

