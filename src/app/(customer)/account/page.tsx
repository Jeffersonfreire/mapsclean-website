"use client";
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';

export default function AccountPage() {
  const [user, setUser] = useState<{ email: string | null } | null>(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({ email: firebaseUser.email });
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <p>Veuillez vous connecter pour accéder à votre compte.</p>
          <Link className="underline" href="/login">Aller à la connexion</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Mon compte</h1>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        <button onClick={() => signOut(auth)} className="px-4 py-2 border rounded-lg">Se déconnecter</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/order" className="border rounded-xl p-6 hover:shadow">
          <div className="font-medium">Nouveau service</div>
          <div className="text-sm text-gray-600">Réserver un nettoyage</div>
        </Link>
        <Link href="/account/orders" className="border rounded-xl p-6 hover:shadow">
          <div className="font-medium">Mes commandes</div>
          <div className="text-sm text-gray-600">Historique et reçus</div>
        </Link>
      </div>
    </div>
  );
}


