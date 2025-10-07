"use client";
import { useEffect, useState } from 'react';

export default function LiveProMap() {
  const [onlinePros, setOnlinePros] = useState(5); // Simular 5 profissionais
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-200">
      {/* Mapa visual moderno - estilo do app */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Grid de ruas simuladas */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <defs>
              <pattern id="streets" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 0 30 L 60 30 M 30 0 L 30 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-300"/>
                <circle cx="15" cy="15" r="2" fill="currentColor" className="text-slate-400"/>
                <circle cx="45" cy="45" r="2" fill="currentColor" className="text-slate-400"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#streets)" />
          </svg>
        </div>

        {/* Marcadores de profissionais - posições realistas */}
        {[1, 2, 3, 4, 5].map((i) => {
          const positions = [
            { x: 45, y: 35 }, // Centro
            { x: 25, y: 25 }, // Norte
            { x: 65, y: 45 }, // Sul
            { x: 35, y: 55 }, // Leste
            { x: 55, y: 25 }  // Oeste
          ];
          const pos = positions[i - 1];
          return (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-60 animate-pulse"></div>
                <div className="relative w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-xl flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Marcador central (Bruxelas) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-50 animate-ping"></div>
            <div className="relative w-10 h-10 bg-red-500 rounded-full border-3 border-white shadow-2xl flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Controles de zoom simulados */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
          <div className="flex flex-col gap-1">
            <button className="w-8 h-8 bg-white border border-slate-300 rounded flex items-center justify-center hover:bg-slate-50">
              <span className="text-slate-600 font-bold">+</span>
            </button>
            <button className="w-8 h-8 bg-white border border-slate-300 rounded flex items-center justify-center hover:bg-slate-50">
              <span className="text-slate-600 font-bold">-</span>
            </button>
          </div>
        </div>
      </div>

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
                  {onlinePros} en ligne
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
                {onlinePros}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}