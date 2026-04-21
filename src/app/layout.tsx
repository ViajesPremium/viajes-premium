import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import CursorEffect from "@/components/ui/cursor/cursorEffect";
import Navbar from "@/layout/navbar/navbar";
import "./globals.css";

const nohemiFont = localFont({
  variable: "--font-nohemi",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/nohemi-font-family/Nohemi-Thin-BF6438cc57e2011.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/nohemi-font-family/Nohemi-ExtraLight-BF6438cc581502c.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/nohemi-font-family/Nohemi-Light-BF6438cc5702321.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/nohemi-font-family/Nohemi-Regular-BF6438cc579d934.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/nohemi-font-family/Nohemi-Medium-BF6438cc57ddecd.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/nohemi-font-family/Nohemi-SemiBold-BF6438cc57db2ff.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/nohemi-font-family/Nohemi-Bold-BF6438cc577b524.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/nohemi-font-family/Nohemi-ExtraBold-BF6438cc5761ae2.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/nohemi-font-family/Nohemi-Black-BF6438cc565e67b.woff",
      weight: "900",
      style: "normal",
    },
  ],
});

const bigCaslonFont = localFont({
  variable: "--font-bigcaslon",
  display: "swap",
  src: "../../public/fonts/BigCaslon-Regular.ttf",
});

const thunderFont = localFont({
  variable: "--font-thunder",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/OpenType-TT/Thunder-ThinHC.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-ThinHCItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-ExtraLightHC.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-ExtraLightHCItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-LightHC.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-LightHCItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-HC.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-HCItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-MediumHC.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-MediumHCItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-SemiBoldHC.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-SemiBoldHCItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-BoldHC.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-BoldHCItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-ExtraBoldHC.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-ExtraBoldHCItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-BlackHC.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-BlackHCItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
});

const thunderLcFont = localFont({
  variable: "--font-thunder-lc",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/OpenType-TT/Thunder-ThinLC.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-ThinLCItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-ExtraLightLC.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-ExtraLightLCItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-LightLC.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-LightLCItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-LC.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-LCItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-MediumLC.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-MediumLCItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-SemiBoldLC.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-SemiBoldLCItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-BoldLC.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-BoldLCItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-ExtraBoldLC.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-ExtraBoldLCItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-BlackLC.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/OpenType-TT/Thunder-BlackLCItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nohemiFont.variable} ${bigCaslonFont.variable} ${thunderFont.variable} ${thunderLcFont.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CursorEffect>
          <Navbar
            logoUrl="/logos/jp-negro.svg"
            colors={["var(--primary-japon)", "var(--secondary-japon)"]}
            accentColor="var(--primary-japon)"
            menuButtonColor="#ffffff"
            openMenuButtonColor="#16181b"
          />
          {children}
        </CursorEffect>
      </body>
    </html>
  );
}
