'use client';

import { useState } from 'react';

interface MovieModalProps {
  isOpen: boolean;
  onSubmit: (movie: string) => void;
  onCancel?: () => void;
  currentMovie?: string | null;
}

export default function MovieModal({ isOpen, onSubmit, onCancel, currentMovie }: MovieModalProps) {
  const [movie, setMovie] = useState(currentMovie || '');
  const isEditing = !!currentMovie;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (movie.trim()) {
      onSubmit(movie.trim());
      if (!isEditing) {
        setMovie('');
      }
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      setMovie(currentMovie || '');
      onCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? 'Change Your Favorite Movie' : "What's your favorite movie?"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            placeholder="Enter your favorite movie"
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isEditing ? 'Update Movie' : 'Save'}
            </button>
            {isEditing && onCancel && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}