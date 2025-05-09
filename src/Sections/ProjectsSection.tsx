import { useState } from "react";
import Section from "../components/Section";
import { FaGithub, FaExternalLinkAlt, FaUsers, FaPlay } from "react-icons/fa";
import * as motion from "motion/react-client";
import projects from "@/constants/projects";
import RegularProject from "@/components/RegularProject";

export type Project = {
  title: string;
  description?: string;
  tech: string[];
  videoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  collaborators?: string[];
  highlighted?: boolean;
};

const ProjectsSection = ({
  ref,
}: {
  ref: React.RefObject<HTMLElement | null>;
}) => {
  const [videoPlaying, setVideoPlaying] = useState<Record<number, boolean>>({});
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const highlightedProjects = projects.filter((p) => p.highlighted);
  const regularProjects = projects.filter((p) => !p.highlighted);

  return (
    <Section
      id="projects"
      title="Projects Showcase"
      ref={ref}
      className="space-y-16"
    >
      {/* Highlighted Projects - Alternating Layout */}
      <div className="space-y-32">
        {highlightedProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-1 gap-10 lg:grid-cols-2"
          >
            {/* Video Column - Left for even indexes, Right for odd indexes */}
            <div
              className={`relative aspect-video overflow-hidden rounded-xl bg-secondary/10 shadow-lg ${
                index % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              {project.videoUrl && (
                <div className="absolute inset-0 overflow-hidden transition-transform duration-500 hover:scale-105 rounded-xl">
                  <iframe
                    src={`${project.videoUrl}`}
                    className="h-full w-full"
                    allow="autoplay"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>

            {/* Content Column - Right for even indexes, Left for odd indexes */}
            <div
              className={`flex flex-col justify-center ${
                index % 2 === 1 ? "lg:order-1 lg:pr-8" : "lg:pl-8"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="mb-2 text-3xl font-bold text-foreground">
                  <span className="inline-block text-accent">
                    0{index + 1}.
                  </span>{" "}
                  {project.title}
                </h3>
                <p className="my-4 text-lg leading-relaxed text-foreground/80">
                  {project.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6">
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground transition-colors hover:text-accent"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub className="h-5 w-5" />
                      <span>Code</span>
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground transition-colors hover:text-accent"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt className="h-5 w-5" />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                  {project.collaborators &&
                    project.collaborators.length > 0 && (
                      <div className="flex items-center gap-2 text-foreground/70">
                        <FaUsers className="h-5 w-5" />
                        <span>{project.collaborators.join(", ")}</span>
                      </div>
                    )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Section Divider */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-secondary/20"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-6 text-lg font-medium text-accent">
            More Projects
          </span>
        </div>
      </div>

      {/* Regular Projects Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {regularProjects.map((project, index) => (
          <RegularProject
            key={index}
            project={project}
            index={index}
            isHovered={hoveredProject === index}
            setHovered={(isHovered) =>
              setHoveredProject(isHovered ? index : null)
            }
          />
        ))}
      </div>
    </Section>
  );
};

export default ProjectsSection;
