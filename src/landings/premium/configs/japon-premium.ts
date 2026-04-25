import type { PremiumLandingConfig } from "@/landings/premium/types";

const JAPAN_MENU_ITEMS = [
  { label: "Inicio", ariaLabel: "Ir al inicio", link: "#inicio" },
  { label: "Highlights", ariaLabel: "Ir a highlights", link: "#highlights" },
  { label: "Itinerarios", ariaLabel: "Ir a itinerarios", link: "#itinerarios" },
  { label: "Incluye", ariaLabel: "Ir a lo que incluye", link: "#includes" },
  { label: "Testimonios", ariaLabel: "Ir a testimonios", link: "#testimonials" },
  { label: "FAQs", ariaLabel: "Ir a preguntas frecuentes", link: "#faqs" },
  { label: "Contacto", ariaLabel: "Ir al formulario", link: "#form" },
] as const;

const JAPAN_FAQS = [
  {
    id: "1",
    question: "¿Japon es un destino complicado para viajar?",
    answer:
      "No, Japon no es un destino complicado si esta bien planificado. Aunque el idioma y la logistica pueden parecer desafiantes al inicio, el pais es seguro, ordenado y facil de recorrer. Cuando el viaje esta bien estructurado, todo fluye con mayor claridad. En Japon Premium cuidamos ese proceso para que la experiencia se viva sin friccion.",
  },
  {
    id: "2",
    question: "¿Se puede viajar a Japon sin hablar japones?",
    answer:
      "Si, es posible viajar a Japon sin hablar japones. En ciudades como Tokio o Kioto hay senalizacion clara y servicios pensados para viajeros internacionales. Aun asi, saber como moverse y que decisiones tomar marca la diferencia en la experiencia por eso nuestros guias hablan espanol para que no te preocupes por el idioma.",
  },
  {
    id: "3",
    question: "¿Cuantos dias se recomiendan para viajar a Japon?",
    answer:
      "Se recomienda viajar entre 10 y 15 dias para conocer Japon con mayor profundidad. Este tiempo permite recorrer varias ciudades y equilibrar cultura, gastronomia y experiencias. La duracion ideal depende del ritmo del viajero y del tipo de experiencia que quiera construir.",
  },
  {
    id: "4",
    question: "¿Cual es la mejor temporada para viajar a Japon?",
    answer:
      "No hay una unica mejor temporada, depende del tipo de experiencia que buscas. Primavera (Sakuras) y otono (Momiji) son muy populares por sus paisajes, pero tambien hay epocas con menos afluencia que permiten disfrutar Japon con mayor tranquilidad.",
  },
  {
    id: "5",
    question: "¿Es seguro viajar a Japon?",
    answer:
      "Si, Japon es uno de los paises mas seguros del mundo. Se puede viajar con tranquilidad tanto en grandes ciudades como en zonas mas tradicionales. Esa seguridad se aprovecha mucho mas cuando el viaje esta bien organizado y cada detalle esta pensado.",
  },
  {
    id: "6",
    question: "¿Que tipo de experiencias se pueden vivir en Japon?",
    answer:
      "Japon ofrece una combinacion unica de cultura, gastronomia, tradicion, tecnologia y naturaleza. Se pueden recorrer ciudades modernas, templos historicos y paisajes muy distintos en un mismo viaje. En Japon Premium disenamos cada proyecto para integrar estos contrastes de forma coherente.",
  },
  {
    id: "7",
    question: "¿Es facil moverse dentro de Japon?",
    answer:
      "Si, moverse dentro de Japon es facil gracias a su sistema de transporte eficiente y puntual. Los trenes y conexiones permiten recorrer el pais de forma organizada y comoda.",
  },
  {
    id: "8",
    question:
      "¿Japon es un destino recomendable para viajar en pareja o en familia?",
    answer:
      "Si, Japon es un destino ideal tanto para viajar en pareja como en familia ya que hay diversos parques de diversiones y experiencias que se disfrutan en compania. La clave esta en disenar el recorrido segun el tipo de experiencia que se quiere vivir.",
  },
] as const;

