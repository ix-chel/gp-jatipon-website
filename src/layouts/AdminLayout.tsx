import React from "react";
import { AdminShell } from "../components/admin/AdminShell";

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AdminShell>{children}</AdminShell>;
};
