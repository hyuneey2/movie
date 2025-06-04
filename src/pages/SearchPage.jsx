// SearchPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useHistory 대신 useNavigate 사용

// 검색창 스타일 컴포넌트
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;

`;

const SearchBox = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: white;
  border-radius: 50px;
  display: flex;
  padding: 8px;
    align-items: center; 
  padding: 1px 10px;
  box-shadow: 0 4px 6px rgba(35, 33, 33, 0.1);
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 12px 20px;
  font-size: 18px;
  border: none;
  border-radius: 24px;
  outline: none;
`;

const SearchButton = styled.button`
  padding: 8px 22px;
  background-color:rgb(255, 0, 0);
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color:rgb(237, 94, 151);
  }
`;

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/results?query=${encodeURIComponent(query)}`);
    }
  };
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <SearchBox>
        <SearchInput
          type="text"
          placeholder="영화 제목을 검색하세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </SearchBox>
    </SearchContainer>
  );
};

export default SearchPage;

