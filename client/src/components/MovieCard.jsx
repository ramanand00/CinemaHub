import { motion } from 'framer-motion';
import { Play, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="glass-morphism rounded-xl overflow-hidden cursor-pointer group"
      onClick={() => navigate(`/movie/${encodeURIComponent(movie.title)}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={movie.poster_url || 'https://via.placeholder.com/300x450?text=No+Poster'} 
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-purple-500 rounded-full p-3"
          >
            <Play className="w-6 h-6 fill-white" />
          </motion.div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-1">{movie.title}</h3>
        <p className="text-sm text-gray-300 mb-2">{movie.genres}</p>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span>4.5</span>
          <Clock className="w-4 h-4 ml-2" />
          <span>2h 30m</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;