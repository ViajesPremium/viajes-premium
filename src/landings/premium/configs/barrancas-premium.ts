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
    question: "Cual es la mejor temporada para viajar a Barrancas del Cobre?",
    answer:
      "Barrancas del Cobre puede disfrutarse practicamente todo el ano. Primavera y otono ofrecen temperaturas agradables, mientras que invierno permite vivir paisajes espectaculares en la Sierra Tarahumara.",
  },
  {
    id: "2",
    question: "Que es el Chepe Express?",
    answer:
      "El Chepe Express es uno de los recorridos ferroviarios mas espectaculares del mundo. Cruza la Sierra Tarahumara atravesando canones, tuneles y montanas.",
  },
  {
    id: "3",
    question: "Cuantos dias se recomiendan para visitar Barrancas del Cobre?",
    answer:
      "Entre 5 y 8 dias permiten disfrutar con mayor profundidad del destino, combinando naturaleza, gastronomia y recorridos escenicos.",
  },
  {
    id: "4",
    question: "Barrancas del Cobre es recomendable para viajar en pareja o familia?",
    answer:
      "Si. Es un destino ideal tanto para parejas como para familias que buscan experiencias diferentes dentro de Mexico.",
  },
  {
    id: "5",
    question: "Que actividades se pueden hacer?",
    answer:
      "Teleferico, miradores, caminatas, recorridos culturales, experiencias gastronomicas, viajes en el Chepe Express y actividades de aventura.",
  },
  {
    id: "6",
    question: "Que hace diferente una experiencia premium?",
    answer:
      "La diferencia esta en la planeacion, seleccion de hoteles, ritmo del recorrido, atencion personalizada y calidad de las experiencias integradas.",
  },
] as const;

