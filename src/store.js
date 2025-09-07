import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    { categoryId: 1, name: 'Action' },
    { categoryId: 2, name: 'Drama' },
    { categoryId: 3, name: 'Comedy' },
  ],
  movies: [
    { movieId: 1, categoryId: 1, name: 'Inception' },
    { movieId: 2, categoryId: 1, name: 'Mad Max: Fury Road' },
    { movieId: 3, categoryId: 2, name: 'Interstellar' },
    { movieId: 4, categoryId: 3, name: 'Jumanji' },
  ],
  reels: [
    { reelId: 1, movieId: 1, status: 'uploaded', note: 'Dream scene' },
    { reelId: 2, movieId: 1, status: 'created', note: 'Paris folding city' },
    { reelId: 3, movieId: 2, status: 'pending', note: 'Desert chase' },
    { reelId: 4, movieId: 2, status: 'uploaded', note: 'War rig escape' },
    { reelId: 5, movieId: 3, status: 'created', note: 'Space travel' },
    { reelId: 6, movieId: 3, status: 'pending', note: 'Black hole approach' },
    { reelId: 7, movieId: 4, status: 'uploaded', note: 'Board game chaos' },
  ],
  lastCategoryId: 3,
  lastMovieId: 4,
  lastReelId: 7,
};

// ...existing code...

const reelManagerSlice = createSlice({
  name: 'reelManager',
  initialState,
  reducers: {
    deleteCategory: (state, action) => {
      const { categoryId } = action.payload;
      state.categories = state.categories.filter(c => c.categoryId !== categoryId);
      state.movies = state.movies.filter(m => m.categoryId !== categoryId);
      state.reels = state.reels.filter(r => {
        const movie = state.movies.find(m => m.movieId === r.movieId);
        return movie && movie.categoryId !== categoryId;
      });
    },
    addCategory: (state, action) => {
      state.lastCategoryId += 1;
      state.categories.push({
        categoryId: state.lastCategoryId,
        name: action.payload,
      });
    },
    editCategory: (state, action) => {
      const { categoryId, name } = action.payload;
      const cat = state.categories.find(c => c.categoryId === categoryId);
      if (cat) cat.name = name;
    },
    addMovie: (state, action) => {
      state.lastMovieId += 1;
      state.movies.push({
        movieId: state.lastMovieId,
        categoryId: action.payload.categoryId,
        name: action.payload.name,
      });
    },
    editMovie: (state, action) => {
      const { movieId, name } = action.payload;
      const movie = state.movies.find(m => m.movieId === movieId);
      if (movie) movie.name = name;
    },
    deleteMovie: (state, action) => {
      const { movieId } = action.payload;
      state.movies = state.movies.filter(m => m.movieId !== movieId);
      state.reels = state.reels.filter(r => r.movieId !== movieId);
    },
    addReel: (state, action) => {
      state.lastReelId += 1;
      state.reels.push({
        reelId: state.lastReelId,
        movieId: action.payload.movieId,
        status: action.payload.status,
        note: action.payload.note,
      });
    },
    editReel: (state, action) => {
      const { reelId, status, note } = action.payload;
      const reel = state.reels.find(r => r.reelId === reelId);
      if (reel) {
        reel.status = status;
        reel.note = note;
      }
    },
    deleteReel: (state, action) => {
      const { reelId } = action.payload;
      state.reels = state.reels.filter(r => r.reelId !== reelId);
    },
  },
});

export const { addCategory, addMovie, addReel, editMovie, deleteMovie, editReel, deleteReel } = reelManagerSlice.actions;

const store = configureStore({
  reducer: {
    reelManager: reelManagerSlice.reducer,
  },
});

export default store;
