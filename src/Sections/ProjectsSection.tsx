import { useState } from "react";
import Section from "../components/Section";
import { FaGithub, FaExternalLinkAlt, FaUsers, FaFolder, FaPlay } from "react-icons/fa";
import * as motion from "motion/react-client";
import projects from "@/constants/projects";

type Project = {
  title: string;
  description: string;
  tech: string[];
  videoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  collaborators?: string[];
  highlighted?: boolean;
};

const ProjectsSection = ({ ref }: { ref: React.RefObject<HTMLElement | null> }) => {
  const [videoPlaying, setVideoPlaying] = useState<Record<number, boolean>>({});

  const highlightedProjects = projects.filter(p => p.highlighted);
  const regularProjects = projects.filter(p => !p.highlighted);

  return (
    <Section id="projects" title="Projects Showcase" ref={ref} className="space-y-12">
      {/* Highlighted Projects - Alternating Layout */}
      <div className="space-y-24">
        {highlightedProjects.map((project, index) => (
          <div 
            key={index} 
            className="grid grid-cols-1 gap-8 lg:grid-cols-2"
          >
            {/* Video Column - Left for even indexes, Right for odd indexes */}
            <div className={`relative aspect-video overflow-hidden rounded-xl bg-secondary/10 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
              {project.videoUrl && (
                <div className="absolute inset-0">
                  <iframe
                    src={`${project.videoUrl}?autoplay=${videoPlaying[index] ? 1 : 0}`}
                    className="h-full w-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    onPlay={() => setVideoPlaying(prev => ({ ...prev, [index]: true }))}
                    onPause={() => setVideoPlaying(prev => ({ ...prev, [index]: false }))}
                  />
                </div>
              )}
              {!videoPlaying[index] && (
                <button
                  onClick={() => setVideoPlaying(prev => ({ ...prev, [index]: true }))}
                  className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-accent p-4 text-white shadow-lg transition-all hover:scale-110"
                  aria-label="Play video"
                >
                  <FaPlay className="h-8 w-8 fill-current" />
                </button>
              )}
            </div>

            {/* Content Column - Right for even indexes, Left for odd indexes */}
            <div className={`flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-3xl font-bold text-foreground">{project.title}</h3>
                <p className="my-4 text-lg text-foreground/80">{project.description}</p>
                
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-accent/10 px-3 py-1 text-sm text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground hover:text-accent"
                    >
                      <FaGithub className="h-5 w-5" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground hover:text-accent"
                    >
                      <FaExternalLinkAlt className="h-5 w-5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.collaborators && (
                    <div className="flex items-center gap-2 text-foreground/70">
                      <FaUsers className="h-5 w-5" />
                      <span>{project.collaborators.join(", ")}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Regular Projects Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {regularProjects.map((project, index) => (
          <RegularProject key={index} project={project} />
        ))}
      </div>
    </Section>
  );
};

// RegularProject component remains the same
const RegularProject = ({ project }: { project: Project }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-lg border border-secondary/10 bg-card p-6 transition-all hover:shadow-md"
    >
      <div className="mb-4 flex items-start justify-between">
        <FaFolder className="h-8 w-8 text-accent" />
        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 hover:text-accent"
              aria-label="GitHub repository"
            >
              <FaGithub className="h-5 w-5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 hover:text-accent"
              aria-label="Live demo"
            >
              <FaExternalLinkAlt className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>

      <h3 className="mb-2 text-xl font-semibold text-foreground">{project.title}</h3>
      <p className="mb-4 text-foreground/70">{project.description}</p>
      
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech, i) => (
          <span key={i} className="text-xs text-foreground/50">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsSection;