export const barrancasPremiumLandingConfig: PremiumLandingConfig = {
  id: "barrancas-premium",
  routePath: "/barrancas-premium",
  metadata: {
    title: "Viaje a Barrancas del Cobre | Barrancas del Cobre en Clase PREMIUM",
    description:
      "Disenamos viajes a Barrancas del Cobre con experiencias de naturaleza, gastronomia y aventura en Clase PREMIUM.",
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
        line1Lead: "Viaje a",
        line1Focus: "Barrancas",
        line2Lead: "del",
        line2Focus: "Cobre",
      },
      mobileTitle: {
        line1Lead: "Viaje a",
        line1Focus: "Barrancas",
        line2Lead: "del",
        line2Focus: "Cobre",
      },
      descriptionLines: [
        {
          highlight: "Descubre Barrancas del Cobre",
          text: "con experiencias cuidadosamente disenadas, recorridos escenicos en el Chepe Express y una forma premium de conocer el norte de Mexico.",
        },
        {
          highlight: "Eleva tu vida",
          text: "recorriendo uno de los paisajes mas impresionantes de Mexico con naturaleza, gastronomia y aventura en Clase PREMIUM.",
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
    snapshot: {
      srHeading: "Snapshot de Barrancas Premium",
      badgeText: "Snapshot",
      titleText: "Mas de 21 anos disenando experiencias PREMIUM.",
      titleHighlightWords: ["21", "anos", "PREMIUM"],
      cards: [
        {
          image: "/images/peru/1-machu-pichu.webp",
          text: "El de Mayor Ranking",
          experiences: "5 DIAS · CHEPE EXPRESS · MIRADORES · NATURALEZA · BARRANCAS",
          wide: false,
        },
        {
          image: "/images/peru/1-gastronomia-autentica.webp",
          text: "Las Leyendas del Fuerte",
          experiences: "6 DIAS · EL FUERTE · LEYENDAS · HISTORIA · BARRANCAS",
          wide: false,
        },
        {
          image: "/images/japon/1-alojamiento-de-lujo.webp",
          text: "Sabores del Norte",
          experiences: "8 DIAS · GASTRONOMIA · CULTURA MENONITA · CHEPE EXPRESS · BARRANCAS",
          wide: false,
        },
      ],
      cardButtonLabel: "Descubrir Itinerarios",
      cardButtonTarget: "#itinerarios",
    },
    firstForm: {
      srHeading: "Cuentanos como imaginas tu viaje a Barrancas del Cobre",
      sectionTitle: "Propuesta personalizada",
      sectionTitleHighlightWord: "personalizada",
      sectionSubtitle:
        "Cuentanos como imaginas tu viaje a Barrancas del Cobre y descubriremos cual de nuestros 3 itinerarios es perfecto para ti.",
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
    highlights: {
      srHeading: "Highlights de Barrancas Premium",
      badgeText: "Por que Barrancas Premium?",
      kickerTop: "Trabajamos con experiencias",
      kickerBottom: "cuidadosamente seleccionadas.",
      line1: {
        lead: "TE LLEVAMOS",
        bracket: {
          label: "CHEPE",
          imageSrc: "/images/japon/1-kyoto-nara.webp",
          imageAlt: "Recorrido escenico en Chepe Express",
          textTone: "ot",
        },
        tail: "A",
      },
      line2: {
        text: "VIVIR BARRANCAS",
        highlightWord: "BARRANCAS",
        bracket: {
          label: "SIERRA",
          imageSrc: "/images/japon/1-kyoto-nara.webp",
          imageAlt: "Paisaje de la Sierra Tarahumara",
          textTone: "epochal",
        },
        tail: "CON",
      },
      line3: {
        lead: "EL RESPALDO",
        bracket: {
          label: "MEXICO",
          imageSrc: "/images/japon/1-kyoto-nara.webp",
          imageAlt: "Norte de Mexico",
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
          id: "hospedaje-seleccionado",
          title: "Hospedaje seleccionado",
          description:
            "Hoteles cuidadosamente elegidos por ubicacion, comodidad y estilo para descansar bien despues de cada recorrido.",
          meta: "Estancias",
          imageSrc: "/images/japon/2-recorridos-diseÃ±ados-con-mas-criterio.webp",
          href: "#form",
        },
        {
          id: "chepe-express",
          title: "Chepe Express",
          description:
            "Recorridos en el tren mas emblematico del norte de Mexico, entre montanas, tuneles, puentes y paisajes unicos.",
          meta: "Chepe",
          imageSrc: "/images/japon/2-acompaÃ±amiento-personalizado.webp",
          href: "#form",
        },
        {
          id: "traslados-organizados",
          title: "Traslados organizados",
          description:
            "Coordinamos conexiones, tiempos y movimientos para que cada tramo del viaje fluya con claridad.",
          meta: "Logistica",
          imageSrc: "/images/japon/2-respaldo-24-7.webp",
          href: "#form",
        },
        {
          id: "experiencias-escenicas",
          title: "Experiencias escenicas",
          description:
            "Miradores, teleferico, recorridos naturales y visitas seleccionadas para vivir la grandeza de Barrancas del Cobre.",
          meta: "Naturaleza",
          imageSrc: "/images/japon/2-estancia-a-la-altura-del-viaje.webp",
          href: "#form",
        },
        {
          id: "cultura-tradicion",
          title: "Cultura y tradicion",
          description:
            "Acercamientos a la Sierra Tarahumara, su historia, sus comunidades y su caracter cultural.",
          meta: "Cultura",
          imageSrc: "/images/japon/2-expertos-que-hablan-su-idioma.webp",
          href: "#form",
        },
        {
          id: "gastronomia-norte",
          title: "Gastronomia del norte",
          description:
            "Sabores regionales, cocina local, productos menonitas y experiencias culinarias conectadas con la identidad del norte.",
          meta: "Gastronomia",
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
      srHeading: "Itinerarios de Barrancas Premium",
      topTabText: "Itinerario Premium",
      items: [
        {
          id: 1,
          day: "5 DIAS · CHEPE EXPRESS · MIRADORES · NATURALEZA · BARRANCAS",
          title: "El de Mayor Ranking",
          description:
            "Un recorrido ideal para vivir Barrancas del Cobre por primera vez: paisajes monumentales, miradores inolvidables, naturaleza imponente y la experiencia del Chepe Express en Clase PREMIUM.",
          ideal:
            "Ideal para parejas, familias y viajeros que buscan descubrir lo mas iconico de Barrancas del Cobre en una experiencia comoda, bien disenada y memorable.",
          image1: "/images/japon/3-alma-de-japon-izq.webp",
          image2: "/images/japon/3-alma-de-japon-der.webp",
          price: "Desde $____ MXN base doble",
        },
        {
          id: 2,
          day: "6 DIAS · EL FUERTE · LEYENDAS · HISTORIA · BARRANCAS",
          title: "Las Leyendas del Fuerte",
          description:
            "Un viaje con alma de relato por el norte de Mexico: Barrancas del Cobre, El Fuerte, paisajes escenicos y experiencias culturales que conectan historia, naturaleza y el caracter de la Sierra Tarahumara.",
          ideal:
            "Ideal para viajeros que buscan una experiencia con mas historia, identidad cultural y escenarios memorables, sin renunciar a la comodidad de una ruta en Clase PREMIUM.",
          image1: "/images/japon/4-japon-pop-izq.webp",
          image2: "/images/japon/4-japon-pop-der.webp",
          price: "Desde $____ MXN base doble",
        },
        {
          id: 3,
          day: "8 DIAS · GASTRONOMIA · CULTURA MENONITA · CHEPE EXPRESS · BARRANCAS",
          title: "Sabores del Norte",
          description:
            "Una experiencia mas profunda por Barrancas del Cobre, donde el paisaje tambien se vive a traves de la cocina regional, los sabores del norte, la cultura menonita y los recorridos escenicos del Chepe Express.",
          ideal:
            "Ideal para viajeros que disfrutan comer bien, conocer tradiciones locales y vivir un destino desde sus paisajes, su cultura y sus sabores mas autenticos.",
          image1: "/images/japon/5-el-camino-del-shogun-izq.webp",
          image2: "/images/japon/5-el-camino-del-shogun-der.webp",
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
      badgeText: "LO ESCENCIAL",
      titleText: "Lo que da forma a tu experiencia en Barrancas del Cobre",
      titleHighlightWords: ["experiencia", "forma", "Barrancas"],
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
          title: "Alojamientos seleccionados con criterio",
          description:
            "Hoteles y estancias elegidas por ubicacion, comodidad y coherencia con el recorrido, para descansar bien despues de cada experiencia.",
          image: "/images/japon/6-estancias-con-caracter.webp",
        },
        {
          id: "transport",
          label: "II",
          title: "Traslados y conexiones bien resueltos",
          description:
            "Organizamos traslados, tiempos de conexion y desplazamientos clave para que el viaje fluya con claridad.",
          image: "/images/japon/6-traslados-mejor-coordinados.webp",
        },
        {
          id: "culture",
          label: "III",
          title: "Experiencias privadas o seleccionadas",
          description:
            "Actividades elegidas con intencion: miradores, teleferico, recorridos escenicos, cultura raramuri y naturaleza.",
          image: "/images/japon/6-experiencias-culturales-curadas.webp",
        },
        {
          id: "gastronomy",
          label: "IV",
          title: "Gastronomia del norte",
          description:
            "Experiencias culinarias y sabores regionales que forman parte central del viaje: cocina local, productos menonitas y propuestas seleccionadas.",
          image: "/images/japon/6-escenas-gastronomicas-seleccionadas.webp",
        },
        {
          id: "support",
          label: "V",
          title: "Acompanamiento en cada etapa",
          description:
            "Desde la planeacion inicial hasta tu regreso, cuentas con seguimiento real, atencion personalizada y soporte para viajar con tranquilidad.",
          image: "/images/japon/6-acompaÃ±amiento-en-cada-etapa.webp",
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
            "El paquete estuvo super padre. Queremos reconocer el trabajo de todos los guias; en verdad, todos 10 de 10.",
          name: "Anabel Gonzalez y Juan Hernandez",
          location: "Viajeros Barrancas PREMIUM",
          avatar: "/images/stock/avatar-1.svg",
        },
        {
          id: 2,
          quote:
            "Excelente servicio. El tour completo fue divino; nos sentimos comodos y seguros en todo momento.",
          name: "Patricia Vega",
          location: "Viajera Barrancas PREMIUM",
          avatar: "/images/stock/avatar-2.svg",
        },
        {
          id: 3,
          quote:
            "Servicio personalizado y de gran calidad. Guias atentos, excelente logistica y experiencias increibles en Chepe y destinos.",
          name: "Javier y Tere Gonzalez",
          location: "Viajeros Barrancas PREMIUM",
          avatar: "/images/stock/avatar-3.svg",
        },
        {
          id: 4,
          quote:
            "Gracias por las atenciones; el viaje fue inolvidable. Paisajes increibles, actividades divertidas y mucho aprendizaje.",
          name: "Ing. Hernan Garcia y Aurelia Patricia Govea",
          location: "Viajeros Barrancas PREMIUM",
          avatar: "/images/stock/avatar-4.svg",
        },
        {
          id: 5,
          quote:
            "Atencion personalizada desde el inicio, guias muy amables y un viaje hermoso. Totalmente recomendable.",
          name: "Felix Romo",
          location: "Viajero Barrancas PREMIUM",
          avatar: "/images/stock/avatar-5.svg",
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
        "Resolvemos las dudas mas comunes sobre nuestros viajes a Barrancas del Cobre. Si no encuentras lo que buscas, escribenos directamente.",
      contactLabel: "Otra pregunta?",
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
      samuraiImage: "/images/japon/hero/samuraiHero.webp",
      brandLogo: "/logos/japon/japon-grande-logo.png",
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
