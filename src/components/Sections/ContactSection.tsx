import Section from "../Section"

const ContactSection = ({ref} : {ref: React.RefObject<HTMLElement | null>}) => {
    return (
        <Section id="contact" title="Get In Touch" ref={ref}>
            <div className="max-w-md mx-auto w-full">
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full bg-background border border-secondary/20 rounded-lg px-4 py-3"
                    />
                    <button className="w-full bg-accent text-background py-3 rounded-lg font-medium">
                        Send Message
                    </button>
                </div>
            </div>
        </Section>
    )
}

export default ContactSection