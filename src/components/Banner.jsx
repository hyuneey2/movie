// components/Banner.jsx
import React from 'react';
import styled from 'styled-components';

const BannerWrapper = styled.div`
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  height: 400px;
  color: white;
  display: flex;
  align-items: flex-end;
  padding: 30px;
`;

const Title = styled.h2`
  font-size: 32px;
  margin: 0;
`;

const Overview = styled.p`
  font-size: 16px;
  max-width: 700px;
  margin-top: 10px;
`;

function Banner({ movie }) {
  if (!movie) return null;

  const bgImage = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <BannerWrapper bgImage={bgImage}>
      <div>
        <Title>{movie.title || movie.name}</Title>
        <Overview>{movie.overview}</Overview>
      </div>
    </BannerWrapper>
  );
}

export default Banner;
