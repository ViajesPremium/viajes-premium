type DestinationDataCard = {
  label: string;
  route: string;
  primaryColor: string;
  secondaryColor: string;
  description: string;
  backgroundImage: string;
  galleryImages: string[];
  reviewUrl: string;
  reviews: Array<{ name: string; quote: string; avatar: string }>;
  overlayImages?: {
    baseImage: string;
    samuraiImage: string;
    baseAlt: string;
    samuraiAlt: string;
  };
};

const DEFAULT_REVIEWS = [
  {
    name: "Mariana Gutiérrez",
    quote:
      "Se nota cuando un viaje está pensado con criterio. Todo fluyó perfecto.",
    avatar: "https://i.pravatar.cc/96?img=12",
  },
  {
    name: "Rodrigo Treviño",
    quote:
      "Desde la planeación hasta el regreso, todo se sintió bien acompañado.",
    avatar: "https://i.pravatar.cc/96?img=33",
  },
];

export const destinationCardsData: DestinationDataCard[] = [
  {
    label: "Japón",
    route: "/japon-premium",
    primaryColor: "#db2f21",
    secondaryColor: "#95231c",
    description:
      "Descubre el equilibrio perfecto entre la tradición milenaria y la vanguardia tecnológica en un viaje diseñado para elevar tus sentidos con total comodidad y el acompañamiento experto que mereces.",
    backgroundImage:
      "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1600",
    galleryImages: [
      "/images/viajes-premium/destinos/japon/japon-premium-1.webp",
      "/images/viajes-premium/destinos/japon/japon-premium-2.webp",
      "/images/viajes-premium/destinos/japon/japon-premium-3.webp",
      "/images/viajes-premium/destinos/japon/japon-premium-4.webp",
    ],
    reviewUrl: "https://www.google.com/search?q=Japón+Premium+reseñas",
    reviews: DEFAULT_REVIEWS,
    overlayImages: {
      baseImage: "/images/japon/hero/geishaHero.webp",
      samuraiImage: "/images/japon/hero/samuraiHero.webp",
      baseAlt: "Hero Japón Premium",
      samuraiAlt: "Samurai Japón Premium",
    },
  },
  {
    label: "Europa",
    route: "/europa-premium",
    primaryColor: "#511E62",
    secondaryColor: "#882BAC",
    description:
      "Una travesía exclusiva por los rincones más emblemáticos del viejo continente, diseñada con un ritmo pausado que permite disfrutar de la alta cultura, el descanso sofisticado y paisajes inolvidables.",
    backgroundImage:
      "https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=1600",
    galleryImages: [
      "/images/viajes-premium/destinos/europa/europa-premium-1.webp",
      "/images/viajes-premium/destinos/europa/europa-premium-2.webp",
      "/images/viajes-premium/destinos/europa/europa-premium-3.webp",
      "/images/viajes-premium/destinos/europa/europa-premium-4.webp",
    ],
    reviewUrl: "https://www.google.com/search?q=Europa+Premium+reseñas",
    reviews: DEFAULT_REVIEWS,
  },
  {
    label: "Corea",
    route: "/corea-premium",
    primaryColor: "#1D624E",
    secondaryColor: "#482D55",
    description:
      "Sumérgete en la elegancia de la cultura coreana a través de experiencias premium que fusionan el dinamismo urbano de Seúl con la serenidad de sus templos y una atención al detalle sin precedentes.",
    backgroundImage:
      "https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg?auto=compress&cs=tinysrgb&w=1600",
    galleryImages: [
      "/images/viajes-premium/destinos/corea/corea-premium-1.webp",
      "/images/viajes-premium/destinos/corea/corea-premium-2.webp",
      "/images/viajes-premium/destinos/corea/corea-premium-3.webp",
      "/images/viajes-premium/destinos/corea/corea-premium-4.webp",
    ],
    reviewUrl: "https://www.google.com/search?q=Corea+Premium+reseñas",
    reviews: DEFAULT_REVIEWS,
  },
  {
    label: "Canadá",
    route: "/canada-premium",
    primaryColor: "#9E1F1E",
    secondaryColor: "#377AA8",
    description:
      "Déjate cautivar por la majestuosidad de las montañas rocosas y la pureza de la naturaleza canadiense en un itinerario curado minuciosamente para ofrecerte el máximo confort en cada aventura.",
    backgroundImage:
      "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1600",
    galleryImages: [
      "/images/viajes-premium/destinos/canada/canada-premium-1.webp",
      "/images/viajes-premium/destinos/canada/canada-premium-2.webp",
      "/images/viajes-premium/destinos/canada/canada-premium-3.webp",
      "/images/viajes-premium/destinos/canada/canada-premium-4.webp",
    ],
    reviewUrl: "https://www.google.com/search?q=Canadá+Premium+reseñas",
    reviews: DEFAULT_REVIEWS,
  },
  {
    label: "Perú",
    route: "/peru-premium",
    primaryColor: "#1F5198",
    secondaryColor: "#132D4F",
    description:
      "Un viaje sensorial al corazón del Imperio Inca, donde la mística de Machu Picchu se entrelaza con una propuesta gastronómica de clase mundial y paisajes que te dejarán sin aliento.",
    backgroundImage:
      "https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&w=1600",
    galleryImages: [
      "/images/viajes-premium/destinos/peru/peru-premium-1.webp",
      "/images/viajes-premium/destinos/peru/peru-premium-2.webp",
      "/images/viajes-premium/destinos/peru/peru-premium-3.webp",
      "/images/viajes-premium/destinos/peru/peru-premium-4.webp",
    ],
    reviewUrl: "https://www.google.com/search?q=Perú+Premium+reseñas",
    reviews: DEFAULT_REVIEWS,
  },
  {
    label: "Chiapas",
    route: "/chiapas-premium",
    primaryColor: "#E939C4",
    secondaryColor: "#A32B8D",
    description: "Explora la selva profunda y los pueblos mágicos de Chiapas en una ruta tranquila y exclusiva, diseñada para conectar con la naturaleza y las raíces culturales de México con un toque de lujo.",
    backgroundImage:
      "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1600",
    galleryImages: [
      "/images/viajes-premium/destinos/chiapas/chiapas-premium-1.webp",
      "/images/viajes-premium/destinos/chiapas/chiapas-premium-2.webp",
      "/images/viajes-premium/destinos/chiapas/chiapas-premium-3.webp",
      "/images/viajes-premium/destinos/chiapas/chiapas-premium-4.webp",
    ],
    reviewUrl: "https://www.google.com/search?q=Chiapas+Premium+reseñas",
    reviews: DEFAULT_REVIEWS,
  },
  {
    label: "Barrancas",
    route: "/barrancas-premium",
    primaryColor: "#963825",
    secondaryColor: "#D55C26",
    description: "Vive la grandeza de las Barrancas del Cobre a bordo del Chepe Express, disfrutando de vistas panorámicas inigualables y experiencias de aventura premium en uno de los cañones más profundos del mundo.",
    backgroundImage:
      "https://images.pexels.com/photos/356807/pexels-photo-356807.jpeg?auto=compress&cs=tinysrgb&w=1600",
    galleryImages: [
      "/images/viajes-premium/destinos/barrancas/barrancas-premium-1.webp",
      "/images/viajes-premium/destinos/barrancas/barrancas-premium-2.webp",
      "/images/viajes-premium/destinos/barrancas/barrancas-premium-3.webp",
      "/images/viajes-premium/destinos/barrancas/barrancas-premium-4.webp",
    ],
    reviewUrl: "https://www.google.com/search?q=Barrancas+Premium+reseñas",
    reviews: DEFAULT_REVIEWS,
  },
  {
    label: "Yucatán",
    route: "/yucatan-premium",
    primaryColor: "#EA558A",
    secondaryColor: "#A42E56",
    description: "Disfruta del paraíso maya entre cenotes de aguas cristalinas, haciendas históricas y el lujo contemporáneo de la Riviera, en una experiencia diseñada para el descanso total y la exploración cultural.",
    backgroundImage:
      "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1600",
    galleryImages: [
      "/images/viajes-premium/destinos/yucatan/yucatan-premium-1.webp",
      "/images/viajes-premium/destinos/yucatan/yucatan-premium-2.webp",
      "/images/viajes-premium/destinos/yucatan/yucatan-premium-3.webp",
      "/images/viajes-premium/destinos/yucatan/yucatan-premium-4.webp",
    ],
    reviewUrl: "https://www.google.com/search?q=Yucatán+Premium+reseñas",
    reviews: DEFAULT_REVIEWS,
  },
];

export type { DestinationDataCard };
