import type { Metadata } from "next";
import { Sora, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/theme-provider";
import ParticlesEffect from "@/components/ParticlesEffect";

// Primary sans-serif font (replacing Inter)
const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
  weight: ["400", "500", "600", "700"],
});

// Monospace font for code elements (replacing Space Mono)
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "700"],
});

// Modern font for headings (replacing Playfair)
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Shashank | Full Stack Developer",
  description: "Personal portfolio of a full stack developer",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${jetbrainsMono.variable} ${manrope.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ParticlesEffect />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}