import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] text-primary bg-background items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-playfair">
      Hello world
      <ThemeToggle />
    </div>
  );
}
