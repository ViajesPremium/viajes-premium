import type { PremiumLandingConfig } from "@/landings/premium/types";

const PERU_MENU_ITEMS = [
  { label: "Inicio", ariaLabel: "Ir al inicio", link: "#inicio" },
  { label: "Highlights", ariaLabel: "Ir a highlights", link: "#highlights" },
  { label: "Itinerarios", ariaLabel: "Ir a itinerarios", link: "#itinerarios" },
  { label: "Incluye", ariaLabel: "Ir a lo que incluye", link: "#includes" },
  { label: "Testimonios", ariaLabel: "Ir a testimonios", link: "#testimonials" },
  { label: "FAQs", ariaLabel: "Ir a preguntas frecuentes", link: "#faqs" },
  { label: "Contacto", ariaLabel: "Ir al formulario", link: "#form" },
] as const;

const PERU_FAQS = [
  {
    id: "1",
    question: "¿Cuál es la mejor época para viajar a Perú?",
    answer:
      "La mejor época para viajar a Perú depende de las regiones que quieras visitar y del tipo de experiencia que buscas. Temporadas secas suelen ser ideales para recorrer destinos como Cusco y Machu Picchu con mayor comodidad.",
  },
  {
    id: "2",
    question: "¿Cuántos días se recomiendan para conocer Perú?",
    answer:
      "Se recomienda viajar entre 8 y 15 días para conocer Perú con mayor profundidad. Esto permite combinar ciudades, sitios arqueológicos, gastronomía y paisajes naturales en una experiencia más completa.",
  },
  {
    id: "3",
    question: "¿Es complicado viajar a Machu Picchu?",
    answer:
      "No, viajar a Machu Picchu no es complicado cuando el recorrido está bien organizado. La experiencia requiere coordinación de accesos, horarios y traslados, por lo que una buena planeación hace toda la diferencia.",
  },
  {
    id: "4",
    question: "¿Qué destinos se pueden visitar en Perú?",
    answer:
      "Perú combina historia, gastronomía, naturaleza y cultura en un mismo viaje. Destinos como Lima, Cusco, Valle Sagrado y Machu Picchu suelen formar parte de las rutas más buscadas.",
  },
  {
    id: "5",
    question: "¿Es seguro viajar a Perú?",
    answer:
      "Sí, Perú es un destino muy visitado por viajeros de todo el mundo. Como en cualquier viaje internacional, una buena organización y recorridos bien planeados permiten disfrutar la experiencia con mayor tranquilidad.",
  },
  {
    id: "6",
    question: "¿Qué tipo de experiencias gastronómicas ofrece Perú?",
    answer:
      "Perú es uno de los destinos gastronómicos más importantes del mundo. Desde cocina tradicional hasta propuestas contemporáneas, la experiencia culinaria forma parte esencial del viaje.",
  },
  {
    id: "7",
    question: "¿Es recomendable viajar a Perú en pareja o en familia?",
    answer:
      "Sí, Perú es un destino muy versátil que puede disfrutarse tanto en pareja como en familia. Todo depende de cómo se diseñe el recorrido y del tipo de experiencias que se quieran vivir.",
  },
  {
    id: "8",
    question: "¿Qué tan exigente es la altura en Cusco?",
    answer:
      "La altura puede sentirse durante los primeros días, especialmente en Cusco y zonas cercanas. Por eso es importante llevar un ritmo adecuado y planear correctamente el inicio del viaje.",
  },
] as const;

