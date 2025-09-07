import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReel, editReel, deleteReel } from '../store';
import { useParams, useNavigate } from 'react-router-dom';
import ReelCard from './ReelCard';

const ReelList = ({ all }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const reels = useSelector(state => state.reelManager.reels);
  const movies = useSelector(state => state.reelManager.movies);
  const categories = useSelector(state => state.reelManager.categories);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [newStatus, setNewStatus] = useState('pending');
  const [editReelId, setEditReelId] = useState(null);
  const [editReelIdx, setEditReelIdx] = useState(null);
  const [deleteReelId, setDeleteReelId] = useState(null);
  const [deleteReelIdx, setDeleteReelIdx] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  let filteredReels = reels;
  let breadcrumb = '';
  if (!all && movieId) {
    filteredReels = reels.filter(r => String(r.movieId) === String(movieId));
    const movie = movies.find(m => String(m.movieId) === String(movieId));
    if (movie) {
      const category = categories.find(c => c.categoryId === movie.categoryId);
      if (category) {
        breadcrumb = `${category.name} > ${movie.name}`;
      } else {
        breadcrumb = movie.name;
      }
    }
  }

  // Determine next reel number for this movie
  const nextReelNumber = reels.length + 1;

  const handleAddReel = () => {
    if (!movieId || newNote.trim() === '') return;
    dispatch(addReel({ movieId: Number(movieId), status: newStatus, note: newNote }));
    setShowModal(false);
    setNewNote('');
    setNewStatus('pending');
    setEditReelId(null);
  };

  const handleEditReel = () => {
    if (!editReelId || newNote.trim() === '') return;
    dispatch(editReel({ reelId: editReelId, status: newStatus, note: newNote }));
    setShowModal(false);
    setNewNote('');
    setNewStatus('pending');
    setEditReelId(null);
  };

  const handleDeleteReel = () => {
    if (!deleteReelId) return;
    dispatch(deleteReel({ reelId: deleteReelId }));
    setShowDeleteModal(false);
    setDeleteReelId(null);
  };
  return (
    <div>
      {!all && breadcrumb && (
        <div className="mb-2 text-dark-muted text-sm">
          <span className="font-semibold">Path:</span> {breadcrumb}
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        {!all && <button className="text-dark-accent rounded-full w-8 h-8 flex items-center justify-center hover:bg-indigo-600" onClick={() => navigate(-1)} title="Back"><span className="text-xl">←</span></button>}
        <h2 className="text-xl font-bold">Reels</h2>
        <button
          className="bg-dark-accent text-dark-bg rounded-full w-8 h-8 flex items-center justify-center hover:bg-indigo-600"
          onClick={() => setShowModal(true)}
          title="Add Reel"
        >
          <span className="text-2xl leading-none">+</span>
        </button>
      </div>
      {filteredReels.length === 0 && <p className="text-dark-muted">No reels found.</p>}
      {filteredReels.map((reel, idx) => (
        <div key={reel.reelId ?? idx} className="group">
          <div className="bg-dark-card border border-dark-border rounded-lg p-4 shadow-md mb-4 relative">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-dark-accent">Reel {idx + 1}</span>
                <button
                  className="text-dark-muted hover:text-dark-accent text-lg px-2 py-1 rounded"
                  title="Edit Reel"
                  onClick={e => { e.preventDefault(); e.stopPropagation(); setEditReelId(reel.reelId); setEditReelIdx(idx); setNewNote(reel.note); setNewStatus(reel.status); setShowModal(true); }}
                >
                  ✎
                </button>
                <button
                  className="text-dark-muted hover:text-red-500 text-lg px-2 py-1 rounded"
                  title="Delete Reel"
                  onClick={e => { e.preventDefault(); e.stopPropagation(); setDeleteReelId(reel.reelId); setDeleteReelIdx(idx); setShowDeleteModal(true); }}
                >
                  🗑
                </button>
              </div>
              <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold text-dark-bg bg-status-${reel.status}`}>{reel.status}</span>
            </div>
            <p className="text-sm text-dark-muted">{reel.note}</p>
          </div>
        </div>
      ))}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ overflow: 'visible' }}>
          <div className="bg-dark-card p-6 rounded shadow-lg w-80" style={{ overflow: 'visible' }}>
            <h3 className="text-lg font-bold mb-4">{editReelId ? 'Edit Reel' : 'Add Reel'}</h3>
            <div className="mb-4">
              <label className="block text-dark-muted mb-1">Reel Name</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-dark-bg text-dark-text border border-dark-border"
                value={editReelId ? `Reel ${editReelIdx + 1}` : `Reel ${filteredReels.length + 1}`}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-dark-muted mb-1">Notes</label>
              <textarea
                className="w-full p-2 rounded bg-dark-bg text-dark-text border border-dark-border"
                placeholder="Scene notes"
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-dark-muted mb-1">Status</label>
              <select
                className="w-full p-2 rounded bg-dark-bg text-dark-text border border-dark-border text-sm"
                value={newStatus}
                onChange={e => setNewStatus(e.target.value)}
                style={{ fontSize: '0.95rem' }}
              >
                <option className="text-sm" value="pending">Pending</option>
                <option className="text-sm" value="uploaded">Uploaded</option>
                <option className="text-sm" value="created">Created</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              {editReelId ? (
                <button
                  className="px-4 py-2 bg-dark-accent text-dark-bg rounded hover:bg-indigo-600"
                  onClick={handleEditReel}
                >
                  Save
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-dark-accent text-dark-bg rounded hover:bg-indigo-600"
                  onClick={handleAddReel}
                >
                  Add
                </button>
              )}
              <button
                className="px-4 py-2 bg-dark-muted text-dark-bg rounded hover:bg-gray-700"
                onClick={() => { setShowModal(false); setEditReelId(null); setEditReelIdx(null); setNewNote(''); setNewStatus('pending'); }}
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
            <h3 className="text-lg font-bold mb-4">Delete Reel</h3>
            <p className="mb-2 text-dark-muted">Do you want to delete this reel?</p>
            <div className="mb-4 font-semibold text-dark-accent">{deleteReelIdx !== null ? `Reel ${deleteReelIdx + 1}` : ''}</div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-red-600 text-dark-bg rounded hover:bg-red-700"
                onClick={handleDeleteReel}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-dark-muted text-dark-bg rounded hover:bg-gray-700"
                onClick={() => { setShowDeleteModal(false); setDeleteReelId(null); setDeleteReelIdx(null); }}
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

export default ReelList;
