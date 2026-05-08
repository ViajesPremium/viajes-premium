import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

const BLOG_DATA_DIR = path.join(process.cwd(), "blog-data");

type BlogPageProps = {
  params: Promise<{ slug: string }>;
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

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, " ")} | Blog Viajes Premium`,
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const content = await getBlogText(slug);

  if (!content) {
    notFound();
  }

  const paragraphs = content
    .split(/\r?\n\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <h1 className={styles.title}>{slug.replace(/-/g, " ")}</h1>
        <section className={styles.content}>
          <figure className={styles.shapeFigure} aria-hidden="true">
            <Image
              src="/images/japon/samuraiBlog.png"
              alt=""
              width={700}
              height={1100}
              className={styles.shapeImage}
              priority
            />
          </figure>

          {paragraphs.map((paragraph, index) => (
            <p
              key={`${slug}-p-${index}`}
              className={index === 0 ? styles.firstParagraph : styles.paragraph}
            >
              {paragraph}
            </p>
          ))}
        </section>
      </article>
    </main>
  );
}
