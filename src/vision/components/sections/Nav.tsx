import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { BrandMark } from "../brand/BrandMark";
import { ThemeToggle } from "../brand/ThemeToggle";

const links = [
  { label: "Destinos", href: "#destinos" },
  { label: "El Método", href: "#metodo" },
  { label: "Por qué PREMIUM®", href: "#porque" },
  { label: "Diario", href: "#diario" },
  { label: "Contacto", href: "#contacto" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-editorial ${
          scrolled ? "glass border-b border-hairline" : "bg-transparent"
        }`}
      >
        <div className="editorial-container flex items-center justify-between h-16 md:h-20">
          <a href="#top" aria-label="Viajes PREMIUM home" className="shrink-0">
            <BrandMark size="sm" />
          </a>

          <nav className="hidden lg:flex items-center gap-9">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[0.78rem] uppercase tracking-[0.18em] font-medium text-ink-soft hover:text-foreground transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#contacto"
              className="hidden md:inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] font-medium px-5 py-3 bg-foreground text-background hover:bg-gold hover:text-primary transition-all duration-500"
            >
              Diseñar mi viaje
            </a>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden h-9 w-9 inline-flex items-center justify-center"
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] bg-background transition-all duration-500 ease-editorial ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="editorial-container h-16 md:h-20 flex items-center justify-between">
          <BrandMark size="sm" />
          <button onClick={() => setOpen(false)} aria-label="Cerrar menú" className="h-9 w-9 inline-flex items-center justify-center">
            <X className="h-5 w-5" strokeWidth={1.25} />
          </button>
        </div>
        <div className="hairline" />
        <nav className="editorial-container flex flex-col gap-2 pt-12 pb-10">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline justify-between py-5 border-b border-hairline"
            >
              <span className="display-md font-extralight">{l.label}</span>
              <span className="num-marker text-sm">0{i + 1}</span>
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-10 inline-flex items-center justify-center gap-2 px-6 py-5 bg-foreground text-background uppercase tracking-[0.22em] text-xs"
          >
            Diseñar mi viaje
          </a>
          <a
            href="https://wa.me/525555555555"
            className="mt-3 inline-flex items-center justify-center gap-2 px-6 py-5 border border-hairline uppercase tracking-[0.22em] text-xs"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.25} />
            Habla con un asesor
          </a>
        </nav>
      </div>
    </>
  );
}
