import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// CATEGORY CRUD
export async function addCategoryFirestore(category) {
  // category: { name: string }
  const docRef = await addDoc(collection(db, 'categories'), category);
  // Set categoryId field to docRef.id for compatibility
  await updateDoc(docRef, { categoryId: docRef.id });
  return { ...category, id: docRef.id, categoryId: docRef.id };
}

export async function getCategoriesFirestore() {
  const querySnapshot = await getDocs(collection(db, 'categories'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateCategoryFirestore(id, data) {
  await updateDoc(doc(db, 'categories', id), data);
}

export async function deleteCategoryFirestore(id) {
  // Delete all movies and reels under this category
  const moviesSnapshot = await getDocs(collection(db, 'movies'));
  const moviesToDelete = moviesSnapshot.docs.filter(docSnap => docSnap.data().categoryId === id);
  for (const movieDoc of moviesToDelete) {
    await deleteMovieFirestore(movieDoc.id);
  }
  await deleteDoc(doc(db, 'categories', id));
}


// MOVIE CRUD
export async function addMovieFirestore(movie) {
  // movie: { name: string, categoryId: string }
  const docRef = await addDoc(collection(db, 'movies'), movie);
  // Set movieId field to docRef.id for compatibility
  await updateDoc(docRef, { movieId: docRef.id });
  return { ...movie, id: docRef.id, movieId: docRef.id };
}

export async function getMoviesFirestore() {
  const querySnapshot = await getDocs(collection(db, 'movies'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateMovieFirestore(id, data) {
  await updateDoc(doc(db, 'movies', id), data);
}

export async function deleteMovieFirestore(id) {
  // Delete all reels under this movie
  const reelsSnapshot = await getDocs(collection(db, 'reels'));
  const reelsToDelete = reelsSnapshot.docs.filter(docSnap => docSnap.data().movieId === id);
  for (const reelDoc of reelsToDelete) {
    await deleteReelFirestore(reelDoc.id);
  }
  await deleteDoc(doc(db, 'movies', id));
}

// REEL CRUD
export async function addReelFirestore(reel) {
  // reel: { note: string, status: string, movieId: string }
  const docRef = await addDoc(collection(db, 'reels'), reel);
  // Set reelId field to docRef.id for compatibility
  await updateDoc(docRef, { reelId: docRef.id });
  return { ...reel, id: docRef.id, reelId: docRef.id };
}

export async function getReelsFirestore() {
  const querySnapshot = await getDocs(collection(db, 'reels'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateReelFirestore(id, data) {
  await updateDoc(doc(db, 'reels', id), data);
}

export async function deleteReelFirestore(id) {
  await deleteDoc(doc(db, 'reels', id));
}
