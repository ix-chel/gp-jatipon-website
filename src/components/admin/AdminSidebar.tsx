import React from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Flame,
  FileText,
  Calendar,
  Archive,
  ExternalLink,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onCloseMobile }) => {
  const [location] = useLocation();
  const { user, role, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/admin/login";
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      isActive: location === "/" || location === "/dashboard",
    },
    {
      label: "BOOST",
      href: "/boost",
      icon: Flame,
      isActive: location.startsWith("/boost"),
    },
    {
      label: "Content",
      href: "/content",
      icon: FileText,
      isActive: location.startsWith("/content"),
    },
    {
      label: "Activities",
      href: "/activities",
      icon: Calendar,
      isActive: location.startsWith("/activities"),
    },
    {
      label: "Archives",
      href: "/archives",
      icon: Archive,
      isActive: location.startsWith("/archives"),
    },
  ];

  const adminEmail = user?.email || "admin@gpjatipon.org";
  const userInitials = adminEmail.slice(0, 2).toUpperCase();

  return (
    <aside className="w-64 bg-[#0a0f1d] border-r border-[#1a233a] flex flex-col h-full text-slate-200 select-none">
      {/* Brand Header */}
      <div className="p-5 pb-4 border-b border-[#1a233a] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 font-sans">
              EDITORIAL CMS
            </span>
          </div>
          <h1 className="text-base font-bold text-white tracking-tight mt-0.5 font-sans">
            GP Jatipon
          </h1>
        </div>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Navigation Scrollable */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Workspace section */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
            Workspace
          </div>
          <nav className="space-y-1" aria-label="Menu Utama">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    item.isActive
                      ? "bg-blue-600/15 text-blue-300 font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  }`}
                >
                  {/* Subtle active left bar indicator */}
                  {item.isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-blue-500" />
                  )}
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      item.isActive
                        ? "text-blue-400"
                        : "text-slate-500 group-hover:text-slate-300"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* System section */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
            System
          </div>
          <div className="space-y-1">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-slate-300 shrink-0" />
                <span>Preview Website</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">↗</span>
            </a>

            <button
              type="button"
              onClick={() => alert("Pengaturan sistem GP Jatipon dikelola melalui akun Administrator.")}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 transition-colors text-left cursor-pointer"
            >
              <Settings className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Section Bottom */}
      <div className="p-3 border-t border-[#1a233a] bg-[#070b15]/70">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-blue-900/50 border border-blue-500/40 text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
            {userInitials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-200 truncate">
              {adminEmail}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-slate-400 font-mono uppercase">
                {role ?? "staff"}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="mt-2 w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar (Sign Out)</span>
        </button>
      </div>
    </aside>
  );
};
