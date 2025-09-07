import React from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory } from '../store';

const CategoryList = () => {
  const categories = useSelector(state => state.reelManager.categories);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteCategory = (cat) => {
    setDeleteCategoryId(cat.categoryId);
    setShowDeleteModal(true);
  };

  const confirmDeleteCategory = () => {
    dispatch({ type: 'reelManager/deleteCategory', payload: { categoryId: deleteCategoryId } });
    setShowDeleteModal(false);
    setDeleteCategoryId(null);
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim() === '') return;
    if (editCategoryId) {
      dispatch({ type: 'reelManager/editCategory', payload: { categoryId: editCategoryId, name: newCategoryName } });
    } else {
      dispatch(addCategory(newCategoryName));
    }
    setShowModal(false);
    setNewCategoryName('');
    setEditCategoryId(null);
  };

  const movies = useSelector(state => state.reelManager.movies);
  const reels = useSelector(state => state.reelManager.reels);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Categories</h2>
        <button
          className="bg-dark-accent text-dark-bg rounded-full w-8 h-8 flex items-center justify-center hover:bg-indigo-600"
          onClick={() => setShowModal(true)}
          title="Add Category"
        >
          <span className="text-2xl leading-none">+</span>
        </button>
      </div>
      {categories.map((cat, idx) => {
        const moviesInCat = movies.filter(m => m.categoryId === cat.categoryId);
        const movieCount = moviesInCat.length;
        const reelsInCat = reels.filter(r => moviesInCat.some(m => m.movieId === r.movieId));
        const totalReels = reelsInCat.length;
        const uploadedCount = reelsInCat.filter(r => r.status === 'uploaded').length;
        const otherCount = reelsInCat.filter(r => r.status !== 'uploaded').length;
        return (
          <Link
            key={cat.categoryId ?? idx}
            to={`/category/${cat.categoryId ?? idx}`}
            className="block group"
            style={{ textDecoration: 'none' }}
          >
            <div className="bg-dark-card border border-dark-border rounded-lg p-4 shadow-md mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-dark-accent">{cat.name}</h2>
                  <button
                    className="text-dark-muted hover:text-dark-accent text-lg px-2 py-1 rounded"
                    title="Edit Category"
                    onClick={e => { e.preventDefault(); e.stopPropagation(); setEditCategoryId(cat.categoryId); setNewCategoryName(cat.name); setShowModal(true); }}
                  >
                    ✎
                  </button>
                  <button
                    className="text-dark-muted hover:text-red-500 text-lg px-2 py-1 rounded"
                    title="Delete Category"
                    onClick={e => { e.preventDefault(); e.stopPropagation(); handleDeleteCategory(cat); }}
                  >
                    🗑
                  </button>
                </div>
                <span className="text-dark-muted text-sm">{movieCount} movies</span>
              </div>
              <div className="flex justify-between text-sm text-dark-muted">
                <span className="font-semibold">{totalReels} reels</span>
                <span className="text-status-uploaded">{uploadedCount} uploaded</span>
                <span className="text-status-created">{otherCount} other</span>
              </div>
            </div>
          </Link>
        );
      })}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-card p-6 rounded shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">Delete Category</h3>
            <p className="mb-2 text-dark-muted">Do you want to delete this category?</p>
            <div className="mb-4 font-semibold text-dark-accent">{categories.find(c => c.categoryId === deleteCategoryId)?.name}</div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-red-500 text-dark-bg rounded hover:bg-red-700"
                onClick={confirmDeleteCategory}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-dark-muted text-dark-bg rounded hover:bg-gray-700"
                onClick={() => { setShowDeleteModal(false); setDeleteCategoryId(null); }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-card p-6 rounded shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">{editCategoryId ? 'Edit Category' : 'Add Category'}</h3>
            <input
              type="text"
              className="w-full p-2 mb-4 rounded bg-dark-bg text-dark-text border border-dark-border"
              placeholder="Category name"
              value={newCategoryName}
              onChange={e => setNewCategoryName(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-dark-accent text-dark-bg rounded hover:bg-indigo-600"
                onClick={handleAddCategory}
              >
                {editCategoryId ? 'Save' : 'Add'}
              </button>
              <button
                className="px-4 py-2 bg-dark-muted text-dark-bg rounded hover:bg-gray-700"
                onClick={() => setShowModal(false)}
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

export default CategoryList;
