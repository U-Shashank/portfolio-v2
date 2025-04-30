"use client"

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Sections/HeroSection";
import AboutSection from "@/components/Sections/AboutSection";
import ProjectsSection from "@/components/Sections/ProjectsSection";
import SkillsSection from "@/components/Sections/SkillsSection";
import ContactSection from "@/components/Sections/ContactSection";
import { useRef } from "react";
import ParticlesEffect from "@/components/ParticlessEffect";

export default function Home() {

  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  return (
    <>
      <Navbar sectionRefs={{
        home: homeRef,
        about: aboutRef,
        projects: projectsRef,
        skills: skillsRef,
        contact: contactRef,
      }} />

      <main className="">
        <HeroSection ref={homeRef}/>
        <AboutSection ref={aboutRef}/>
        <ProjectsSection ref={projectsRef}/>
        <SkillsSection ref={skillsRef}/>
        <ContactSection ref={contactRef}/>
      </main>
    </>
  );
}