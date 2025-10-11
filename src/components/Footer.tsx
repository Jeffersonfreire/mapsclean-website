import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-blue-900 mb-3">MAPSCLEAN</h3>
            <p className="text-sm text-slate-600">Services de nettoyage professionnels en Belgique.</p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.facebook.com/mapsclean"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
              >
                f
              </a>
              <a
                href="https://www.instagram.com/mapsclean"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
              >
                ig
              </a>
            </div>
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
          <div>
            <h3 className="font-semibold text-blue-900 mb-3">Contact</h3>
            <div className="text-sm text-slate-600">
              <div>
                Email: <a className="underline hover:text-blue-700" href="mailto:contact@mapsclean.com">contact@mapsclean.com</a>
              </div>
              <div className="mt-2">Belgique</div>
              <div className="mt-2">
                WhatsApp: <a className="underline hover:text-blue-700" href="https://wa.me/32400000000?text=Bonjour%20MapsClean" target="_blank" rel="noopener noreferrer">+32 400 00 000</a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 mt-8 pt-6 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} MAPSCLEAN. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}


