// src/hooks/usePopularMovies.js
import { useQuery } from '@tanstack/react-query';
import { fetchPopularMovies } from '../api/tmdb';

export const usePopularMovies = (page) => {
  return useQuery({
    queryKey: ['popularMovies', page],
    queryFn: () => fetchPopularMovies({ page }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};
