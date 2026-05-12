import type { PremiumLandingConfig } from "@/landings/premium/types";

const JAPAN_MENU_ITEMS = [
  { label: "Inicio", ariaLabel: "Ir al inicio", link: "#inicio" },
  { label: "Nosotros", ariaLabel: "Ir a nosotros", link: "#nosotros" },
  { label: "Itinerarios", ariaLabel: "Ir a itinerarios", link: "#itinerarios" },
  { label: "Qué Incluye", ariaLabel: "Ir a lo que incluye", link: "#includes" },
  { label: "Opiniones", ariaLabel: "Ir a opiniones", link: "#testimonials" },
  { label: "Sobre Japón", ariaLabel: "Ir a sobre japón", link: "#faqs" },
  { label: "Contacto", ariaLabel: "Ir al formulario", link: "#form" },
] as const;

const JAPAN_FAQS = [
  {
    id: "1",
    question: "¿Japón es un destino complicado para viajar?",
    answer:
      "No, Japón no es un destino complicado si está bien planificado. Aunque el idioma y la logística pueden parecer desafiantes al inicio, el país es seguro, ordenado y fácil de recorrer. Cuando el viaje está bien estructurado, todo fluye con mayor claridad. En Japón Premium cuidamos ese proceso para que la experiencia se viva sin fricción.",
  },
  {
    id: "2",
    question: "¿Se puede viajar a Japón sin hablar japonés?",
    answer:
      "Sí, es posible viajar a Japón sin hablar japonés. En ciudades como Tokio o Kioto hay señalización clara y servicios pensados para viajeros internacionales. Aun así, saber cómo moverse y qué decisiones tomar marca la diferencia en la experiencia; por eso nuestros guías hablan español para que no te preocupes por el idioma.",
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
      "No hay una única mejor temporada; depende del tipo de experiencia que buscas. Primavera (Sakuras) y otoño (Momiji) son muy populares por sus paisajes, pero también hay épocas con menos afluencia que permiten disfrutar Japón con mayor tranquilidad.",
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
      "Sí, Japón es un destino ideal tanto para viajar en pareja como en familia, ya que hay diversos parques de diversiones y experiencias que se disfrutan en compañía. La clave está en diseñar el recorrido según el tipo de experiencia que se quiere vivir.",
  },
] as const;

