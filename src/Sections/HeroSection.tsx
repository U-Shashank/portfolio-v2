import { useEffect, useRef, useState } from "react";
import * as motion from "motion/react-client";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import Section from "../components/Section";

const socialLinks = [
  {
    icon: <FaLinkedin className="w-5 h-5" />,
    href: "https://linkedin.com/in/yourprofile",
    label: "LinkedIn",
    color: "#0077B5"
  },
  {
    icon: <FaXTwitter className="w-5 h-5" />,
    href: "https://x.com/yourhandle",
    label: "X",
    color: "#000000"
  },
  {
    icon: <FaGithub className="w-5 h-5" />,
    href: "https://github.com/yourusername",
    label: "GitHub",
    color: "#171515"
  },
  {
    icon: <FaFileAlt className="w-5 h-5" />,
    href: "/resume.pdf",
    label: "Resume",
    color: "#0077B5"
  }
];

const HeroSection = ({ ref }: { ref: React.RefObject<HTMLElement | null> }) => {
  // Rest of your component stays the same
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Section
      id="home"
      title=""
      className="relative flex items-center justify-center min-h-screen"
      ref={ref}
    >
      {/* Main content container */}
      <div className="relative z-10 w-full max-w-4xl px-8 lg:px-16 text-center">
        {/* Simple greeting with subtle animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="font-mono text-xl md:text-2xl text-accent tracking-wide">
            Hi, my name is
          </span>
        </motion.div>

        {/* Name with large, bold style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight text-foreground">
            Shashank.
          </h1>
        </motion.div>

        {/* Tagline with large, bold style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-secondary text-nowrap">
            I build things for the web.
          </h2>
        </motion.div>

        {/* Bio text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-lg md:text-xl lg:text-2xl font-sans text-foreground/80 leading-relaxed">
            I'm a software engineer specializing in building end to end exceptional digital experiences.
          </p>
        </motion.div>

        {/* Animated Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center gap-6 mt-12"
        >
          {socialLinks.map(({ icon, href, label, color }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ 
                y: -5,
                scale: 1.1,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative p-3 rounded-lg border border-foreground/10 hover:border-accent/50 transition-all"
              style={{ color }}
            >
              <div className="text-foreground/70 group-hover:text-current transition-colors">
                {icon}
              </div>
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap"
                style={{ color }}
              >
                {label}
              </motion.span>
            </motion.a>
          ))}
        </motion.div>

        {/* Subtle background elements using theme colors */}
        <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-accent/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-0 w-72 h-72 rounded-full bg-primary/20 blur-3xl"></div>
      </div>
    </Section>
  );
};

export default HeroSection;
