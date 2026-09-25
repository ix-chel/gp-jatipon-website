import React, { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import type { Database } from "../types/database";

type AdminRole = Database["public"]["Enums"]["user_role"];

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  role: AdminRole | null;
  roleLoading: boolean;
  authError: string | null;
  isStaff: boolean;
  refreshRole: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<AdminRole | null>(null);
  const [roleLoading, setRoleLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const loadRole = async (userId: string) => {
    setRoleLoading(true);
    setAuthError(null);

    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        setRole(null);
        setAuthError(error.message);
      } else {
        setRole(data?.role ?? null);
      }
    } catch (error: unknown) {
      setRole(null);
      setAuthError(error instanceof Error ? error.message : "Failed to load admin role.");
    } finally {
      setRoleLoading(false);
    }
  };

  const applySession = async (nextSession: Session | null) => {
    setRoleLoading(!!nextSession?.user);
    setRole(null);
    setSession(nextSession);
    setUser(nextSession?.user ?? null);

    if (nextSession?.user) {
      await loadRole(nextSession.user.id);
    } else {
      setRole(null);
      setRoleLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    supabase.auth
      .getSession()
      .then(async ({ data, error }) => {
        if (!isMounted) return;
        if (error) {
          setAuthError(error.message);
          await applySession(null);
          return;
        }
        await applySession(data.session);
      })
      .catch((error: unknown) => {
        if (!isMounted) return;
        setAuthError(error instanceof Error ? error.message : "Failed to initialize session.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      void applySession(nextSession);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const refreshRole = async () => {
    if (user) {
      await loadRole(user.id);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setAuthError(error.message);
      throw error;
    }
    setSession(null);
    setUser(null);
    setRole(null);
    setRoleLoading(false);
  };

  const value = {
    session,
    user,
    loading,
    role,
    roleLoading,
    authError,
    isStaff: role === "admin" || role === "editor",
    refreshRole,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// oxlint-disable-next-line react/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
