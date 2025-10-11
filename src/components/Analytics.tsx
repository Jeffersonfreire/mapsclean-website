"use client";
import Script from "next/script";

export default function Analytics() {
  const consent = typeof window !== 'undefined' ? localStorage.getItem('cookie-consent') : null;
  if (consent !== 'accept') return null;

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());
          gtag('config', '${gaId}', { 'anonymize_ip': true });
        `}
      </Script>
    </>
  );
}


