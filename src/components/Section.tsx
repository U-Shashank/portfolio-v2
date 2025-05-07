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
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-center">
                    <span className="relative inline-block">
                        {title}
                        <span className="absolute -bottom-4 left-1/4 right-1/4 h-0.5 bg-accent transform"></span>
                    </span>
                </h2>
            )}
            {children}
        </motion.section>
    );
}

export default Section;