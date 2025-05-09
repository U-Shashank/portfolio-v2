import Section from "../components/Section";
import { useState } from "react";
import experiences from "@/constants/experience";
import * as motion from "motion/react-client";
const ExperienceSection = ({ ref }: { ref: React.RefObject<HTMLElement | null> }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Animation variants
  const tabButtonVariants = {
    initial: { opacity: 0, y: 10 },
    inView: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    }),
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    inView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const highlightVariants = {
    hidden: { opacity: 0, x: 10 },
    inView: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.2
      }
    })
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="inView"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Section id="experience" title="Work Experience" ref = {ref}>
        <motion.div
          initial="hidden"
          whileInView="inView"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl mx-auto mt-10"
        >
          <div className="flex flex-col md:flex-row">
            {/* Left side - Timeline tabs */}
            <motion.div 
              initial="hidden"
              whileInView="inView"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4 }}
              className="w-full md:w-48 flex-shrink-0 mb-8 md:mb-0 md:mr-8"
            >
              <div className="flex flex-col space-y-6">
                {experiences.map((exp, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    variants={tabButtonVariants}
                    initial="initial"
                    whileInView="inView"
                    whileHover="hover"
                    whileTap="tap"
                    custom={index}
                    viewport={{ once: true, amount: 0.1 }}
                    className={`text-left px-4 py-2 rounded transition-colors focus:outline-none ${
                      activeTab === index
                        ? "bg-accent/20 text-accent"
                        : "hover:bg-secondary/10 text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {exp.company}
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            {/* Right side - Content display */}
            <div className="w-full">
              <div className="relative w-full min-h-[300px]">
                <motion.div
                  key={activeTab}
                  variants={contentVariants}
                  initial="hidden"
                  whileInView="inView"
                  viewport={{ once: true, amount: 0.1 }}
                  className="w-full"
                >
                  <div className="mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">
                      {experiences[activeTab].role}
                    </h3>
                    
                    <div className="inline-block bg-accent/20 text-accent px-3 py-1 rounded text-sm font-medium mt-2">
                      {experiences[activeTab].company}
                    </div>
                    
                    <div className="text-sm text-foreground/60 mt-2">
                      {experiences[activeTab].period}
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mt-6">
                    {experiences[activeTab].highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        custom={i}
                        variants={highlightVariants}
                        initial="hidden"
                        whileInView="inView"
                        viewport={{ once: true, amount: 0.1 }}
                        className="flex items-start"
                      >
                        <span className="text-accent mr-3 mt-1">▹</span>
                        <span className="text-foreground/80">{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>
    </motion.div>
  );
};

export default ExperienceSection;