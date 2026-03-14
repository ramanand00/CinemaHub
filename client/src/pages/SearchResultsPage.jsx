import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchMovies } from '../services/api';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import { Search, ArrowLeft, Film, XCircle } from 'lucide-react';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const data = await searchMovies(query);
        setResults(data.results || []);
      } catch (error) {
        console.error('Search error:', error);
        setError('Failed to search movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <div className="pt-24 px-6 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-3 mb-2">
            <Search className="w-6 h-6 text-purple-400" />
            <h1 className="text-3xl font-bold">
              Search Results for "{query}"
            </h1>
          </div>
          <p className="text-gray-400">
            Found {results.length} {results.length === 1 ? 'movie' : 'movies'}
          </p>
        </motion.div>
      </div>

      {/* Results Section */}
      <section className="px-6 py-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Film className="w-16 h-16 text-purple-500" />
              </motion.div>
              <p className="mt-4 text-gray-400">Searching for movies...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <p className="text-red-400">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-purple-500 rounded-full hover:bg-purple-600 transition"
              >
                Try Again
              </button>
            </div>
          ) : results.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              {results.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Search className="w-20 h-20 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No movies found</h3>
              <p className="text-gray-400 mb-6">
                We couldn't find any movies matching "{query}"
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:opacity-90 transition"
              >
                Browse All Movies
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchResultsPage;