import Section from "../Section"

const ProjectsSection = ({ref} : {ref: React.RefObject<HTMLElement | null>}) => {
    return (
        <Section id="projects" title="My Projects" ref={ref}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Project cards will go here */}
                <div className="border border-secondary/20 rounded-lg p-6">
                    Project 1
                </div>
                <div className="border border-secondary/20 rounded-lg p-6">
                    Project 2
                </div>
            </div>
        </Section>
    )
}

export default ProjectsSection