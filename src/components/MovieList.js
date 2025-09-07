import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addMovieAsync, editMovieAsync, deleteMovieAsync, fetchMovies } from '../store';
import MovieCard from './MovieCard';

import { useEffect } from 'react';

const MovieList = ({ all }) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const movies = useSelector(state => state.reelManager.movies);
  const reels = useSelector(state => state.reelManager.reels);
  const categories = useSelector(state => state.reelManager.categories);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [newMovieName, setNewMovieName] = useState('');
  const [editMovieId, setEditMovieId] = useState(null);
  const [deleteMovieId, setDeleteMovieId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  let filteredMovies = movies;
  if (!all && categoryId) {
    filteredMovies = movies.filter(m => String(m.categoryId) === String(categoryId));
  }


  const handleAddMovie = () => {
    if (newMovieName.trim() === '' || !categoryId) return;
    dispatch(addMovieAsync({ name: newMovieName, categoryId: String(categoryId) }));
    setShowModal(false);
    setNewMovieName('');
    setEditMovieId(null);
  };

  const handleEditMovie = () => {
    if (newMovieName.trim() === '' || !editMovieId) return;
    dispatch(editMovieAsync({ id: editMovieId, data: { name: newMovieName } }));
    setShowModal(false);
    setNewMovieName('');
    setEditMovieId(null);
  };

  const handleDeleteMovie = () => {
    if (!deleteMovieId) return;
    dispatch(deleteMovieAsync(deleteMovieId));
    setShowDeleteModal(false);
    setDeleteMovieId(null);
  };

  let breadcrumb = '';
  if (!all && categoryId) {
    const cat = categories.find(c => String(c.categoryId) === String(categoryId));
    if (cat) breadcrumb = cat.name;
  } else {
    breadcrumb = 'All Movies';
  }
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div>
      {breadcrumb && (
        <div className="mb-2 text-dark-muted text-sm">
          <span className="font-semibold">Path:</span> {breadcrumb}
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        {!all && <button className="text-dark-accent rounded-full w-8 h-8 flex items-center justify-center hover:bg-indigo-600" onClick={() => navigate(-1)} title="Back"><span className="text-xl">←</span></button>}
        <h2 className="text-xl font-bold">Movies</h2>
        {!all && (
          <button
            className="bg-dark-accent text-dark-bg rounded-full w-8 h-8 flex items-center justify-center hover:bg-indigo-600"
            onClick={() => setShowModal(true)}
            title="Add Movie"
          >
            <span className="text-2xl leading-none">+</span>
          </button>
        )}
      </div>
      {filteredMovies.length === 0 && <p className="text-dark-muted">No movies found.</p>}
      {filteredMovies.map((movie, idx) => {
        const reelsForMovie = reels.filter(r => r.movieId === movie.id || r.movieId === movie.movieId);
        const totalCount = reelsForMovie.length;
        const uploadedCount = reelsForMovie.filter(r => r.status === 'uploaded').length;
        const createdCount = reelsForMovie.filter(r => r.status === 'created').length;
        const pendingCount = reelsForMovie.filter(r => r.status === 'pending').length;
        return (
          <div key={movie.movieId ?? idx} className="group">
            <div
              className="bg-dark-card border border-dark-border rounded-lg p-4 shadow-md mb-4 cursor-pointer"
              onClick={() => navigate(`/category/${movie.categoryId}/movie/${movie.movieId}/reels`)}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg text-dark-accent">{movie.name}</span>
                  <button
                    className="text-dark-muted hover:text-dark-accent text-lg px-2 py-1 rounded"
                    title="Edit Movie"
                    onClick={e => { e.preventDefault(); e.stopPropagation(); setEditMovieId(movie.movieId); setNewMovieName(movie.name); setShowModal(true); }}
                  >
                    ✎
                  </button>
                  <button
                    className="text-dark-muted hover:text-red-500 text-lg px-2 py-1 rounded"
                    title="Delete Movie"
                    onClick={e => { e.preventDefault(); e.stopPropagation(); setDeleteMovieId(movie.movieId); setShowDeleteModal(true); }}
                  >
                    🗑
                  </button>
                </div>
                <span className="text-dark-muted text-sm">{totalCount} reels</span>
              </div>
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-status-uploaded">{uploadedCount} uploaded</span>
                <span className="text-status-created">{createdCount} created</span>
                <span className="text-status-pending">{pendingCount} pending</span>
              </div>
            </div>
          </div>
        );
      })}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-card p-6 rounded shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">{editMovieId ? 'Edit Movie' : 'Add Movie'}</h3>
            <input
              type="text"
              className="w-full p-2 mb-4 rounded bg-dark-bg text-dark-text border border-dark-border"
              placeholder="Movie name"
              value={newMovieName}
              onChange={e => setNewMovieName(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              {editMovieId ? (
                <button
                  className="px-4 py-2 bg-dark-accent text-dark-bg rounded hover:bg-indigo-600"
                  onClick={handleEditMovie}
                >
                  Save
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-dark-accent text-dark-bg rounded hover:bg-indigo-600"
                  onClick={handleAddMovie}
                >
                  Add
                </button>
              )}
              <button
                className="px-4 py-2 bg-dark-muted text-dark-bg rounded hover:bg-gray-700"
                onClick={() => { setShowModal(false); setEditMovieId(null); setNewMovieName(''); }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-card p-6 rounded shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">Delete Movie</h3>
            <p className="mb-2 text-dark-muted">Do you want to delete this movie?</p>
            <div className="mb-4 font-semibold text-dark-accent">{movies.find(m => m.movieId === deleteMovieId)?.name}</div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-red-600 text-dark-bg rounded hover:bg-red-700"
                onClick={handleDeleteMovie}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-dark-muted text-dark-bg rounded hover:bg-gray-700"
                onClick={() => { setShowDeleteModal(false); setDeleteMovieId(null); }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;