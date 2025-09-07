
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import CategoryList from './components/CategoryList';
import MovieList from './components/MovieList';
import ReelList from './components/ReelList';
import Navbar from './components/Navbar';

function App() {
  return (
    <Provider store={store}>
      <Router basename="/reel_manager">
        <div className="min-h-screen bg-dark-bg text-dark-text">
          <Navbar />
          <main className="p-4">
            <Routes>
              <Route path="/" element={<CategoryList />} />
              <Route path="/movies" element={<MovieList all />} />
              <Route path="/category/:categoryId" element={<MovieList />} />
              <Route path="/category/:categoryId/movie/:movieId/reels" element={<ReelList />} />
              <Route path="/movie/:movieId" element={<ReelList />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
