"use client";
import Link from "next/link";

export default function MobileStickyCTA({ href, label }: { href: string; label: string }) {
  return (
    <div className="md:hidden fixed bottom-[max(env(safe-area-inset-bottom),1rem)] left-4 right-4 z-40">
      <Link
        href={href}
        className="block text-center w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-2xl shadow-xl font-semibold"
      >
        {label}
      </Link>
    </div>
  );
}


