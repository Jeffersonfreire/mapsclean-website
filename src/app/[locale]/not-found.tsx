import Link from 'next/link';

export default function NotFoundLocale() {
  return (
    <div className="min-h-screen flex items-center justify-center p-10">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-blue-900">404</h1>
        <p className="text-slate-600">Page non trouvée. Le lien a peut‑être expiré.</p>
        <Link href="/fr-BE" className="inline-block mt-2 px-5 py-3 rounded-lg bg-blue-700 text-white hover:bg-blue-800">Retour à l’accueil</Link>
      </div>
    </div>
  );
}


