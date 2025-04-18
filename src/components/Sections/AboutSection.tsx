import Section from "../Section"

const AboutSection = ({ref} : {ref: React.RefObject<HTMLElement | null>}) => {
    return (
        <Section id="about" title="About Me" ref={ref}>
            <div className="max-w-4xl mx-auto">
                <p className="text-lg mb-6">
                    Passionate developer with expertise in modern web technologies...
                </p>
            </div>
        </Section>
    )
}

export default AboutSection