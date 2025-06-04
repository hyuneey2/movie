import React from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import { Link } from 'react-router-dom';

const MovieListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 14px;
  justify-content: center;
  padding: 0 24px;
  max-width: 1100px;
  margin: 0 auto;
`;

function MovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return <p style={{ color: "white" }}>영화를 불러올 수 없습니다.</p>;
  }

  return (
    <MovieListContainer>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          posterPath={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : null
          }
        />
      ))}
    </MovieListContainer>
  );
}

export default MovieList;
