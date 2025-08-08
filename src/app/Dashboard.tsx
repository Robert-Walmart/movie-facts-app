'use client';

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MovieModal from '@/components/MovieModal';

interface DashboardProps {
  user: {
    name: string;
    email: string;
    image: string;
    favoriteMovie: string | null;
  };
}

export default function Dashboard({ user }: DashboardProps) {
  const [movieFact, setMovieFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(!user.favoriteMovie);
  const [currentMovie, setCurrentMovie] = useState(user.favoriteMovie);
  const router = useRouter();

  const fetchMovieFact = async () => {
    if (!currentMovie) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/movie-fact');
      const data = await response.json();
      setMovieFact(data.fact);
    } catch (error) {
      console.error('Error fetching movie fact:', error);
      setMovieFact('Unable to fetch movie fact at the moment.');
    } finally {
      setLoading(false);
    }
  };

  const handleMovieSubmit = async (movie: string) => {
    try {
      const response = await fetch('/api/update-movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movie }),
      });

      if (response.ok) {
        setShowModal(false);
        setCurrentMovie(movie);
        setMovieFact(''); // Clear previous fact
        // Refresh the page to get updated user data
        router.refresh();
      }
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const handleChangeMovie = () => {
    setShowModal(true);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  useEffect(() => {
    if (currentMovie) {
      fetchMovieFact();
    }
  }, [currentMovie]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              {user.image && (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>

          {currentMovie && (
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Your Favorite Movie: <span className="text-blue-600">{currentMovie}</span>
                </h2>
                <button
                  onClick={handleChangeMovie}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Change Movie
                </button>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium mb-2">Interesting Fact:</h3>
                {loading ? (
                  <p className="text-gray-600">Loading...</p>
                ) : (
                  <p className="text-gray-800">{movieFact}</p>
                )}
              </div>

              <button
                onClick={fetchMovieFact}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {loading ? 'Loading...' : 'Get New Fact'}
              </button>
            </div>
          )}
        </div>
      </div>

      <MovieModal isOpen={showModal} onSubmit={handleMovieSubmit} />
    </div>
  );
}