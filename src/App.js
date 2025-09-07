
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import CategoryList from './components/CategoryList';
import MovieList from './components/MovieList';
import ReelList from './components/ReelList';
import Navbar from './components/Navbar';

function App() {
  // Sample data for demonstration
  // const categories = [
  //   { categoryId: 1, name: 'Action', movieCount: 2, uploadedCount: 3, createdCount: 1 },
  //   { categoryId: 2, name: 'Drama', movieCount: 1, uploadedCount: 2, createdCount: 2 },
  // ];
  // const movies = [
  //   { movieId: 1, categoryId: 1, name: 'Inception', reelCounts: { total: 3, uploaded: 2, created: 1, downloaded: 0, pending: 0 } },
  //   { movieId: 2, categoryId: 2, name: 'Interstellar', reelCounts: { total: 2, uploaded: 1, created: 1, pending: 0 } },
  //   { movieId: 3, categoryId: 2, name: 'Jumanji', reelCounts: { total: 2, uploaded: 1, created: 1, downloaded: 0, pending: 0 } },
  // ];
  // const reels = [
  //   { reelId : 1, movieId: 1, status: 'uploaded', note: 'Dream scene' },
  //   { reelId : 2, movieId: 2, status: 'created', note: 'Space travel' },
  //   { reelId : 3, movieId: 2, status: 'pending', note: 'To be edited' },
  // ];

  return (
    <Provider store={store}>
      <Router>
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
