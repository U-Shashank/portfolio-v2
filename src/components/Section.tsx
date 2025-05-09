import * as motion from "motion/react-client";
import { ReactNode } from "react";

const Section = ({
    id,
    title,
    children,
    className = "",
    ref
}: {
    id: string;
    title: string;
    children: ReactNode;
    className?: string;
    ref: React.RefObject<HTMLElement | null>
}) => {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`min-h-screen py-20 px-6 flex flex-col ${className}`}
            ref={ref}
        >
            {title && (
                <motion.h2
                    className="text-4xl md:text-5xl font-serif font-bold mb-12 text-center overflow-hidden"
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <span className="relative inline-block">
                        {title}
                        <motion.span
                            className="absolute -bottom-4 left-1/4 right-1/4 h-0.5 bg-accent transform"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} // Using a named easing
                        />
                    </span>
                </motion.h2>
            )}
            {children}
        </motion.section>
    );
}

export default Section;


