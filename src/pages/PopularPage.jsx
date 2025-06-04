// src/pages/PopularPage.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import styled from 'styled-components';
import MovieCardSkeleton from '../components/MovieCardSkeleton';

const PopularPageContainer = styled.div`
  padding: 24px;
  color: white;
`;

function PopularPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['popularMovies', page],
    queryFn: async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_APP_API_KEY}&language=ko-KR&page=${page}`
      );
      if (!res.ok) throw new Error('데이터를 불러오는데 실패했습니다.');
      return res.json();
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <PopularPageContainer>
        <h1>Popular Movie</h1>
        <div style={{ display: 'flex', gap: '16px' }}>
          {[...Array(6)].map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </PopularPageContainer>
    );
  }

  if (isError) {
    return <PopularPageContainer>에러: {error.message}</PopularPageContainer>;
  }

  return (
    <PopularPageContainer>
      <h1>Popular Movie</h1>
      <MovieList movies={data.results} />
      <Pagination
        currentPage={page}
        totalPages={data.total_pages}
        onPageChange={setPage}
      />
    </PopularPageContainer>
  );
}

export default PopularPage;

