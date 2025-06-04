// components/SearchBar.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchBox = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: white;
  border-radius: 50px;
  display: flex;
  padding: 8px;
  margin: 20px auto;
  align-items: center; 
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
  background-color: rgb(255, 0, 0);
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: rgb(237, 94, 151);
  }
`;

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentQuery = new URLSearchParams(location.search).get('query') || '';
  const [query, setQuery] = useState(currentQuery);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/results?query=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
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
  );
};

export default SearchBar;
