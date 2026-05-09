"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button/button";
import { useBlogTransition } from "@/components/page-transition/BlogTransitionProvider";
import styles from "./blog.module.css";

const BLOG_ITEMS = [
  {
    id: "01",
    image: "/images/japon/1-alma-de-japon.webp",
    title: "Japon Premium mas alla de la postal",
    subtitle: "Como disenar un viaje con proposito real",
    slug: "blog-01-japon-premium.txt",
  },
  {
    id: "02",
    image: "/images/japon/1-japon-pop.webp",
    title: "Viajar en familia sin estres",
    subtitle: "Principios para una experiencia premium",
    slug: "blog-02-viajes-familia-premium.txt",
  },
  {
    id: "03",
    image: "/images/japon/1-camino-del-shogun.webp",
    title: "De turista a viajero consciente",
    subtitle: "Elegir experiencias que si transforman",
    slug: "blog-03-viajero-consciente.txt",
  },
  {
    id: "04",
    image: "/images/japon/2-estancia-a-la-altura-del-viaje.webp",
    title: "Arte de itinerarios premium",
    subtitle: "Disenar ritmo, pausas y experiencias coherentes",
    slug: "blog-04-arte-itinerarios-premium.txt",
  },
  {
    id: "05",
    image: "/images/japon/2-estancia-a-la-altura-del-viaje.webp",
    title: "Hospedaje con identidad",
    subtitle: "Como elegir estancias que eleven el recorrido",
    slug: "blog-05-hospedaje-con-identidad.txt",
  },
  {
    id: "06",
    image: "/images/japon/6.1-experiencias-culturales-curadas.webp",
    title: "Experiencias culturales curadas",
    subtitle: "Profundidad local sin perder comodidad",
    slug: "blog-06-experiencias-culturales-curadas.txt",
  },
];

const QUESTIONS = [
  "Como elegimos el itinerario correcto para cada perfil de viajero?",
  "Que incluye realmente una experiencia premium bien disenada?",
  "Cuando conviene viajar para aprovechar mejor cada destino?",
  "Como equilibrar descanso, cultura y ritmo durante el recorrido?",
  "Que errores cuestan mas dinero y energia en un viaje internacional?",
  "Como lograr que un viaje en familia sea comodo para todos?",
];

export default function BlogSection() {
  const { triggerTransition } = useBlogTransition();

  return (
    <main className={styles.page}>
      <section className={styles.topGrid} aria-label="Blogs disponibles">
        {BLOG_ITEMS.map((item) => (
          <article key={item.id} className={styles.blogCard}>
            <figure className={styles.blogImageWrap}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 980px) 50vw, 16vw"
                className={styles.blogImage}
              />
            </figure>
            <p className={styles.blogIndex}>{item.id}</p>
            <h2 className={styles.blogTitle}>{item.title}</h2>
            <p className={styles.blogSubtitle}>{item.subtitle}</p>
            <Button
              type="button"
              variant="outline"
              className={styles.blogCta}
              onClick={() =>
                triggerTransition(`/blog/${item.slug.replace(".txt", "")}`)
              }
            >
              Leer blog
            </Button>
          </article>
        ))}
      </section>

      <section className={styles.titleRow} aria-label="Encabezado de blogs">
        <h1 className={styles.title}>BLOGS PREMIUM</h1>
      </section>

      <section
        className={styles.questionsBlock}
        aria-label="Preguntas frecuentes"
      >
        <h3 className={styles.questionsTitle}>Preguntas para planear mejor</h3>
        <div className={styles.questionsGrid}>
          {QUESTIONS.map((question, index) => (
            <p key={question} className={styles.questionItem}>
              {index + 1}. {question}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
