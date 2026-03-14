import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const fetchAllMovies = async () => {
  try {
    const response = await api.get('/movies');
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchMovieByTitle = async (title) => {
  try {
    const response = await api.get(`/movies/${encodeURIComponent(title)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie:', error);
    throw error;
  }
};

export const fetchRecommendations = async (title, topN = 10) => {
  try {
    const response = await api.get(`/recommend/${encodeURIComponent(title)}?top_n=${topN}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await api.get(`/search/${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};