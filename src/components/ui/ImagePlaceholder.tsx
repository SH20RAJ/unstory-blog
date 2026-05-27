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
      "w-full h-full relative overflow-hidden flex items-center justify-center bg-un-surface",
      className
    )}>
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--un-text)_1px,transparent_1px),linear-gradient(0deg,var(--un-text)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>
      
      <div className="absolute inset-x-6 top-6 border-t border-un-border" />
      <div className="absolute inset-x-6 bottom-6 border-t border-un-border" />
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <span className="text-un-text/15 font-serif text-[11vw] lg:text-[6vw] font-black leading-none select-none">
          {text}
        </span>
        <span className="mt-4 text-[10px] font-black uppercase tracking-[0.28em] text-brand">
          Daily File
        </span>
      </div>
    </div>
  );
}
