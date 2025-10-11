"use client";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 z-50">
      <div className="max-w-xl bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 md:p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">🍪</div>
          <div className="text-sm text-slate-700">
            Nous utilisons des cookies essentiels pour améliorer votre expérience. Aucune publicité.
          </div>
        </div>
        <div className="mt-3 flex gap-2 justify-end">
          <button
            onClick={() => {
              localStorage.setItem("cookie-consent", "reject");
              setOpen(false);
            }}
            className="px-3 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-50"
          >
            Refuser
          </button>
          <button
            onClick={() => {
              localStorage.setItem("cookie-consent", "accept");
              setOpen(false);
            }}
            className="px-3 py-2 text-sm rounded-lg bg-blue-700 hover:bg-blue-800 text-white"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
