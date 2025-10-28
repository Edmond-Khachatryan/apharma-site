'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Динамический импорт карты (только на клиенте)
const MapPickerContent = dynamic(() => import('./MapPickerContent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-600">Загрузка карты...</p>
    </div>
  ),
});

interface MapPickerProps {
  latitude?: number;
  longitude?: number;
  onLocationSelect: (lat: number, lng: number) => void;
}

export default function MapPicker({ latitude, longitude, onLocationSelect }: MapPickerProps) {
  return <MapPickerContent latitude={latitude} longitude={longitude} onLocationSelect={onLocationSelect} />;
}

