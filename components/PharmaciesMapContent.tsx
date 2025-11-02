'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';

// Fix для иконок Leaflet в Next.js
import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  latitude?: number | null;
  longitude?: number | null;
}

export default function PharmaciesMapContent() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);

  // Центр Еревана, Армения
  const center: [number, number] = [40.1872, 44.5152];

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const fetchPharmacies = async () => {
    try {
      const response = await fetch('/api/pharmacies');
      const data = await response.json();

      if (Array.isArray(data)) {
        // Фильтруем только аптеки с координатами
        const pharmaciesWithCoords = data.filter(
          (pharmacy: Pharmacy) => pharmacy.latitude && pharmacy.longitude
        );
        setPharmacies(pharmaciesWithCoords);
      }
    } catch (error) {
      console.error('Error fetching pharmacies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-600">Загрузка аптек...</p>
      </div>
    );
  }

  // Если нет аптек с координатами, показываем сообщение
  if (pharmacies.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-600">
          Добавьте координаты аптек через админ панель для отображения на карте
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border-2 border-gray-300 shadow-lg">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pharmacies.map((pharmacy) => {
          if (!pharmacy.latitude || !pharmacy.longitude) return null;
          return (
            <Marker
              key={pharmacy.id}
              position={[pharmacy.latitude, pharmacy.longitude]}
            >
              <Popup>
                <div>
                  <h3 className="font-bold text-lg mb-2">{pharmacy.name}</h3>
                  <p className="text-sm mb-1">
                    <strong>📍</strong> {pharmacy.address}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>📞</strong>{' '}
                    <a
                      href={`tel:${pharmacy.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {pharmacy.phone}
                    </a>
                  </p>
                  <p className="text-sm">
                    <strong>🕐</strong> {pharmacy.hours}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

