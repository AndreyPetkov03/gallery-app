import Image from "next/image";
import GradientBackground from "@/components/GradientBackground";

export default function Home() {
  return (
    <GradientBackground>
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-black/90 backdrop-blur-sm border-b border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-white">
                  Gallery
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                  Upload Image
                </button>
                <button className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border border-gray-700 hover:border-gray-500 hover:bg-gray-800/50">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </header>        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome to your Gallery
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Upload, organize, and share your images with a modern, responsive gallery built with Next.js and Supabase.
            </p>
          </div>

          {/* Gallery Grid Placeholder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Placeholder cards */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-800/50 hover:border-gray-700/50 hover:bg-gray-800/80"
              >
                <div className="aspect-square bg-gray-800/80 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-white mb-1">
                    Sample Image {index + 1}
                  </h3>
                  <p className="text-xs text-gray-400">
                    Uploaded recently
                  </p>
                </div>
              </div>
            ))}
          </div>

        {/* Empty State */}
        <div className="text-center py-12">
          <p className="text-gray-300 mb-4">
            No images uploaded yet. Get started by uploading your first image!
          </p>
          <button className="bg-white hover:bg-gray-100 text-black px-6 py-3 rounded-md font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
            Upload Your First Image
          </button>
        </div>
      </main>
    </div>
    </GradientBackground>
  );
}
