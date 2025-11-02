'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';

interface Medicine {
  id: string;
  name: string;
  nameEn?: string | null;
  nameHy?: string | null;
  description: string;
  descriptionEn?: string | null;
  descriptionHy?: string | null;
  image: string | null;
  inStock: boolean;
}

export default function MedicinesCatalog() {
  const locale = useLocale();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  const getLocalizedName = (medicine: Medicine) => {
    if (locale === 'en' && medicine.nameEn) return medicine.nameEn;
    if (locale === 'hy' && medicine.nameHy) return medicine.nameHy;
    return medicine.name;
  };

  const getLocalizedDescription = (medicine: Medicine) => {
    if (locale === 'en' && medicine.descriptionEn) return medicine.descriptionEn;
    if (locale === 'hy' && medicine.descriptionHy) return medicine.descriptionHy;
    return medicine.description;
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await fetch('/api/medicines');
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setMedicines(data);
      } else {
        console.error('Medicines data is not an array:', data);
        setMedicines([]);
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-xl text-gray-600">Загрузка каталога...</div>
      </div>
    );
  }

  if (medicines.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Пока нет лекарств в каталоге</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {medicines.map((medicine) => (
        <div
          key={medicine.id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
        >
          {medicine.image && (
            <div className="relative overflow-hidden h-64">
              <img
                src={medicine.image}
                alt={getLocalizedName(medicine)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {getLocalizedName(medicine)}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {getLocalizedDescription(medicine)}
            </p>
            <div className="flex items-center justify-between">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                medicine.inStock
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {medicine.inStock ? '✓ В наличии' : '✗ Нет в наличии'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

