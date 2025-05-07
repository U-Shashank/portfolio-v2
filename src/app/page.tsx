"use client"

import Navbar from "@/components/Navbar";
import HeroSection from "@/Sections/HeroSection";
import AboutSection from "@/Sections/AboutSection";
import ProjectsSection from "@/Sections/ProjectsSection";
import SkillsSection from "@/Sections/SkillsSection";
import ContactSection from "@/Sections/ContactSection";
import { useRef } from "react";
import ParticlesEffect from "@/components/ParticlesEffect";
import ExperienceSection from "@/Sections/ExperienceSection";

export default function Home() {

  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  return (
    <>
      <Navbar sectionRefs={{
        home: homeRef,
        about: aboutRef,
        experience: experienceRef,
        projects: projectsRef,
        skills: skillsRef,
        contact: contactRef,
      }} />

      <main className="">
        <HeroSection ref={homeRef}/>
        <AboutSection ref={aboutRef}/>
        <ExperienceSection ref={experienceRef}/>
        <ProjectsSection ref={projectsRef}/>
        <SkillsSection ref={skillsRef}/>
        <ContactSection ref={contactRef}/>
      </main>
    </>
  );
}