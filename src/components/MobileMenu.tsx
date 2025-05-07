import * as motion from "motion/react-client";
import { Section } from "./NavSections";
import { SectionId } from "./Navbar";
import { AnimatePresence } from "motion/react";
import { MoonIcon, SunIcon } from "lucide-react";

const MobileMenu = ({
    isOpen,
    onClose,
    sections,
    scrollToSection,
    theme,
    toggleTheme
}: {
    isOpen: boolean;
    onClose: () => void;
    sections: readonly Section[];
    scrollToSection: (id: SectionId) => void;
    theme: string;
    toggleTheme: () => void;
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    {/* Sidebar Menu */}
                    <motion.div
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation menu"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed right-0 top-0 h-full w-[75%] sm:w-[60%] 
                        bg-background z-[60] p-6 flex flex-col gap-6 pt-20"
                    >
                        <nav className="flex flex-col gap-6">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className="text-left text-foreground/90 hover:text-accent text-lg font-semibold
                            transition-colors hover:pl-2 cursor-pointer focus:outline-none 
                            focus:text-accent focus:pl-2"
                                    aria-label={`Navigate to ${section.name} section`}
                                >
                                    <motion.span
                                        whileHover={{ x: 10 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        {section.name}
                                    </motion.span>
                                </button>
                            ))}
                        </nav>

                        <div className="mt-auto">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-primary/10 transition-transform hover:scale-110
                            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                                aria-label={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
                            >
                                {theme === "light" ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;