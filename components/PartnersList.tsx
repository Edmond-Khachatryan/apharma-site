'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';

interface Partner {
  id: string;
  name: string;
  nameEn?: string | null;
  nameHy?: string | null;
  description: string;
  descriptionEn?: string | null;
  descriptionHy?: string | null;
  logo: string | null;
  website: string | null;
}

export default function PartnersList() {
  const locale = useLocale();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  const getLocalizedName = (partner: Partner) => {
    if (locale === 'en' && partner.nameEn) return partner.nameEn;
    if (locale === 'hy' && partner.nameHy) return partner.nameHy;
    return partner.name;
  };

  const getLocalizedDescription = (partner: Partner) => {
    if (locale === 'en' && partner.descriptionEn) return partner.descriptionEn;
    if (locale === 'hy' && partner.descriptionHy) return partner.descriptionHy;
    return partner.description;
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await fetch('/api/partners');
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setPartners(data);
      } else {
        console.error('Partners data is not an array:', data);
        setPartners([]);
      }
    } catch (error) {
      console.error('Error fetching partners:', error);
      setPartners([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-xl text-gray-600">Загрузка партнёров...</div>
      </div>
    );
  }

  if (partners.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Пока нет партнёров в базе данных</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {partners.map((partner) => (
        <div
          key={partner.id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6"
        >
          {partner.logo && (
            <div className="w-full h-48 flex items-center justify-center mb-4 bg-gray-50 rounded-lg">
              <img
                src={partner.logo}
                alt={getLocalizedName(partner)}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {getLocalizedName(partner)}
          </h3>
          <p className="text-gray-700 mb-4">
            {getLocalizedDescription(partner)}
          </p>
          {partner.website && (
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center"
            >
              Перейти на сайт →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

