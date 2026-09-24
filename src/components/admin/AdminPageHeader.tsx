import React from "react";

interface AdminPageHeaderProps {
  title: string;
  eyebrow?: string;
  description?: string;
  actions?: React.ReactNode;
}

export const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({
  title,
  eyebrow,
  description,
  actions,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-neutral-800/80">
      <div>
        {eyebrow && (
          <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-400 mb-1">
            {eyebrow}
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-neutral-400 max-w-2xl leading-normal">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2.5 shrink-0 sm:self-center">
          {actions}
        </div>
      )}
    </div>
  );
};
