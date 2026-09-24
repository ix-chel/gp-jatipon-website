import React from "react";
import { Clock, CheckCircle2, FileEdit, Archive, Calendar } from "lucide-react";
import type { BoostStatus } from "../../types";

export type AdminStatus = BoostStatus | "upcoming" | "completed";

interface StatusBadgeProps {
  status: AdminStatus | string;
  size?: "sm" | "md";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = "sm" }) => {
  const normalized = status.toLowerCase();
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs";

  switch (normalized) {
    case "published":
      return (
        <span
          className={`inline-flex items-center gap-1 font-medium rounded-full bg-emerald-950/40 text-emerald-300 border border-emerald-500/25 ${sizeClasses}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Published</span>
        </span>
      );

    case "scheduled":
      return (
        <span
          className={`inline-flex items-center gap-1 font-medium rounded-full bg-amber-950/40 text-amber-300 border border-amber-500/25 ${sizeClasses}`}
        >
          <Clock className="w-3 h-3 text-amber-400" />
          <span>Scheduled</span>
        </span>
      );

    case "draft":
      return (
        <span
          className={`inline-flex items-center gap-1 font-medium rounded-full bg-neutral-800/80 text-neutral-300 border border-neutral-700/60 ${sizeClasses}`}
        >
          <FileEdit className="w-3 h-3 text-neutral-400" />
          <span>Draft</span>
        </span>
      );

    case "archived":
      return (
        <span
          className={`inline-flex items-center gap-1 font-medium rounded-full bg-neutral-900 text-neutral-400 border border-neutral-800 ${sizeClasses}`}
        >
          <Archive className="w-3 h-3 text-neutral-500" />
          <span>Archived</span>
        </span>
      );

    case "upcoming":
      return (
        <span
          className={`inline-flex items-center gap-1 font-medium rounded-full bg-blue-950/40 text-blue-300 border border-blue-500/25 ${sizeClasses}`}
        >
          <Calendar className="w-3 h-3 text-blue-400" />
          <span>Mendatang</span>
        </span>
      );

    case "completed":
      return (
        <span
          className={`inline-flex items-center gap-1 font-medium rounded-full bg-neutral-800/70 text-neutral-300 border border-neutral-700/50 ${sizeClasses}`}
        >
          <CheckCircle2 className="w-3 h-3 text-neutral-400" />
          <span>Selesai</span>
        </span>
      );

    default:
      return (
        <span
          className={`inline-flex items-center gap-1 font-medium rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 ${sizeClasses}`}
        >
          <span>{status}</span>
        </span>
      );
  }
};
