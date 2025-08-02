'use client';

import { useState } from 'react';

interface MovieModalProps {
  isOpen: boolean;
  onSubmit: (movie: string) => void;
}

export default function MovieModal({ isOpen, onSubmit }: MovieModalProps) {
  const [movie, setMovie] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (movie.trim()) {
      onSubmit(movie.trim());
      setMovie('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">What's your favorite movie?</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            placeholder="Enter your favorite movie"
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}