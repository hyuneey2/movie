// Navbar.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Nav = styled.nav`
  background-color: #111;
  padding: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  color: red;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NavButton = styled(Link)`
  background-color: red;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 8px;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff69b4;
  }
`;

const NomarlButton = styled(Link)`
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 8px;
  font-size: 14px;
  transition: background-color 0.3s;
`;

const LogoutButton = styled.button`
  background-color: red;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #ff69b4;
  }
`;

function Navbar() {
  const [nickname, setNickname] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    console.log("🔍 AccessToken from LocalStorage:", accessToken);
  
    if (accessToken) {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch("http://localhost:3000/user/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
  
          console.log("🔍 Fetch Response Status:", response.status);
  
          if (response.ok) {
            const { email } = await response.json();
            console.log("✅ 유저 정보 불러오기 성공:", email);
            const nick = email.split("@")[0];
            setNickname(nick);
          } else {
            console.log("❌ 유저 정보 요청 실패, 로그인 유지만 함");
            setNickname("알 수 없음"); // 실패해도 닉네임은 일단 임시로 보여줌
          }
        } catch (error) {
          console.error("❌ API 요청 에러:", error);
          setNickname("알 수 없음"); // 에러가 나도 로그인 유지만 함
        }
      };
      fetchUserInfo();
    }
  }, []);
  
  

  // 👉 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setNickname(null); // 닉네임 초기화
    navigate("/login");
  };

  return (
    <Nav>
      <Link to="/main" style={{ textDecoration: 'none' }}>
        <NavTitle>YONGCHA</NavTitle>
      </Link>
      <NavLinks>
        <NomarlButton to="/popular">Popular</NomarlButton>
        <NomarlButton to="/nowplaying">Now Playing</NomarlButton>
        <NomarlButton to="/toprated">Top Rated</NomarlButton>
        <NomarlButton to="/upcoming">Up Coming</NomarlButton>

        {/* ✅ 로그인 상태에 따른 버튼 표시 */}
        {nickname ? (
          <>
            <span style={{ color: 'lightgreen' }}>👤 {nickname}님</span>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          </>
        ) : (
          <>
            <NomarlButton to="/login">로그인</NomarlButton>
            <NavButton to="/signup">회원가입</NavButton>
          </>
        )}
      </NavLinks>
    </Nav>
  );
}

export default Navbar;
