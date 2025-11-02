'use client';

import { useState, useEffect } from 'react';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  image: string | null;
}

export default function PharmaciesList() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const fetchPharmacies = async () => {
    try {
      const response = await fetch('/api/pharmacies');
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setPharmacies(data);
      } else {
        console.error('Pharmacies data is not an array:', data);
        setPharmacies([]);
      }
    } catch (error) {
      console.error('Error fetching pharmacies:', error);
      setPharmacies([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-xl text-gray-600">Загрузка аптек...</div>
      </div>
    );
  }

  if (pharmacies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Пока нет аптек в базе данных</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {pharmacies.map((pharmacy) => (
        <div
          key={pharmacy.id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          {pharmacy.image && (
            <div className="relative overflow-hidden h-48">
              <img
                src={pharmacy.image}
                alt={pharmacy.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {pharmacy.name}
            </h3>
            <div className="space-y-2 text-gray-700">
              <p className="flex items-center">
                <span className="font-semibold mr-2">📍</span>
                {pharmacy.address}
              </p>
              <p className="flex items-center">
                <span className="font-semibold mr-2">📞</span>
                <a href={`tel:${pharmacy.phone}`} className="text-blue-600 hover:underline">
                  {pharmacy.phone}
                </a>
              </p>
              <p className="flex items-center">
                <span className="font-semibold mr-2">🕐</span>
                {pharmacy.hours}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

