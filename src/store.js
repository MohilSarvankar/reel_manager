import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCategoriesFirestore, addCategoryFirestore, updateCategoryFirestore, deleteCategoryFirestore,
  getMoviesFirestore, addMovieFirestore, updateMovieFirestore, deleteMovieFirestore,
  getReelsFirestore, addReelFirestore, updateReelFirestore, deleteReelFirestore
} from './firestoreApi';
// CATEGORY THUNKS
export const fetchCategories = createAsyncThunk('reelManager/fetchCategories', async () => {
  return await getCategoriesFirestore();
});
export const addCategoryAsync = createAsyncThunk('reelManager/addCategoryAsync', async (category) => {
  return await addCategoryFirestore(category);
});
export const editCategoryAsync = createAsyncThunk('reelManager/editCategoryAsync', async ({ id, data }) => {
  await updateCategoryFirestore(id, data);
  return { id, ...data };
});
export const deleteCategoryAsync = createAsyncThunk('reelManager/deleteCategoryAsync', async (id) => {
  await deleteCategoryFirestore(id);
  return id;
});

// MOVIE THUNKS
export const fetchMovies = createAsyncThunk('reelManager/fetchMovies', async () => {
  return await getMoviesFirestore();
});
export const addMovieAsync = createAsyncThunk('reelManager/addMovieAsync', async (movie) => {
  return await addMovieFirestore(movie);
});
export const editMovieAsync = createAsyncThunk('reelManager/editMovieAsync', async ({ id, data }) => {
  await updateMovieFirestore(id, data);
  return { id, ...data };
});
export const deleteMovieAsync = createAsyncThunk('reelManager/deleteMovieAsync', async (id) => {
  await deleteMovieFirestore(id);
  return id;
});

// REEL THUNKS
export const fetchReels = createAsyncThunk('reelManager/fetchReels', async () => {
  return await getReelsFirestore();
});
export const addReelAsync = createAsyncThunk('reelManager/addReelAsync', async (reel) => {
  return await addReelFirestore(reel);
});
export const editReelAsync = createAsyncThunk('reelManager/editReelAsync', async ({ id, data }) => {
  await updateReelFirestore(id, data);
  return { id, ...data };
});
export const deleteReelAsync = createAsyncThunk('reelManager/deleteReelAsync', async (id) => {
  await deleteReelFirestore(id);
  return id;
});

const initialState = {
  categories: [],
  movies: [],
  reels: [],
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
      // Deprecated: handled by Firestore thunks
    },
    editCategory: (state, action) => {
      const { categoryId, name } = action.payload;
      const cat = state.categories.find(c => c.categoryId === categoryId);
      if (cat) cat.name = name;
    },
    addMovie: (state, action) => {
      // Deprecated: handled by Firestore thunks
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
      // Deprecated: handled by Firestore thunks
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
  extraReducers: builder => {
    // Categories
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(addCategoryAsync.fulfilled, (state, action) => {
      state.categories.push(action.payload);
    });
    builder.addCase(editCategoryAsync.fulfilled, (state, action) => {
      const idx = state.categories.findIndex(c => c.id === action.payload.id);
      if (idx !== -1) state.categories[idx] = action.payload;
    });
    builder.addCase(deleteCategoryAsync.fulfilled, (state, action) => {
      state.categories = state.categories.filter(c => c.id !== action.payload);
    });
    // Movies
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(addMovieAsync.fulfilled, (state, action) => {
      state.movies.push(action.payload);
    });
    builder.addCase(editMovieAsync.fulfilled, (state, action) => {
      const idx = state.movies.findIndex(m => m.id === action.payload.id);
      if (idx !== -1) state.movies[idx] = action.payload;
    });
    builder.addCase(deleteMovieAsync.fulfilled, (state, action) => {
      state.movies = state.movies.filter(m => m.id !== action.payload);
    });
    // Reels
    builder.addCase(fetchReels.fulfilled, (state, action) => {
      state.reels = action.payload;
    });
    builder.addCase(addReelAsync.fulfilled, (state, action) => {
      state.reels.push(action.payload);
    });
    builder.addCase(editReelAsync.fulfilled, (state, action) => {
      const idx = state.reels.findIndex(r => r.id === action.payload.id);
      if (idx !== -1) state.reels[idx] = action.payload;
    });
    builder.addCase(deleteReelAsync.fulfilled, (state, action) => {
      state.reels = state.reels.filter(r => r.id !== action.payload);
    });
  }
});

export const { addCategory, addMovie, addReel, editMovie, deleteMovie, editReel, deleteReel } = reelManagerSlice.actions;

const store = configureStore({
  reducer: {
    reelManager: reelManagerSlice.reducer,
  },
});

export default store;
