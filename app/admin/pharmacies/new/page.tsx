'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { FiArrowLeft, FiSave, FiMapPin } from 'react-icons/fi';
import MapPicker from '@/components/MapPicker';

export default function NewPharmacyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    hours: '9:00 - 21:00',
    latitude: 40.1872,
    longitude: 44.5152,
    image: '',
  });

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/verify');
      if (!response.ok) router.push('/admin/login');
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/pharmacies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Аптека успешно добавлена!');
        router.push('/admin/pharmacies');
      } else {
        alert('Ошибка при добавлении аптеки');
      }
    } catch (error) {
      alert('Ошибка при добавлении аптеки');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button onClick={() => router.push('/admin/pharmacies')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <FiArrowLeft /> <span>Назад к списку</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Добавить аптеку</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Название *</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Аптека №1" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Адрес *</label>
            <input type="text" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="ул. Абовяна 12, Ереван" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Телефон *</label>
            <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="+374 XX XXX XXX" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Часы работы *</label>
            <input type="text" required value={formData.hours} onChange={(e) => setFormData({ ...formData, hours: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500" />
          </div>

          {/* Карта для выбора местоположения */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiMapPin className="inline mr-2" />
              Местоположение на карте *
            </label>
            <MapPicker
              latitude={formData.latitude}
              longitude={formData.longitude}
              onLocationSelect={(lat, lng) => {
                setFormData({ ...formData, latitude: lat, longitude: lng });
              }}
            />
            <p className="text-sm text-gray-500 mt-2">
              Выбрано: {formData.latitude?.toFixed(6)}, {formData.longitude?.toFixed(6)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL изображения</label>
            <input type="url" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="https://example.com/image.jpg" />
            {formData.image && <img src={formData.image} alt="Preview" className="mt-3 w-48 h-32 object-cover rounded-lg" onError={(e) => e.currentTarget.style.display = 'none'} />}
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" disabled={loading} className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg disabled:opacity-50">
              <FiSave /> <span>{loading ? 'Сохранение...' : 'Сохранить'}</span>
            </button>
            <button type="button" onClick={() => router.push('/admin/pharmacies')} className="px-8 py-3 border text-gray-700 rounded-lg hover:bg-gray-50">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
}

