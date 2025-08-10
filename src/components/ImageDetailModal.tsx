'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Image, User } from '../types';
import UserAvatar from './UserAvatar';

interface ImageDetailModalProps {
  image: Image;
  onClose: () => void;
  onUserClick: (user: User) => void;
}

export default function ImageDetailModal({ image, onClose, onUserClick }: ImageDetailModalProps) {
  const username = image.user?.username || image.user?.full_name || 'User';

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Only render on client side to avoid hydration issues
  if (typeof window === 'undefined') {
    return null;
  }

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-lg border border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Section */}
        <div className="flex-1 flex items-center justify-center bg-black/50 min-h-0">
          <img
            src={image.url}
            alt={image.title || image.original_name}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Details Section */}
        <div className="w-full lg:w-80 xl:w-96 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white truncate">
              Image Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 rounded transition-colors"
              title="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {/* Title */}
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                {image.title || 'Untitled'}
              </h3>
            </div>

            {/* Creator */}
            <div>
              <label className="text-sm font-medium text-gray-400 block mb-2">
                Created by
              </label>
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-800/50 rounded p-2 -m-2 transition-colors"
                onClick={() => image.user && onUserClick(image.user)}
                title={`View ${username}'s profile`}
              >
                <UserAvatar 
                  username={username} 
                  avatarUrl={image.user?.avatar_url}
                  size="md" 
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium hover:text-blue-300 transition-colors">
                    {username}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {image.user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="text-sm font-medium text-gray-400 block mb-1">
                Created on
              </label>
              <p className="text-white">
                {new Date(image.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Description */}
            {image.description && (
              <div>
                <label className="text-sm font-medium text-gray-400 block mb-2">
                  Description
                </label>
                <p className="text-white leading-relaxed whitespace-pre-wrap">
                  {image.description}
                </p>
              </div>
            )}

            {/* Image Info */}
            <div className="border-t border-gray-800 pt-4">
              <label className="text-sm font-medium text-gray-400 block mb-2">
                Image Information
              </label>
              <div className="space-y-1 text-sm">
                {image.width && image.height && (
                  <p className="text-gray-300">
                    <span className="text-gray-400">Dimensions:</span> {image.width} × {image.height}
                  </p>
                )}
                {image.size && (
                  <p className="text-gray-300">
                    <span className="text-gray-400">Size:</span> {(image.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
                {image.mime_type && (
                  <p className="text-gray-300">
                    <span className="text-gray-400">Type:</span> {image.mime_type}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
