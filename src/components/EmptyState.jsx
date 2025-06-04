// components/EmptyState.jsx
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  color: #ccc;
  padding: 40px;
`;

const Illustration = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
`;

const Message = styled.div`
  font-size: 18px;
  margin-bottom: 8px;
`;

const Suggestion = styled.div`
  font-size: 14px;
  color: #999;
`;

const EmptyState = ({ query }) => (
  <Wrapper>
    <Illustration>🔍</Illustration>
    <Message>"{query}"에 대한 결과가 없습니다.</Message>
    <Suggestion>다른 키워드로 검색해보세요.</Suggestion>
  </Wrapper>
);

export default EmptyState;
