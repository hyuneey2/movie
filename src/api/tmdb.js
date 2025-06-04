// src/api/tmdb.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async ({ page = 1, region = 'KR' }) => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
      language: 'ko-KR',
      region,
      page,
    },
  });
  return response.data;
};
