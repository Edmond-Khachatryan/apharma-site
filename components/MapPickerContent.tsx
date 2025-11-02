'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

// Fix для иконок Leaflet в Next.js
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapPickerContentProps {
  latitude?: number;
  longitude?: number;
  onLocationSelect: (lat: number, lng: number) => void;
}

function LocationMarker({ position, setMapCenter }: { position: [number, number] | null; setMapCenter: (center: [number, number]) => void }) {
  const map = useMapEvents({});
  
  // Центрируем карту когда position меняется
  useEffect(() => {
    if (position) {
      setMapCenter(position);
      map.setView(position, 17);
    }
  }, [position, map, setMapCenter]);

  return position === null ? null : <Marker position={position} />;
}

function SearchControl({ onLocationSelect, onMapCenter }: { onLocationSelect: (lat: number, lng: number) => void; onMapCenter: (center: [number, number]) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      // Используем Nominatim (OpenStreetMap geocoding API)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&accept-language=ru,hy,en`,
        {
          headers: {
            'User-Agent': 'Medical-Info-Site/1.0'
          }
        }
      );
      const data = await response.json();
      setResults(data || []);
    } catch (error) {
      console.error('Geocoding error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (result: any) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    onLocationSelect(lat, lng);
    onMapCenter([lat, lng]);
    setResults([]);
    setSearchQuery(result.display_name);
  };

  return (
    <div className="absolute top-4 left-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Поиск по адресу..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <FiSearch />
          {loading ? 'Поиск...' : 'Найти'}
        </button>
      </div>
      
      {results.length > 0 && (
        <div className="mt-2 border-t border-gray-200">
          <div className="max-h-48 overflow-y-auto">
            {results.map((result, index) => (
              <button
                key={index}
                onClick={() => handleResultClick(result)}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm"
              >
                <div className="font-medium text-gray-900">{result.display_name}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MapPickerContent({ latitude, longitude, onLocationSelect }: MapPickerContentProps) {
  // Центр Армении (Ереван)
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([latitude || 40.1872, longitude || 44.5152]);

  useEffect(() => {
    if (latitude && longitude) {
      setCurrentPosition([latitude, longitude]);
    }
  }, [latitude, longitude]);

  return (
    <div className="w-full h-96 rounded-lg border-2 border-gray-300 relative">
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="z-0 rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {currentPosition && <LocationMarker position={currentPosition} setMapCenter={setMapCenter} />}
      </MapContainer>
      <SearchControl onLocationSelect={(lat, lng) => { setCurrentPosition([lat, lng]); onLocationSelect(lat, lng); }} onMapCenter={setMapCenter} />
      <p className="text-sm text-gray-600 mt-2 text-center">
        💡 Введите адрес в поиск или нажмите на карту
      </p>
    </div>
  );
}
