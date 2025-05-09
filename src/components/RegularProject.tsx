import { Project } from "@/Sections/ProjectsSection";
import * as motion from "motion/react-client"
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaFolder, FaGithub } from "react-icons/fa6";

const RegularProject = ({
    project,
    index,
    isHovered,
    setHovered
}: {
    project: Project;
    index: number;
    isHovered: boolean;
    setHovered: (isHovered: boolean) => void;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            whileHover={{ y: -8, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.25)" }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="group relative rounded-xl border border-secondary/10 bg-card p-6 transition-all"
        >
            <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            <div className="mb-4 flex items-start justify-between">
                <motion.div
                    animate={{
                        rotate: isHovered ? 10 : 0,
                        scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <FaFolder className="h-10 w-10 text-accent" />
                </motion.div>
                <div className="flex gap-3">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/50 transition-colors hover:text-accent"
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
                            className="text-foreground/50 transition-colors hover:text-accent"
                            aria-label="Live demo"
                        >
                            <FaExternalLinkAlt className="h-5 w-5" />
                        </a>
                    )}
                </div>
            </div>

            <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-accent transition-colors">{project.title}</h3>
            <p className="mb-6 text-foreground/70">{project.description}</p>

            <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.slice(0, 4).map((tech, i) => (
                    <span key={i} className="text-sm text-foreground/50 transition-colors group-hover:text-foreground/70">
                        {tech}
                        {i < Math.min(project.tech.length, 4) - 1 && <span className="mx-1">•</span>}
                    </span>
                ))}
                {project.tech.length > 4 && (
                    <span className="text-sm text-foreground/50">+{project.tech.length - 4}</span>
                )}
            </div>
        </motion.div>
    );
};

export default RegularProject;