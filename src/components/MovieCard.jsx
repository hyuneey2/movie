// MovieCard.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  width: 100%;
  aspect-ratio: 2 / 3;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 10px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

function MovieCard({ id, title, posterPath }) {
  return (
    <StyledLink to={`/movie/${id}`}>
      <Card>
        <Poster
          src={posterPath ? posterPath : 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={title}
        />
        <Overlay>{title}</Overlay>
      </Card>
    </StyledLink>
  );
}

export default MovieCard;
