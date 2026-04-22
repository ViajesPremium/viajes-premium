import { Metadata } from "next";
import JaponPremiumClient from "./JaponPremiumClient";

export const metadata: Metadata = {
  title: "Japón Premium",
  description: "Japon Premium",
  keywords: ["Japon Premium", "Viajes Premium"],

  alternates: {
    canonical: "/japon-premium",
  },

  openGraph: {
    title: "Japón Premium",
    description: "Japon Premium",
    url: "/japon-premium",
    siteName: "Viajes Premium",
    images: [
      {
        url: "/japon-premium/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Japón Premium",
      },
    ],
    locale: "es_MX",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Japón Premium",
    description: "Japon Premium",
    images: ["/japon-premium/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const faqsData = [
  {
    question: "¿Japón es un destino complicado para viajar?",
    answer:
      "No, Japón no es un destino complicado si está bien planificado. Aunque el idioma y la logística pueden parecer desafiantes al inicio, el país es seguro, ordenado y fácil de recorrer. Cuando el viaje está bien estructurado, todo fluye con mayor claridad. En Japón Premium cuidamos ese proceso para que la experiencia se viva sin fricción.",
  },
  {
    question: "¿Se puede viajar a Japón sin hablar japonés?",
    answer:
      "Sí, es posible viajar a Japón sin hablar japonés. En ciudades como Tokio o Kioto hay señalización clara y servicios pensados para viajeros internacionales. Aun así, saber cómo moverse y qué decisiones tomar marca la diferencia en la experiencia por eso nuestros guías hablan español para que no te preocupes por el idioma.",
  },
  {
    id: "3",
    question: "¿Cuántos días se recomiendan para viajar a Japón?",
    answer:
      "Se recomienda viajar entre 10 y 15 días para conocer Japón con mayor profundidad. Este tiempo permite recorrer varias ciudades y equilibrar cultura, gastronomía y experiencias. La duración ideal depende del ritmo del viajero y del tipo de experiencia que quiera construir.",
  },
  {
    id: "4",
    question: "¿Cuál es la mejor temporada para viajar a Japón?",
    answer:
      "No hay una única mejor temporada, depende del tipo de experiencia que buscas. Primavera (Sakuras) y otoño (Momiji) son muy populares por sus paisajes, pero también hay épocas con menos afluencia que permiten disfrutar Japón con mayor tranquilidad.",
  },
  {
    id: "5",
    question: "¿Es seguro viajar a Japón?",
    answer:
      "Sí, Japón es uno de los países más seguros del mundo. Se puede viajar con tranquilidad tanto en grandes ciudades como en zonas más tradicionales. Esa seguridad se aprovecha mucho más cuando el viaje está bien organizado y cada detalle está pensado.",
  },
  {
    id: "6",
    question: "¿Qué tipo de experiencias se pueden vivir en Japón?",
    answer:
      "Japón ofrece una combinación única de cultura, gastronomía, tradición, tecnología y naturaleza. Se pueden recorrer ciudades modernas, templos históricos y paisajes muy distintos en un mismo viaje. En Japón Premium diseñamos cada proyecto para integrar estos contrastes de forma coherente.",
  },
  {
    id: "7",
    question: "¿Es fácil moverse dentro de Japón?",
    answer:
      "Sí, moverse dentro de Japón es fácil gracias a su sistema de transporte eficiente y puntual. Los trenes y conexiones permiten recorrer el país de forma organizada y cómoda.",
  },
  {
    id: "8",
    question:
      "¿Japón es un destino recomendable para viajar en pareja o en familia?",
    answer:
      "Sí, Japón es un destino ideal tanto para viajar en pareja como en familia ya que hay diversos parques de diversiones y experiencias que se disfrutan en compañía. La clave está en diseñar el recorrido según el tipo de experiencia que se quiere vivir.",
  },
];

export default function JaponPremium() {
  // 2. Construimos el objeto JSON-LD para Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // 3. Retornamos el script junto con tu cliente usando un Fragmento (<>...</>)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JaponPremiumClient />
    </>
  );
}
