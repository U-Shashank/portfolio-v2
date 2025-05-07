import { SectionId } from "./Navbar";

export type Section = {
    name: string;
    id: SectionId;
};

// Desktop Navigation Links
const NavSections = ({
    sections,
    scrollToSection
}: {
    sections: readonly Section[];
    scrollToSection: (id: SectionId) => void;
}) => {
    return (
        <div className="hidden md:flex items-center gap-8">
            {sections.map((section) => (
                <div key={section.id} className="group relative">
                    <button
                        onClick={() => scrollToSection(section.id)}
                        className="text-foreground/80 hover:text-accent transition-all duration-400 text-base font-medium cursor-pointer focus:outline-none rounded-sm"
                        aria-label={`Navigate to ${section.name} section`}
                    >
                        {section.name}
                    </button>
                    <span
                        className="absolute left-0 bottom-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"
                    ></span>
                </div>
            ))}
        </div>
    );
};

export default NavSections;