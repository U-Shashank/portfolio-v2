"use client";

import { motion } from "motion/react";
import { useTheme } from "@/context/theme-provider";
import Link from "next/link";

const sections = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Contact", id: "contact" },
];

type NavbarProps = {
  sectionRefs: {
    home: React.RefObject<HTMLElement | null>;
    about: React.RefObject<HTMLElement | null>;
    projects: React.RefObject<HTMLElement | null>;
    skills: React.RefObject<HTMLElement | null>;
    contact: React.RefObject<HTMLElement | null>;
  };
};

const Navbar = ({
  sectionRefs
}: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-secondary/10"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="#home"
          className="text-xl font-serif font-bold text-accent"
        >
          YourName
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(sectionRefs[section.id as keyof typeof sectionRefs])}
              className="text-foreground/80 hover:text-accent transition-colors"
            >
              {section.name}
            </button>
          ))}
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-primary/20 transition-colors"
          aria-label={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <MoonIcon className="w-5 h-5" />
          ) : (
            <SunIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </motion.nav>
  );
}

// Simple icon components (replace with Lucide if preferred)
function MoonIcon(props: any) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  );
}

function SunIcon(props: any) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773l-1.591-1.591M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  );
}

export default Navbar;