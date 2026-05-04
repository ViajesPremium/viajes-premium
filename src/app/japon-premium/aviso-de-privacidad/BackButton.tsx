"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button/button";

// Puedes pasar la ruta por props si este botón se usará en otros lados,
// por defecto lo mandamos a la landing premium.
type BackButtonProps = {
  href?: string;
};

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    // router.back() usa el caché, pero al hacer un refresh inmediato
    // forzamos a Next.js a soltar los nodos zombi de la memoria.
    router.back();
    setTimeout(() => {
      router.refresh();
    }, 50);
  };

  return (
    <Button variant="primary" onClick={handleBack}>
      Regresar
    </Button>
  );
}
