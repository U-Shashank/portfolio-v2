import Section from "../components/Section";
import { useState } from "react";
import experiences from "@/constants/experience";

const ExperienceSection = ({ ref }: {ref: React.RefObject<HTMLElement | null>}) => {
  const [activeTab, setActiveTab] = useState(0);  
  
  return (
    <Section id="experience" title="Work Experience" ref={ref}>
      <div className="w-full max-w-5xl mx-auto mt-10">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Timeline tabs */}
          <div className="w-full md:w-48 flex-shrink-0 mb-8 md:mb-0 md:mr-8">
            <div className="flex flex-col space-y-6">
              {experiences.map((exp, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`text-left px-4 py-2 rounded transition-colors focus:outline-none ${
                    activeTab === index
                      ? "bg-accent/20 text-accent"
                      : "hover:bg-secondary/10 text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {exp.company}
                </button>
              ))}
            </div>
          </div>
          
          {/* Right side - Content display */}
          <div className="w-full">
            <div className="relative w-full">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full transition-all duration-300 ${
                    activeTab === index 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <div className="mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">
                      {exp.role}
                    </h3>
                    
                    <div className="inline-block bg-accent/20 text-accent px-3 py-1 rounded text-sm font-medium mt-2">
                      {exp.company}
                    </div>
                    
                    <div className="text-sm text-foreground/60 mt-2">
                      {exp.period}
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mt-6">
                    {exp.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start"
                      >
                        <span className="text-accent mr-3 mt-1">▹</span>
                        <span className="text-foreground/80">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              {/* Spacer div to maintain layout height */}
              <div className="invisible" aria-hidden="true">
                <div className="mb-4">
                  <h3 className="text-xl md:text-2xl font-bold">&nbsp;</h3>
                  <div className="inline-block px-3 py-1 rounded text-sm font-medium mt-2">&nbsp;</div>
                  <div className="text-sm mt-2">&nbsp;</div>
                </div>
                <ul className="space-y-4 mt-6">
                  {experiences[activeTab].highlights.map((_, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-3 mt-1">&nbsp;</span>
                      <span>&nbsp;</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ExperienceSection;