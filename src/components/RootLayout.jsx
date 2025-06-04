// RootLayout.jsx
import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  background-color: #181818;
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

function RootLayout() {
  return (
    <Layout>
      <Navbar /> {/* Navbar 컴포넌트 호출 */}
      <Main>
        <Sidebar />
        <Content>
          <Outlet />
        </Content>
      </Main>
    </Layout>
  );
}

export default RootLayout;
