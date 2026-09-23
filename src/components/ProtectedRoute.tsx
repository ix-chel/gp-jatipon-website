import React from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, loading } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) {
    return <div className="p-8 flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!session) {
    setLocation('/admin/login');
    return null;
  }

  return <>{children}</>;
};
