"use client";
import { useEffect, useState, useRef } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

type ProPresence = {
  uid: string;
  isOnline: boolean;
  approxLocation?: { lat: number; lng: number };
  lastSeen?: number;
  category?: string;
};

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
            lastSeen: data.lastSeen,
            category: data.category
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
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    } else {
      setMapLoaded(true);
    }
  }, []);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (mapLoaded && mapRef.current && window.google) {
      // Estilo do mapa igual ao app
      const mapStyle = [
        {
          "featureType": "all",
          "elementType": "geometry",
          "stylers": [{"color": "#f5f5f5"}]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
        }
      ];

      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: 12,
        styles: mapStyle,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
      });

      // Marcador central (Bruxelas) - igual ao app
      new window.google.maps.Marker({
        position: center,
        map: mapInstance.current,
        title: 'Bruxelas, Bélgica',
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: '#4A90E2',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 3
        }
      });
    }
  }, [mapLoaded]);

  useEffect(() => {
    if (mapInstance.current && markers.length > 0) {
      // Limpar marcadores antigos
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Adicionar novos marcadores - estilo igual ao app
      markers.forEach((markerPos, index) => {
        const marker = new window.google.maps.Marker({
          position: markerPos,
          map: mapInstance.current,
          title: `Profissional ${index + 1}`,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#4A90E2',
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

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-200">
      {!mapLoaded ? (
        // Loading state igual ao app
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-blue-600 font-semibold">Chargement de la carte...</p>
          </div>
        </div>
      ) : (
        // Google Maps real com estilo do app
        <div 
          ref={mapRef} 
          className="w-full h-full"
          style={{ minHeight: '400px' }}
        />
      )}

      {/* Header overlay - igual ao app */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Votre position</div>
                <div className="text-sm font-semibold text-slate-800">Bruxelas, Bélgica</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-green-50 border border-green-200 rounded-full px-3 py-1 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-green-700">
                  {loading ? '...' : onlinePros.length} en ligne
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contador de profissionais - igual ao app */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Professionnels disponibles</div>
              <div className="text-2xl font-bold text-blue-700">
                {loading ? '...' : onlinePros.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

