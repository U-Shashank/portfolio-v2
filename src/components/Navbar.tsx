"use client";
import { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import { useTheme } from "@/context/theme-provider";
import Link from "next/link";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";
import NavSections from "./NavSections";
import ThemeToggle from "./ThemeToggle";

export type SectionId = "home" | "about" | "experience" | "projects" | "skills" | "contact";
export type SectionRef = {
  [key in SectionId]: React.RefObject<HTMLElement | null>;
};

export const SECTIONS = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Contact", id: "contact" },
] as const;

type NavbarProps = {
  sectionRefs: SectionRef;
};

const Navbar = ({ sectionRefs }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();
  const { isScrollingDown, hasScrolled } = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll to section handler
  const scrollToSection = useCallback((id: SectionId) => {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, [sectionRefs]);

  // Control body scroll when menu is open
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

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isScrollingDown && hasScrolled ? -100 : 0,
        opacity: 1
      }}
      transition={{
        duration: 0.4,
      }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${hasScrolled
        ? "bg-background/80 border-b border-secondary/10 shadow-md backdrop-blur-lg"
        : "bg-transparent border-b border-transparent shadow-none" // Keep border, but transparent
        }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link
            href=""
            className="text-2xl font-serif font-bold text-accent hover:text-accent/90 transition-colors"
            onClick={() => scrollToSection("home")}
            aria-label="Go to homepage"
          >
            <span className="sr-only">Portfolio</span>
            {/* Brand Logo/Name could go here */}
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <NavSections sections={SECTIONS} scrollToSection={scrollToSection} />

        {/* Controls */}
        <motion.div
          className="flex items-center gap-4 md:gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </motion.div>
          <motion.div
            whileTap={{ scale: 1 }}
            transition={{ duration: 0.1 }}
          >
            <MobileMenuButton isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        sections={SECTIONS}
        scrollToSection={scrollToSection}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </motion.nav>
  );
};

export default Navbar;