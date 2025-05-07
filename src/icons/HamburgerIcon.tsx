const HamburgerIcon = ({ open }: { open: boolean }) => {
    return (
        <div className="relative w-6 h-5 transition-all duration-300 ease-in-out z-[100]" aria-hidden="true">
            <span
                className={`absolute left-0 h-[2px] w-full bg-foreground transform transition-all duration-300 ${open ? "rotate-45 top-2.5" : "top-0"
                    }`}
            />
            <span
                className={`absolute left-0 h-[2px] w-full bg-foreground transition-all duration-300 ${open ? "opacity-0" : "top-2.5"
                    }`}
            />
            <span
                className={`absolute left-0 h-[2px] w-full bg-foreground transform transition-all duration-300 ${open ? "-rotate-45 top-2.5" : "bottom-0"
                    }`}
            />
        </div>
    );
}

export default HamburgerIcon;