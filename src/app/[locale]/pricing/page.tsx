export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto p-8 md:p-12 lg:p-20 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900">Tarifs transparents</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Des prix clairs et compétitifs. Sans frais cachés.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Studio', price: '€49', features: ['Jusqu\'à 35m²', 'Nettoyage standard', '1-2 heures'], popular: false },
            { name: '1-2 Chambres', price: '€69', features: ['Jusqu\'à 70m²', 'Nettoyage complet', '2-3 heures'], popular: true },
            { name: '3+ Chambres', price: '€99', features: ['Plus de 70m²', 'Nettoyage approfondi', '3-4 heures'], popular: false }
          ].map((p, i) => (
            <div key={i} className={`relative bg-white border-2 rounded-2xl p-8 ${p.popular ? 'border-blue-700 shadow-2xl scale-105' : 'border-slate-200'}`}>
              {p.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-700 text-white px-4 py-1 rounded-full text-sm font-semibold">Populaire</div>}
              <h3 className="font-bold text-2xl text-blue-900 mb-2">{p.name}</h3>
              <div className="text-4xl font-bold text-blue-700 mb-6">{p.price}</div>
              <ul className="space-y-3 mb-6">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-slate-600">
                    <span className="text-green-600">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-semibold transition-all ${p.popular ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'border-2 border-blue-700 text-blue-700 hover:bg-blue-50'}`}>
                Réserver
              </button>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-slate-600">* Les prix peuvent varier selon les options choisies et la durée du service.</p>
      </div>
    </div>
  );
}


