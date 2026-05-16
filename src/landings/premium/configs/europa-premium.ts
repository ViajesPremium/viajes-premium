import type { PremiumLandingConfig } from "@/landings/premium/types";

const EUROPA_MENU_ITEMS = [
  { label: "Inicio", ariaLabel: "Ir al inicio", link: "#inicio" },
  { label: "Highlights", ariaLabel: "Ir a highlights", link: "#highlights" },
  { label: "Itinerarios", ariaLabel: "Ir a itinerarios", link: "#itinerarios" },
  { label: "Incluye", ariaLabel: "Ir a lo que incluye", link: "#includes" },
  { label: "Testimonios", ariaLabel: "Ir a testimonios", link: "#testimonials" },
  { label: "FAQs", ariaLabel: "Ir a preguntas frecuentes", link: "#faqs" },
  { label: "Contacto", ariaLabel: "Ir al formulario", link: "#form" },
] as const;

const EUROPA_FAQS = [
  {
    id: "1",
    question: "¿Cual es la mejor epoca para viajar a Europa?",
    answer:
      "La mejor epoca para viajar a Europa depende del tipo de experiencia que buscas y de las ciudades que quieras recorrer. Primavera y otono suelen ofrecer un equilibrio ideal entre clima, paisajes y ritmo de viaje.",
  },
  {
    id: "2",
    question: "¿Cuantos dias se recomiendan para recorrer Europa?",
    answer:
      "Se recomienda viajar entre 10 y 20 dias para conocer varias ciudades europeas con mayor tranquilidad. La duracion ideal depende del ritmo del viaje y de los paises que se quieran visitar.",
  },
  {
    id: "3",
    question: "¿Es complicado organizar un viaje por Europa?",
    answer:
      "No, recorrer Europa puede ser muy comodo cuando el viaje esta bien planificado. La coordinacion entre ciudades, trenes, vuelos y recorridos hace una gran diferencia en la experiencia.",
  },
  {
    id: "4",
    question: "¿Que ciudades son imprescindibles en un primer viaje a Europa?",
    answer:
      "Ciudades como Paris, Roma, Londres, Amsterdam y Venecia suelen formar parte de los recorridos mas buscados por quienes visitan Europa por primera vez. Cada una ofrece historia, arquitectura y experiencias que representan la esencia del continente.",
  },
  {
    id: "5",
    question: "¿Es seguro viajar a Europa?",
    answer:
      "Si, Europa es uno de los destinos mas recorridos del mundo y cuenta con infraestructura muy desarrollada para viajeros internacionales. Una buena organizacion permite disfrutar cada ciudad con mayor tranquilidad y claridad.",
  },
  {
    id: "6",
    question: "¿Es mejor recorrer Europa en tren o en avion?",
    answer:
      "Depende de las ciudades y distancias del recorrido. Europa cuenta con conexiones eficientes tanto en tren como en avion, lo que permite optimizar tiempos y mejorar la experiencia del viaje.",
  },
  {
    id: "7",
    question: "¿Que tipo de experiencias gastronomicas ofrece Europa?",
    answer:
      "Europa ofrece una enorme diversidad gastronomica entre cocina italiana, francesa, espanola y especialidades regionales de cada pais. La gastronomia suele convertirse en una parte esencial del recorrido.",
  },
  {
    id: "8",
    question: "¿Que incluye normalmente un viaje por Europa?",
    answer:
      "Un viaje por Europa suele incluir alojamiento, traslados entre ciudades y experiencias disenadas para aprovechar mejor cada destino. La organizacion del recorrido es clave para disfrutar el continente con mayor comodidad y claridad.",
  },
] as const;

