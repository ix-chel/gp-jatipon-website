import React from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../contexts/AuthContext';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { signOut, user } = useAuth();
  const [, setLocation] = useLocation();

  const handleSignOut = async () => {
    await signOut();
    setLocation('/admin/login');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold text-amber-500">GP Admin</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/admin/dashboard" className="block px-4 py-2 rounded-md hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/content" className="block px-4 py-2 rounded-md hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors">
            Content
          </Link>
          <Link href="/admin/activities" className="block px-4 py-2 rounded-md hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors">
            Activities
          </Link>
          <Link href="/admin/archives" className="block px-4 py-2 rounded-md hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors">
            Archives
          </Link>
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <div className="mb-4 text-sm text-neutral-400 truncate">
            {user?.email}
          </div>
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-neutral-800 rounded-md transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};
