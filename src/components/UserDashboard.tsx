'use client';

import { useState } from 'react';
import { useAuth } from './AuthProvider';
import LoadingSpinner from './LoadingSpinner';
import ImageUpload from './ImageUpload';
import ImageGallery from './ImageGallery';
import SharedGallery from './SharedGallery';

export default function UserDashboard() {
  const { user, userProfile, signOut, loading, profileLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'my-gallery' | 'community-gallery'>('my-gallery');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const displayName = userProfile?.full_name || user?.email?.split('@')[0] || 'User';

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
              <div className="flex items-center space-x-2">
                {profileLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <span className="text-gray-300 text-sm">
                    {displayName}
                  </span>
                )}
                <span className="text-gray-500 text-xs">
                  {user?.email}
                </span>
              </div>
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
            Welcome back, {displayName}!
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Manage your gallery, upload new images, and explore the community.
          </p>
        </div>

        {/* Upload Section - only show on My Gallery tab */}
        {activeTab === 'my-gallery' && (
          <div className="mb-8">
            <ImageUpload />
          </div>
        )}

        {/* Gallery Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-800">
            <nav className="-mb-px flex space-x-8">
              <button 
                onClick={() => setActiveTab('my-gallery')}
                className={`border-b-2 py-2 px-1 text-sm font-medium ${
                  activeTab === 'my-gallery' 
                    ? 'border-blue-500 text-blue-400' 
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                My Gallery
              </button>
              <button 
                onClick={() => setActiveTab('community-gallery')}
                className={`border-b-2 py-2 px-1 text-sm font-medium ${
                  activeTab === 'community-gallery' 
                    ? 'border-blue-500 text-blue-400' 
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                Community Gallery
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 border border-gray-800/50">
          {activeTab === 'my-gallery' ? (
            <>
              <h3 className="text-lg font-semibold text-white mb-4">Your Gallery</h3>
              <ImageGallery />
            </>
          ) : (
            <SharedGallery />
          )}
        </div>
      </main>
    </div>
  );
}
