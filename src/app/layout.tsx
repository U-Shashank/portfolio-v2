import type { Metadata } from "next";
import { Inter, Space_Mono, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/theme-provider";
import ParticlesEffect from "@/components/ParticlessEffect";

// Primary sans-serif font (replacing Geist/Poppins)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

// Monospace font for code elements
const spaceMono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

// Accent font for headings (optional)
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
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
        className={`${inter.variable} ${spaceMono.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
                              <ParticlesEffect />

        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}