import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MapsClean — Services de nettoyage en Belgique",
  description: "Réservez des services de nettoyage professionnels en Belgique. Paiement sécurisé, Bancontact et carte bancaire.",
  metadataBase: new URL("https://www.mapsclean.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MapsClean — Services de nettoyage en Belgique",
    description: "Nettoyage professionnel, paiement sécurisé, pros vérifiés.",
    url: "https://www.mapsclean.com",
    siteName: "MapsClean",
    locale: "fr_BE",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MapsClean — Services de nettoyage en Belgique',
    description: 'Nettoyage professionnel, paiement sécurisé, pros vérifiés.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover' as const,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'MapsClean',
              url: 'https://www.mapsclean.com',
              logo: 'https://www.mapsclean.com/assets/icon.png',
              sameAs: []
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
