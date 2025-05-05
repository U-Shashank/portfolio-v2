import { useState, useEffect, useRef } from "react";
import Section from "../Section";
import { Github, ExternalLink, Users, Folder, Play } from "lucide-react";
import * as motion from "motion/react-client";

type Project = {
  title: string;
  description: string;
  tech: string[];
  videoUrl?: string; // Google Drive embed URL
  githubUrl?: string;
  liveUrl?: string;
  collaborators?: string[];
  highlighted?: boolean;
};

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "Full-featured online store with cart, checkout, and admin dashboard.",
    tech: ["Next.js", "TypeScript", "Stripe"],
    videoUrl: "https://drive.google.com/file/d/1SQkj6hICsdPVvpve6uqOsgkKy3xwdO0A/preview",
    githubUrl: "#",
    liveUrl: "#",
    collaborators: ["@designer1"],
    highlighted: true
  },
  // Add more projects...
];

const ProjectsSection = ({ ref }: { ref: React.RefObject<HTMLElement | null> }) => {
  const [activeHighlight, setActiveHighlight] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate only when video isn't playing
  useEffect(() => {
    if (!isVideoPlaying) {
      const highlighted = projects.filter(p => p.highlighted);
      intervalRef.current = setInterval(() => {
        setActiveHighlight(prev => (prev + 1) % highlighted.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVideoPlaying]);

  const highlightedProjects = projects.filter(p => p.highlighted);
  const regularProjects = projects.filter(p => !p.highlighted);

  return (
    <Section id="projects" title="My Projects" ref={ref} className="space-y-12">
      {/* Highlighted Projects Slideshow */}
      <div className="relative w-full">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Video Player Column */}
          <div className="relative aspect-video overflow-hidden rounded-xl bg-secondary/10">
            {highlightedProjects.map((project, index) => (
              project.videoUrl && (
                <motion.div
                  key={index}
                  className={`absolute inset-0 ${index === activeHighlight ? 'z-10' : 'z-0'}`}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: index === activeHighlight ? 1 : 0,
                    transition: { duration: 0.5 }
                  }}
                >
                  <iframe
                    src={`${highlightedProjects[activeHighlight].videoUrl}?autoplay=${isVideoPlaying ? 1 : 0}`}
                    className="h-full w-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                  />
                </motion.div>
              )
            ))}
            {!isVideoPlaying && (
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-accent p-4 text-white shadow-lg transition-all hover:scale-110"
                aria-label="Play video"
              >
                <Play className="h-8 w-8 fill-current" />
              </button>
            )}
          </div>

          {/* Content Column */}
          <div className="flex flex-col justify-center">
            {highlightedProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: index === activeHighlight ? 1 : 0,
                  x: index === activeHighlight ? 0 : 20,
                  transition: { duration: 0.5 }
                }}
                className={`${index === activeHighlight ? 'block' : 'hidden'}`}
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
                      <Github className="h-5 w-5" />
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
                      <ExternalLink className="h-5 w-5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.collaborators && (
                    <div className="flex items-center gap-2 text-foreground/70">
                      <Users className="h-5 w-5" />
                      <span>{project.collaborators.join(", ")}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Slideshow Controls */}
            <div className="mt-8 flex gap-2">
              {highlightedProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveHighlight(index);
                    setIsVideoPlaying(false);
                    clearInterval(intervalRef.current as NodeJS.Timeout);
                  }}
                  className={`h-2 rounded-full transition-all ${index === activeHighlight ? 'bg-accent w-6' : 'bg-secondary/50 w-2'}`}
                  aria-label={`View project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
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

// RegularProject component remains the same as previous example
const RegularProject = ({ project }: { project: Project }) => {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className="rounded-lg border border-secondary/10 bg-card p-6 transition-all hover:shadow-md"
      >
        <div className="mb-4 flex items-start justify-between">
          <Folder className="h-8 w-8 text-accent" />
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-accent"
                aria-label="GitHub repository"
              >
                <Github className="h-5 w-5" />
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
                <ExternalLink className="h-5 w-5" />
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