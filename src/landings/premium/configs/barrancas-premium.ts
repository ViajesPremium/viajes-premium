import type { PremiumLandingConfig } from "@/landings/premium/types";

const BARRANCAS_MENU_ITEMS = [
  { label: "Inicio", ariaLabel: "Ir al inicio", link: "#inicio" },
  { label: "Highlights", ariaLabel: "Ir a highlights", link: "#highlights" },
  { label: "Itinerarios", ariaLabel: "Ir a itinerarios", link: "#itinerarios" },
  { label: "Incluye", ariaLabel: "Ir a lo que incluye", link: "#includes" },
  { label: "Testimonios", ariaLabel: "Ir a testimonios", link: "#testimonials" },
  { label: "FAQs", ariaLabel: "Ir a preguntas frecuentes", link: "#faqs" },
  { label: "Contacto", ariaLabel: "Ir al formulario", link: "#form" },
] as const;

const BARRANCAS_FAQS = [
  {
    id: "1",
    question: "¿Cuál es la mejor temporada para viajar a Barrancas del Cobre?",
    answer:
      "Barrancas del Cobre puede disfrutarse prácticamente todo el año. Primavera y otoño ofrecen temperaturas agradables, mientras que invierno permite vivir paisajes espectaculares en la Sierra Tarahumara.",
  },
  {
    id: "2",
    question: "¿Qué es el Chepe Express?",
    answer:
      "El Chepe Express es uno de los recorridos ferroviarios más espectaculares del mundo. Cruza la Sierra Tarahumara atravesando cañones, túneles y montañas.",
  },
  {
    id: "3",
    question: "¿Cuántos días se recomiendan para visitar Barrancas del Cobre?",
    answer:
      "Entre 5 y 8 días permiten disfrutar con mayor profundidad del destino, combinando naturaleza, gastronomía y recorridos escénicos.",
  },
  {
    id: "4",
    question: "¿Barrancas del Cobre es recomendable para viajar en pareja o familia?",
    answer:
      "Sí. Es un destino ideal tanto para parejas como para familias que buscan experiencias diferentes dentro de México.",
  },
  {
    id: "5",
    question: "¿Qué actividades se pueden hacer?",
    answer:
      "Teleférico, miradores, caminatas, recorridos culturales, experiencias gastronómicas, viajes en el Chepe Express y actividades de aventura.",
  },
  {
    id: "6",
    question: "¿Qué hace diferente una experiencia premium?",
    answer:
      "La diferencia está en la planeación, selección de hoteles, ritmo del recorrido, atención personalizada y calidad de las experiencias integradas.",
  },
] as const;