export const peruPremiumLandingConfig: PremiumLandingConfig = {
  id: "peru-premium",
  routePath: "/peru-premium",
  metadata: {
    title: "Viajes a Perú | Clase PREMIUM",
    description:
      "Descubre Perú con profundidad: Machu Picchu, Cusco, el Amazonas y experiencias únicas diseñadas en Clase PREMIUM.",
    keywords: [
      "Viajes a Perú",
      "Tour por Perú",
      "Viaje a Perú desde México",
      "Viajar a Perú",
      "Perú Premium",
    ],
    canonicalPath: "/peru-premium",
    ogImagePath: "/peru-premium/og-image.jpg",
    locale: "es_MX",
  },
  theme: {
    primary: "#1F5198",
    secondary: "#132D4F",
    complementary: "#919C34",
    yellow: "#f2cd5e",
    background: "#f3f3f0",
    black: "#16181b",
    white: "#f3f3f0",
  },
  navbar: {
    logoUrl: "/logos/jp-negro.svg",
    menuItems: [...PERU_MENU_ITEMS],
    colors: ["var(--primary-peru)", "var(--secondary-peru)"],
    accentColor: "var(--primary-peru)",
    menuButtonColor: "#ffffff",
    openMenuButtonColor: "#16181b",
  },
  sections: {
    hero: {
      seoHeading: "Viaje a Perú desde México",
      title: {
        line1Lead: "Viaja a",
        line1Focus: "Perú",
        line2Lead: "desde",
        line2Focus: "México",
      },
      mobileTitle: {
        line1Lead: "Viaja a",
        line1Focus: "Perú",
        line2Lead: "Desde",
        line2Focus: "México",
      },
      descriptionLines: [
        {
          text: "conociendo Perú con profundidad: desde Machu Picchu hasta la Amazonía, con comodidad y acompañamiento real desde el primer contacto hasta tu regreso.",
        },
        {
          text: "Atención personalizada · planeación detallada, soporte antes, durante y después del viaje.",
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
    },
    aboutUs: {
      srHeading: "Nosotros Perú Premium",
      badgeText: "Nosotros",
      titleText: "Más de 21 años diseñando experiencias PREMIUM.",
      titleHighlightWords: ["21 años", "PREMIUM"],
      cards: [
        {
          image: "/images/peru/nosotros/itinerario-montaña-de-colores.webp",
          text: "Montaña de Colores",
          experiences:
            "8 días · Cultura andina · Machu Picchu · Paisajes sagrados",
          wide: false,
        },
        {
          image: "/images/peru/nosotros/itinerario-dunas-dakar.webp",
          text: "Dunas Dakar",
          experiences:
            "9 días · Desierto peruano · Misterios ancestrales · Aventura",
          wide: false,
        },
        {
          image: "/images/peru/nosotros/itinerario-skyfall.webp",
          text: "Sky Fall",
          experiences: "11 días · Andes · Titicaca · Paisajes extremos · Uyuni",
          wide: false,
        },
      ],
      cardButtonLabel: "Descubrir",
      cardButtonTarget: "#itinerarios",
    },
    firstForm: {
      srHeading: "Cuéntanos cómo imaginas tu viaje a Perú",
      sectionTitle: "Propuesta personalizada",
      sectionTitleHighlightWord: "personalizada",
      sectionSubtitle:
        "Cuéntanos cómo imaginas tu viaje a Perú y descubriremos cuál de nuestros 3 itinerarios es perfecto para ti.",
      backgroundImage: "/images/japon/geishaForm.webp",
      mobileImage: {
        src: "/images/japon/geishaFormSola.webp",
        alt: "Viaje a Perú Premium",
      },
      formConfig: {
        eyebrow: "Asesoría Privada",
        title: "",
        subtitle: "",
        submitLabel: "Solicita tu propuesta",
        contactEmail: "reservaciones@viajespremium.com.mx",
        contactPhoneDisplay: "+52 55 1234 5678",
        contactPhoneLink: "+525512345678",
      },
    },
    choose: {
      srHeading: "Highlights de Perú Premium",
      badgeText: "¿Por qué Perú PREMIUM®?",
      kickerTop: "Trabajamos con marcas",
      kickerBottom: "Cuidadosamente seleccionadas.",
      line1: {
        lead: "Viaja por",
        bracket: {
          label: "CUSCO",
          imageSrc: "/images/peru/porque/hover/cusco-premium.webp",
          imageAlt: "Vista de Cusco, Perú",
          textTone: "ot",
        },
        tail: "con Calma",
      },
      line2: {
        text: "Mientras",
        highlightWord: "ANDES",
        bracket: {
          label: "ANDES",
          imageSrc: "/images/peru/porque/hover/andes-premium.webp",
          imageAlt: "Paisaje de los Andes peruanos",
          textTone: "epochal",
        },
        tail: "revelan su",
      },
      line3: {
        lead: "Esencia y el",
        bracket: {
          label: "PERÚ",
          imageSrc: "/images/peru/porque/hover/peru-premium.webp",
          imageAlt: "Machu Picchu, Perú",
          textTone: "ot",
        },
        tail: "redefine tu",
      },
      line4: {
        text: "Forma de viajar",
        highlightWord: "viajar",
      },
      focusRailItems: [
        {
          id: "kyoto-privado",
          title: "Respaldo 24/7",
          description:
            "Soporte continuo para viajar con tranquilidad de principio a fin.",
          meta: "Cultura",
          imageSrc: "/images/peru/porque/valor/respaldo-peru-premium.webp",
          href: "#form",
        },
        {
          id: "tokyo-nocturno",
          title: "Estancias a la altura del viaje",
          description:
            "Seleccionadas por su carácter, ubicación y nivel de servicio.",
          meta: "Urbano",
          imageSrc: "/images/peru/porque/valor/estancias-peru-premium.webp",
          href: "#form",
        },
        {
          id: "sabores-omakase",
          title: "Expertos que hablan del destino",
          description:
            "Guías expertos que conocen el destino con profundidad.",
          meta: "Gastronomía",
          imageSrc: "/images/peru/porque/valor/expertos-peru-premium.webp",
          href: "#form",
        },
        {
          id: "onsen-premium",
          title: "Tranquilidad de principio a fin",
          description:
            "Cada detalle se cuida para que usted viaje con más confianza y respaldo.",
          meta: "Bienestar",
          imageSrc: "/images/peru/porque/valor/tranquilidad-peru-premium.webp",
          href: "#form",
        },
        {
          id: "paisajes-iconicos",
          title: "Recorridos diseñados con más criterio",
          description:
            "Cada itinerario se estructura para dar más sentido, ritmo y calidad al viaje.",
          meta: "Naturaleza",
          imageSrc: "/images/peru/porque/valor/recorridos-peru-premium.webp",
          href: "#form",
        },
        {
          id: "experiencia-ryokan",
          title: "Acompañamiento personalizado",
          description:
            "Atención cercana antes, durante y después de su experiencia en Perú.",
          meta: "Tradición",
          imageSrc: "/images/peru/porque/valor/acompañamiento-peru-premium.webp",
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
      srHeading: "Itinerarios de Perú Premium",
      topTabText: "Itinerario Premium",
      items: [
        {
          id: 1,
          day: "8 días · Cultura andina · Machu Picchu · Paisajes sagrados",
          title: "Montaña de Colores",
          description:
            "Un recorrido diseñado para descubrir Perú entre ciudades históricas, cultura andina y paisajes icónicos como Machu Picchu y la Montaña de Colores.",
          ideal:
            "Ideal para viajeros que buscan conocer la esencia de Perú por primera vez.",
          image1: "/images/japon/3-alma-de-japon-izq.webp",
          image2: "/images/japon/3-alma-de-japon-der.webp",
          price: "",
        },
        {
          id: 2,
          day: "9 días · Desierto peruano · Misterios ancestrales · Aventura",
          title: "Dunas Dakar",
          description:
            "Una experiencia que combina desiertos, culturas ancestrales, recorridos escénicos y algunos de los paisajes más sorprendentes de Perú.",
          ideal:
            "Ideal para viajeros que buscan aventura, naturaleza y experiencias diferentes en Perú.",
          image1: "/images/japon/4-japon-pop-izq.webp",
          image2: "/images/japon/4-japon-pop-der.webp",
          price: "",
        },
        {
          id: 3,
          day: "11 días · Andes · Titicaca · Paisajes extremos · Uyuni",
          title: "Sky Fall",
          description:
            "Un recorrido por Perú y Bolivia que conecta cultura andina, paisajes extraordinarios y experiencias únicas como el Salar de Uyuni y Lago Titicaca.",
          ideal:
            "Ideal para viajeros que buscan una experiencia más profunda y visualmente inolvidable.",
          image1: "/images/japon/5-el-camino-del-shogun-izq.webp",
          image2: "/images/japon/5-el-camino-del-shogun-der.webp",
          price: "",
        },
      ],
      secondaryCtaLabel: "Descargar PDF",
      primaryCta: {
        label: "Quiero esta experiencia",
        target: "#form",
      },
    },
    includes: {
      srHeading: "Lo esencial de la experiencia premium en Perú",
      badgeText: "Lo esencial",
      titleText: "Lo que da forma a tu experiencia premium",
      titleHighlightWords: ["da", "forma", "premium"],
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
          title: "Alojamiento seleccionado con criterio",
          description:
            "Hoteles elegidos por ubicación y comodidad, para tu descanso después de cada experiencia en los Andes y la Amazonía peruana.",
          image: "/images/peru/incluye/experiencia-alojamiento.webp",
        },
        {
          id: "transport",
          label: "II",
          title: "Traslados y conexiones bien resueltos",
          description:
            "Logística planeada para optimizar tiempos y conectar cada experiencia con fluidez y comodidad.",
          image: "/images/peru/incluye/experiencia-traslado.webp",
        },
        {
          id: "culture",
          label: "III",
          title: "Experiencias privadas o seleccionadas",
          description:
            "Actividades con intención: Camino Inca, Valle Sagrado, Lago Titicaca y momentos para conectar con la esencia del Perú profundo.",
          image: "/images/peru/incluye/experiencia-privada.webp",
        },
        {
          id: "gastronomy",
          label: "IV",
          title: "Gastronomía peruana",
          description:
            "Experiencias culinarias que forman parte central del viaje: cocina andina, restaurantes seleccionados en Lima y sabores regionales que definen la identidad gastronómica del Perú.",
          image: "/images/peru/incluye/experiencia-gastronomia.webp",
        },
        {
          id: "support",
          label: "V",
          title: "Acompañamiento en cada etapa",
          description:
            "Atención cercana antes, durante y después del viaje para acompañarte con claridad en cada decisión.",
          image: "/images/peru/incluye/experiencia-acompañamiento.webp",
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
            "Perú nos parecía un viaje complejo, pero aquí todo se sintió claro, cuidado y bien acompañado desde el principio.",
          name: "Mariana Gutiérrez",
          location: "Ciudad de México",
          avatar: "/images/stock/avatar-1.svg",
        },
        {
          id: 2,
          quote:
            "Se nota cuando un viaje está diseñado con criterio. Hubo orden, atención y experiencias que sí valieron la inversión.",
          name: "Rodrigo Treviño",
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
            "No fue solo un gran viaje, fue una experiencia mejor pensada, mejor cuidada y a la altura de lo que estábamos buscando.",
          name: "Ernesto Ramírez",
          location: "Ciudad de México",
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
      srHeading: "Mensaje del equipo Perú Premium",
      rows: [
        "Perú premium experience",
        "curaduría atención precisión",
        "momentos que sí importan",
      ],
      role: "Directora Comercial",
      name: "Karina Sánchez",
      quote:
        "Nuestra misión es diseñar experiencias personalizadas para que conectes emocionalmente con tu viaje. Creemos que viajar va más allá de acumular destinos; se trata de crear vínculos reales con cada lugar.",
      quoteHighlight:
        "viajar va más allá de acumular destinos; se trata de crear vínculos reales con cada lugar.",
      image: {
        src: "/images/japon/karinaSanchezJapon.webp",
        alt: "Asesora de viaje Perú Premium",
      },
    },
    faqs: {
      srHeading: "Preguntas frecuentes sobre Perú Premium",
      accordionAriaLabel: "Preguntas frecuentes",
      badgeText: "Preguntas frecuentes",
      title: "Todo lo que necesitas saber",
      subtitle:
        "Resolvemos las dudas más comunes sobre nuestros viajes a Perú. Si no encuentras lo que buscas, escríbenos directamente.",
      contactLabel: "¿Otra pregunta?",
      contactEmail: "reservaciones@viajespremium.com.mx",
      items: [...PERU_FAQS],
    },
    ctaForm: {
      srHeading: "Formulario de contacto Perú Premium",
      backgroundImage: "/images/peru/7-formulario.webp",
      shojiBaseImage: "/images/peru/basePuertas2.webp",
      shojiLeftImage: "/images/japon/puertaIzquierda.webp",
      shojiRightImage: "/images/japon/puertaDerecha.webp",
      formTheme: "light",
      formConfig: {
        eyebrow: "",
        title: "Última oportunidad",
        subtitle:
          "Completa tus datos y da el primer paso hacia tu viaje a Perú, diseñado a tu medida por Perú PREMIUM ©",
        submitLabel: "Solicita tu propuesta",
        contactEmail: "reservaciones@viajespremium.com.mx",
        contactPhoneDisplay: "+52 55 1234 5678",
        contactPhoneLink: "+525512345678",
      },
    },
    marquee: {
      srHeading: "Alianzas de Perú Premium",
      badgeText: "Nuestras alianzas",
      introLeftLogo: {
        src: "/logos/japon/jp-negro.svg",
        alt: "Perú Premium",
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
          src: "/logos/japon-grande-logo.png",
          alt: "Perú Premium",
          width: 420,
          height: 90,
        },
        {
          src: "/logos/japon-grande-logo.png",
          alt: "JP Logo",
          width: 280,
          height: 90,
        },
        {
          src: "/logos/japon-grande-logo.png",
          alt: "Perú Grande",
          width: 540,
          height: 120,
        },
        {
          src: "/logos/japon-grande-logo.png",
          alt: "Logo Perú",
          width: 380,
          height: 110,
        },
      ],
    },
    footer: {
      srHeading: "Footer Perú Premium",
      logoWord: "PERÚ",
      samuraiImage: "/images/japon/hero/samuraiHero.webp",
      brandLogo: "/logos/peru/peru-grande-logo.png",
      address:
        "Cda. de Omega 306, Romero de Terreros, Coyoacán, 04310 Ciudad de México, CDMX",
      mapEmbedTitle: "Ubicación Perú Premium",
      contactEmail: "reservaciones@viajespremium.com.mx",
      contactPhoneDisplay: "+52 55 1234 5678",
      contactPhoneLink: "+525512345678",
      pageLinks: [
        { label: "INICIO", href: "#inicio" },
        { label: "HIGHLIGHTS", href: "#highlights" },
        { label: "ITINERARIOS", href: "#itinerarios" },
        { label: "INCLUYE", href: "#includes" },
        { label: "TESTIMONIOS", href: "#testimonials" },
        { label: "FAQS", href: "#faqs" },
        { label: "CONTACTO", href: "#form" },
      ],
      socialLinks: [
        { label: "TIKTOK", href: "#" },
        { label: "INSTAGRAM", href: "#" },
        { label: "YOUTUBE", href: "#" },
      ],
      copyrightText:
        "© 2026 Viaja a Perú Premium. Todos los derechos reservados.",
      backToTopLabel: "Volver al inicio",
      legalLinks: [
        { label: "PRIVACIDAD", href: "#" },
        { label: "TÉRMINOS", href: "#" },
      ],
    },
  },
};
