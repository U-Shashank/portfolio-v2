import { MoonIcon, SunIcon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

const ThemeToggle = ({ 
  theme, 
  toggleTheme 
}: { 
  theme: string;
  toggleTheme: () => void;
}) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-primary/10 hover:scale-105 
                transition-transform duration-200 focus:outline-none"
      aria-label={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -40 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 40 }}
          transition={{ duration: 0.2 }}
        >
          {theme === "light" ? (
            <MoonIcon className="w-5 h-5 text-foreground" />
          ) : (
            <SunIcon className="w-5 h-5 text-foreground" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;