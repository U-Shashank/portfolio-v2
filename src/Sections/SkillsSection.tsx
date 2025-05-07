import Section from "../components/Section";
import * as motion from "motion/react-client";
import skillGroups from "@/constants/skillGroups";

const SkillsSection = ({ ref }: { ref: React.RefObject<HTMLElement | null> }) => {
  return (
    <Section id="skills" title="Technical Skills" ref={ref}>
      <div className="max-w-6xl mx-auto space-y-12">
        {skillGroups.map((group, groupIndex) => (
          <motion.div 
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-medium text-foreground pl-2 border-l-4 border-accent">
              {group.title}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {group.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: skillIndex * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background border border-secondary/10 hover:border-accent/30 transition-all"
                >
                  {skill.icon ? (
                    <div className="w-10 h-10">
                      {skill.icon}
                    </div>
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center text-2xl font-bold text-accent">
                      {skill.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm font-medium text-center text-foreground/90">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default SkillsSection;