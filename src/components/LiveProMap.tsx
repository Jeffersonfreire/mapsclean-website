"use client";
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

type ProPresence = {
  uid: string;
  isOnline: boolean;
  approxLocation?: { lat: number; lng: number };
  lastSeen?: number;
};

export default function LiveProMap() {
  const [onlinePros, setOnlinePros] = useState<ProPresence[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-200">
      {/* Map Background (static image for demo; real Google Maps requires API key) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-slate-100">
        {/* Grid overlay (simulating map) */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-300"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Markers (profissionais) */}
        {markers.map((m, i) => {
          const x = 30 + (i % 5) * 15 + Math.random() * 10;
          const y = 20 + Math.floor(i / 5) * 20 + Math.random() * 15;
          return (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                <div className="relative w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
              </div>
            </div>
          );
        })}

        {/* Center marker (user location - Brussels) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-40 animate-ping"></div>
            <div className="relative w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-xl"></div>
          </div>
        </div>
      </div>

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