export const japonPremiumLandingConfig: PremiumLandingConfig = {
  id: "japon-premium",
  routePath: "/japon-premium",
  metadata: {
    title: "Japon Premium",
    description: "Japon Premium",
    keywords: ["Japon Premium", "Viajes Premium"],
    canonicalPath: "/japon-premium",
    ogImagePath: "/japon-premium/og-image.jpg",
    locale: "es_MX",
  },
  theme: {
    primary: "#db2f21",
    secondary: "#95231c",
    complementary: "#8c8380",
    yellow: "#f2cd5e",
    background: "#f3f3f0",
    black: "#16181b",
    white: "#f3f3f0",
  },
  navbar: {
    logoUrl: "/logos/jp-negro.svg",
    menuItems: [...JAPAN_MENU_ITEMS],
    colors: ["var(--primary-japon)", "var(--secondary-japon)"],
    accentColor: "var(--primary-japon)",
    menuButtonColor: "#ffffff",
    openMenuButtonColor: "#16181b",
  },
  sections: {
    hero: {
      seoHeading: "Viaja a Japón desde México",
      title: {
        line1Lead: "Viaja a",
        line1Focus: "Japón",
        line2Lead: "desde",
        line2Focus: "México",
      },
      mobileTitle: {
        line1Lead: "Viaja a",
        line1Focus: "Japón",
        line2Lead: "Desde",
        line2Focus: "México",
      },
      descriptionLines: [
        {
          highlight: "Eleva tu vida",
          text: "con una forma más cuidada de vivir Japón.",
        },
        {
          highlight: "",
          text: "",
        },
      ],
      ctaPrimary: {
        label: "Solicita tu propuesta",
        target: "#form",
      },
      ctaSecondary: {
        label: "Ver itinerarios",
        target: "#itinerarios",
      },
      backgroundImage: "/images/japon/hero/japanHero.jpg",
      heroOverlay: {
        baseImage: "/images/japon/hero/geishaHero.webp",
        samuraiImage: "/images/japon/hero/samuraiHero.webp",
        baseAlt: "Hero Japon Premium",
        samuraiAlt: "Samurai Japon Premium",
      },
    },
    snapshot: {
      srHeading: "Snapshot de Japón Premium",
      badgeText: "Snapshot",
      titleText: "Más de 21 años diseñando experiencias premium.",
      titleHighlightWords: ["21", "años", "premium"],
      cards: [
        {
          image: "/images/japon/1-kyoto-nara.webp",
          text: "Alma de Japón",
          experiences: "14 DÍAS · ESPIRITUALIDAD · TRADICIÓN · BIENESTAR · CULTURA",
          wide: false,
        },
        {
          image: "/images/japon/1-gastronomia-autentica.webp",
          text: "Japón Pop",
          experiences: "14 DÍAS · ANIME · PARQUES TEMÁTICOS · TECNOLOGÍA · CULTURA POP",
          wide: false,
        },
        {
          image: "/images/japon/1-alojamiento-de-lujo.webp",
          text: "El Camino del Shogun",
          experiences: "15 DÍAS · SAMURAIS · GEISHAS · SUMO · ALPES JAPONESES",
          wide: false,
        },
      ],
      cardButtonLabel: "Descubrir Itinerarios",
      cardButtonTarget: "#form",
    },
    firstForm: {
      srHeading: "Cuentanos como imaginas tu viaje a Japón",
      sectionTitle: "Propuesta personalizada",
      sectionTitleHighlightWord: "personalizada",
      sectionSubtitle:
        "Cuentanos como imaginas tu viaje a Japón, compartenos tus intereses y te ayudaremos a identificar cual de nuestros 3 itinerarios se adapta mejor a tu estilo de viaje.",
      backgroundImage: "/images/japon/geishaForm.webp",
      mobileImage: {
        src: "/images/japon/geishaFormSola.webp",
        alt: "Geisha en Japon",
      },
      formConfig: {
        eyebrow: "Asesoria Privada",
        title: "",
        subtitle: "",
        submitLabel: "Solicita tu propuesta",
        contactEmail: "hola@japonpremium.com",
        contactPhoneDisplay: "+52 55 1234 5678",
        contactPhoneLink: "+525512345678",
        experienceOptions: [
          { label: "Alma de Japón — espiritual y de bienestar", value: "alma-de-japon" },
          { label: "Japón Pop — anime, tecnología y cultura pop", value: "japon-pop" },
          { label: "El Camino del Shōgun — auténtico y cultural", value: "camino-del-shogun" },
        ],
      },
    },
    highlights: {
      srHeading: "Highlights de Japón Premium",
      badgeText: "¿Por que Japón Premium?",
      kickerTop: "Trabajamos con marcas",
      kickerBottom: "Cuidadosamente seleccionadas.",
      line1: {
        lead: "TE LLEVAMOS",
        bracket: {
          label: "OSAKA",
          imageSrc: "/images/japon/1-kyoto-nara.webp",
          imageAlt: "Vista urbana de Osaka",
          textTone: "ot",
        },
        tail: "A",
      },
      line2: {
        text: "VIVIR JAPON",
        highlightWord: "JAPON",
        bracket: {
          label: "KIOTO",
          imageSrc: "/images/japon/1-kyoto-nara.webp",
          imageAlt: "Escena tradicional de Kioto",
          textTone: "epochal",
        },
        tail: "CON",
      },
      line3: {
        lead: "EL RESPALDO",
        bracket: {
          label: "TOKIO",
          imageSrc: "/images/japon/1-kyoto-nara.webp",
          imageAlt: "Paisaje iconico de Tokio",
          textTone: "ot",
        },
        tail: "Y LA",
      },
      line4: {
        text: "ATENCION QUE MERECES",
        highlightWord: "MERECES",
      },
      focusRailItems: [
        {
          id: "kyoto-privado",
          title: "Recorridos diseñados con más criterio",
          description:
            "Cada itinerario se estructura para dar más sentido, ritmo y calidad al viaje.",
          meta: "Cultura",
          imageSrc: "/images/japon/2-recorridos-diseñados-con-mas-criterio.webp",
          href: "#form",
        },
        {
          id: "tokyo-nocturno",
          title: "Acompañamiento personalizado",
          description:
            "Atención cercana antes, durante y después de su experiencia en Japón.",
          meta: "Urbano",
          imageSrc: "/images/japon/2-acompañamiento-personalizado.webp",
          href: "#form",
        },
        {
          id: "sabores-omakase",
          title: "Respaldo 24/7",
          description:
            "Soporte continuo para viajar con tranquilidad de principio a fin.",
          meta: "Gastronomia",
          imageSrc: "/images/japon/2-respaldo-24-7.webp",
          href: "#form",
        },
        {
          id: "onsen-premium",
          title: "Estancias a la altura del viaje",
          description:
            "Seleccionadas por su caracter, ubicacion y nivel de servicio.",
          meta: "Bienestar",
          imageSrc: "/images/japon/2-estancia-a-la-altura-del-viaje.webp",
          href: "#form",
        },
        {
          id: "paisajes-iconicos",
          title: "Expertos que hablan su idioma",
          description:
            "Guías en español para vivir Japón con más claridad y profundidad.",
          meta: "Naturaleza",
          imageSrc: "/images/japon/2-expertos-que-hablan-su-idioma.webp",
          href: "#form",
        },
        {
          id: "experiencia-ryokan",
          title: "Tranquilidad de principio a fin",
          description:
            "Cada detalle se cuida para que usted viaje con más confianza y respaldo.",
          meta: "Tradición",
          imageSrc: "/images/japon/2-tranquilidad-de-principio-a-fin.webp",
          href: "#form",
        },
      ],
      ctaPrimary: {
        label: "Solicita tu propuesta",
        target: "#form",
      },
      ctaSecondary: {
        label: "Ver itinerarios",
        target: "#itinerarios",
      },
    },
    itineraries: {
      srHeading: "Itinerarios de Japón Premium",
      items: [
        {
          id: 1,
          day: "14 DÍAS · ESPIRITUALIDAD · TRADICIÓN · BIENESTAR · CULTURA",
          title: "Alma de Japón",
          description:
            "Un recorrido por el Japón más espiritual y profundo: templos milenarios, rutas sagradas, ryokans, onsen y experiencias que transforman el viaje.",
          ideal:
            "Ideal para parejas, familias, lunas de miel y viajeros que buscan desconexión profunda.",
          image1: "/images/japon/3-alma-de-japon-izq.webp",
          image2: "/images/japon/3-alma-de-japon-der.webp",
        },
        {
          id: 2,
          day: "14 DÍAS · ANIME · PARQUES TEMÁTICOS · TECNOLOGÍA · CULTURA POP",
          title: "Japón Pop",
          description:
            "Un recorrido por el Japón más vibrante y fantástico: anime, parques temáticos, tecnología, neón, tradición y experiencias que transforman el viaje.",
          ideal:
            "Ideal para familias, amigos, parejas jóvenes, fans del anime, manga y la tecnología.",
          image1: "/images/japon/4-japon-pop-izq.webp",
          image2: "/images/japon/4-japon-pop-der.webp",
        },
        {
          id: 3,
          day: "15 DÍAS · SAMURAIS · GEISHAS · SUMO · ALPES JAPONESES",
          title: "El Camino del Shogun",
          description:
            "Un recorrido por el Japón más auténtico y menos transitado: Alpes Japoneses, templos zen, ryokans y santuarios sagrados que transforman el viaje.",
          ideal:
            "Ideal para parejas aventureras, viajeros con mirada cultural y quienes prefieren el Japón que pocos conocen.",
          image1: "/images/japon/5-el-camino-del-shogun-izq.webp",
          image2: "/images/japon/5-el-camino-del-shogun-der.webp",
        },
      ],
      secondaryCtaLabel: "Descargar PDF",
      primaryCta: {
        label: "Quiero esta experiencia",
        target: "#form",
      },
    },
    includes: {
      srHeading: "Lo esencial de la experiencia premium",
      badgeText: "LO ESCENCIAL",
      titleText: "Lo que da forma a tu experiencia premium",
      titleHighlightWords: ["premium", "forma", "da"],
      cta: {
        label: "Solicita tu propuesta",
        target: "#form",
      },
      cardChipLabel: "Integramos",
      previousButtonAriaLabel: "Anterior",
      nextButtonAriaLabel: "Siguiente",
      items: [
        {
          id: "stays",
          label: "I",
          title: "Estancias con caracter",
          description:
            "Espacios cuidadosamente seleccionados por ubicacion, servicio y la experiencia que aportan al viaje.",
          image: "/images/japon/6-estancias-con-caracter.webp",
        },
        {
          id: "transport",
          label: "II",
          title: "Traslados mejor coordinados",
          description:
            "Shinkansen, traslados privados y tiempos pensados para que el viaje fluya con mas orden y comodidad.",
          image: "/images/japon/6-traslados-mejor-coordinados.webp",
        },
        {
          id: "culture",
          label: "III",
          title: "Experiencias culturales curadas",
          description:
            "Templos, barrios historicos y actividades elegidas para conectar con el Japón más auténtico.",
          image: "/images/japon/6-experiencias-culturales-curadas.webp",
        },
        {
          id: "gastronomy",
          label: "IV",
          title: "Escenas gastronomicas seleccionadas",
          description:
            "Reservas y momentos en la mesa pensados para descubrir el Japón con más detalle y autenticidad.",
          image: "/images/japon/6-escenas-gastronomicas-seleccionadas.webp",
        },
        {
          id: "support",
          label: "V",
          title: "Acompañamiento en cada etapa",
          description:
            "Atención en español antes y durante el viaje para acompañarle con claridad y resolver cada detalle.",
          image: "/images/japon/6-acompañamiento-en-cada-etapa.webp",
        },
      ],
    },
    testimonials: {
      srHeading: "Testimonios de viajeros",
      badgeText: "La voz del viajero premium",
      items: [
        {
          id: 1,
          quote:
            "Japón nos parecía un viaje complejo, pero aquí todo se sintió claro, cuidado y bien acompañado desde el principio.",
          name: "Mariana Gutierrez",
          location: "Ciudad de Mexico",
          avatar: "/images/stock/avatar-1.svg",
        },
        {
          id: 2,
          quote:
            "Se nota cuando un viaje está diseñado con criterio. Hubo orden, atención y experiencias que sí valieron la inversión.",
          name: "Rodrigo Trevino",
          location: "Guadalajara",
          avatar: "/images/stock/avatar-2.svg",
        },
        {
          id: 3,
          quote:
            "Viajamos en familia y lo que más agradecimos fue la enorme tranquilidad de sentir que todo estaba bien resuelto.",
          name: "Paola Mendoza",
          location: "Monterrey",
          avatar: "/images/stock/avatar-3.svg",
        },
        {
          id: 4,
          quote:
            "No fue solo un gran viaje, fue una experiencia mejor pensada, mejor cuidada y a la altura de lo que estabamos buscando.",
          name: "Ernesto Ramirez",
          location: "Ciudad de Mexico",
          avatar: "/images/stock/avatar-4.svg",
        },
        {
          id: 5,
          quote:
            "La diferencia estuvo en los detalles: tiempos bien organizados, atención cercana y una experiencia realmente fluida.",
          name: "Fernanda Lozano",
          location: "Puebla",
          avatar: "/images/stock/avatar-5.svg",
        },
      ],
      cta: {
        label: "Solicita tu propuesta",
        target: "#form",
      },
    },
    interlude: {
      srHeading: "Mensaje del equipo Japón Premium",
      rows: [
        "japon premium",
        "momentos inolvidables",
        "reales conexiones",
      ],
      role: "Directora Comercial - Japón PREMIUM",
      name: "Karina Sánchez",
      quote:
        "Nuestra misión es diseñar experiencias personalizadas para que conectes emocionalmente con tu viaje. Creemos que viajar va más allá de acumular destinos; se trata de crear vínculos reales con cada lugar.",
      quoteHighlight:
        "viajar va más allá de acumular destinos; se trata de crear vínculos reales con cada lugar. ",
      image: {
        src: "/images/japon/karina.webp",
        alt: "Asesora de viaje Japon Premium",
      },
    },
    faqs: {
      srHeading: "Preguntas frecuentes sobre Japón Premium",
      accordionAriaLabel: "Preguntas frecuentes",
      badgeText: "Preguntas frecuentes",
      title: "Todo lo que necesitas saber",
      subtitle:
        "Resolvemos las dudas más comunes sobre nuestros viajes a Japón. Si no encuentras lo que buscas, escríbenos directamente.",
      contactLabel: "¿Otra pregunta?",
      contactEmail: "hola@japonpremium.com",
      items: [...JAPAN_FAQS],
    },
    ctaForm: {
      srHeading: "Formulario de contacto Japón Premium",
      backgroundImage: "/images/japon/7-formulario.webp",
      shojiBaseImage: "/images/japon/basePuertas2.webp",
      shojiLeftImage: "/images/japon/puertaIzquierda.webp",
      shojiRightImage: "/images/japon/puertaDerecha.webp",
      formTheme: "light",
      formConfig: {
        eyebrow: "",
        title: "",
        subtitle: "",
        submitLabel: "",
        contactEmail: "hola@japonpremium.com",
        contactPhoneDisplay: "+52 55 1234 5678",
        contactPhoneLink: "+525512345678",
        experienceOptions: [
          { label: "Alma de Japón — espiritual y de bienestar", value: "alma-de-japon" },
          { label: "Japón Pop — anime, tecnología y cultura pop", value: "japon-pop" },
          { label: "El Camino del Shōgun — auténtico y cultural", value: "camino-del-shogun" },
        ],
      },
    },
    marquee: {
      srHeading: "Alianzas de Japón Premium",
      badgeText: "Nuestras alianzas",
      introLeftLogo: {
        src: "/logos/japon/jp-negro.svg",
        alt: "Japon Premium",
        width: 460,
        height: 96,
      },
      introRightLogo: {
        src: "/logos/japon/japanEndlessDiscovery.svg",
        alt: "Japan Endless Discovery",
        width: 460,
        height: 96,
      },
      logos: [
        {
          src: "/images/japon/marquee-logos/22.png",
          alt: "Japon Premium",
          width: 420,
          height: 90,
        },
        {
          src: "/images/japon/marquee-logos/23.png",
          alt: "JP Logo",
          width: 280,
          height: 90,
        },
        {
          src: "/images/japon/marquee-logos/24.png",

          alt: "Japon Grande",
          width: 540,
          height: 120,
        },
        {
          src: "/images/japon/marquee-logos/25.png",
          alt: "Logo Japon",
          width: 380,
          height: 110,
        },
      ],
    },
    footer: {
      srHeading: "Footer Japon Premium",
      samuraiImage: "/images/japon/hero/samuraiHero.webp",
      brandLogo: "/logos/japon/japon-grande-logo.png",
      address:
        "Cda. de Omega 306, Romero de Terreros, Coyoacan, 04310 Ciudad de Mexico, CDMX",
      mapEmbedTitle: "Ubicacion Japon Premium",
      contactEmail: "hola@japonpremium.com",
      contactPhoneDisplay: "+52 55 1234 5678",
      contactPhoneLink: "+525512345678",
      pageLinks: [
        { label: "Inicio", href: "#inicio" },
        { label: "Highlights", href: "#highlights" },
        { label: "Itinerarios", href: "#itinerarios" },
        { label: "Incluye", href: "#includes" },
        { label: "Testimonios", href: "#testimonials" },
        { label: "FAQS", href: "#faqs" },
        { label: "Contacto", href: "#form" },
      ],
      socialLinks: [
        { label: "TikTok", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "Youtube", href: "#" },
        { label: "Facebook", href: "#" },
      ],
      copyrightText:
        "Todas las marcas y servicios que se ofrecen son propiedad de Japón PREMIUM® Consulte Términos y Condiciones en el Contrato de Adhesión ante PROFECO con número 7735-2015 & 7180-2015",
      backToTopLabel: "Volver al inicio",
      legalLinks: [
        { label: "PRIVACIDAD", href: "#" },
        { label: "TERMINOS", href: "#" },
      ],
    },
  },
};
