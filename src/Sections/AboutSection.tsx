import * as motion from "motion/react-client";
import Image from "next/image";
import shashank from "@/assets/shashank.jpg";
import Section from "../components/Section";
import GitHubCalendar from "@/components/GithubCalender";

const cardVariants = {
  offscreen: { y: 20, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const AboutSection = ({
  ref,
}: {
  ref: React.RefObject<HTMLElement | null>;
}) => {
  return (
    <Section id="about" title="About Me" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Top Row - Bio + Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="flex flex-col md:flex-row gap-8 mb-8"
        >
          {/* Bio Section */}
          <motion.div
            className="flex-1 space-y-6 text-center text-center sm:text-left"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="text-lg leading-relaxed font-sans text-balance"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              I'm a{" "}
              <span className="text-accent font-medium">
                passionate builder
              </span>{" "}
              fascinated by creating technology that solves real problems.
              There's magic in transforming ideas into products that people
              genuinely find useful.
            </motion.p>

            <motion.p
              className="text-lg leading-relaxed font-sans text-balance"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              I thrive when working on{" "}
              <span className="text-accent font-medium">scalable systems</span>{" "}
              with teams that challenge me to grow. Whether it's crafting
              elegant interfaces or designing robust architectures, I care
              deeply about the details that make technology accessible and
              delightful.
            </motion.p>

            <motion.div
              className="space-y-4 pt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h3 className="font-mono text-sm uppercase tracking-wider text-foreground/80">
                Technologies I've worked with recently:
              </h3>
              <div className="flex justify-center sm:justify-start">
                <div className="grid grid-cols-2 gap-8">
                  <ul className="space-y-2 font-mono text-sm">
                    {["JavaScript (ES6+)", "React", "Node.js"].map(
                      (tech, i) => (
                        <motion.li
                          key={tech}
                          className="flex items-center gap-2"
                          initial={{ x: -10, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                        >
                          <span className="text-accent">→</span>
                          <span>{tech}</span>
                        </motion.li>
                      )
                    )}
                  </ul>
                  <ul className="space-y-2 font-mono text-sm">
                    {["TypeScript", "Next.js", "Postgres"].map((tech, i) => (
                      <motion.li
                        key={tech}
                        className="flex items-center gap-2"
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                      >
                        <span className="text-accent">→</span>
                        <span>{tech}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="flex-shrink-0 w-2/3 aspect-square md:w-[300px] h-[300px] mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative group w-full h-full">
              <motion.div
                className="relative w-full h-full overflow-hidden rounded-xl shadow-lg border-4 border-accent"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={shashank}
                  alt="Shashank Upadhyay"
                  fill
                  className="object-cover"
                  priority
                />
                <motion.div
                  className="absolute inset-0 bg-black/10 opacity-0 rounded-xl"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <GitHubCalendar username="U-Shashank" />
      </div>
    </Section>
  );
};

export default AboutSection;
