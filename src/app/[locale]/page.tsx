"use client";
import Image from 'next/image';
import Link from 'next/link';
import LiveProMap from '@/components/LiveProMap';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 px-6 py-20 md:px-12 lg:px-20 lg:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-blue-900 leading-tight">
                Services de nettoyage professionnels
              </h1>
              <p className="text-lg md:text-xl text-slate-600">
                Réservez en quelques clics. Paiement sécurisé via Bancontact ou carte bancaire. Professionnels vérifiés et assurés.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/fr-BE/order" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all">
                  Réserver maintenant
                </Link>
                <Link href="/fr-BE/services" className="border-2 border-blue-700 text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all">
                  Nos services
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg h-[500px]">
                <LiveProMap />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-16 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-12">Nos services populaires</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Nettoyage résidentiel', desc: 'Appartements et maisons', icon: '🏠' },
              { title: 'Nettoyage de bureau', desc: 'Espaces professionnels', icon: '🏢' },
              { title: 'Nettoyage en profondeur', desc: 'Nettoyage complet', icon: '✨' }
            ].map((s, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-blue-50">
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3 className="font-semibold text-xl text-blue-900 mb-2">{s.title}</h3>
                <p className="text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 md:px-12 lg:px-20 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Prêt à réserver votre service?</h2>
          <p className="text-lg md:text-xl opacity-90">Professionnels qualifiés disponibles dans toute la Belgique</p>
          <Link href="/fr-BE/order" className="inline-block bg-white text-blue-700 hover:bg-blue-50 px-10 py-4 rounded-xl font-semibold text-lg shadow-xl transition-all">
            Commencer maintenant
          </Link>
        </div>
      </section>
    </>
  );
}


