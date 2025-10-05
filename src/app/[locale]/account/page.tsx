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
      <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center space-y-6 bg-white p-10 rounded-2xl shadow-xl border border-slate-200">
          <p className="text-lg text-slate-700">Veuillez vous connecter pour accéder à votre compte.</p>
          <Link className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all" href="/fr-BE/login">Se connecter</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-5xl mx-auto p-8 md:p-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Mon compte</h1>
            <p className="text-sm text-slate-600 mt-1">{user.email}</p>
          </div>
          <button onClick={() => signOut(auth)} className="border-2 border-blue-700 text-blue-700 hover:bg-blue-50 px-6 py-2 rounded-lg font-semibold transition-all">
            Déconnexion
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/fr-BE/order" className="bg-white border-2 border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:border-blue-300 transition-all group">
            <div className="text-4xl mb-3">📋</div>
            <div className="font-bold text-xl text-blue-900 group-hover:text-blue-700 transition-colors">Nouveau service</div>
            <div className="text-sm text-slate-600 mt-2">Réserver un nettoyage professionnel</div>
          </Link>
          <Link href="/fr-BE/account/orders" className="bg-white border-2 border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:border-blue-300 transition-all group">
            <div className="text-4xl mb-3">📦</div>
            <div className="font-bold text-xl text-blue-900 group-hover:text-blue-700 transition-colors">Mes commandes</div>
            <div className="text-sm text-slate-600 mt-2">Historique et factures</div>
          </Link>
        </div>
      </div>
    </div>
  );
}


