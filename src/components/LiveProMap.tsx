"use client";
import { useEffect, useState, useRef } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

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

interface Professional {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  serviceType: string;
  status: string;
  isOnline: boolean;
}

export default function LiveProMap() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Coordenadas de Bruxelas (centro do mapa)
  const brusselsCenter = {
    lat: 50.8476,
    lng: 4.3572
  };

  useEffect(() => {
    // Inicializar Google Maps
    const initMap = () => {
      if (!mapRef.current || googleMapRef.current) return;
      const g = (window as any).google;
      if (!g?.maps) return;

      const map = new g.maps.Map(mapRef.current, {
        center: brusselsCenter,
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

      googleMapRef.current = map;
    };

    // Carregar Google Maps API
    if (!(window as any).google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      // Cleanup markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, []);

  useEffect(() => {
    // Conectar ao Firebase (presence) para dados em tempo real sem exigir índices
    const freshnessMs = 5 * 60 * 1000; // 5 minutos
    const unsubscribe = onSnapshot(
      collection(db, 'presence'),
      (snapshot) => {
        const now = Date.now();
        const pros: Professional[] = [];
        snapshot.forEach((doc) => {
          const data: any = doc.data();
          if (!data?.isOnline) return;
          if (!data?.approxLocation) return;
          if (now - (data.lastSeen || 0) > freshnessMs) return;
          pros.push({
            id: doc.id,
            name: data.name || 'Professionnel',
            location: {
              latitude: data.approxLocation.lat,
              longitude: data.approxLocation.lng
            },
            serviceType: data.category || 'Nettoyage',
            status: 'available',
            isOnline: true
          });
        });

        setProfessionals(pros);
        setLoading(false);
        updateMapMarkers(pros);
      },
      (err) => {
        console.error('Erro Firebase:', err);
        setError('Erreur de connexion');
        setLoading(false);

        // Fallback: dados simulados se Firebase falhar
        const fallbackPros: Professional[] = [
          {
            id: '1',
            name: 'Jean Dubois',
            location: { latitude: 50.8476, longitude: 4.3572 },
            serviceType: 'Nettoyage résidentiel',
            status: 'available',
            isOnline: true
          },
          {
            id: '2',
            name: 'Marie Martin',
            location: { latitude: 50.8576, longitude: 4.3672 },
            serviceType: 'Nettoyage commercial',
            status: 'available',
            isOnline: true
          },
          {
            id: '3',
            name: 'Pierre Durand',
            location: { latitude: 50.8376, longitude: 4.3472 },
            serviceType: 'Nettoyage post-construction',
            status: 'available',
            isOnline: true
          }
        ];
        setProfessionals(fallbackPros);
        updateMapMarkers(fallbackPros);
      }
    );

    return () => unsubscribe();
  }, []);

  const updateMapMarkers = (pros: Professional[]) => {
    if (!googleMapRef.current) return;
    const g = (window as any).google;
    if (!g?.maps) return;

    // Limpar marcadores existentes
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // Adicionar novos marcadores
    pros.forEach((pro) => {
      const marker = new g.maps.Marker({
        position: { lat: pro.location.latitude, lng: pro.location.longitude },
        map: googleMapRef.current,
        title: pro.name,
        icon: {
          path: g.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: getMarkerColor(pro.serviceType),
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2
        },
        animation: g.maps.Animation.BOUNCE
      });

      // Info window
      const infoWindow = new g.maps.InfoWindow({
        content: `
          <div style="padding: 8px; font-family: system-ui;">
            <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">${pro.name}</div>
            <div style="font-size: 12px; color: #6b7280;">${pro.serviceType}</div>
            <div style="font-size: 11px; color: #10b981; margin-top: 2px;">● En ligne</div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(googleMapRef.current, marker);
      });

      markersRef.current.push(marker);
    });
  };

  const getMarkerColor = (serviceType: string) => {
    if (serviceType.includes('commercial')) return '#34C759';
    if (serviceType.includes('post-construction') || serviceType.includes('chantier')) return '#FF9500';
    return '#4A90E2'; // résidentiel
  };

  if (loading) {
    return (
      <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-blue-600 font-medium">Chargement de la carte...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="text-red-600 font-medium mb-2">Erreur de connexion</div>
          <div className="text-red-500 text-sm">Impossible de charger la carte</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-200">
      {/* Google Maps Container */}
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      />

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
                  {professionals.length} en ligne
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
                {professionals.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botão de localização */}
      <div className="absolute bottom-4 right-4 z-10">
        <button 
          onClick={() => {
            if (googleMapRef.current) {
              googleMapRef.current.setCenter(brusselsCenter);
              googleMapRef.current.setZoom(12);
            }
          }}
          className="w-12 h-12 bg-white rounded-full shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
        >
          <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>
  );
}