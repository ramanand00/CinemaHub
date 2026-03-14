import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, getCurrentUser, isAdmin } from '../services/auth';
import api from '../services/api';
import Navbar from '../components/Navbar';
import {
  Film, Plus, Edit, Trash2, LogOut, Upload,
  Image, Link as LinkIcon, Save, X, ChevronLeft
} from 'lucide-react';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    genres: '',
    overview: '',
    poster_url: '',
    video_url: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    if (!isAdmin()) {
      navigate('/admin/login');
      return;
    }
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await api.get('/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/movies', formData);
      setShowAddModal(false);
      resetForm();
      fetchMovies();
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleEditMovie = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/movies/${selectedMovie._id}`, formData);
      setShowEditModal(false);
      resetForm();
      fetchMovies();
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await api.delete(`/admin/movies/${movieId}`);
        fetchMovies();
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      genres: '',
      overview: '',
      poster_url: '',
      video_url: ''
    });
    setSelectedMovie(null);
  };

  const openEditModal = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      title: movie.title,
      genres: movie.genres,
      overview: movie.overview,
      poster_url: movie.poster_url || '',
      video_url: movie.video_url || ''
    });
    setShowEditModal(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 glass-morphism rounded-full hover:bg-white/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-gray-400 mt-1">Manage your movie collection</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg font-semibold"
              >
                <Plus className="w-5 h-5" />
                Add Movie
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 glass-morphism px-4 py-2 rounded-lg hover:bg-white/10"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </motion.button>
            </div>
          </div>

          {/* Movie List */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent" />
            </div>
          ) : (
            <div className="grid gap-4">
              {movies.map((movie, index) => (
                <motion.div
                  key={movie._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-morphism rounded-xl p-4 flex items-center gap-4"
                >
                  <img
                    src={movie.poster_url || 'https://via.placeholder.com/80x120'}
                    alt={movie.title}
                    className="w-16 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{movie.title}</h3>
                    <p className="text-sm text-gray-400">{movie.genres}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(movie)}
                      className="p-2 hover:bg-blue-500/20 rounded-lg transition"
                    >
                      <Edit className="w-5 h-5 text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleDeleteMovie(movie._id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Movie Modal */}
      {showAddModal && (
        <MovieModal
          title="Add New Movie"
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleAddMovie}
          onClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
        />
      )}

      {/* Edit Movie Modal */}
      {showEditModal && (
        <MovieModal
          title="Edit Movie"
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleEditMovie}
          onClose={() => {
            setShowEditModal(false);
            resetForm();
          }}
        />
      )}
    </div>
  );
};

// Movie Modal Component
const MovieModal = ({ title, formData, setFormData, onSubmit, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="glass-morphism rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Movie title"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Genres *</label>
            <input
              type="text"
              value={formData.genres}
              onChange={(e) => setFormData({...formData, genres: e.target.value})}
              className="w-full bg-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Action, Drama, Comedy (comma separated)"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Overview *</label>
            <textarea
              value={formData.overview}
              onChange={(e) => setFormData({...formData, overview: e.target.value})}
              className="w-full bg-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
              placeholder="Movie description"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Poster URL</label>
            <div className="relative">
              <Image className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={formData.poster_url}
                onChange={(e) => setFormData({...formData, poster_url: e.target.value})}
                className="w-full bg-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://example.com/poster.jpg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Video URL *</label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={formData.video_url}
                onChange={(e) => setFormData({...formData, video_url: e.target.value})}
                className="w-full bg-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://youtu.be/..."
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90"
            >
              <Save className="w-5 h-5" />
              Save Movie
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 glass-morphism py-3 rounded-lg font-semibold hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;