import Section from "../Section"

const HeroSection = ({ref} : {ref: React.RefObject<HTMLElement | null>}) => {
    return (
        <Section id="home" title="" className="justify-center items-center" ref = {ref}>
            <div className="text-center">
                <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6">
                    Hi, I'm <span className="text-accent">YourName</span>
                </h1>
                <p className="text-xl md:text-2xl text-secondary max-w-2xl mx-auto">
                    Full Stack Developer crafting beautiful, functional web experiences
                </p>
            </div>
        </Section>
    )
}

export default HeroSection