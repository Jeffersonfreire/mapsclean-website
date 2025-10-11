"use client";
import Link from "next/link";

export default function MobileStickyCTA({ href, label, icon }: { href: string; label: string; icon?: string }) {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (/\/(login|account|order)(\/|$)/.test(path)) {
      return null;
    }
  }
  return (
    <div className="md:hidden fixed bottom-[max(env(safe-area-inset-bottom),1rem)] left-4 right-4 z-40">
      <Link
        href={href}
        aria-label={label}
        className="block text-center w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-2xl shadow-xl font-semibold"
      >
        <span className="inline-flex items-center justify-center gap-2">
          {icon ? <span aria-hidden>{icon}</span> : null}
          <span>{label}</span>
        </span>
      </Link>
    </div>
  );
}