export const europaPremiumLandingConfig: PremiumLandingConfig = {
  id: "europa-premium",
  routePath: "/europa-premium",
  metadata: {
    title: "Europa Premium",
    description: "Europa Premium",
    keywords: ["Japon Premium", "Viajes Premium"],
    canonicalPath: "/japon-premium",
    ogImagePath: "/japon-premium/og-image.jpg",
    locale: "es_MX",
  },
  theme: {
    primary: "#511E62",
    secondary: "#882BAC",
    complementary: "#2A1A6E",
    yellow: "#ffa8cbff",
    background: "#f3f3f0",
    black: "#16181b",
    white: "#f3f3f0",
  },
  navbar: {
    logoUrl: "/logos/europa/logo-europa.svg",
    menuItems: [...EUROPA_MENU_ITEMS],
    colors: ["var(--primary-europa)", "var(--secondary-europa)"],
    accentColor: "var(--primary-europa)",
    menuButtonColor: "#ffffff",
    openMenuButtonColor: "#16181b",
  },
  sections: {
    hero: {
      seoHeading: "Viaja a Europa desde México",
      title: {
        line1Lead: "Viaja a",
        line1Focus: "Europa",
        line2Lead: "desde",
        line2Focus: "México",
      },
      mobileTitle: {
        line1Lead: "Viaja a",
        line1Focus: "Europa",
        line2Lead: "Desde",
        line2Focus: "México",
      },
      descriptionLines: [
        {
          text: "Eleva tu vida conociendo Europa con profundidad y acompañamiento desde el primer contacto hasta su regreso. Atención personalizada, planeación detallada y soporte de inicio a fin.",
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
        baseImage: "/images/europa/hero/mujer2.avif",
        samuraiImage: "/images/europa/hero/hombre3.avif",
        baseAlt: "Hero Europa Premium",
        samuraiAlt: "Figura Europa Premium",
      },
    },
    aboutUs: {
      srHeading: "Nosotros Europa Premium",
      badgeText: "Nosotros",
      titleText: "Más de 21 años diseñando experiencias PREMIUM",
      titleHighlightWords: ["21 años", "PREMIUM"],
      cards: [
        {
          image: "/images/europa/nosotros/itinerario-gala.avif",
          text: "Europa de Gala",
          experiences: "12 días · Francia · Alemania · Austria · Italia",
          wide: false,
        },
        {
          image: "/images/europa/nosotros/itinerario-maravillas.avif",
          text: "Maravillas de Europa",
          experiences: "12 días · España · Francia · Bélgica · Países Bajos",
          wide: false,
        },
        {
          image: "/images/europa/nosotros/itinerario-reserva.avif",
          text: "Gran Reserva",
          experiences: "16 días · Francia · Inglaterra · Países Bajos · Italia",
          wide: false,
        },
      ],
      cardButtonLabel: "Descubrir",
      cardButtonTarget: "#itinerarios",
    },
    firstForm: {
      srHeading: "Cuentanos como imaginas tu viaje a Europa",
      sectionTitle: "Propuesta personalizada",
      sectionTitleHighlightWord: "personalizada",
      sectionSubtitle:
        "Cuentanos como imaginas tu viaje a Europa, compartenos tus intereses y te ayudaremos a identificar cual de nuestros 3 itinerarios se adapta mejor a tu estilo de viaje.",
      backgroundImage: "/images/europa/geishaForm.webp",
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
    srHeading: "Highlights de Barrancas Premium",
      badgeText: "¿Por qué Barrancas PREMIUM?",
      kickerTop: "Trabajamos con marcas",
      kickerBottom: "cuidadosamente seleccionadas.",
      line1: {
        lead: "Viaja por",
        bracket: {
          label: "Londres",
          imageSrc: "/images/europa/porque/hover/hover-londres.webp",
          imageAlt: "Recorrido escenico en Chepe Express",
          textTone: "ot",
        },
        tail: "con Calma",
      },
      line2: {
        text: "Mientras",
        highlightWord: "Italia",
        bracket: {
          label: "ITALIA",
          imageSrc: "/images/europa/porque/hover/hover-italia.webp",
          imageAlt: "Paisaje de la Sierra Tarahumara",
          textTone: "epochal",
        },
        tail: "revelan su",
      },
      line3: {
        lead: "Esencia y el",
        bracket: {
          label: "Paris",
          imageSrc: "/images/europa/porque/hover/hover-paris.webp",
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
          id: "kyoto-privado",
          title: "Recorridos disenados con mas criterio",
          description:
            "Cada itinerario se estructura para dar mas sentido, ritmo y calidad al viaje.",
          meta: "Cultura",
          imageSrc: "/images/europa/porque/valor/carrusel-recorridos.webp",
          href: "#form",
        },
        {
          id: "tokyo-nocturno",
          title: "Acompanamiento personalizado",
          description:
            "Atencion cercana antes, durante y despues de su experiencia en Europa.",
          meta: "Urbano",
          imageSrc: "/images/europa/porque/valor/carrusel-acompanamiento.webp",
          href: "#form",
        },
        {
          id: "sabores-omakase",
          title: "Respaldo 24/7",
          description:
            "Soporte continuo para viajar con tranquilidad de principio a fin.",
          meta: "Gastronomia",
          imageSrc: "/images/europa/porque/valor/carrusel-respaldo.webp",
          href: "#form",
        },
        {
          id: "onsen-premium",
          title: "Estancias a la altura del viaje",
          description:
            "Seleccionadas por su caracter, ubicacion y nivel de servicio.",
          meta: "Bienestar",
          imageSrc: "/images/europa/porque/valor/carrusel-estancias.webp",
          href: "#form",
        },
        {
          id: "paisajes-iconicos",
          title: "Expertos que hablan su idioma",
          description:
            "Guias en espanol para vivir Europa con mas claridad y profundidad.",
          meta: "Naturaleza",
          imageSrc: "/images/europa/porque/valor/carrusel-expertos.webp",
          href: "#form",
        },
        {
          id: "experiencia-ryokan",
          title: "Tranquilidad de principio a fin",
          description:
            "Cada detalle se cuida para que usted viaje con mas confianza y respaldo.",
          meta: "Tradicion",
          imageSrc: "/images/europa/porque/valor/carrusel-tranquilidad.webp",
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
          day: "12 dias · Francia · Alemania · Austria · Italia",
          title: "Europa de Gala",
          description:
            "Un recorrido por la Europa mas iconica entre ciudades historicas, paisajes escenicos y las experiencias mas representativas del continente.",
          ideal:
            "Ideal para quienes buscan descubrir Europa por primera vez en una experiencia clasica y cuidadosamente disenada.",
          image1: "/images/europa/itinerarios/izquierda/scroll-gala-izquierda.avif",
          image2: "/images/europa/itinerarios/derecha/scroll-gala-derecha.avif",
          price: "Desde $4,990 USD base doble",
        },
        {
          id: 2,
          day: "12 dias · Espana · Francia · Belgica · Paises Bajos",
          title: "Maravillas de Europa",
          description:
            "Un recorrido por ciudades historicas, arquitectura emblematica y algunos de los paisajes urbanos mas representativos de Europa occidental.",
          ideal:
            "Viajeros que buscan descubrir Europa entre cultura, historia y ciudades llenas de identidad y tradicion.",
          image1: "/images/europa/itinerarios/izquierda/scroll-maravillas-izquierda.avif",
          image2: "/images/europa/itinerarios/derecha/scroll-maravillas-derecha.avif",
          price: "Desde $4,590 USD base doble",
        },
        {
          id: 3,
          day: "16 dias · Francia · Inglaterra · Paises Bajos · Italia",
          title: "Gran Reserva",
          description:
            "Un recorrido por la Europa mas emblematica entre capitales historicas, pueblos escenicos y experiencias que representan la grandeza del continente.",
          ideal:
            "Viajeros que buscan conocer las ciudades mas iconicas de Europa en una experiencia amplia y cuidadosamente disenada.",
          image1: "/images/europa/itinerarios/izquierda/scroll-reserva-izquierda.avif",
          image2: "/images/europa/itinerarios/derecha/scroll-reserva-derecha.avif",
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
            "Hoteles y estancias elegidas por ubicación y comodidad, para descansar bien después de cada experiencia en ciudades y recorridos por Europa.",
          image: "/images/europa/incluye/experiencia-alojamiento.webp",
        },
        {
          id: "transport",
          label: "II",
          title: "Traslados y conexiones bien resueltos",
          description:
            "Diseñamos recorridos con lógica. Organización clara de desplazamientos para aprovechar mejor el tiempo en destino.",
          image: "/images/europa/incluye/experiencia-traslado.webp",
        },
        {
          id: "culture",
          label: "III",
          title: "Experiencias privadas o seleccionadas",
          description:
            "Actividades elegidas con intención: recorridos históricos, experiencias culturales y momentos diseñados para conectar con la esencia de Europa",
          image: "/images/europa/incluye/experiencia-privacidad.webp",
        },
        {
          id: "gastronomy",
          label: "IV",
          title: "Gastronomía europea",
          description:
            "Experiencias culinarias que forman parte central del viaje: cocina tradicional, restaurantes seleccionados y sabores que definen la identidad europea.",
          image: "/images/europa/incluye/experiencia-gastronomia.webp",
        },
        {
          id: "support",
          label: "V",
          title: "Acompanamiento en cada etapa",
          description:
            "Atencion en español antes y durante el viaje para acompanarle con claridad y resolver cada detalle.",
          image: "/images/europa/incluye/experiencia-acompanamiento.webp",
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
            "Un viaje planeado por mucho tiempo que supero mis expectativas: hospedaje de gran calidad, guias bien capacitados durante todo el recorrido.",
          name: "Virginia Cardenas",
          location: "Ciudad de Mexico",
          avatar: "/images/europa/testimonios/virginia-cardenas.jpeg",
        },
        {
          id: 2,
          quote:
            "Todo el viaje fue excelente, hoteles, servicios, tours, guias y horarios.",
          name: "Dr. Abel Pena",
          location: "Ciudad de Mexico",
          avatar: "/images/europa/testimonios/dr-abiel-pena.jpeg",
        },
        {
          id: 3,
          quote:
            "Me encanto la atencion brindada, siempre resolviendo mis dudas. Mi viaje fue la mejor experiencia siendo la primera vez en europa.",
          name: "Tania Perez",
          location: "Ciudad de Mexico",
          avatar: "/images/europa/testimonios/tania-perez.webp",
        },
        {
          id: 4,
          quote:
            "Europa se vivio diferente gracias a la organizacion y claridad del viaje. Disfrutamos cada ciudad sin preocuparnos por nada.",
          name: "Ignacio y Maria",
          location: "Monterrey",
          avatar: "/images/europa/testimonios/ignacio-y-maria.jpg",
        },
        {
          id: 5,
          quote:
            "El recorrido por Europa estuvo perfectamente planeado. Cada ciudad, traslado y experiencia se sintieron cuidados desde el primer dia.",
          name: "Diego Sevilla",
          location: "Ciudad de Mexico",
          avatar: "/images/europa/testimonios/diego-sevilla.jpg",
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
        "curaduria atencion precision",
        "momentos que si importan",
      ],
      role: "Directora Comercial",
      name: "Karina Sanchez",
      quote:
        "Nuestra mision es disenar experiencias personalizadas para que conectes emocionalmente con tu viaje. Creemos que viajar va mas alla de acumular destinos; se trata de crear vinculos reales con cada lugar.",
      quoteHighlight:
        "viajar va mas alla de acumular destinos; se trata de crear vinculos reales con cada lugar.",
      image: {
        src: "/images/japon/karina.webp",
        alt: "Asesora de viaje Japon Premium",
      },
    },
    faqs: {
      srHeading: "Preguntas frecuentes sobre Japon Premium",
      accordionAriaLabel: "Preguntas frecuentes",
      badgeText: "Preguntas frecuentes",
      title: "Todo lo que necesitas saber",
      subtitle:
        "Resolvemos las dudas más comunes sobre nuestros viajes a Europa. Si no encuentras lo que buscas, escríbenos directamente.",
      contactLabel: "¿Otra pregunta?",
      contactEmail: "hola@perupremium.com",
      items: [...EUROPA_FAQS],
    },
    ctaForm: {
      srHeading: "Formulario de contacto Peru Premium",
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
      srHeading: "Footer Europa Premium",
      logoWord: "EUROPA",
      samuraiImage: "/images/japon/hero/samuraiHero.webp",
      brandLogo: "/logos/europa/europa-grande-logo.png",
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
        "© 2026 Viaja a Japon Premium. Todos los derechos reservados.",
      backToTopLabel: "Volver al inicio",
      legalLinks: [
        { label: "PRIVACIDAD", href: "#" },
        { label: "TERMINOS", href: "#" },
      ],
    },
  },
};





