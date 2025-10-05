"use client";
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import { apiBaseUrl } from '@/lib/firebase';

export default function OrderPage() {
  const [service, setService] = useState('cleaning');
  const [amount, setAmount] = useState(59.9);
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  const pay = async () => {
    setProcessing(true);
    try {
      const resp = await fetch(`${apiBaseUrl}/payments/create-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(amount * 100), serviceId: 'web-order', paymentMethodTypes: ['card', 'bancontact'] })
      });
      const json = await resp.json();
      if (!json?.ok) throw new Error(json?.error || 'create-intent');

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
      if (!stripe) throw new Error('Stripe not loaded');

      // Placeholder: redirecionar para página de sucesso
      router.push(`/order/success?amount=${amount}`);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Réserver un service</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Service</label>
          <select className="border rounded-lg px-3 py-2" value={service} onChange={(e) => setService(e.target.value)}>
            <option value="cleaning">Nettoyage résidentiel</option>
            <option value="office">Nettoyage de bureau</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Montant (€)</label>
          <input type="number" min={10} step={0.5} className="border rounded-lg px-3 py-2" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        </div>
        <button onClick={pay} disabled={processing} className="bg-black text-white rounded-lg px-4 py-2">
          {processing ? 'Traitement...' : 'Payer'}
        </button>
      </div>
    </div>
  );
}


