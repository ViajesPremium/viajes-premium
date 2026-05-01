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
    question: "Â¿Peru es un destino complicado para viajar?",
    answer:
      "No, Peru no es un destino complicado si esta bien planificado. Aunque el idioma y la logistica pueden parecer desafiantes al inicio, el pais es seguro, ordenado y facil de recorrer. Cuando el viaje esta bien estructurado, todo fluye con mayor claridad. En Peru Premium cuidamos ese proceso para que la experiencia se viva sin friccion.",
  },
  {
    id: "2",
    question: "Â¿Se puede viajar a Peru sin hablar espanol?",
    answer:
      "Si, es posible viajar a Peru sin hablar espanol. En ciudades como Lima o Cusco hay senalizacion clara y servicios pensados para viajeros internacionales. Aun asi, saber como moverse y que decisiones tomar marca la diferencia en la experiencia por eso nuestros guias hablan espanol para que no te preocupes por el idioma.",
  },
  {
    id: "3",
    question: "Â¿Cuantos dias se recomiendan para viajar a Japon?",
    answer:
      "Se recomienda viajar entre 10 y 15 dias para conocer Japon con mayor profundidad. Este tiempo permite recorrer varias ciudades y equilibrar cultura, gastronomia y experiencias. La duracion ideal depende del ritmo del viajero y del tipo de experiencia que quiera construir.",
  },
  {
    id: "4",
    question: "Â¿Cual es la mejor temporada para viajar a Japon?",
    answer:
      "No hay una unica mejor temporada, depende del tipo de experiencia que buscas. Primavera (Sakuras) y otono (Momiji) son muy populares por sus paisajes, pero tambien hay epocas con menos afluencia que permiten disfrutar Japon con mayor tranquilidad.",
  },
  {
    id: "5",
    question: "Â¿Es seguro viajar a Japon?",
    answer:
      "Si, Japon es uno de los paises mas seguros del mundo. Se puede viajar con tranquilidad tanto en grandes ciudades como en zonas mas tradicionales. Esa seguridad se aprovecha mucho mas cuando el viaje esta bien organizado y cada detalle esta pensado.",
  },
  {
    id: "6",
    question: "Â¿Que tipo de experiencias se pueden vivir en Japon?",
    answer:
      "Japon ofrece una combinacion unica de cultura, gastronomia, tradicion, tecnologia y naturaleza. Se pueden recorrer ciudades modernas, templos historicos y paisajes muy distintos en un mismo viaje. En Japon Premium disenamos cada proyecto para integrar estos contrastes de forma coherente.",
  },
  {
    id: "7",
    question: "Â¿Es facil moverse dentro de Japon?",
    answer:
      "Si, moverse dentro de Japon es facil gracias a su sistema de transporte eficiente y puntual. Los trenes y conexiones permiten recorrer el pais de forma organizada y comoda.",
  },
  {
    id: "8",
    question:
      "Â¿Japon es un destino recomendable para viajar en pareja o en familia?",
    answer:
      "Si, Japon es un destino ideal tanto para viajar en pareja como en familia ya que hay diversos parques de diversiones y experiencias que se disfrutan en compania. La clave esta en disenar el recorrido segun el tipo de experiencia que se quiere vivir.",
  },
] as const;

