import React from "react";

interface MetricBlockProps {
  label: string;
  value: string | number;
  description: string;
  badge?: string;
  highlight?: boolean;
}

export const MetricBlock: React.FC<MetricBlockProps> = ({
  label,
  value,
  description,
  badge,
  highlight = false,
}) => {
  return (
    <div
      className={`p-4 rounded-xl border transition-all ${
        highlight
          ? "bg-slate-900/90 border-blue-500/30 shadow-sm"
          : "bg-neutral-900/70 border-neutral-800 hover:border-neutral-700/80"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
          {label}
        </span>
        {badge && (
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700/50">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-2.5 flex items-baseline gap-2">
        <span
          className={`text-2xl sm:text-3xl font-bold tracking-tight font-sans ${
            highlight ? "text-blue-400" : "text-white"
          }`}
        >
          {value}
        </span>
      </div>

      <p className="mt-1 text-xs text-neutral-400 font-normal">
        {description}
      </p>
    </div>
  );
};
