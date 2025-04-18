import Section from "../Section"

const SkillsSection = ({ref} : {ref: React.RefObject<HTMLElement | null>}) => {
    return (
        <Section id="skills" title="My Skills" ref={ref}>
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["React", "TypeScript", "Node.js", "Next.js"].map((skill) => (
                        <div
                            key={skill}
                            className="bg-primary/10 text-center py-3 rounded-lg"
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}

export default SkillsSection