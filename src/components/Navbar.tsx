"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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

const Navbar = ({ sectionRefs }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 0);
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);

      if (menuOpen) {
        setMenuOpen(false); // auto-close mobile menu on scroll
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, menuOpen]);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false); // close menu on click
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden"); // Cleanup
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false); // Auto-close if switching to desktop
      }
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  return (
    <motion.nav
    initial={{ y: 0 }}
    animate={{ y: showNavbar ? 0 : -100 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled
        ? "bg-background/80 border-b border-secondary/10 shadow-md backdrop-blur-lg"
        : "bg-transparent border-none shadow-none"
    }`}
  >
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <Link
        href="#home"
        className="text-2xl font-serif font-bold text-accent hover:text-accent/90 transition-colors"
      >
        
      </Link>
  
      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() =>
              scrollTo(sectionRefs[section.id as keyof typeof sectionRefs])
            }
            className="text-foreground/80 hover:text-accent hover:underline underline-offset-4 transition-all duration-200 text-base font-medium cursor-pointer"
          >
            {section.name}
          </button>
        ))}
      </div>
  
      {/* Theme + Mobile Menu Toggle */}
      <div className="flex items-center gap-4 md:gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-primary/10 hover:scale-105 transition-transform duration-200"
          aria-label={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <MoonIcon className="w-5 h-5 text-foreground" />
          ) : (
            <SunIcon className="w-5 h-5 text-foreground" />
          )}
        </button>
  
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 z-[100] hover:scale-105 transition-transform"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </div>
    </div>
  
    {/* Mobile Menu */}
    <AnimatePresence>
      {menuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
  
          {/* Sidebar Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-[75%] sm:w-[60%] bg-background z-[60] p-6 flex flex-col gap-6 pt-20"
          >
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  scrollTo(sectionRefs[section.id as keyof typeof sectionRefs]);
                  setMenuOpen(false);
                }}
                className="text-left text-foreground/90 hover:text-accent text-lg font-semibold transition-colors hover:pl-2 cursor-pointer"
              >
                {section.name}
              </button>
            ))}
  
            <div className="mt-auto">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-primary/10 transition-transform hover:scale-110"
                aria-label={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </motion.nav>
  
  );
};

// Icons remain the same
function MoonIcon(props: any) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" {...props}>
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
    <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773l-1.591-1.591M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  );
}

// Hamburger menu icon
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-6 h-5 transition-all duration-300 ease-in-out z-[100]">
      <span
        className={`absolute left-0 h-[2px] w-full bg-foreground transform transition-all duration-300 ${
          open ? "rotate-45 top-2.5" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 h-[2px] w-full bg-foreground transition-all duration-300 ${
          open ? "opacity-0" : "top-2.5"
        }`}
      />
      <span
        className={`absolute left-0 h-[2px] w-full bg-foreground transform transition-all duration-300 ${
          open ? "-rotate-45 top-2.5" : "bottom-0"
        }`}
      />
    </div>
  );
}




export default Navbar;
