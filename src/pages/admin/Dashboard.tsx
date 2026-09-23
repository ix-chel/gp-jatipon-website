import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard Overview</h1>
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-neutral-200 mb-4">Welcome back!</h2>
        <p className="text-neutral-400">
          You are signed in as <span className="font-medium text-amber-500">{user?.email}</span>.
        </p>
        <p className="text-neutral-500 mt-4 text-sm">
          Use the sidebar to manage content, activities, and archives. 
          More detailed statistics and quick actions will appear here in the future.
        </p>
      </div>
    </div>
  );
};
