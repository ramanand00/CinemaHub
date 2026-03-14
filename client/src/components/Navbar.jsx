import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Film, Home, Sparkles } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear input after search
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="glass-morphism fixed w-full z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Film className="w-8 h-8 text-purple-400" />
          </motion.div>
          <span className="text-2xl font-bold">
            <span className="text-gradient">Cinema</span>
            <span className="text-white">Hub</span>
          </span>
          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-1 hover:text-purple-400 transition">
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-10 pr-4 focus:outline-none focus:border-purple-400 w-48 sm:w-64 text-sm"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </form>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;