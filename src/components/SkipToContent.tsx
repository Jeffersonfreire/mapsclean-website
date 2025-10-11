"use client";

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg"
    >
      Aller au contenu
    </a>
  );
}


