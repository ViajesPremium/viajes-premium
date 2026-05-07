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
      "https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=80",
      "https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=1200",
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
      "https://images.unsplash.com/photo-1499856871958-5b9357976b82?auto=format&fit=crop&w=1200&q=80",
      "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg?auto=compress&cs=tinysrgb&w=1200",
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
      "https://images.unsplash.com/photo-1538485399081-7c89779f9b35?auto=format&fit=crop&w=1200&q=80",
      "https://images.pexels.com/photos/2948247/pexels-photo-2948247.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1440475/pexels-photo-1440475.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/127162-pexels-photo-127162.jpeg?auto=compress&cs=tinysrgb&w=1200",
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
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80",
      "https://images.pexels.com/photos/1126384/pexels-photo-1126384.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1430677/pexels-photo-1430677.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1619569/pexels-photo-1619569.jpeg?auto=compress&cs=tinysrgb&w=1200",
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
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80",
      "https://images.pexels.com/photos/1653361/pexels-photo-1653361.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2929906/pexels-photo-2929906.jpeg?auto=compress&cs=tinysrgb&w=1200",
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
      "https://images.unsplash.com/photo-1518632616182-6b3c9952f4f5?auto=format&fit=crop&w=1200&q=80",
      "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200",
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
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1510595/pexels-photo-1510595.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/3331094/pexels-photo-3331094.jpeg?auto=compress&cs=tinysrgb&w=1200",
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
      "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?auto=format&fit=crop&w=1200&q=80",
      "https://images.pexels.com/photos/1202723/pexels-photo-1202723.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    reviewUrl: "https://www.google.com/search?q=Yucatán+Premium+reseñas",
    reviews: DEFAULT_REVIEWS,
  },
];

export type { DestinationDataCard };
