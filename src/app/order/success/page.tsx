"use client";
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function OrderSuccessContent() {
  const params = useSearchParams();
  const amount = params.get('amount');
  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto space-y-6 text-center">
      <h1 className="text-2xl font-semibold">Paiement réussi</h1>
      <p>Merci pour votre confiance. Montant: €{amount}</p>
      <div className="space-x-4">
        <Link className="underline" href="/account">Voir mon compte</Link>
        <Link className="underline" href="/">Retour à l&apos;accueil</Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-8 text-center">Chargement...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}


