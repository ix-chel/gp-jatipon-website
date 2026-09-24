import React from "react";
import { useLocation } from "wouter";
import { Menu, ExternalLink } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface AdminTopbarProps {
  onOpenMobileMenu: () => void;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({ onOpenMobileMenu }) => {
  const [location] = useLocation();
  const { user } = useAuth();

  // Compute title & breadcrumb based on current location
  const getContextInfo = () => {
    if (location === "/" || location === "/dashboard") {
      return {
        title: "Dashboard",
        breadcrumb: "Admin / Dashboard",
      };
    }
    if (location === "/boost/new") {
      return {
        title: "Tulis BOOST Baru",
        breadcrumb: "Admin / BOOST / Editor",
      };
    }
    if (location.startsWith("/boost/") && location.endsWith("/edit")) {
      return {
        title: "Edit Renungan BOOST",
        breadcrumb: "Admin / BOOST / Editor",
      };
    }
    if (location.startsWith("/boost")) {
      return {
        title: "BOOST (Renungan)",
        breadcrumb: "Admin / BOOST",
      };
    }
    if (location.startsWith("/content")) {
      return {
        title: "Content & Publikasi",
        breadcrumb: "Admin / Content",
      };
    }
    if (location.startsWith("/activities")) {
      return {
        title: "Activities & Agenda",
        breadcrumb: "Admin / Activities",
      };
    }
    if (location.startsWith("/archives")) {
      return {
        title: "Digital Archives",
        breadcrumb: "Admin / Archives",
      };
    }
    return {
      title: "Admin",
      breadcrumb: "Admin",
    };
  };

  const { title, breadcrumb } = getContextInfo();
  const userInitials = (user?.email || "Admin").slice(0, 2).toUpperCase();

  return (
    <header className="h-16 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-[#1a233a] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile trigger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
            {breadcrumb}
          </div>
          <h2 className="text-sm sm:text-base font-semibold text-white tracking-tight leading-tight">
            {title}
          </h2>
        </div>
      </div>

      {/* Right: Actions & Status */}
      <div className="flex items-center gap-4">
        {/* Status indicator */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-500/20" />
          <span>Sistem Aktif</span>
        </div>

        {/* View website link */}
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Lihat Website</span>
        </a>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-300 flex items-center justify-center font-bold text-xs font-mono">
          {userInitials}
        </div>
      </div>
    </header>
  );
};
