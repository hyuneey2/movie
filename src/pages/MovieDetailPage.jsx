// MovieDetailPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./MovieDetailPage.css";

const fetchMovie = async (movieId) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_APP_API_KEY}&language=ko-KR`
  );
  return res.data;
};

const fetchCast = async (movieId) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_APP_API_KEY}&language=ko-KR`
  );
  return res.data.cast;
};

const MovieDetailPage = () => {
  const { movieId } = useParams();

  const {
    data: movie,
    isLoading: isMovieLoading,
    isError: isMovieError,
    error: movieError,
  } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => fetchMovie(movieId),
  });

  const {
    data: cast = [],
    isLoading: isCastLoading,
    isError: isCastError,
    error: castError,
  } = useQuery({
    queryKey: ['cast', movieId],
    queryFn: () => fetchCast(movieId),
  });

  if (isMovieLoading || isCastLoading) return <p>로딩 중...</p>;
  if (isMovieError || isCastError) return <p>{movieError?.message || castError?.message}</p>;
  if (!movie) return <p>영화 정보를 찾을 수 없습니다.</p>;

  return (
    <div className="movie-detail-container">
      <div
        className="movie-hero-banner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="hero-overlay">
          <h1>{movie.title}</h1>
          <p className="overview">{movie.overview}</p>
          <p>⭐ {movie.vote_average} / 10</p>
          <p>📅 개봉일: {movie.release_date}</p>
          <p>📀 장르: {movie.genres.map((g) => g.name).join(", ")}</p>
          <p>💰 예산: ${movie.budget.toLocaleString()}</p>
        </div>
      </div>

      <div className="movie-cast">
        <h2>🎭 출연진</h2>
        <ul className="cast-list">
          {cast.slice(0, 8).map((actor) => (
            <li key={actor.cast_id}>
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt={actor.name}
                />
              )}
              <div>
                <strong>{actor.name}</strong>
                <br />
                <span>({actor.character})</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetailPage;


