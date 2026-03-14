import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { searchMovies } from '../services/api';

const SearchBar = ({ onSearch, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          const data = await searchMovies(query);
          setResults(data.results);
        } catch (error) {
          console.error('Search error:', error);
        }
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/80"
    >
      <div className="w-full max-w-2xl glass-morphism rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none focus:outline-none text-lg"
            autoFocus
          />
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
          </div>
        )}

        {results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2 max-h-96 overflow-y-auto"
          >
            {results.map((movie) => (
              <motion.div
                key={movie.id}
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg cursor-pointer"
                onClick={() => {
                  onSearch(movie);
                  onClose();
                }}
              >
                <img 
                  src={movie.poster_url || 'https://via.placeholder.com/50x70'} 
                  alt={movie.title}
                  className="w-12 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-semibold">{movie.title}</h4>
                  <p className="text-sm text-gray-400">{movie.genres}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SearchBar;