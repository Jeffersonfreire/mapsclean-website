export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto p-8 md:p-12 lg:p-20 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900">Nos services</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Découvrez notre gamme complète de services de nettoyage professionnel adaptés à vos besoins</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Nettoyage résidentiel', desc: 'Appartements, maisons et studios. Service complet avec produits écologiques.', icon: '🏠', price: 'À partir de €49' },
            { title: 'Nettoyage de bureau', desc: 'Espaces professionnels et commerciaux. Intervention flexible selon vos horaires.', icon: '🏢', price: 'À partir de €69' },
            { title: 'Nettoyage en profondeur', desc: 'Nettoyage complet incluant zones difficiles d\'accès.', icon: '✨', price: 'À partir de €99' },
            { title: 'Nettoyage de vitres', desc: 'Vitres intérieures et extérieures. Résultat impeccable garanti.', icon: '🪟', price: 'À partir de €39' },
            { title: 'Après travaux', desc: 'Nettoyage post-construction ou rénovation.', icon: '🔨', price: 'Sur devis' },
            { title: 'Services extras', desc: 'Réfrigérateurs, fours, armoires. Options personnalisées.', icon: '🧽', price: 'À partir de €25' }
          ].map((s, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-2xl hover:border-blue-300 transition-all">
              <div className="text-5xl mb-4">{s.icon}</div>
              <h3 className="font-bold text-xl text-blue-900 mb-2">{s.title}</h3>
              <p className="text-slate-600 text-sm mb-4">{s.desc}</p>
              <div className="font-semibold text-blue-700">{s.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


