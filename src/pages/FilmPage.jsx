import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import MovieList from '../components/MovieList';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import LoadingSpinner from '../components/LoadingSpinner';

const FilmPageContainer = styled.div`
  padding: 24px;
  color: white;
`;

const FilmPage = () => {
  const observerRef = useRef();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['film'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_APP_API_KEY}&language=ko-KR&page=${pageParam}`
      );
      const data = await res.json();
      return {
        movies: data.results,
        nextPage: pageParam + 1,
        totalPages: data.total_pages,
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <FilmPageContainer>
      <h1>🎬 영화 모음</h1>

      {isLoading && (
        <>
          <MovieCardSkeleton />
          <MovieCardSkeleton />
          <MovieCardSkeleton />
        </>
      )}

      {isError && <p>오류 발생: {error.message}</p>}

      {data &&
        data.pages.map((page, index) => (
          <MovieList key={index} movies={page.movies} />
        ))}

      {/* ✅ 무한스크롤용 스피너 */}
      {isFetchingNextPage && <LoadingSpinner />}

      {/* ✅ 관찰 지점 */}
      <div ref={observerRef} style={{ height: '1px' }} />
    </FilmPageContainer>
  );
};

export default FilmPage;