export const peruPremiumLandingConfig: PremiumLandingConfig = {
  id: "peru-premium",
  routePath: "/peru-premium",
  metadata: {
    title: "Peru Premium",
    description: "Peru Premium",
    keywords: ["Japon Premium", "Viajes Premium"],
    canonicalPath: "/japon-premium",
    ogImagePath: "/japon-premium/og-image.jpg",
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
      seoHeading: "Viaja a Peru desde Mexico",
      title: {
        line1Lead: "Viaja a",
        line1Focus: "Peru",
        line2Lead: "desde",
        line2Focus: "Mexico",
      },
      mobileTitle: {
        line1Lead: "Viaja a",
        line1Focus: "Peru",
        line2Lead: "Desde",
        line2Focus: "Mexico",
      },
      descriptionLines: [
        {
          highlight: "Eleva tu vida",
          text: "con una forma mas cuidada de vivir Japon.",
        },
        {
          highlight: "Disenamos experiencias",
          text: "para quienes valoran atencion personal, criterio y una forma mas cuidada de vivir Japon.",
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
      srHeading: "Snapshot de Japon Premium",
      badgeText: "Snapshot",
      titleText: "MÃ¡s de 21 aÃ±os diseÃ±ando experiencias premium.",
      titleHighlightWords: ["21", "aÃ±os", "premium"],
      cards: [
        {
          image: "/images/peru/1-machu-pichu.webp",
          text: "Machu Picchu",
                    experiences: "14 DIAS Â· ANIME Â· PARQUES TEMATICOS Â· TECNOLOGIA Â· CULTURA POP",

          wide: false,
        },
        {
          image: "/images/peru/1-gastronomia-autentica.webp",
          text: "Gastronomia autentica",
                    experiences: "14 DIAS Â· ANIME Â· PARQUES TEMATICOS Â· TECNOLOGIA Â· CULTURA POP",

          wide: false,
        },
        {
          image: "/images/japon/1-alojamiento-de-lujo.webp",
          text: "Hospedaje de lujo",
                    experiences: "14 DIAS Â· ANIME Â· PARQUES TEMATICOS Â· TECNOLOGIA Â· CULTURA POP",

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
      },
    },
    highlights: {
      srHeading: "Highlights de Japon Premium",
      badgeText: "Â¿Por que Japon Premium?",
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
          title: "Recorridos disenados con mas criterio",
          description:
            "Cada itinerario se estructura para dar mas sentido, ritmo y calidad al viaje.",
          meta: "Cultura",
          imageSrc: "/images/japon/2-recorridos-diseÃ±ados-con-mas-criterio.webp",
          href: "#form",
        },
        {
          id: "tokyo-nocturno",
          title: "Acompanamiento personalizado",
          description:
            "Atencion cercana antes, durante y despues de su experiencia en Japon.",
          meta: "Urbano",
          imageSrc: "/images/japon/2-acompaÃ±amiento-personalizado.webp",
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
            "Guias en espanol para vivir Japon con mas claridad y profundidad.",
          meta: "Naturaleza",
          imageSrc: "/images/japon/2-expertos-que-hablan-su-idioma.webp",
          href: "#form",
        },
        {
          id: "experiencia-ryokan",
          title: "Tranquilidad de principio a fin",
          description:
            "Cada detalle se cuida para que usted viaje con mas confianza y respaldo.",
          meta: "Tradicion",
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
      srHeading: "Itinerarios de Japon Premium",
      topTabText: "Itinerario Premium",
      items: [
        {
          id: 1,
          day: "14 DIAS Â· ESPIRITUALIDAD Â· TRADICION Â· BIENESTAR Â· CULTURA",
          title: "Alma de Japon",
          description:
            "Un recorrido por el Japon mas espiritual y profundo: templos milenarios, rutas sagradas, ryokans, onsen y experiencias que transforman el viaje.",
          ideal:
            "Ideal para parejas, familias, lunas de miel y viajeros que buscan desconexion profunda.",
          image1: "/images/japon/3-alma-de-japon-izq.webp",
          image2: "/images/japon/3-alma-de-japon-der.webp",
          price: "Desde $4,990 USD base doble",
        },
        {
          id: 2,
          day: "14 DIAS Â· ANIME Â· PARQUES TEMATICOS Â· TECNOLOGIA Â· CULTURA POP",
          title: "Japon Pop",
          description:
            "Un recorrido por el Japon mas vibrante y fantastico: anime, parques tematicos, tecnologia, neon, tradicion y experiencias que transforman el viaje.",
          ideal:
            "Ideal para familias, amigos, parejas jovenes, fans del anime, manga y la tecnologia.",
          image1: "/images/japon/4-japon-pop-izq.webp",
          image2: "/images/japon/4-japon-pop-der.webp",
          price: "Desde $4,590 USD base doble",
        },
        {
          id: 3,
          day: "15 DIAS Â· SAMURAIS Â· GEISHAS Â· SUMO Â· ALPES JAPONESES",
          title: "El Camino del Shogun",
          description:
            "Un recorrido por el Japon mas autentico y menos transitado: alpes japoneses, templos zen, ryokans y santuarios sagrados que transforman el viaje.",
          ideal:
            "Ideal para parejas aventureras, viajeros con mirada cultural y quienes prefieren el Japon que pocos conocen.",
          image1: "/images/japon/5-el-camino-del-shogun-izq.webp",
          image2: "/images/japon/5-el-camino-del-shogun-der.webp",
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
            "Templos, barrios historicos y actividades elegidas para conectar con el Japon mas autentico.",
          image: "/images/japon/6-experiencias-culturales-curadas.webp",
        },
        {
          id: "gastronomy",
          label: "IV",
          title: "Escenas gastronomicas seleccionadas",
          description:
            "Reservas y momentos en la mesa pensados para descubrir Japon con mas detalle y autenticidad.",
          image: "/images/japon/6-escenas-gastronomicas-seleccionadas.webp",
        },
        {
          id: "support",
          label: "V",
          title: "Acompanamiento en cada etapa",
          description:
            "Atencion en espanol antes y durante el viaje para acompanarle con claridad y resolver cada detalle.",
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
            "Japon nos parecia un viaje complejo, pero aqui todo se sintio claro, cuidado y bien acompanado desde el principio.",
          name: "Mariana Gutierrez",
          location: "Ciudad de Mexico",
          avatar: "/images/stock/avatar-1.svg",
        },
        {
          id: 2,
          quote:
            "Se nota cuando un viaje esta disenado con criterio. Hubo orden, atencion y experiencias que si valieron la inversion.",
          name: "Rodrigo Trevino",
          location: "Guadalajara",
          avatar: "/images/stock/avatar-2.svg",
        },
        {
          id: 3,
          quote:
            "Viajamos en familia y lo que mas agradecimos fue la enorme tranquilidad de sentir que todo estaba bien resuelto.",
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
            "La diferencia estuvo en los detalles: tiempos bien organizados, atencion cercana y una experiencia realmente fluida.",
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
        src: "/images/japon/karinaSanchezJapon.webp",
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
      contactLabel: "Â¿Otra pregunta?",
      contactEmail: "hola@perupremium.com",
      items: [...PERU_FAQS],
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
        "Â© 2026 Viaja a Japon Premium. Todos los derechos reservados.",
      backToTopLabel: "Volver al inicio",
      legalLinks: [
        { label: "PRIVACIDAD", href: "#" },
        { label: "TERMINOS", href: "#" },
      ],
    },
  },
};

