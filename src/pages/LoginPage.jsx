import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // CSS 파일 임포트

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // 필요하면 회원가입 등 다른 이동에 사용

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("로그인 함수 시작");
    const newErrors = {};

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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setServerMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log("서버 응답:", result);
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      if (response) {
        setServerMessage("로그인 성공!");
      
        // ✅ 토큰 저장 - 정확한 이름으로!
        //localStorage.setItem("accessToken", accessToken);
        //localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userEmail", email);
      
        console.log("✅ 로그인 성공! 서버로부터 받은 토큰:", JSON.stringify(result, null, 2));
        console.log("📌 저장된 AccessToken:", localStorage.getItem('accessToken'));
        console.log("📌 저장된 RefreshToken:", localStorage.getItem('refreshToken'));
      
        // ✅ 1초 후 메인 페이지로 이동 + 새로고침
        setTimeout(() => {
          window.location.href = "/main";
        }, 1000);
      }
       else {
        setServerMessage(`로그인 실패: ${result.message}`);
      }
    } catch (error) {
      console.error("서버 연결 실패:", error);
      setServerMessage("서버 연결에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>로그인</h1>

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

        <button type="submit" disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      {serverMessage && <div className="server-message">{serverMessage}</div>}
    </div>
  );
};

export default LoginPage;
