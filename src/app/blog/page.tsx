import type { Metadata } from "next";
import BlogSection from "./blog";

export const metadata: Metadata = {
  title: "Blog | Viajes Premium",
  description: "Historias, rutas y consejos de viaje de Viajes Premium.",
};

export default function BlogPage() {
  return <BlogSection />;
}

