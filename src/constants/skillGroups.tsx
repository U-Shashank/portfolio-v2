import { SiPython, SiJavascript, SiTypescript, SiC, SiCplusplus, SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiTailwindcss, SiMongodb, SiPostgresql, SiPrisma, SiRedis, SiGit, SiDocker, SiGooglecloud, SiLinux, SiKubernetes, SiGithubactions } from "react-icons/si";

const skillGroups = [
  {
    title: "Programming Languages",
    skills: [
    { name: "Python", icon: <SiPython className="w-full h-full" /> },
    { name: "JavaScript", icon: <SiJavascript className="w-full h-full" /> },
    { name: "TypeScript", icon: <SiTypescript className="w-full h-full" /> },
    { name: "C++", icon: <SiCplusplus className="w-full h-full" /> },
    ]
  },
  {
    title: "Web Development",
    skills: [
    { name: "React", icon: <SiReact className="w-full h-full" /> },
    { name: "Next.js", icon: <SiNextdotjs className="w-full h-full" /> },
    { name: "Node.js", icon: <SiNodedotjs className="w-full h-full" /> },
    { name: "Express.js", icon: <SiExpress className="w-full h-full" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="w-full h-full" /> },
    { name: "RESTful APIs" }
    ]
  },
  {
    title: "Database & Caching",
    skills: [
    { name: "MongoDB", icon: <SiMongodb className="w-full h-full" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="w-full h-full" /> },
    { name: "Prisma ORM", icon: <SiPrisma className="w-full h-full" /> },
    { name: "Redis", icon: <SiRedis className="w-full h-full" /> }
    ]
  },
  {
    title: "Tools and DevOps",
    skills: [
    { name: "Git", icon: <SiGit className="w-full h-full" /> },
    { name: "Docker", icon: <SiDocker className="w-full h-full" /> },
    { name: "Google Cloud", icon: <SiGooglecloud className="w-full h-full" /> },
    { name: "Kubernetes", icon: <SiKubernetes className="w-full h-full" /> },
    { name: "GitHub Actions", icon: <SiGithubactions className="w-full h-full" /> }
    ]
  }
  ];

  export default skillGroups;