// src/pages/MainPage.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MovieList from '../components/MovieList';

const MainPageContainer = styled.div`
  padding: 24px;
  color: white;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const HeroBanner = styled.div`
  background-image: ${({ backdrop }) => `url(https://image.tmdb.org/t/p/original${backdrop})`};
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px;
  color: white;
  margin-bottom: 40px;
`;

const HeroContent = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 8px;
`;

function MainPage() {
  const [highlightMovie, setHighlightMovie] = useState(null);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const API_KEY = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [popularRes, nowPlayingRes, topRatedRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`),
          fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`),
          fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`),
        ]);

        const popularData = await popularRes.json();
        const nowPlayingData = await nowPlayingRes.json();
        const topRatedData = await topRatedRes.json();

        setHighlightMovie(popularData.results[0]);
        setPopularMovies(popularData.results);
        setNowPlayingMovies(nowPlayingData.results);
        setTopRatedMovies(topRatedData.results);
      } catch (err) {
        console.error('메인 페이지 영화 데이터를 불러오는 데 실패했습니다:', err);
      }
    };

    fetchAll();
  }, []);

  return (
    <MainPageContainer>
      {highlightMovie && (
        <HeroBanner backdrop={highlightMovie.backdrop_path}>
          <HeroContent>
            <h1>{highlightMovie.title}</h1>
            <p>{highlightMovie.overview}</p>
          </HeroContent>
        </HeroBanner>
      )}

      <Section>
        <h2>🔥 인기 영화</h2>
        <MovieList movies={popularMovies} />
      </Section>

      <Section>
        <h2>🎟 현재 상영 중</h2>
        <MovieList movies={nowPlayingMovies} />
      </Section>

      <Section>
        <h2>📈 평점 높은 영화</h2>
        <MovieList movies={topRatedMovies} />
      </Section>
    </MainPageContainer>
  );
}

export default MainPage;