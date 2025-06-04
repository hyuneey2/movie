// SearchResultsPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import EmptyState from '../components/EmptyState';

// 상단 import 아래에 추가
const HeaderWrapper = styled.div`
  text-align: center;
  margin: 24px 0 10px;
`;

const Illustration = styled.span`
  font-size: 28px;
  margin: 0 8px;
`;

const QueryText = styled.span`
  font-size: 18px;
  color: #ffffff;
  opacity: 0.9;
`;

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const Message = styled.div`
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
`;



const SearchResultsPage = () => {
  const location = useLocation(); //URL에서 뭐리스트링 추출출
  const [filteredMovies, setFilteredMovies] = useState([]); //영화목록
  const [loading, setLoading] = useState(false); //로딩상태
  const [error, setError] = useState(null);//에러상태
  const [query, setQuery] = useState('');//현재 검색어어

  useEffect(() => {
    const parsedQuery = new URLSearchParams(location.search).get('query') || '';
    setQuery(parsedQuery); //URL에서 검색어 추출해 상태로 설정정

    const fetchSearchResults = async () => {
      if (!parsedQuery.trim()) return; //공백만 입력 시 무시시

      setLoading(true); //로딩시작
      setError(null); //이전 에러 초기화화

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${
            import.meta.env.VITE_APP_API_KEY
          }&query=${encodeURIComponent(parsedQuery)}&language=ko-KR`
        );
        setFilteredMovies(response.data.results || []); //결과 저장장
      } catch (err) {
        console.error('검색 API 오류:', err);
        setError('검색 중 문제가 발생했습니다.'); //에러상태 저장장
      } finally {
        setLoading(false); //로딩 종료료
      }
    };

    fetchSearchResults();
  }, [location.search]); // URL query가 바뀔 때마다 검색 다시 실행

  return (
    <div>
      <SearchBar />  {/* 상단 고정 검색창 */}
      <HeaderWrapper>
        <Illustration>🔍</Illustration>
        <QueryText>{query}</QueryText>
        <Illustration>🔍</Illustration>
      </HeaderWrapper>


      {loading && (
  <ResultsContainer>
    {Array.from({ length: 8 }).map((_, index) => (
      <MovieCardSkeleton key={index} />
    ))}
  </ResultsContainer>
)}
      {error && <Message>{error}</Message>}

      {!loading && !error && (
  <>
    {filteredMovies.length > 0 ? (
      <ResultsContainer>
        {filteredMovies.map((movie) => (
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
      </ResultsContainer>
    ) : (
      <EmptyState query={query} />
    )}
  </>
)}

    </div>
  );
};

export default SearchResultsPage;

