"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button/button";
import { usePageTransition } from "@/components/page-transition/TransitionProvider";
import Footer from "@/layout/footer/footer";
import { DEFAULT_SITE_CONFIG } from "@/config/default-site-config";
import BlogHero from "./blogHero";
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
  {
    question:
      "¿Cómo se diseña un viaje a Japón con propósito y no solo con checklist?",
    slug: "blog-01-japon-premium",
  },
  {
    question:
      "¿Cómo planear un viaje premium en familia sin estres ni sobrecarga?",
    slug: "blog-02-viajes-familia-premium",
  },
  {
    question:
      "¿Cómo ser un viajero consciente y elegir experiencias que transformen?",
    slug: "blog-03-viajero-consciente",
  },
  {
    question:
      "¿Qué estructura debe tener un itinerario premium para cuidar ritmo?",
    slug: "blog-04-arte-itinerarios-premium",
  },
  {
    question:
      "¿Cómo elegir hospedajes que si mejoren la experiencia del viaje?",
    slug: "blog-05-hospedaje-con-identidad",
  },
  {
    question:
      "¿Cómo curar experiencias culturales profundas sin perder comodidad?",
    slug: "blog-06-experiencias-culturales-curadas",
  },
];

export default function BlogSection() {
  const { triggerTransition } = usePageTransition();

  return (
    <>
      <main className={styles.page}>
        <BlogHero
          title="BLOGS PREMIUM"
          subtitle="Recorridos que inspiran y transforman"
        />

        <section
          className={styles.questionsBlock}
          aria-label="Preguntas frecuentes"
        >
          <div className={styles.questionsLayout}>
            <div className={styles.questionsLeft}>
              <h3 className={styles.questionsTitle}>GUIA DEL VIAJERO PREMIUM</h3>
              <div className={styles.questionsColumn}>
                {QUESTIONS.map((item, index) => (
                  <p key={item.question} className={styles.questionItem}>
                    <Link
                      href={`/blog/${item.slug}`}
                      className={styles.questionLink}
                    >
                      {index + 1}. {item.question}
                    </Link>
                  </p>
                ))}
              </div>
            </div>
            <figure className={styles.questionsImageWrap} aria-hidden="true">
              <Image
                src="/images/japon/1-japon-pop.webp"
                alt=""
                fill
                sizes="(max-width: 980px) 100vw, 48vw"
                className={styles.questionsImage}
              />
            </figure>
          </div>
        </section>

        <section className={styles.topGrid} aria-label="Blogs disponibles">
          {BLOG_ITEMS.map((item) => (
            <article key={item.id} className={styles.blogCard}>
              <div className={styles.blogContent}>
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
              </div>
              <figure className={styles.blogImageWrap}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 980px) 50vw, 16vw"
                  className={styles.blogImage}
                />
              </figure>
            </article>
          ))}
        </section>
      </main>
      <Footer config={DEFAULT_SITE_CONFIG.footer} />
    </>
  );
}
