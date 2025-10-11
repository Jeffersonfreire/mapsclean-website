"use client";
import Link from 'next/link';
import dynamic from 'next/dynamic';
import MobileStickyCTA from '@/components/MobileStickyCTA';

const LiveProMap = dynamic(() => import('@/components/LiveProMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-green-50 animate-pulse" />
  )
});

export default function HomePage() {
  const faq = [
    { q: 'Quels modes de paiement sont acceptés ?', a: 'Bancontact, carte bancaire, Apple Pay et Google Pay (via Stripe).' },
    { q: 'Les professionnels sont-ils vérifiés ?', a: 'Oui, profil vérifié et évaluations en continu.' },
    { q: 'Puis-je annuler ma réservation ?', a: 'Oui, selon les conditions affichées lors de la réservation.' },
  ];

  return (
    <>
      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 px-4 py-12 md:px-12 lg:px-20 md:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight">
                Services de nettoyage professionnels
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-600">
                Réservez en quelques clics. Paiement sécurisé via Bancontact ou carte bancaire. Professionnels vérifiés et assurés.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
                <Link href="/fr-BE/order" className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-base md:text-lg shadow-lg transition-all">
                  Réserver maintenant
                </Link>
                <Link href="/fr-BE/services" className="border-2 border-blue-700 text-blue-700 hover:bg-blue-50 px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all">
                  Nos services
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md md:max-w-lg h-[360px] md:h-[500px]">
                <LiveProMap />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 py-12 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-blue-900 text-center mb-8 md:mb-12">Nos services populaires</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
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

      {/* FAQ Section */}
      <section className="px-4 py-12 md:px-12 lg:px-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4 md:mb-6">Questions fréquentes</h2>
          <div className="space-y-3 md:space-y-4">
            {faq.map((f, i) => (
              <details key={i} className="border border-slate-200 rounded-xl p-3 md:p-4">
                <summary className="font-semibold text-blue-900 cursor-pointer">{f.q}</summary>
                <p className="mt-2 text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-24 pt-12 md:px-12 lg:px-20 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold">Prêt à réserver votre service?</h2>
          <p className="text-base md:text-xl opacity-90">Professionnels qualifiés disponibles dans toute la Belgique</p>
          <Link href="/fr-BE/order" className="inline-block bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 md:px-10 md:py-4 rounded-xl font-semibold text-base md:text-lg shadow-xl transition-all">
            Commencer maintenant
          </Link>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <MobileStickyCTA href="/fr-BE/order" label="Réserver maintenant" />
    </>
  );
}


