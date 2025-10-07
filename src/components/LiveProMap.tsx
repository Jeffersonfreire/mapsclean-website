"use client";
import { useEffect, useState, useRef } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

type ProPresence = {
  uid: string;
  isOnline: boolean;
  approxLocation?: { lat: number; lng: number };
  lastSeen?: number;
};

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function LiveProMap() {
  const [onlinePros, setOnlinePros] = useState<ProPresence[]>([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

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
  const center = { lat: 50.8503, lng: 4.3517 };
  const markers = onlinePros.filter(p => p.approxLocation).map(p => p.approxLocation!);

  useEffect(() => {
    // Carregar Google Maps API
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyD_eJLabb7WYiUB2CEZOUQo2QtYykxDnUw'}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      // Limpar marcadores
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (mapInstance.current && markers.length > 0) {
      // Limpar marcadores antigos
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Adicionar novos marcadores
      markers.forEach((markerPos, index) => {
        const marker = new window.google.maps.Marker({
          position: markerPos,
          map: mapInstance.current,
          title: `Profissional ${index + 1}`,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#3B82F6',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2
          },
          animation: window.google.maps.Animation.BOUNCE
        });
        markersRef.current.push(marker);
      });
    }
  }, [markers]);

  const initMap = () => {
    if (mapRef.current && window.google) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: 12,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      // Marcador central (Bruxelas)
      new window.google.maps.Marker({
        position: center,
        map: mapInstance.current,
        title: 'Bruxelas, Bélgica',
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#EF4444',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 3
        }
      });
    }
  };

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-200">
      {/* Google Maps Container */}
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      />

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

