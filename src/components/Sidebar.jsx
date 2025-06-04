import React from 'react';
import styled from 'styled-components';
import { Search, Film } from 'lucide-react';
import { Link } from 'react-router-dom'; 

const SidebarContainer = styled.div`
  width: 200px;
  background-color: #111;
  color: white;
  height: 100vh;
  padding: 20px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    color: red;
  }

  svg {
    margin-right: 10px;
  }
`;

function Sidebar() {
  return (
    <SidebarContainer>
      <Link to="/search" style={{ color: 'white', textDecoration: 'none' }}>
        <MenuItem><Search /> 찾기</MenuItem>
      </Link>
      <Link to="/film" style={{ color: 'white', textDecoration: 'none' }}>
        <MenuItem><Film /> 영화</MenuItem>
      </Link>
    </SidebarContainer>
  );
}

export default Sidebar;
