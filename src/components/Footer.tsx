import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-blue-900 mb-3">MAPSCLEAN</h3>
            <p className="text-sm text-slate-600">Services de nettoyage professionnels en Belgique</p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-3">Liens rapides</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/fr-BE/services" className="text-slate-600 hover:text-blue-700">Services</Link>
              <Link href="/fr-BE/pricing" className="text-slate-600 hover:text-blue-700">Tarifs</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-3">Légal</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/fr-BE/legal" className="text-slate-600 hover:text-blue-700">Mentions légales</Link>
              <Link href="/fr-BE/privacy" className="text-slate-600 hover:text-blue-700">Confidentialité</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 mt-6 pt-6 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} MAPSCLEAN. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}


