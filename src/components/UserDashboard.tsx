'use client';

import { useAuth } from './AuthProvider';
import LoadingSpinner from './LoadingSpinner';
import ImageUpload from './ImageUpload';
import ImageGallery from './ImageGallery';

export default function UserDashboard() {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-sm border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">
                Gallery Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">
                {user?.email}
              </span>
              <button
                onClick={signOut}
                className="text-gray-400 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors border border-gray-700 hover:border-gray-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Welcome back, {user?.email?.split('@')[0]}!
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Manage your gallery, upload new images, and organize your collection.
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <ImageUpload />
        </div>

        {/* Gallery Section */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 border border-gray-800/50">
          <h3 className="text-lg font-semibold text-white mb-4">Your Gallery</h3>
          <ImageGallery />
        </div>
      </main>
    </div>
  );
}
