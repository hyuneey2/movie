// NowPlayingPage.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import styled from 'styled-components';
import MovieCardSkeleton from '../components/MovieCardSkeleton';

const NowPlayingPageContainer = styled.div`
  padding: 24px;
  color: white;
`;

const fetchNowPlayingMovies = async ({ queryKey }) => {
  const [_key, page] = queryKey;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_APP_API_KEY}&language=ko-KR&page=${page}`
  );
  if (!res.ok) throw new Error('Failed to fetch now playing movies');
  return res.json();
};

function NowPlayingPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['nowPlayingMovies', page],
    queryFn: fetchNowPlayingMovies,
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <NowPlayingPageContainer>
        <h1>Now Playing Movies</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </NowPlayingPageContainer>
    );
  }

  if (isError) {
    return <NowPlayingPageContainer>에러 발생: {error.message}</NowPlayingPageContainer>;
  }

  return (
    <NowPlayingPageContainer>
      <h1>Now Playing Movies</h1>
      <MovieList movies={data.results} />
      <Pagination currentPage={page} totalPages={data.total_pages} onPageChange={setPage} />
    </NowPlayingPageContainer>
  );
}

export default NowPlayingPage;