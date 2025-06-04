// components/MovieCardSkeleton.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -450px 0;
  }
  100% {
    background-position: 450px 0;
  }
`;

const SkeletonWrapper = styled.div`
  width: 180px;
  height: 280px;
  border-radius: 10px;
  background: #ddd;
  position: relative;
  overflow: hidden;
`;

const SkeletonShimmer = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    #ddd 0%,
    #eee 50%,
    #ddd 100%
  );
  background-size: 450px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 10px;
`;

const MovieCardSkeleton = () => {
  return (
    <SkeletonWrapper>
      <SkeletonShimmer />
    </SkeletonWrapper>
  );
};

export default MovieCardSkeleton;
