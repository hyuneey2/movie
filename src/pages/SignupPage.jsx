import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./SignupPage.css"; // CSS 파일 임포트

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [serverMessage, setServerMessage] = useState(""); // 서버 메시지 추가
  const navigate = useNavigate();
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // 유효성 검사
    if (!email) {
      newErrors.email = "이메일을 반드시 입력해주세요.";
    } else if (!validateEmail(email)) {
      newErrors.email = "유효한 이메일 형식이 아닙니다.";
    }

    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    } else if (password.length > 16) {
      newErrors.password = "비밀번호는 16자 이하여야 합니다.";
    }

    if (!passwordCheck) {
      newErrors.passwordCheck = "비밀번호 검증 또한 필수 입력요소입니다.";
    } else if (password !== passwordCheck) {
      newErrors.passwordCheck = "비밀번호가 일치하지 않습니다.";
    }

    // 에러가 있을 경우 화면에 표시
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setIsLoading(true); // 로딩 시작

      // 백엔드로 데이터 전송 (회원가입 API 호출)
      const userData = { email, password, passwordCheck };

      console.log(" 회원가입 요청 데이터:", userData);
      
      try {//서버로 요청보냄냄
        const response = await fetch("http://localhost:3000/auth/register", {
          method: "POST",//회원정보 전달달
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const result = await response.json();//데이터 올때까지 비동기로 기다리기기

        if (response) {
          setServerMessage("회원가입 성공!"); // 성공 메시지
          setTimeout(() => {
            navigate("/login"); // 회원가입 성공 시 로그인 페이지로 이동
          }, 1000); // 1초 후에 이동
        } else {
          setServerMessage(`회원가입 실패: ${result.message}`); // 실패 메시지
        }
      } catch (error) {
        console.error("서버 연결 실패:", error);
        setServerMessage("서버 연결에 실패했습니다.");
      } finally {
        setIsLoading(false); // 로딩 끝
      }
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h1>회원가입</h1>

        <input
          type="email"
          placeholder="이메일을 입력해주세요!"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div className="error">{errors.email}</div>}

        <input
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <div className="error">{errors.password}</div>}

        <input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요!"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        {errors.passwordCheck && (
          <div className="error">{errors.passwordCheck}</div>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "가입 중..." : "제출"}
        </button>
      </form>

      {/* 서버 응답 메시지 표시 */}
      {serverMessage && <div className="server-message">{serverMessage}</div>}
    </div>
  );
  
};

export default SignupPage;
