"use client";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://eraao.com/#organization",
        "name": "Eraao Platform",
        "url": "https://eraao.com",
        "logo": "https://eraao.com/icon.svg",
        "description": "Enterprise AI Development, Defensive & Offensive Cybersecurity Services, and Professional Practitioner Academy.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dhaka",
          "addressCountry": "BD"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "info@eraao.com",
          "contactType": "customer service"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://eraao.com/#website",
        "url": "https://eraao.com",
        "name": "Eraao",
        "publisher": {
          "@id": "https://eraao.com/#organization"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
