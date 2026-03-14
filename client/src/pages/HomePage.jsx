import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { fetchAllMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import Navbar from '../components/Navbar';
import { Sparkles, TrendingUp, Film } from 'lucide-react';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchAllMovies();
        setMovies(data);
        // Simulate trending movies (first 6)
        setTrending(data.slice(0, 6));
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Film className="w-16 h-16 text-purple-500" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 pb-12 px-6 text-center"
      >
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          <span className="text-gradient">Cinema</span>
          <span className="text-white">Hub</span>
        </motion.h1>
        <motion.p 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Your Gen-Z destination for movie magic ✨
        </motion.p>
      </motion.section>

      {/* Trending Section */}
      <section className="px-6 py-8">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-2 mb-6"
        >
          <TrendingUp className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold">Trending Now</h2>
          <Sparkles className="w-4 h-4 text-yellow-400" />
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trending.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>
      </section>

      {/* All Movies Section */}
      <section className="px-6 py-8">
        <motion.h2 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-2xl font-bold mb-6"
        >
          All Movies
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index + 6} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;