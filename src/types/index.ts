export interface Image {
  id: string;
  url: string;
  thumbnail_url?: string;
  title?: string;
  description?: string;
  filename: string;
  original_name: string;
  size: number;
  mime_type: string;
  width?: number;
  height?: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UploadResponse {
  success: boolean;
  image?: Image;
  error?: string;
}

export interface GalleryProps {
  images: Image[];
  loading?: boolean;
  error?: string;
}

export interface ImageCardProps {
  image: Image;
  onImageClick: (image: Image) => void;
  onImageDelete?: (imageId: string) => void;
}