export const barrancasPremiumLandingConfig: PremiumLandingConfig = {
  id: "barrancas-premium",
  routePath: "/barrancas-premium",
  metadata: {
    title: "Viaje a Barrancas del Cobre | Clase PREMIUM",
    description:
      "Descubre Barrancas del Cobre con recorridos en Chepe Express, naturaleza y experiencias diseñadas en Clase PREMIUM.",
    keywords: [
      "Barrancas del Cobre",
      "Chepe Express",
      "tours Barrancas del Cobre",
      "viaje a Barrancas del Cobre",
      "tour por Barrancas del Cobre",
    ],
    canonicalPath: "/barrancas-premium",
    ogImagePath: "/barrancas-premium/og-image.jpg",
    locale: "es_MX",
  },
  theme: {
    primary: "#963825",
    secondary: "#D55C26",
    complementary: "#45736B",
    yellow: "#f2cd5e",
    background: "#f3f3f0",
    black: "#16181b",
    white: "#f3f3f0",
  },
  navbar: {
    logoUrl: "/logos/jp-negro.svg",
    menuItems: [...BARRANCAS_MENU_ITEMS],
    colors: ["var(--primary-barrancas)", "var(--secondary-barrancas)"],
    accentColor: "var(--primary-barrancas)",
    menuButtonColor: "#ffffff",
    openMenuButtonColor: "#16181b",
  },
  sections: {
    hero: {
      seoHeading: "Viaje a Barrancas del Cobre",
      title: {
        line1Lead: "Barrancas",
        line1Focus: "en",
        line2Lead: "Clase",
        line2Focus: "Premium",
      },
      mobileTitle: {
        line1Lead: "Viaja a",
        line1Focus: "Barrancas",
        line2Lead: "en Clase",
        line2Focus: "Premium",
      },
      descriptionLines: [
        {
          text: "conociendo Barrancas del cobre con profundidad, comodidad y acompañamiento real desde el primer contacto hasta su regreso.",
        },
        {
          text: "Atención personalizada · planeación detallada, Soporte antes, durante y después del viaje.",
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
      srHeading: "Snapshot de Barrancas Premium",
      badgeText: "Nosotros",
      titleText: "Más de 21 años diseñando experiencias PREMIUM.",
      titleHighlightWords: ["21 años", "PREMIUM"],
      cards: [
        {
          image: "/images/barrancas/nosotros/5-dias-chepe-express-miradores-naturaleza.webp",
          text: "El de Mayor Ranking",
          experiences: "5 días · Chepe Express · Miradores · Naturaleza",
          wide: false,
        },
        {
          image: "/images/barrancas/nosotros/7-dias-historia-paisajes-cultura-norteña.webp",
          text: "Leyendas del Fuerte",
          experiences: "7 días · Historia · Paisajes · Cultura norteña",
          wide: false,
        },
        {
          image: "/images/barrancas/nosotros/8-dias-gastronomia-cultura-menonita-chepe.webp",
          text: "Sabores del Norte",
          experiences: "8 días · Gastronomía · Cultura menonita · Chepe",
          wide: false,
        },
      ],
      cardButtonLabel: "Descubrir Itinerarios",
      cardButtonTarget: "#itinerarios",
    },
    firstForm: {
      srHeading: "Cuéntanos cómo imaginas tu viaje a Barrancas del Cobre",
      sectionTitle: "Propuesta personalizada",
      sectionTitleHighlightWord: "personalizada",
      sectionSubtitle:
        "Cuéntanos cómo imaginas tu viaje a Barrancas del Cobre y descubriremos cuál de nuestros 3 itinerarios es perfecto para ti.",
      backgroundImage: "/images/japon/geishaForm.webp",
      mobileImage: {
        src: "/images/japon/geishaFormSola.webp",
        alt: "Viajero en Barrancas del Cobre",
      },
      formConfig: {
        eyebrow: "Asesoria Privada",
        title: "",
        subtitle: "",
        submitLabel: "Solicita tu propuesta",
        contactEmail: "reservaciones@viajespremium.com.mx",
        contactPhoneDisplay: "55 9773 3754",
        contactPhoneLink: "+525597733754",
      },
    },
    choose: {
      srHeading: "Highlights de Barrancas Premium",
      badgeText: "¿Por qué Barrancas PREMIUM?",
      kickerTop: "Trabajamos con marcas",
      kickerBottom: "cuidadosamente seleccionadas.",
      line1: {
        lead: "Viaja por",
        bracket: {
          label: "CHIHUAHUA",
          imageSrc: "/images/barrancas/porque/hover/chihuahua-premium.webp",
          imageAlt: "Recorrido escenico en Chepe Express",
          textTone: "ot",
        },
        tail: "con Calma",
      },
      line2: {
        text: "Mientras",
        highlightWord: "BARRANCAS",
        bracket: {
          label: "BARRANCAS",
          imageSrc: "/images/barrancas/porque/hover/barrancas-del-cobre-premium.webp",
          imageAlt: "Paisaje de la Sierra Tarahumara",
          textTone: "epochal",
        },
        tail: "revelan su",
      },
      line3: {
        lead: "Esencia y el",
        bracket: {
          label: "CHEPE",
          imageSrc: "/images/barrancas/porque/hover/chepe-express-premium.webp",
          imageAlt: "Norte de Mexico",
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
          id: "respaldo-24-7",
          title: "Respaldo 24/7",
          description: "Soporte continuo para viajar con tranquilidad de principio a fin.",
          meta: "Respaldo",
          imageSrc: "/images/barrancas/porque/valor/respaldo-24-7.webp",
          href: "#form",
        },
        {
          id: "estancias",
          title: "Estancias a la altura del viaje",
          description: "Seleccionadas por su carácter, ubicación y nivel de servicio.",
          meta: "Estancias",
          imageSrc: "/images/barrancas/porque/valor/estancias-a-la-altura.webp",
          href: "#form",
        },
        {
          id: "expertos",
          title: "Expertos que hablan del destino",
          description: "Guías expertos que conocen el destino con profundidad.",
          meta: "Expertos",
          imageSrc: "/images/barrancas/porque/valor/expertos-que-hablan.webp",
          href: "#form",
        },
        {
          id: "tranquilidad",
          title: "Tranquilidad de principio a fin",
          description: "Cada detalle se cuida para que usted viaje con más confianza y respaldo.",
          meta: "Tranquilidad",
          imageSrc: "/images/barrancas/porque/valor/tranquilidad-de-inicio-a-fin.webp",
          href: "#form",
        },
        {
          id: "criterio",
          title: "Recorridos diseñados con más criterio",
          description: "Cada itinerario se estructura para dar más sentido, ritmo y calidad al viaje.",
          meta: "Diseño",
          imageSrc: "/images/barrancas/porque/valor/recorridos-diseñados.webp",
          href: "#form",
        },
        {
          id: "acompanamiento",
          title: "Acompañamiento personalizado",
          description: "Atención cercana antes, durante y después de su experiencia.",
          meta: "Servicio",
          imageSrc: "/images/barrancas/porque/valor/acompañamiento-premium.webp",
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
      srHeading: "Itinerarios de Barrancas Premium",
      topTabText: "Itinerario Premium",
      items: [
        {
          id: 1,
          day: "5 DÍAS · CHEPE EXPRESS · MIRADORES · NATURALEZA · BARRANCAS",
          title: "El de Mayor Ranking",
          description:
            "Un recorrido ideal para vivir Barrancas del Cobre por primera vez: miradores, naturaleza imponente y el Chepe Express en Clase PREMIUM.",
          ideal:
            "Ideal para parejas, familias y viajeros que buscan descubrir lo más icónico de Barrancas del Cobre en pocos días.",
          image1: "/images/barrancas/itinerarios/izquierda/mayor-ranking.webp",
          image2: "/images/barrancas/itinerarios/derecha/mayor-ranking.webp",
          price: "Desde $____ MXN base doble",
        },
        {
          id: 2,
          day: "7 DÍAS · EL FUERTE · LEYENDAS · HISTORIA · BARRANCAS",
          title: "Leyendas del Fuerte",
          description:
            "Un relato por el norte de México: Barrancas del Cobre, El Fuerte, y experiencias culturales que conectan la historia, la naturaleza y la Sierra Tarahumara.",
          ideal:
            "Ideal para viajeros que buscan una experiencia con historia, cultura y escenarios memorables en Clase PREMIUM.",
          image1: "/images/barrancas/itinerarios/izquierda/leyendas-del-fuerte.webp",
          image2: "/images/barrancas/itinerarios/derecha/leyendas-del-fuerte.webp",
          price: "Desde $____ MXN base doble",
        },
        {
          id: 3,
          day: "8 DÍAS · GASTRONOMÍA · MENONITAS · CHEPE EXPRESS · BARRANCAS",
          title: "Sabores del Norte",
          description:
            "Una experiencia más profunda por Barrancas del Cobre, donde el paisaje también se vive a través de la cocina regional y los sabores del norte.",
          ideal:
            "Ideal para viajeros que disfrutan conocer tradiciones locales y vivir un destino desde su cultura y sus sabores.",
          image1: "/images/barrancas/itinerarios/izquierda/sabores-del-norte.webp",
          image2: "/images/barrancas/itinerarios/derecha/sabores-del-norte.webp",
          price: "Desde $____ MXN base doble",
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
      badgeText: "Lo esencial",
      titleText: "Lo que da forma a tu experiencia premium",
      titleHighlightWords: ["Da forma", "premium"],
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
            "Hoteles y estancias elegidas por ubicación y comodidad, para descansar bien después de cada experiencia en la Sierra Tarahumara.",
          image: "/images/barrancas/incluye/alojamiento-seleccionado.webp",
        },
        {
          id: "transport",
          label: "II",
          title: "Traslados y conexiones bien resueltos",
          description:
            "Organizamos traslados y desplazamientos clave para que el viaje fluya entre Chihuahua, El Fuerte, Creel, Divisadero y Barrancas del Cobre.",
          image: "/images/barrancas/incluye/traslados-y-conexiones.webp",
        },
        {
          id: "culture",
          label: "III",
          title: "Experiencias privadas o seleccionadas",
          description:
            "Actividades elegidas con intención: miradores, recorridos escénicos, naturaleza y momentos diseñados para conectar con el destino.",
          image: "/images/barrancas/incluye/experiencias-privadas.webp",
        },
        {
          id: "gastronomy",
          label: "IV",
          title: "Gastronomía del norte",
          description:
            "Experiencias culinarias y sabores regionales que forman parte central del viaje: cocina local, productos menonitas y propuestas gastronómicas seleccionadas.",
          image: "/images/barrancas/incluye/gastronomia-del-norte.webp",
        },
        {
          id: "support",
          label: "V",
          title: "Acompañamiento en cada etapa",
          description:
            "Desde la planeación inicial hasta tu regreso, cuentas con seguimiento real, atención personalizada y soporte para vivir Barrancas del Cobre con tranquilidad.",
          image: "/images/barrancas/incluye/acompañamiento-durante-todo-el-recorrido.webp",
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
            "El paquete estuvo súper padre. Queremos reconocer el trabajo de todos los guías; en verdad, todos 10 de 10.",
          name: "Anabel González y Juan Hernández",
          location: "Ciudad de México",
          avatar: "/images/barrancas/testimonios/anabel-gonzalez.webp",
        },
        {
          id: 2,
          quote:
            "Excelente servicio. El tour completo fue divino; nos sentimos cómodos y seguros en todo momento.",
          name: "Patricia Vega",
          location: "Yucatán",
          avatar: "/images/barrancas/testimonios/patricia-vega.webp",
        },
        {
          id: 3,
          quote:
            "Servicio personalizado y de gran calidad. Guías atentos, excelente logística y experiencias increíbles en Chepe y destinos.",
          name: "Javier y Tere González",
          location: "Guadalajara",
          avatar: "/images/barrancas/testimonios/tere-gonzalez.webp",
        },
        {
          id: 4,
          quote:
            "Gracias por las atenciones; el viaje fue inolvidable. Paisajes increíbles, actividades divertidas y mucho aprendizaje.",
          name: "Ing. Hernán García",
          location: "Monterrey",
          avatar: "/images/barrancas/testimonios/hernan-garcia.webp",
        },
        {
          id: 5,
          quote:
            "Atención personalizada desde el inicio, guías muy amables y un viaje hermoso. Totalmente recomendable.",
          name: "Félix Romo",
          location: "Ciudad de México",
          avatar: "/images/barrancas/testimonios/felix-romo.webp",
        },
      ],
      cta: {
        label: "Solicita tu propuesta",
        target: "#form",
      },
    },
    interlude: {
      srHeading: "Mensaje del equipo Barrancas Premium",
      rows: [
        "barrancas premium experience",
        "curaduria atencion precision",
        "naturaleza cultura aventura",
      ],
      role: "Directora Comercial",
      name: "Karina Sanchez",
      quote:
        "Disenamos experiencias personalizadas para que conectes con Barrancas del Cobre desde sus paisajes, su cultura y su identidad. Cuidamos cada detalle para que viajes con confianza, comodidad y sentido.",
      quoteHighlight:
        "Cuidamos cada detalle para que viajes con confianza, comodidad y sentido.",
      image: {
        src: "/images/japon/karinaSanchezJapon.webp",
        alt: "Asesora de viaje Barrancas Premium",
      },
    },
    faqs: {
      srHeading: "Preguntas frecuentes sobre Barrancas Premium",
      accordionAriaLabel: "Preguntas frecuentes",
      badgeText: "Preguntas frecuentes",
      title: "Todo lo que necesitas saber",
      subtitle:
        "Resolvemos las dudas más comunes sobre nuestros viajes a Barrancas del Cobre. Si no encuentras lo que buscas, escríbenos directamente.",
      contactLabel: "¿Otra pregunta?",
      contactEmail: "reservaciones@viajespremium.com.mx",
      items: [...BARRANCAS_FAQS],
    },
    ctaForm: {
      srHeading: "Formulario de contacto Barrancas Premium",
      backgroundImage: "/images/peru/7-formulario.webp",
      shojiBaseImage: "/images/peru/basePuertas2.webp",
      shojiLeftImage: "/images/japon/puertaIzquierda.webp",
      shojiRightImage: "/images/japon/puertaDerecha.webp",
      formTheme: "light",
      formConfig: {
        eyebrow: "",
        title: "",
        subtitle: "",
        submitLabel: "",
        contactEmail: "reservaciones@viajespremium.com.mx",
        contactPhoneDisplay: "55 9773 3754",
        contactPhoneLink: "+525597733754",
      },
    },
    marquee: {
      srHeading: "Alianzas de Barrancas Premium",
      badgeText: "Nuestras alianzas",
      introLeftLogo: {
        src: "/logos/japon/jp-negro.svg",
        alt: "Barrancas Premium",
        width: 460,
        height: 96,
      },
      introRightLogo: {
        src: "/logos/japon/japanEndlessDiscovery.svg",
        alt: "Barrancas del Cobre",
        width: 460,
        height: 96,
      },
      logos: [
        {
          src: "/logos/japon-grande-logo.png",
          alt: "Barrancas Premium",
          width: 420,
          height: 90,
        },
        {
          src: "/logos/japon-grande-logo.png",
          alt: "Barrancas Premium Logo",
          width: 280,
          height: 90,
        },
        {
          src: "/logos/japon-grande-logo.png",
          alt: "Barrancas del Cobre",
          width: 540,
          height: 120,
        },
        {
          src: "/logos/japon-grande-logo.png",
          alt: "Logo Barrancas",
          width: 380,
          height: 110,
        },
      ],
    },
    footer: {
      srHeading: "Footer Barrancas Premium",
      logoWord: "BARRANCAS",
      samuraiImage: "/images/japon/hero/samuraiHero.webp",
      brandLogo: "/logos/barrancas/barrancas-grande-logo.png",
      address:
        "Cda. de Omega 306, Romero de Terreros, Coyoacan, 04310 Ciudad de Mexico, CDMX",
      mapEmbedTitle: "Ubicacion Barrancas Premium",
      contactEmail: "reservaciones@viajespremium.com.mx",
      contactPhoneDisplay: "55 9773 3754",
      contactPhoneLink: "+525597733754",
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
    "© 2026 Viaje a Barrancas Premium. Todos los derechos reservados.",
      backToTopLabel: "Volver al inicio",
      legalLinks: [
        { label: "PRIVACIDAD", href: "#" },
        { label: "TERMINOS", href: "#" },
      ],
    },
  },
};

