import HamburgerIcon from "@/icons/HamburgerIcon";

const MobileMenuButton = ({
    isOpen,
    onClick
}: {
    isOpen: boolean;
    onClick: () => void;
}) => {
    return (
        <button
            className="md:hidden p-2 z-[100] hover:scale-105 transition-transform
                  focus:outline-none rounded"
            onClick={onClick}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
        >
            <HamburgerIcon open={isOpen} />
        </button>
    );
};

export default MobileMenuButton;