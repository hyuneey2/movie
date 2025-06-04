// TopRatedPage.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import styled from 'styled-components';
import MovieCardSkeleton from '../components/MovieCardSkeleton';

const TopRatedPageContainer = styled.div`
  padding: 24px;
  color: white;
`;

const fetchTopRatedMovies = async ({ queryKey }) => {
  const [_key, page] = queryKey;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_APP_API_KEY}&language=ko-KR&page=${page}`
  );
  if (!res.ok) throw new Error('Failed to fetch top rated movies');
  return res.json();
};

function TopRatedPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['topRatedMovies', page],
    queryFn: fetchTopRatedMovies,
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <TopRatedPageContainer>
        <h1>Top Rated Movies</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </TopRatedPageContainer>
    );
  }

  if (isError) {
    return <TopRatedPageContainer>에러 발생: {error.message}</TopRatedPageContainer>;
  }

  return (
    <TopRatedPageContainer>
      <h1>Top Rated Movies</h1>
      <MovieList movies={data.results} />
      <Pagination currentPage={page} totalPages={data.total_pages} onPageChange={setPage} />
    </TopRatedPageContainer>
  );
}

export default TopRatedPage;