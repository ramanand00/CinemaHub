import axios from 'axios';

// API configuration
const API_BASE_URL = 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const movieApi = {
  // Get all movies
  getAllMovies: async () => {
    try {
      const response = await api.get('/movies');
      return response.data;
    } catch (error) {
      console.error('Error fetching all movies:', error);
      throw error;
    }
  },

  // Get movie by title
  getMovie: async (title) => {
    try {
      const response = await api.get(`/movies/${encodeURIComponent(title)}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie ${title}:`, error);
      throw error;
    }
  },

  // Get recommendations for a movie
  getRecommendations: async (title, topN = 10) => {
    try {
      const response = await api.get(`/recommend/${encodeURIComponent(title)}`, {
        params: { top_n: topN }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching recommendations for ${title}:`, error);
      throw error;
    }
  },

  // Search movies
  searchMovies: async (query) => {
    try {
      const response = await api.get(`/search/${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error(`Error searching movies for ${query}:`, error);
      throw error;
    }
  },
};

// Utility function to extract YouTube ID from URL
export const extractYouTubeId = (url) => {
  if (!url) return '';
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : '';
};