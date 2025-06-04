// components/Pagination.jsx
import React from 'react';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
  margin: 20px auto;
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const Button = styled.button`
  padding: 8px 14px;
  border: none;
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#007bff')};
  color: white;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-weight: bold;
`;

const CurrentPage = styled.span`
  font-weight: bold;
  font-size: 18px;
  align-self: center;
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <PaginationWrapper> 
              {/* 이전 버튼: 1페이지 이하일 땐 비활성화 */}
      <Button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        이전
      </Button>
         {/* 현재 페이지 / 전체 페이지 수 출력 */}
      <CurrentPage>
        {currentPage} / {totalPages}
      </CurrentPage>
            {/* 다음 버튼: 마지막 페이지 이상일 땐 비활성화 */}
      <Button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        다음
      </Button>
    </PaginationWrapper>
  );
};

export default Pagination;

