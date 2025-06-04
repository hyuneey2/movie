import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SearchPage from './pages/SearchPage';
import SearchResultsPage from './pages/SearchResultsPage';
import PopularPage from './pages/PopularPage';
import NowPlayingPage from './pages/NowPlayingPage';
import TopRatedPage from './pages/TopRatedPage';
import UpComingPage from './pages/UpComingPage';
import MainPage from './pages/MainPage';
import MovieDetailPage from './pages/MovieDetailPage';
import FilmPage from './pages/FilmPage';

function App() {
  return (
//main.jsx에 BrowserRouter로 잘 감싸놨음음
      <Routes>
        <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} /> 
        <Route path="signup" element={<SignupPage />} /> 
        <Route path="/search" element={<SearchPage />} />
        <Route path="popular" element={<PopularPage />} />
        <Route path="nowplaying" element={<NowPlayingPage />} />
        <Route path="toprated" element={<TopRatedPage />} />
        <Route path="upcoming" element={<UpComingPage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="film" element={<FilmPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/results" element={<SearchResultsPage />} />



        <Route path="movie/:movieId" element={<MovieDetailPage />} />
 {/* 동적 라우팅 */}
        </Route>
      </Routes>

  );
}
export default App;
