"use client";
import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import Link from 'next/link';

type Order = { id: string; amount: number; status: string; created?: unknown };

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }
      try {
        const q = query(
          collection(db, 'payments'),
          where('userId', '==', user.uid),
          orderBy('created', 'desc')
        );
        const snap = await getDocs(q);
        const list: Order[] = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            amount: (data.amount as number) || 0,
            status: (data.status as string) || 'pending',
            created: data.created
          };
        });
        setOrders(list);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mes commandes</h1>
        <Link className="underline" href="/account">Retour</Link>
      </div>
      <div className="space-y-3">
        {orders.length === 0 && <p>Aucune commande</p>}
        {orders.map((o) => (
          <div key={o.id} className="border rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">#{o.id}</div>
              <div className="text-sm text-gray-600">Statut: {o.status}</div>
            </div>
            <div className="font-medium">€{(o.amount / 100).toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