export const japonPremiumLandingConfig: PremiumLandingConfig = {
  id: "japon-premium",
  routePath: "/japon-premium",
  metadata: {
    title: "Japón Premium",
    description: "Viajes de lujo a Japón con acompañamiento en español",
    keywords: ["Japón Premium", "Viajes Premium", "Japón desde México"],
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
    colors: ["var(--primary)", "var(--secondary)"],
    accentColor: "var(--primary)",
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
          text: "conociendo Japón con profundidad, comodidad y acompañamiento real desde el primer contacto hasta su regreso.",
        },
        {
          text: "Atención en español · Planeación personalizada · Soporte antes, durante y después del viaje",
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
        baseAlt: "Hero Japón Premium",
        samuraiAlt: "Samurai Japón Premium",
      },
    },
    aboutUs: {
      srHeading: "Snapshot de Japón Premium",
      badgeText: "Nosotros",
      titleText: "Más de 21 años diseñando experiencias PREMIUM.",
      titleHighlightWords: ["21 años", "PREMIUM"],
      cards: [
        {
          image: "/images/japon/1-alma-de-japon.webp",
          text: "Alma de Japón",
          experiences: "14 Días · Espiritualidad · Tradición · Bienestar · Cultura",
          wide: false,
        },
        {
          image: "/images/japon/1-japon-pop.webp",
          text: "Japón Pop",
          experiences: "14 Días · Anime · Parques Temáticos · Tecnología · Cultura Pop",
          wide: false,
        },
        {
          image: "/images/japon/1-camino-del-shogun.webp",
          text: "El Camino del Shogun",
          experiences: "15 Días · Samuráis · Geishas · Sumo · Alpes Japoneses",
          wide: false,
        },
      ],
      cardButtonLabel: "Descubrir Itinerarios",
      cardButtonTarget: "#itinerarios",
    },
    firstForm: {
      srHeading: "Cuéntanos cómo imaginas tu viaje a Japón",
      sectionTitle: "Propuesta personalizada",
      sectionTitleHighlightWord: "personalizada",
      sectionSubtitle:
"Cuéntanos cómo imaginas tu viaje a Japón y descubriremos cuál de nuestros 3 itinerarios es perfecto para ti.",     backgroundImage: "/images/japon/geishaForm.webp",
      mobileImage: {
        src: "/images/japon/geishaFormSola.webp",
        alt: "Geisha en Japón",
      },
      formConfig: {
        eyebrow: "Asesoría Privada",
        title: "",
        subtitle: "",
        submitLabel: "Solicita tu propuesta",
        contactEmail: "reservaciones@viajespremium.com.mx",
        contactPhoneDisplay: "+52 55 4161 9428",
        contactPhoneLink: "+525541619428",
        formAction: "https://formsubmit.co/grupo-santa-f@add.nocrm.io",
        formMethod: "POST",
        formNextUrl: "https://tusitio.com/gracias", // opcional
        formCc: "crm@viajespremium.com.mx", // opcional
        crmTag: "#tags:Japon Premium",
        experienceOptions: [
          { label: "Alma de Japón — Espiritualidad y tradición | Desde $5,703 USD", value: "alma-de-japon" },
          { label: "Japón Pop — Anime, tecnología y cultura pop | Desde $6,478 USD", value: "japon-pop" },
          { label: "El Camino del Shogun — Samuráis y cultura | Desde $5,938 USD", value: "camino-del-shogun" },
          { label: "Deseo una experiencia más personalizada", value: "otro" },
        ],
      },
    },
    choose: {
      srHeading: "Highlights de Japón Premium",
      badgeText: "¿Por qué Japón Premium?",
      kickerTop: "Trabajamos con marcas",
      kickerBottom: "Cuidadosamente seleccionadas.",
      line1: {
        lead: "VIAJA POR",
        bracket: {
          label: "Osaka",
          imageSrc: "/images/japon/frase_osaka.webp",
          imageAlt: "Vista urbana de Osaka",
          textTone: "ot",
        },
        tail: "CON CALMA",
      },
      line2: {
        text: "MIENTRAS",
        highlightWord: "",
        bracket: {
          label: "Kioto",
          imageSrc: "/images/japon/frase_kioto.webp",
          imageAlt: "Escena tradicional de Kioto",
          textTone: "epochal",
        },
        tail: "REVELA SU",
      },
      line3: {
        lead: "ESENCIA Y",
        bracket: {
          label: "Tokio",
          imageSrc: "/images/japon/frase_tokio.webp",
          imageAlt: "Paisaje icónico de Tokio",
          textTone: "ot",
        },
        tail: "REDEFINE TU",
      },
      line4: {
        text: "FORMA DE VIAJAR",
        highlightWord: "VIAJAR",
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
          meta: "Gastronomía",
          imageSrc: "/images/japon/2-respaldo-24-7.webp",
          href: "#form",
        },
        {
          id: "onsen-premium",
          title: "Estancias a la altura del viaje",
          description:
            "Seleccionadas por su carácter, ubicación y nivel de servicio.",
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
      topTabText: "Itinerario Premium",
      items: [
        {
          id: 1,
          day: "14 DÍAS · ESPIRITUALIDAD · TRADICIÓN · BIENESTAR · CULTURA",
          title: "Alma de Japón",
          description:
            "Un recorrido por el Japón más espiritual y profundo: templos milenarios, rutas sagradas, ryokans, onsen y experiencias que transforman el viaje.",
          ideal:
            "Ideal para parejas, familias, lunas de miel y viajeros que buscan desconexión profunda.",
          image1: "/images/japon/3.1-alma-de-japon-izq.webp",
          image2: "/images/japon/3.2-alma-de-japon-der.webp",
          price: "Desde $5,703 USD base doble",
        },
        {
          id: 2,
          day: "14 DÍAS · ANIME · PARQUES TEMÁTICOS · TECNOLOGÍA · CULTURA POP",
          title: "Japón Pop",
          description:
            "Un recorrido por el Japón más vibrante y fantástico: anime, parques temáticos, tecnología, neón, tradición y experiencias que transforman el viaje.",
          ideal:
            "Ideal para familias, amigos, parejas jóvenes, fans del anime, manga y la tecnología.",
          image1: "/images/japon/4.2-japon-pop-izq.webp",
          image2: "/images/japon/4.3-japon-pop-der.webp",
          price: "Desde $6,478 USD base doble",
        },
        {
          id: 3,
          day: "15 DÍAS · SAMURÁIS · GEISHAS · SUMO · ALPES JAPONESES",
          title: "El Camino del Shogun",
          description:
            "Un recorrido por el Japón más auténtico y menos transitado: Alpes Japoneses, templos zen, ryokans y santuarios sagrados que transforman el viaje.",
          ideal:
            "Ideal para parejas aventureras, viajeros con mirada cultural y quienes prefieren el Japón que pocos conocen.",
          image1: "/images/japon/5.2-el-camino-del-shogun-izq.webp",
          image2: "/images/japon/5.1-el-camino-del-shogun-der.webp",
          price: "Desde $5,938 USD base doble",
        },
      ],
      secondaryCtaLabel: "Descargar PDF",
      pdfDownloads: [
        {
          href: "/images/japon/pdf/alma-de-japon.pdf",
          fileName: "alma-de-japon.pdf",
        },
      ],
      primaryCta: {
        label: "Quiero esta experiencia",
        target: "#form",
      },
    },
    includes: {
      srHeading: "Lo esencial de la experiencia premium",
      badgeText: "LO ESENCIAL",
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
          title: "Alojamiento seleccionado con criterio",
          description:
            "Opciones bien ubicadas, cómodas y alineadas con una experiencia de clase premium.",
          image: "/images/japon/6.1-estancias-con-caracter.webp",
        },
        {
          id: "transport",
          label: "II",
          title: "Traslados y conexiones bien resueltos",
          description:
            "Diseñamos recorridos con lógica. Organización clara de desplazamientos para aprovechar mejor el tiempo en destino.",
          image: "/images/japon/6.1-traslados-mejor-coordinados.webp",
        },
        {
          id: "culture",
          label: "III",
          title: "Experiencias privadas o seleccionadas",
          description:
            "Actividades con enfoque cultural, gastronómico, escénico o temático que permite conectar con la cultura japonesa.",
          image: "/images/japon/6.1-experiencias-culturales-curadas.webp",
        },
        {
          id: "gastronomy",
          label: "IV",
          title: "Gastronomía japonesa",
          description:
            "Experiencias locales cuidadosamente seleccionadas que forma parte central de un gran viaje por Japón.",
          image: "/images/japon/6.1-escenas-gastronomicas-seleccionadas.webp",
        },
        {
          id: "support",
          label: "V",
          title: "Acompañamiento en cada etapa",
          description:
            "Desde la planeación inicial hasta tu regreso, cuentas con seguimiento real y atención en español.",
          image: "/images/japon/6.1-acompañamiento-en-cada-etapa.webp",
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
            "Un viaje muy bonito con excelente mezcla de ciudades y pueblos. Hoteles en general muy buenos, destacando el ryokan de Hakone como el mejor.",
          name: "Familia Verduzco",
          location: "Ciudad de México",
          avatar: "/images/japon/testimonios/familia_verduzco.webp",
        },
        {
          id: 2,
          quote:
            "Gracias por todas las atenciones; fue una experiencia única. Todo perfecto: hoteles, transporte y guías, quienes hicieron el viaje sentir como entre amigos. Infinitamente agradecida.",
          name: "Carolina Grijalva",
          location: "Guadalajara",
          avatar: "/images/japon/testimonios/carolina_grijalva.webp",
        },
        {
          id: 3,
          quote:
            "Desde el primer contacto entendí que no era un viaje más. Todo estuvo pensado con muchísimo detalle y claridad. Sin duda, fue uno de los viajes más especiales que he vivido.",
          name: "Lilia Gordillo.",
          location: "Monterrey",
          avatar: "/images/japon/testimonios/lilia_gordillo.webp",
        },
        {
          id: 4,
          quote:
            "Cada parte del proyecto tenía sentido, desde las ciudades hasta las experiencias que vivimos. Fue un viaje que realmente disfruté de principio a fin y que superó completamente mis expectativas.",
          name: "Francesco A",
          location: "Ciudad de México",
          avatar: "/images/japon/testimonios/francesco.webp",
        },
        {
          id: 5,
          quote:
            "Revisaron cada detalle al organizar nuestro viaje a Japón, todo salió perfecto y lo disfrutamos mucho. De verdad muy agradecidos.",
          name: "Familia Arámbulo",
          location: "Lima, Perú",
          avatar: "/images/japon/testimonios/familia_arambulo.webp",
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
        "Japón Premium",
        "Momentos inolvidables",
        "Reales conexiones",
      ],
      role: "Directora Comercial - Japón PREMIUM",
      name: "Karina Sánchez",
      quote:
"Nuestra misión es diseñar viajes personalizados que crean vínculos reales. No acumulamos destinos, conectamos con ellos.",      quoteHighlight: "",
      image: {
        src: "/images/japon/karina.webp",
        alt: "Asesora de viaje Japón Premium",
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
      contactEmail: "reservaciones@viajespremium.com.mx",
      items: [...JAPAN_FAQS],
    },
    ctaForm: {
      srHeading: "Formulario de contacto Japón Premium",
      sectionTitle: "Última oportunidad",
      sectionTitleHighlightWord: "oportunidad",
      sectionSubtitle:
"Completa tus datos y da el primer paso hacia tu viaje a Japón, diseñado a tu medida por Japón PREMIUM.",
      backgroundImage: "/images/japon/samuraiForm.webp",
      shojiBaseImage: "/images/japon/basePuertas2.webp",
      shojiLeftImage: "/images/japon/puertaIzquierda.webp",
      shojiRightImage: "/images/japon/puertaDerecha.webp",
      formTheme: "terra",
      formConfig: {
        eyebrow: "",
        title: "",
        subtitle: "",
        submitLabel: "Solicita tu propuesta",
        contactEmail: "reservaciones@viajespremium.com.mx",
        contactPhoneDisplay: "+52 55 4161 9428",
        contactPhoneLink: "+525541619428",
        experienceOptions: [
          { label: "Alma de Japón — Espiritual y de bienestar", value: "alma-de-japon" },
          { label: "Japón Pop — Anime, tecnología y cultura pop", value: "japon-pop" },
          { label: "El Camino del Shogun — Auténtico y cultural", value: "camino-del-shogun" },
          { label: "Otro", value: "otro" },
        ],
      },
    },
    marquee: {
      srHeading: "Alianzas de Japón Premium",
      badgeText: "Nuestras alianzas",
      introLeftLogo: {
        src: "/logos/japon/jp-blanco.svg",
        alt: "Japón Premium",
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
          alt: "Japón Premium",
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
          alt: "Japón Grande",
          width: 540,
          height: 120,
        },
        {
          src: "/images/japon/marquee-logos/25.png",
          alt: "Logo Japón",
          width: 380,
          height: 110,
        },
      ],
    },
    footer: {
      srHeading: "Footer Japón Premium",
      logoWord: "JAPÓN",
      samuraiImage: "/images/japon/hero/samuraiHero.webp",
      brandLogo: "/logos/japon/japon-grande-logo.png",
      address:
        "Cda. de Omega 306, Romero de Terreros, Coyoacán, 04310 Ciudad de México, CDMX",
      mapEmbedTitle: "Ubicación Japón Premium",
      contactEmail: "reservaciones@viajespremium.com.mx",
      contactPhoneDisplay: "+52 55 4161 9428",
      contactPhoneLink: "+525541619428",
      pageLinks: [
        { label: "Inicio", href: "#inicio" },
        { label: "Nosotros", href: "#nosotros" },
        { label: "Itinerarios", href: "#itinerarios" },
        { label: "Qué Incluye", href: "#includes" },
        { label: "Opiniones", href: "#testimonials" },
        { label: "Sobre Japón", href: "#faqs" },
        { label: "Contacto", href: "#form" },
      ],
      socialLinks: [
        { label: "TikTok", href: "https://www.tiktok.com/@viajespremium" },
        { label: "Instagram", href: "https://www.instagram.com/viajespremium.oficial" },
        { label: "Youtube", href: "https://www.youtube.com/@viajespremiumelevatuvida" },
        { label: "Facebook", href: "https://www.facebook.com/turismosantafeoficial" },
      ],
      copyrightText:
        "Todas las marcas y servicios que se ofrecen son propiedad de Japón PREMIUM® Consulte Términos y Condiciones en el Contrato de Adhesión ante PROFECO con número 7735-2015 & 7180-2015",
      backToTopLabel: "Volver al inicio",
      legalLinks: [
        { label: "AVISO DE PRIVACIDAD", href: "/japon-premium/aviso-de-privacidad" },
      ],
    },
  },
};
