import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Playfair_Display, Roboto_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/theme-provider";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
});

const robotoMono = Roboto_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Name | Full Stack Developer",
  description: "Personal portfolio of a full stack developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistMono.variable} ${geistSans.variable} ${poppins.variable} ${playfair.variable} ${robotoMono.variable} font-sans antialiased bg-light-background dark:bg-dark-primary text-dark-primary dark:text-light-accent`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}