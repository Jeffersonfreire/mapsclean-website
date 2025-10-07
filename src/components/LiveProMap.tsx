"use client";
import { useEffect, useState, useRef } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import dynamic from 'next/dynamic';

type ProPresence = {
  uid: string;
  isOnline: boolean;
  approxLocation?: { lat: number; lng: number };
  lastSeen?: number;
};

// Importar Leaflet dinamicamente para evitar problemas de SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function LiveProMap() {
  const [onlinePros, setOnlinePros] = useState<ProPresence[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'presence'), where('isOnline', '==', true));
    const unsub = onSnapshot(q, (snap) => {
      const now = Date.now();
      const freshness = 5 * 60 * 1000; // 5 min
      const list: ProPresence[] = [];
      snap.forEach((d) => {
        const data = d.data();
        if (data && (now - (data.lastSeen || 0)) <= freshness) {
          list.push({
            uid: d.id,
            isOnline: true,
            approxLocation: data.approxLocation,
            lastSeen: data.lastSeen
          });
        }
      });
      setOnlinePros(list);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Brussels center (default)
  const center: [number, number] = [50.8503, 4.3517];
  const markers = onlinePros.filter(p => p.approxLocation).map(p => p.approxLocation!);

  useEffect(() => {
    // Carregar CSS do Leaflet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Carregar script do Leaflet
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-200">
      {!mapLoaded ? (
        // Loading state com design moderno
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-blue-600 font-semibold">Chargement de la carte...</p>
          </div>
        </div>
      ) : (
        // Mapa Leaflet real
        <MapContainer
          center={center}
          zoom={12}
          className="w-full h-full"
          style={{ minHeight: '400px' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Marcador central (Bruxelas) */}
          <Marker position={center}>
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-red-600">Bruxelas, Bélgica</h3>
                <p className="text-sm text-gray-600">Centre de la ville</p>
              </div>
            </Popup>
          </Marker>

          {/* Marcadores dos profissionais */}
          {markers.map((markerPos, index) => (
            <Marker 
              key={index} 
              position={[markerPos.lat, markerPos.lng]}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold text-blue-600">Profissional {index + 1}</h3>
                  <p className="text-sm text-gray-600">Disponível agora</p>
                  <div className="flex items-center justify-center mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="ml-1 text-xs text-green-600">En ligne</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      {/* Stats overlay */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-xl border border-blue-200">
          <div className="text-sm text-slate-600 font-medium">Professionels disponibles</div>
          <div className="text-3xl font-bold text-blue-700 mt-1">
            {loading ? '...' : onlinePros.length}
          </div>
        </div>
        <div className="bg-green-500/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-xl flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-white font-semibold text-sm">En ligne</span>
        </div>
      </div>

      {/* Location label */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-slate-200">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
          </svg>
          <span className="text-sm font-medium text-slate-700">Bruxelles, Belgique</span>
        </div>
      </div>
    </div>
  );
}

