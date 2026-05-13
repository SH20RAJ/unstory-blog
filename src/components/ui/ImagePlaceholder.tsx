import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ImagePlaceholderProps {
  text?: string;
  className?: string;
}

export function ImagePlaceholder({ text = "UNSTORY", className }: ImagePlaceholderProps) {
  return (
    <div className={cn(
      "w-full h-full relative overflow-hidden flex items-center justify-center",
      "bg-gradient-to-br from-premium-gray via-white to-premium-gray",
      className
    )}>
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-brand)_1px,_transparent_1px)] [background-size:24px_24px]" />
      </div>
      
      {/* Centered Logo text */}
      <div className="relative z-10 flex flex-col items-center">
        <span className="text-un-text/5 font-serif text-[12vw] lg:text-[8vw] font-bold tracking-tighter leading-none select-none">
          {text}
        </span>
        <div className="w-12 h-1 bg-brand/20 mt-4 animate-pulse" />
      </div>
      
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
    </div>
  );
}
