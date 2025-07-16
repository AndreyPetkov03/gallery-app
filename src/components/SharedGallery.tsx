'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthProvider';
import LoadingSpinner from './LoadingSpinner';
import UserAvatar from './UserAvatar';
import { Image } from '../types';

export default function CommunityGallery() {
  const { user } = useAuth();
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommunityImages = async () => {
    try {
      setLoading(true);
      
      // Fetch all images from all users for the community gallery with user profile information
      const { data, error } = await supabase
        .from('images')
        .select(`
          *,
          user:users(
            id,
            username,
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      console.log('Community images data:', data);
      setImages(data || []);
    } catch (error: any) {
      console.error('Error fetching community images:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunityImages();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800/50 text-red-200 p-4 rounded-md">
        Error loading community gallery: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Community Gallery</h3>
          <p className="text-gray-400 text-sm mt-1">
            Discover images shared by the community
          </p>
        </div>
        <div className="text-sm text-gray-400">
          {images.length} images
        </div>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">
            No images in the community gallery yet
          </div>
          <p className="text-gray-500">
            Be the first to upload and share your images!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => {
            const username = image.user?.username || image.user?.full_name || 'User';
            
            return (
              <div
                key={image.id}
                className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800/50 overflow-hidden group hover:border-gray-700/50 transition-all duration-200"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.original_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <div className="text-sm font-medium mb-1">
                        {image.original_name}
                      </div>
                      <div className="text-xs text-gray-300">
                        {new Date(image.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center space-x-2">
                    <UserAvatar username={username} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {username}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {new Date(image.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
