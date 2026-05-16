import type { PremiumLandingConfig } from "@/landings/premium/types";

const CANADA_MENU_ITEMS = [
  { label: "Inicio", ariaLabel: "Ir al inicio", link: "#inicio" },
  { label: "Highlights", ariaLabel: "Ir a highlights", link: "#highlights" },
  { label: "Itinerarios", ariaLabel: "Ir a itinerarios", link: "#itinerarios" },
  { label: "Incluye", ariaLabel: "Ir a lo que incluye", link: "#includes" },
  { label: "Testimonios", ariaLabel: "Ir a testimonios", link: "#testimonials" },
  { label: "FAQs", ariaLabel: "Ir a preguntas frecuentes", link: "#faqs" },
  { label: "Contacto", ariaLabel: "Ir al formulario", link: "#form" },
] as const;

const CANADA_FAQS = [
  {
    id: "1",
    question: "¿Peru es un destino complicado para viajar?",
    answer:
      "No, Peru no es un destino complicado si esta bien planificado. Aunque el idioma y la logistica pueden parecer desafiantes al inicio, el pais es seguro, ordenado y facil de recorrer. Cuando el viaje esta bien estructurado, todo fluye con mayor claridad. En Peru Premium cuidamos ese proceso para que la experiencia se viva sin friccion.",
  },
  {
    id: "2",
    question: "¿Se puede viajar a Peru sin hablar espanol?",
    answer:
      "Si, es posible viajar a Peru sin hablar espanol. En ciudades como Lima o Cusco hay senalizacion clara y servicios pensados para viajeros internacionales. Aun asi, saber como moverse y que decisiones tomar marca la diferencia en la experiencia por eso nuestros guias hablan espanol para que no te preocupes por el idioma.",
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

export const canadaPremiumLandingConfig: PremiumLandingConfig = {
  id: "canada-premium",
  routePath: "/canada-premium",
  metadata: {
    title: "Canada Premium",
    description: "Canada Premium",
    keywords: ["Japon Premium", "Viajes Premium"],
    canonicalPath: "/japon-premium",
    ogImagePath: "/japon-premium/og-image.jpg",
    locale: "es_MX",
  },
  theme: {
    primary: "#9E1F1E",
    secondary: "#377AA8",
    complementary: "#ABA639",
    yellow: "#f2cd5e",
    background: "#f3f3f0",
    black: "#16181b",
    white: "#f3f3f0",
  },
  navbar: {
    logoUrl: "/logos/jp-negro.svg",
    menuItems: [...CANADA_MENU_ITEMS],
    colors: ["var(--primary-canada)", "var(--secondary-canada)"],
    accentColor: "var(--primary-canada)",
    menuButtonColor: "#ffffff",
    openMenuButtonColor: "#16181b",
  },
  sections: {
    hero: {
      seoHeading: "Viaja a Canadá desde México",
      title: {
        line1Lead: "Viaja a",
        line1Focus: "Canadá",
        line2Lead: "desde",
        line2Focus: "México",
      },
      mobileTitle: {
        line1Lead: "Viaja a",
        line1Focus: "Canadá",
        line2Lead: "Desde",
        line2Focus: "México",
      },
      descriptionLines: [
        {
          text: "Eleva tu vida con una forma mas cuidada de vivir Canadá.",
        },
        {
          text: "para quienes valoran atención personal, criterio y una forma mas cuidada de vivir Canadá.",
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
      srHeading: "Snapshot de Canada Premium",
      badgeText: "Nosotros",
      titleText: "Más de 21 años diseñando experiencias PREMIUM.",
      titleHighlightWords: ["21", "PREMIUM", "años"],
      cards: [
        {
          image: "/images/canada/nosotros/itinerario-original.webp",
          text: "Canadá Original",
          experiences: "8 días - Toronto - Niagara - Quebec - Montreal",

          wide: false,
        },
        {
          image: "/images/canada/nosotros/itinerario-rocosa.webp",
          text: "Rocosas y Vancouver",
          experiences: "8 días - Calgary - Banff - Lake Louise - Vancouver",

          wide: false,
        },
        {
          image: "/images/canada/nosotros/itinerario-invierno.webp",
          text: "Sueños de invierno",
          experiences: "7 días - Norte de Canadá - Paisajes nevados - Auroras boreales",

          wide: false,
        },
      ],
      cardButtonLabel: "Descubrir",
      cardButtonTarget: "#itinerarios",
    },
    firstForm: {
      srHeading: "Cuentanos como imaginas tu viaje a Japon",
      sectionTitle: "Propuesta personalizada",
      sectionTitleHighlightWord: "personalizada",
      sectionSubtitle:
        "Cuentanos como imaginas tu viaje a Japon, compartenos tus intereses y te ayudaremos a identificar cual de nuestros 3 itinerarios se adapta mejor a tu estilo de viaje.",
      backgroundImage: "/images/japon/geishaForm.webp",
      mobileImage: {
        src: "/images/japon/geishaFormSola2.webp",
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
      },
    },
    choose: {
      srHeading: "Highlights de Japon Premium",
      badgeText: "¿Por que Japon Premium?",
      kickerTop: "Trabajamos con marcas",
      kickerBottom: "Cuidadosamente seleccionadas.",
      line1: {
        lead: "TE LLEVAMOS",
        bracket: {
          label: "OSAKA",
          imageSrc: "/images/canada/porque/hover/toronto.webp",
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
          imageSrc: "/images/canada/porque/hover/quebec.webp",
          imageAlt: "Escena tradicional de Kioto",
          textTone: "epochal",
        },
        tail: "CON",
      },
      line3: {
        lead: "EL RESPALDO",
        bracket: {
          label: "VANCOUVER",
          imageSrc: "/images/canada/porque/hover/ottawa.webp",
          imageAlt: "Paisaje iconico de Vancouver",
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
          id: "recorridos",
          title: "Recorridos diseñados con más criterio",
          description:
            "Cada itinerario se estructura para dar más sentido, ritmo y calidad al viaje.",
          meta: "Cultura",
          imageSrc: "/images/canada/porque/valor/carrusel-recorridos.webp",
          href: "#form",
        },
        {
          id: "acompanamiento",
          title: "Acompañamiento personalizado",
          description:
            "Atención cercana antes, durante y después de su experiencia en Europa.",
          meta: "Urbano",
          imageSrc: "/images/canada/porque/valor/carrusel-acompañamiento.webp",
          href: "#form",
        },
        {
          id: "sabores-omakase",
          title: "Respaldo 24/7",
          description:
            "Soporte continuo para viajar con tranquilidad de principio a fin.",
          meta: "Gastronomia",
          imageSrc: "/images/canada/porque/valor/carrusel-respaldo.webp",
          href: "#form",
        },
        {
          id: "onsen-premium",
          title: "Estancias a la altura del viaje",
          description:
            "Seleccionadas por su carácter, ubicación y nivel de servicio.",
          meta: "Bienestar",
          imageSrc: "/images/canada/porque/valor/carrusel-estancia.webp",
          href: "#form",
        },
        {
          id: "paisajes-iconicos",
          title: "Expertos que hablan su idioma",
          description:
            "Guías en español para vivir Canada con más claridad y profundidad.",
          meta: "Naturaleza",
          imageSrc: "/images/canada/porque/valor/carrusel-expertos.webp",
          href: "#form",
        },
        {
          id: "experiencia-ryokan",
          title: "Tranquilidad de principio a fin",
          description:
            "Cada detalle se cuida para que usted viaje con mas confianza y respaldo.",
          meta: "Tradicion",
          imageSrc: "/images/canada/porque/valor/carrusel-tranquilidad.webp",
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
      srHeading: "Itinerarios de Japon Premium",
      topTabText: "Itinerario Premium",
      items: [
        {
          id: 1,
          day: "8 días - Toronto - Niagara - Quebec - Montreal",
          title: "Canadá Original",
          description:
            "Un recorrido por el este de Canadá entre ciudades históricas, paisajes icónicos y algunas de las experiencias más representativas del país.",
          ideal:
            "Viajeros que desean descubrir Canadá por primera vez en una experiencia equilibrada y cuidadosamente diseñada.",
          image1: "/images/canada/itinerarios/izquierda/scroll-original-izquierda.avif",
          image2: "/images/canada/itinerarios/derecha/scroll-original-derecha.avif",
          price: "Desde $4,990 USD base doble",
        },
        {
          id: 2,
          day: "8 días - Calgary - Banff - Lake Louise - Vancouver",
          title: "Rocosas y Vancouver",
          description:
            "Un recorrido por el oeste de Canadá, visitando las Rocosas Canadienses entre lagos turquesa, montañas imponentes y lo más impresionante de Canadá.",
          ideal:
            "Viajeros que buscan paisajes naturales, rutas panor?micas y experiencias profundamente conectadas con la naturaleza canadiense.",
          image1: "/images/canada/itinerarios/izquierda/scroll-rocosas-izquierda.avif",
          image2: "/images/canada/itinerarios/derecha/scroll-rocosas-derecha.avif",
          price: "Desde $4,590 USD base doble",
        },
        {
          id: 3,
          day: "7 días - Norte de Canadá - Paisajes nevados - Auroras boreales",
          title: "Sueños de invierno",
          description:
            "Una experiencia diseñada para descubrir el invierno canadiense entre paisajes nevados y la posibilidad de observar auroras boreales en el norte de Canadá.",
          ideal:
            "Viajeros que buscan vivir una experiencia invernal única y contemplar uno de los fenómenos naturales más impresionantes del mundo.",
          image1: "/images/canada/itinerarios/izquierda/scroll-invierno-izquierda.avif",
          image2: "/images/canada/itinerarios/derecha/scroll-invierno-derecha.avif",
          price: "Desde $5,290 USD base doble",
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
          title: "Alojamiento seleccionado con criterio",
          description:
            "Hoteles y estancias elegidas por ubicación y comodidad, para descansar bien después de cada experiencia en ciudades y paisajes de Canadá.",
          image: "/images/canada/incluye/experiencia-alojamiento.webp",
        },
        {
          id: "transport",
          label: "II",
          title: "Traslados y conexiones bien resueltos",
          description:
            "Dise?amos recorridos con lógica. Organización clara de desplazamientos para aprovechar mejor el tiempo en destino.",
          image: "/images/canada/incluye/experiencia-traslado.webp",
        },
        {
          id: "culture",
          label: "III",
          title: "Experiencias privadas o seleccionadas",
          description:
            "Actividades elegidas con intención: naturaleza, ciudades icúnicas y momentos diseñados para conectar con la esencia de Canadá.",
          image: "/images/canada/incluye/experiencia-privacidad.webp",
        },
        {
          id: "gastronomy",
          label: "IV",
          title: "Gastronomía canadiense",
          description:
            "Experiencias culinarias que forman parte central del viaje: sabores locales, restaurantes seleccionados y propuestas que reflejan la identidad canadiense.",
          image: "/images/canada/incluye/experiencia-gastronomía.webp",
        },
        {
          id: "support",
          label: "V",
          title: "Acompañamiento en cada etapa",
          description:
            "Desde la planeación inicial hasta tu regreso, cuentas con seguimiento real y atención en español.",
          image: "/images/canada/incluye/experiencia-acompañamiento.webp",
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
            "No cabe en mi corazón tanta felicidad. Buen servicio Canada Premium.",
          name: "Ana Gladys",
          location: "Monterrey",
          avatar: "/images/canada/testimonios/ana-gladys.webp",
        },
        {
          id: 2,
          quote:
            "Padrísimo viaje en compañía de mi familia, gracias por todo y felicidades Canada Premium.",
          name: "Fernanda Tapia",
          location: "Ciudad de México",
          avatar: "/images/canada/testimonios/fernanda-tapia.webp",
        },
        {
          id: 3,
          quote:
            "Canadá superó completamente nuestras expectativas. Todo estuvo perfectamente organizado por Canadá Premium.",
          name: "Irma Bedolla",
          location: "Ciudad de México",
          avatar: "/images/canada/testimonios/irma-bedolla.webp",
        },
        {
          id: 4,
          quote:
            "Las auroras boreales superaron cualquier expectativa, todo estuvo perfectamente organizado. Sin duda, un viaje de nivel premium.",
          name: "Sofía Aguirre",
          location: "Guadalajara",
          avatar: "/images/canada/testimonios/sofia-aguirre.webp",
        },
        {
          id: 5,
          quote:
            "Fue una experiencia increíble. Vivir la nieve, conocer Canadá y viajar con mi familia hizo que mis XV años fueran inolvidables.",
          name: "Valeria Robles",
          location: "Ciudad de México",
          avatar: "/images/canada/testimonios/valeria-robles.webp",
        },
      ],
      cta: {
        label: "Solicita tu propuesta",
        target: "#form",
      },
    },
    interlude: {
      srHeading: "Mensaje del equipo Japon Premium",
      rows: [
        "japon premium experience",
        "curaduria atención precision",
        "momentos que si importan",
      ],
      role: "Directora Comercial",
      name: "Karina Sanchez",
      quote:
        "Nuestra mision es disenar experiencias personalizadas para que conectes emocionalmente con tu viaje. Creemos que viajar va mas alla de acumular destinos; se trata de crear vinculos reales con cada lugar.",
      quoteHighlight:
        "viajar va mas alla de acumular destinos; se trata de crear vinculos reales con cada lugar.",
      image: {
        src: "/images/canada/itinerarios/izquierda/scroll-rocosas-izquierda.webp",
        alt: "Asesora de viaje Japon Premium",
      },
    },
    faqs: {
      srHeading: "Preguntas frecuentes sobre Japon Premium",
      accordionAriaLabel: "Preguntas frecuentes",
      badgeText: "Preguntas frecuentes",
      title: "Todo lo que necesitas saber",
      subtitle:
        "Resolvemos las dudas mas comunes sobre nuestros viajes a Peru. Si no encuentras lo que buscas, escribenos directamente.",
      contactLabel: "¿Otra pregunta?",
      contactEmail: "hola@perupremium.com",
      items: [...CANADA_FAQS],
    },
    ctaForm: {
      srHeading: "Formulario de contacto Peru Premium",
      backgroundImage: "/images/canada/itinerarios/izquierda/scroll-original-izquierda.webp",
      shojiBaseImage: "/images/canada/itinerarios/derecha/scroll-original-derecha.webp",
      shojiLeftImage: "/images/canada/itinerarios/izquierda/scroll-invierno-izquierda.webp",
      shojiRightImage: "/images/canada/itinerarios/derecha/scroll-rocosas-derecha.webp",
      formTheme: "light",
      formConfig: {
        eyebrow: "",
        title: "",
        subtitle: "",
        submitLabel: "",
        contactEmail: "hola@japonpremium.com",
        contactPhoneDisplay: "+52 55 1234 5678",
        contactPhoneLink: "+525512345678",
      },
    },
    marquee: {
      srHeading: "Alianzas de Japon Premium",
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
          src: "/logos/japon-grande-logo.png",
          alt: "Japon Premium",
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
          alt: "Japon Grande",
          width: 540,
          height: 120,
        },
        {
          src: "/logos/japon-grande-logo.png",
          alt: "Logo Japon",
          width: 380,
          height: 110,
        },
      ],
    },
    footer: {
      srHeading: "Footer Canadá Premium",
      logoWord: "CANAD?",
      samuraiImage: "/images/canada/itinerarios/derecha/scroll-invierno-derecha.webp",
      brandLogo: "/logos/canada/canada-grande-logo.png",
      address:
        "Cda. de Omega 306, Romero de Terreros, Coyoacan, 04310 Ciudad de Mexico, CDMX",
      mapEmbedTitle: "Ubicacion Japon Premium",
      contactEmail: "hola@japonpremium.com",
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
        "¿ 2026 Viaja a Japon Premium. Todos los derechos reservados.",
      backToTopLabel: "Volver al inicio",
      legalLinks: [
        { label: "PRIVACIDAD", href: "#" },
        { label: "TERMINOS", href: "#" },
      ],
    },
  },
};








