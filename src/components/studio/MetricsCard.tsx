import { LucideIcon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MetricsCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color: "brand" | "success" | "warning" | "error";
}

export function MetricsCard({ label, value, icon: Icon, color }: MetricsCardProps) {
  const colors = {
    brand: "bg-brand/10 text-brand",
    success: "bg-green-500/10 text-green-500",
    warning: "bg-yellow-500/10 text-yellow-500",
    error: "bg-red-500/10 text-red-500",
  };

  return (
    <div className="p-6 rounded-xl bg-un-surface border border-un-border group hover:border-brand/30 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-2 rounded-lg", colors[color])}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
      </div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-un-muted">
        {label}
      </p>
    </div>
  );
}
