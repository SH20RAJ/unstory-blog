"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  Tag, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  ExternalLink
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/studio", icon: LayoutDashboard },
    { label: "Briefings", href: "/studio/articles", icon: FileText },
    { label: "Categories", href: "/studio/categories", icon: Layers },
    { label: "Topics", href: "/studio/topics", icon: Tag },
    { label: "Intelligence Media", href: "/studio/media", icon: ImageIcon },
    { label: "Configurations", href: "/studio/settings", icon: Settings },
  ];

  return (
    <aside className="w-72 border-r border-un-border flex flex-col bg-un-bg/50 backdrop-blur-xl">
      <div className="p-10 border-b border-un-border">
        <Link href="/" className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold text-white tracking-tighter">UNSTORY</span>
            <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></div>
          </div>
          <span className="text-[10px] uppercase tracking-[0.4em] text-un-muted font-bold">
            Editorial <span className="text-brand">Studio</span>
          </span>
        </Link>
      </div>

      <nav className="flex-grow p-6 space-y-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/studio" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-4 px-5 py-4 rounded-none text-xs font-bold uppercase tracking-widest transition-all border-l-2",
                isActive 
                  ? "bg-brand/5 text-brand border-brand shadow-[inset_0_0_20px_rgba(225,29,72,0.05)]" 
                  : "text-un-muted border-transparent hover:text-white hover:border-brand/30"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-brand" : "text-un-muted group-hover:text-white")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-un-border space-y-3 bg-un-surface/30">
        <Link 
          href="/" 
          target="_blank"
          className="flex items-center space-x-4 px-5 py-4 text-xs font-bold uppercase tracking-widest text-un-muted hover:text-brand transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Live Site</span>
        </Link>
        <button className="w-full flex items-center space-x-4 px-5 py-4 text-xs font-bold uppercase tracking-widest text-red-500/60 hover:text-red-500 transition-all text-left">
          <LogOut className="w-4 h-4" />
          <span>Terminate Session</span>
        </button>
      </div>
    </aside>
  );
}
