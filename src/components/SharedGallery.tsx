'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthProvider';
import LoadingSpinner from './LoadingSpinner';
import UserAvatar from './UserAvatar';
import { Image, User } from '../types';

interface SharedGalleryProps {
  onUserClick: (user: User) => void;
}

export default function CommunityGallery({ onUserClick }: SharedGalleryProps) {
  const { user } = useAuth();
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    setError(null);

    try {
      // Create unique filename with user folder structure
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName);

      // Save image metadata to database
      const { error: dbError } = await supabase
        .from('images')
        .insert({
          user_id: user.id,
          filename: fileName,
          original_name: file.name,
          url: publicUrl,
          size: file.size,
          mime_type: file.type
        });

      if (dbError) {
        throw dbError;
      }

      // Refresh the gallery
      fetchCommunityImages();
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

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
            email,
            avatar_url,
            created_at
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
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Community Gallery</h3>
          <p className="text-gray-400 text-sm mt-1">
            Discover images shared by the community
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleUploadClick}
            disabled={uploading}
            className="bg-white hover:bg-gray-200 disabled:bg-gray-300 disabled:cursor-not-allowed text-black px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2"
          >
            {uploading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <img 
                src="/uploadFile.svg" 
                alt="Upload" 
                className="w-4 h-4"
              />
            )}
            <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-800/50 text-red-200 p-4 rounded-md mb-6">
          Error uploading image: {error}
        </div>
      )}

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
                className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800/50 overflow-hidden group hover:border-gray-700/50 transition-all duration-200 cursor-pointer"
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
                  <div 
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-800/50 rounded p-1 -m-1 transition-colors"
                    onClick={() => image.user && onUserClick(image.user)}
                    title={`View ${username}'s profile`}
                  >
                    <UserAvatar 
                      username={username} 
                      avatarUrl={image.user?.avatar_url}
                      size="sm" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate hover:text-blue-300 transition-colors">
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
