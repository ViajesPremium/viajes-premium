import type { ReactNode } from "react";
import JaponPremiumFrame from "./JaponPremiumFrame";

export default function JaponPremiumLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <JaponPremiumFrame>{children}</JaponPremiumFrame>;
}
