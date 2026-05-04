"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button/button";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button variant="primary" onClick={() => router.back()}>
      Regresar
    </Button>
  );
}
