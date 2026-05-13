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
    { label: "Articles", href: "/studio/articles", icon: FileText },
    { label: "Categories", href: "/studio/categories", icon: Layers },
    { label: "Topics", href: "/studio/topics", icon: Tag },
    { label: "Media", href: "/studio/media", icon: ImageIcon },
    { label: "Settings", href: "/studio/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-premium-border flex flex-col">
      <div className="p-8 border-b border-premium-border">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-serif font-bold text-white tracking-tighter">UNSTORY</span>
          <span className="text-[8px] uppercase tracking-widest text-brand font-bold bg-brand/10 px-1.5 py-0.5 rounded">CMS</span>
        </Link>
      </div>

      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                isActive 
                  ? "bg-brand/10 text-brand" 
                  : "text-premium-muted hover:bg-premium-gray hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-premium-border space-y-2">
        <Link 
          href="/" 
          target="_blank"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-premium-muted hover:bg-premium-gray hover:text-white transition-all"
        >
          <ExternalLink className="w-5 h-5" />
          <span>View Website</span>
        </Link>
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500/80 hover:bg-red-500/10 hover:text-red-500 transition-all text-left">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
