import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import VideoPlayer from '../components/VideoPlayer';
import MovieRow from '../components/MovieRow';
import { movieApi } from '../services/api';

const Home = () => {
  const [currentMovie, setCurrentMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize with first movie
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        const movies = await movieApi.getAllMovies();
        setAllMovies(movies);
        
        if (movies.length > 0) {
          const firstMovie = movies[0];
          setCurrentMovie(firstMovie);
          
          // Load recommendations for first movie
          const recs = await movieApi.getRecommendations(firstMovie.title);
          setRecommendations(recs.recommendations || []);
        }
      } catch (err) {
        setError('Failed to load movies. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Handle movie click
  const handleMovieClick = async (movie) => {
    try {
      setCurrentMovie(movie);
      
      // Load recommendations for clicked movie
      const recs = await movieApi.getRecommendations(movie.title);
      setRecommendations(recs.recommendations || []);
    } catch (err) {
      console.error('Failed to load recommendations:', err);
    }
  };

  // Handle search
  const handleSearch = async (query) => {
    try {
      const results = await movieApi.searchMovies(query);
      if (results.count > 0) {
        handleMovieClick(results.results[0]);
      }
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  // Handle menu click
  const handleMenuClick = () => {
    // Toggle sidebar or other menu functionality
    console.log('Menu clicked');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-youtube-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-youtube-red border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-youtube-textSecondary">Loading movies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-youtube-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎬</div>
          <h1 className="text-2xl font-bold mb-2">Oops!</h1>
          <p className="text-youtube-textSecondary mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-youtube-red rounded-full hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-youtube-dark">
      <Navbar onSearch={handleSearch} onMenuClick={handleMenuClick} />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Video Player */}
          <div className="lg:col-span-2">
            <VideoPlayer movie={currentMovie} />
          </div>

          {/* Sidebar - All Movies */}
          <div className="lg:col-span-1">
            <div className="bg-youtube-gray rounded-xl p-4">
              <h2 className="text-lg font-bold mb-4">All Movies</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {allMovies.map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => handleMovieClick(movie)}
                    className={`
                      flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors
                      ${currentMovie?.id === movie.id 
                        ? 'bg-youtube-lightGray' 
                        : 'hover:bg-youtube-lightGray'
                      }
                    `}
                  >
                    <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                      <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">
                        {movie.title}
                      </h3>
                      <p className="text-youtube-textSecondary text-xs truncate">
                        {movie.genres.split(',').slice(0, 2).join(', ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="mt-8">
          <MovieRow
            title="Recommended Movies"
            movies={recommendations}
            currentMovie={currentMovie}
            onMovieClick={handleMovieClick}
          />
        </div>

        {/* All Movies Row */}
        {allMovies.length > 0 && (
          <MovieRow
            title="All Movies"
            movies={allMovies}
            currentMovie={currentMovie}
            onMovieClick={handleMovieClick}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-youtube-gray mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-youtube-textSecondary text-sm">
          <p>© 2026 CinemaHub all rights reserved</p> 
          <p className="mt-2">This Project is designed by <b>Shadow Jaguar</b></p>
        </div>
      </footer>
    </div>
  );
};

export default Home;