import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieByTitle, fetchRecommendations } from '../services/api';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import WatchParty from '../components/WatchParty';
import MoodMatcher from '../components/MoodMatcher';
import MovieMemeGenerator from '../components/MovieMemeGenerator';
import ReactionBar from '../components/ReactionBar';
import MovieTrivia from '../components/MovieTrivia';
import {
  Play, ArrowLeft, Info, Heart, Share2, Download,
  Users, Sparkles, Image, HelpCircle, X
} from 'lucide-react';

const VideoPlayerPage = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [showWatchParty, setShowWatchParty] = useState(false);
  const [showMemeGenerator, setShowMemeGenerator] = useState(false);
  const [showMoodMatcher, setShowMoodMatcher] = useState(false);
  const [showTrivia, setShowTrivia] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const loadMovieData = async () => {
      try {
        const decodedTitle = decodeURIComponent(title);
        const movieData = await fetchMovieByTitle(decodedTitle);
        setMovie(movieData);
        
        const recData = await fetchRecommendations(decodedTitle, 8);
        setRecommendations(recData.recommendations);
      } catch (error) {
        console.error('Error loading movie:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMovieData();
  }, [title]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Movie not found</p>
      </div>
    );
  }

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split('youtu.be/')[1] || url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  const shareMovie = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: movie.title,
          text: movie.overview,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      setShowShareModal(true);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="fixed top-24 left-6 z-10 flex items-center gap-2 glass-morphism px-4 py-2 rounded-full hover:bg-white/20 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </motion.button>

      {/* Video Player Section */}
      <div className="pt-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden glass-morphism">
            <iframe
              src={getYouTubeEmbedUrl(movie.video_url)}
              title={movie.title}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>

          {/* Movie Info */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-8 items-start justify-between">
              <div className="flex-1">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold mb-2"
                >
                  {movie.title}
                </motion.h1>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex gap-2 mb-4 flex-wrap"
                >
                  <span className="px-3 py-1 bg-purple-500/30 rounded-full text-sm">
                    {movie.genres}
                  </span>
                  <span className="px-3 py-1 bg-blue-500/30 rounded-full text-sm">
                    2023
                  </span>
                  <span className="px-3 py-1 bg-green-500/30 rounded-full text-sm">
                    2h 30m
                  </span>
                  <span className="px-3 py-1 bg-yellow-500/30 rounded-full text-sm">
                    ⭐ 4.5
                  </span>
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-300 leading-relaxed"
                >
                  {movie.overview}
                </motion.p>
              </div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-wrap gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-full ${
                    isLiked ? 'bg-red-500' : 'glass-morphism'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={shareMovie}
                  className="p-3 rounded-full glass-morphism"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowWatchParty(!showWatchParty)}
                  className={`p-3 rounded-full ${
                    showWatchParty ? 'bg-purple-500' : 'glass-morphism'
                  }`}
                >
                  <Users className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowMemeGenerator(true)}
                  className="p-3 rounded-full glass-morphism"
                >
                  <Image className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowTrivia(!showTrivia)}
                  className={`p-3 rounded-full ${
                    showTrivia ? 'bg-green-500' : 'glass-morphism'
                  }`}
                >
                  <HelpCircle className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>

            {/* Reaction Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <ReactionBar movieId={movie.id} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Features Grid */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Mood Matcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <MoodMatcher onMoodSelect={(mood) => {
              console.log('Selected mood:', mood);
              // Here you would filter recommendations based on mood
            }} />
          </motion.div>

          {/* Movie Trivia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {showTrivia && <MovieTrivia movie={movie} />}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-morphism rounded-2xl p-6"
          >
            <h3 className="font-semibold mb-4">Movie Stats 📊</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Watch Party</span>
                <span className="font-semibold">1.2k watching</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Reactions</span>
                <span className="font-semibold">745</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Memes Created</span>
                <span className="font-semibold">234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Trivia Players</span>
                <span className="font-semibold">567</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <section className="px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex items-center gap-2 mb-6">
              <Play className="w-5 h-5 text-purple-400" />
              <h2 className="text-2xl font-bold">You might also like</h2>
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {recommendations.map((recMovie, index) => (
                <motion.div
                  key={recMovie.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <MovieCard movie={recMovie} index={index} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showWatchParty && (
          <WatchParty movie={movie} onClose={() => setShowWatchParty(false)} />
        )}

        {showMemeGenerator && (
          <MovieMemeGenerator movie={movie} onClose={() => setShowMemeGenerator(false)} />
        )}

        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass-morphism rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Share Movie</h3>
                <button onClick={() => setShowShareModal(false)} className="p-2 hover:bg-white/10 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="w-full bg-white/10 rounded-lg px-4 py-2"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied!');
                  }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg font-semibold"
                >
                  Copy Link
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayerPage;