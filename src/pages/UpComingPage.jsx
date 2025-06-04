// UpComingPage.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import styled from 'styled-components';
import MovieCardSkeleton from '../components/MovieCardSkeleton';

const UpComingPageContainer = styled.div`
  padding: 24px;
  color: white;
`;

const fetchUpcomingMovies = async ({ queryKey }) => {
  const [_key, page] = queryKey;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_APP_API_KEY}&language=ko-KR&page=${page}`
  );
  if (!res.ok) throw new Error('Failed to fetch upcoming movies');
  return res.json();
};

function UpComingPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['upcomingMovies', page],
    queryFn: fetchUpcomingMovies,
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <UpComingPageContainer>
        <h1>Upcoming Movies</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </UpComingPageContainer>
    );
  }

  if (isError) {
    return <UpComingPageContainer>에러 발생: {error.message}</UpComingPageContainer>;
  }

  return (
    <UpComingPageContainer>
      <h1>Upcoming Movies</h1>
      <MovieList movies={data.results} />
      <Pagination currentPage={page} totalPages={data.total_pages} onPageChange={setPage} />
    </UpComingPageContainer>
  );
}

export default UpComingPage;