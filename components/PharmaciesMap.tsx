'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Динамический импорт карты (только на клиенте)
const MapContent = dynamic(() => import('./PharmaciesMapContent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-600">Загрузка карты...</p>
    </div>
  ),
});

export default function PharmaciesMap() {
  return <MapContent />;
}

