'use client';

import { useAuth } from './AuthProvider';
import AuthForm from './AuthForm';
import UserDashboard from './UserDashboard';
import LoadingSpinner from './LoadingSpinner';

export default function AuthenticatedApp() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return <UserDashboard />;
}
