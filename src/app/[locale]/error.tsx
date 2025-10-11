"use client";
import Link from 'next/link';

export default function LocaleError({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-10 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="bg-white border border-red-200 rounded-2xl shadow-2xl p-8 max-w-lg text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100 flex items-center justify-center">❗</div>
        <h1 className="text-2xl font-bold text-red-700 mb-2">Une erreur s&apos;est produite</h1>
        <p className="text-slate-600 mb-4">Veuillez réessayer. Si le problème persiste, revenez plus tard.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white">Réessayer</button>
          <Link href="/fr-BE" className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50">Retour à l’accueil</Link>
        </div>
      </div>
    </div>
  );
}


