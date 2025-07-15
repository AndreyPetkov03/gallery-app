'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthProvider';
import LoadingSpinner from './LoadingSpinner';
import { SharedGallery, SharedGalleryImage, Image } from '../types';

export default function SharedGalleryComponent() {
  const { user } = useAuth();
  const [galleries, setGalleries] = useState<SharedGallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<SharedGallery | null>(null);
  const [galleryImages, setGalleryImages] = useState<Image[]>([]);
  const [imagesLoading, setImagesLoading] = useState(false);

  const fetchSharedGalleries = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch galleries where user is owner or member
      const { data: ownedGalleries, error: ownedError } = await supabase
        .from('shared_galleries')
        .select(`
          *,
          owner:users(full_name, email),
          shared_gallery_images(count)
        `)
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      if (ownedError) throw ownedError;

      // For now, just show owned galleries
      // Later we can add galleries where user is a member
      const galleriesWithCounts = (ownedGalleries || []).map(gallery => ({
        ...gallery,
        image_count: gallery.shared_gallery_images?.[0]?.count || 0
      }));

      setGalleries(galleriesWithCounts);
    } catch (error: any) {
      console.error('Error fetching shared galleries:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchGalleryImages = async (galleryId: string) => {
    try {
      setImagesLoading(true);
      
      const { data, error } = await supabase
        .from('shared_gallery_images')
        .select(`
          *,
          image:images(*)
        `)
        .eq('gallery_id', galleryId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const images = (data || []).map(item => item.image).filter(Boolean);
      setGalleryImages(images);
    } catch (error: any) {
      console.error('Error fetching gallery images:', error);
      setError(error.message);
    } finally {
      setImagesLoading(false);
    }
  };

  const createNewGallery = async () => {
    if (!user) return;

    const name = prompt('Enter gallery name:');
    if (!name) return;

    try {
      const { data, error } = await supabase
        .from('shared_galleries')
        .insert([
          {
            name,
            owner_id: user.id,
            is_public: false
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setGalleries([{ ...data, image_count: 0 }, ...galleries]);
    } catch (error: any) {
      console.error('Error creating gallery:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchSharedGalleries();
  }, [user]);

  useEffect(() => {
    if (selectedGallery) {
      fetchGalleryImages(selectedGallery.id);
    }
  }, [selectedGallery]);

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
        Error loading shared galleries: {error}
      </div>
    );
  }

  if (selectedGallery) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <button
              onClick={() => setSelectedGallery(null)}
              className="text-blue-400 hover:text-blue-300 text-sm mb-2"
            >
              ← Back to galleries
            </button>
            <h3 className="text-xl font-semibold text-white">
              {selectedGallery.name}
            </h3>
            {selectedGallery.description && (
              <p className="text-gray-400 text-sm mt-1">
                {selectedGallery.description}
              </p>
            )}
          </div>
          <div className="text-sm text-gray-400">
            {galleryImages.length} images
          </div>
        </div>

        {imagesLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">
              No images in this gallery yet
            </div>
            <p className="text-gray-500">
              Share images from your main gallery to add them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image) => (
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
                </div>
                <div className="p-3">
                  <p className="text-white text-sm font-medium truncate">
                    {image.original_name}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(image.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Shared Galleries</h3>
        <button
          onClick={createNewGallery}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Create Gallery
        </button>
      </div>

      {galleries.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">
            No shared galleries yet
          </div>
          <p className="text-gray-500 mb-6">
            Create your first shared gallery to collaborate with others!
          </p>
          <button
            onClick={createNewGallery}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Create Your First Gallery
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery) => (
            <div
              key={gallery.id}
              className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800/50 overflow-hidden group hover:border-gray-700/50 transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedGallery(gallery)}
            >
              <div className="p-6">
                <h4 className="text-lg font-semibold text-white mb-2">
                  {gallery.name}
                </h4>
                {gallery.description && (
                  <p className="text-gray-400 text-sm mb-4">
                    {gallery.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">
                    {gallery.image_count} images
                  </span>
                  <span className="text-gray-500">
                    {gallery.is_public ? 'Public' : 'Private'}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <span className="text-gray-500 text-xs">
                    Created {new Date(gallery.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
