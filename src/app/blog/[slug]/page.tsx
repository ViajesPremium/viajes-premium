import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import BackButton from "./BackButton";
import Footer from "@/layout/footer/footer";
import { DEFAULT_SITE_CONFIG } from "@/config/default-site-config";
import styles from "./page.module.css";

const BLOG_DATA_DIR = path.join(process.cwd(), "blog-data");

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

type ImageColumn = "left" | "right";

type BlogVisualConfig = {
  primary: { src: string; column: ImageColumn; afterInColumn: number };
  secondary: { src: string; column: ImageColumn; afterInColumn: number };
};

const DEFAULT_VISUALS: BlogVisualConfig = {
  primary: {
    src: "/images/japon/samuraiBlog.png",
    column: "left",
    afterInColumn: 1,
  },
  secondary: {
    src: "/images/japon/stockImage.webp",
    column: "right",
    afterInColumn: 2,
  },
};

const BLOG_VISUALS: Record<string, BlogVisualConfig> = {
  "blog-01-japon-premium": {
    primary: {
      src: "/images/japon/1-alma-de-japon.webp",
      column: "left",
      afterInColumn: 1,
    },
    secondary: {
      src: "/images/japon/frase_kioto.webp",
      column: "right",
      afterInColumn: 2,
    },
  },
  "blog-02-viajes-familia-premium": {
    primary: {
      src: "/images/japon/1-japon-pop.webp",
      column: "right",
      afterInColumn: 1,
    },
    secondary: {
      src: "/images/japon/2-acompañamiento-personalizado.webp",
      column: "left",
      afterInColumn: 2,
    },
  },
  "blog-03-viajero-consciente": {
    primary: {
      src: "/images/japon/1-camino-del-shogun.webp",
      column: "left",
      afterInColumn: 1,
    },
    secondary: {
      src: "/images/japon/frase_tokio.webp",
      column: "right",
      afterInColumn: 2,
    },
  },
  "blog-04-arte-itinerarios-premium": {
    primary: {
      src: "/images/japon/2-recorridos-diseñados-con-mas-criterio.webp",
      column: "left",
      afterInColumn: 2,
    },
    secondary: {
      src: "/images/japon/6.1-traslados-mejor-coordinados.webp",
      column: "right",
      afterInColumn: 2,
    },
  },
  "blog-05-hospedaje-con-identidad": {
    primary: {
      src: "/images/japon/2-estancia-a-la-altura-del-viaje.webp",
      column: "right",
      afterInColumn: 1,
    },
    secondary: {
      src: "/images/japon/6.1-estancias-con-caracter.webp",
      column: "left",
      afterInColumn: 2,
    },
  },
  "blog-06-experiencias-culturales-curadas": {
    primary: {
      src: "/images/japon/6.1-experiencias-culturales-curadas.webp",
      column: "left",
      afterInColumn: 1,
    },
    secondary: {
      src: "/images/japon/6.1-escenas-gastronomicas-seleccionadas.webp",
      column: "right",
      afterInColumn: 2,
    },
  },
};

async function getBlogText(slug: string) {
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "");
  const filePath = path.join(BLOG_DATA_DIR, `${safeSlug}.txt`);
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

function getReadableBlogTitle(slug: string) {
  return slug.replace(/^blog-\d+-/i, "").replace(/-/g, " ");
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${getReadableBlogTitle(slug)} | Blog Viajes Premium`,
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const content = await getBlogText(slug);
  const visuals = BLOG_VISUALS[slug] ?? DEFAULT_VISUALS;

  if (!content) {
    notFound();
  }

  const paragraphs = content
    .split(/\r?\n\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const splitAt = Math.ceil(paragraphs.length / 2);
  const leftParagraphs = paragraphs.slice(0, splitAt);
  const rightParagraphs = paragraphs.slice(splitAt);

  function renderColumn(
    columnName: ImageColumn,
    columnParagraphs: string[],
    paragraphOffset: number,
  ) {
    const primaryAfter =
      visuals.primary.column === columnName
        ? Math.min(
            Math.max(visuals.primary.afterInColumn, 1),
            Math.max(columnParagraphs.length, 1),
          )
        : -1;
    const secondaryAfter =
      visuals.secondary.column === columnName
        ? Math.min(
            Math.max(visuals.secondary.afterInColumn, 1),
            Math.max(columnParagraphs.length, 1),
          )
        : -1;

    return columnParagraphs.map((paragraph, index) => {
      const inColumnNumber = index + 1;
      const globalIndex = paragraphOffset + index;
      return (
        <div
          key={`${slug}-${columnName}-${globalIndex}`}
          className={styles.flowBlock}
        >
          <p
            className={
              globalIndex === 0 ? styles.firstParagraph : styles.paragraph
            }
          >
            {paragraph}
          </p>

          {inColumnNumber === primaryAfter ? (
            <figure className={styles.imageFigure} aria-hidden="true">
              <Image
                src={visuals.primary.src}
                alt=""
                width={980}
                height={640}
                className={styles.inlineImage}
                priority
              />
            </figure>
          ) : null}

          {inColumnNumber === secondaryAfter ? (
            <figure className={styles.imageFigure} aria-hidden="true">
              <Image
                src={visuals.secondary.src}
                alt=""
                width={980}
                height={640}
                className={styles.inlineImage}
              />
            </figure>
          ) : null}
        </div>
      );
    });
  }

  return (
    <>
      <main className={`${styles.page} ${styles.pageEnter}`}>
        <article className={styles.article}>
          <div className={styles.buttonContainer}>
            <BackButton />
          </div>
          <h1 className={styles.title}>{getReadableBlogTitle(slug)}</h1>
          <section className={styles.newspaperBody}>
            <div className={styles.column}>
              {renderColumn("left", leftParagraphs, 0)}
            </div>
            <div className={styles.column}>
              {renderColumn("right", rightParagraphs, splitAt)}
            </div>
          </section>
        </article>
      </main>
      <Footer config={DEFAULT_SITE_CONFIG.footer} />
    </>
  );
}
