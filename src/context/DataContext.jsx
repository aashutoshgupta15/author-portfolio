import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('author_admin_auth') === 'true';
  });
  const [loading, setLoading] = useState(true);

  // Fetch data from Supabase on load
  useEffect(() => {
    fetchBooks();
    fetchPosts();
    fetchReviews();
  }, []);

  const fetchBooks = async () => {
    const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });
    if (data) setBooks(data);
    else console.error('Error fetching books:', error);
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (data) setPosts(data);
    else console.error('Error fetching posts:', error);
    setLoading(false);
  };

  const fetchReviews = async () => {
    const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    if (data) setReviews(data);
    else console.error('Error fetching reviews:', error);
  };

  const login = (password) => {
    // Basic frontend authentication for the dashboard layout
    // In a production app, you would use Supabase Auth (email/password).
    if (password === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('author_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('author_admin_auth');
  };

  const addBook = async (book) => {
    const { data, error } = await supabase.from('books').insert([book]).select();
    if (data) setBooks([data[0], ...books]);
    else console.error('Error adding book:', error);
  };

  const deleteBook = async (id) => {
    const { error } = await supabase.from('books').delete().eq('id', id);
    if (!error) setBooks(books.filter(b => b.id !== id));
    else console.error('Error deleting book:', error);
  };

  const addPost = async (post) => {
    const { data, error } = await supabase.from('posts').insert([post]).select();
    if (data) setPosts([data[0], ...posts]);
    else console.error('Error adding post:', error);
  };

  const deletePost = async (id) => {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (!error) setPosts(posts.filter(p => p.id !== id));
    else console.error('Error deleting post:', error);
  };

  const updateBook = async (id, updatedBook) => {
    const { data, error } = await supabase.from('books').update(updatedBook).eq('id', id).select();
    if (data) setBooks(books.map(b => b.id === id ? data[0] : b));
    else console.error('Error updating book:', error);
  };

  const updatePost = async (id, updatedPost) => {
    const { data, error } = await supabase.from('posts').update(updatedPost).eq('id', id).select();
    if (data) setPosts(posts.map(p => p.id === id ? data[0] : p));
    else console.error('Error updating post:', error);
  };

  const addReview = async (review) => {
    const { data, error } = await supabase.from('reviews').insert([review]).select();
    if (data) setReviews([data[0], ...reviews]);
    else console.error('Error adding review:', error);
  };

  const deleteReview = async (id) => {
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (!error) setReviews(reviews.filter(r => r.id !== id));
    else console.error('Error deleting review:', error);
  };

  const updateReview = async (id, updatedReview) => {
    const { data, error } = await supabase.from('reviews').update(updatedReview).eq('id', id).select();
    if (data) setReviews(reviews.map(r => r.id === id ? data[0] : r));
    else console.error('Error updating review:', error);
  };

  const uploadMedia = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage.from('media').upload(fileName, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      alert('Error uploading file. Make sure you created the "media" bucket and made it public.');
      return null;
    }

    const { data } = supabase.storage.from('media').getPublicUrl(fileName);
    return data.publicUrl;
  };

  return (
    <DataContext.Provider value={{
      books, posts, reviews, isAuthenticated, login, logout,
      addBook, deleteBook, updateBook, 
      addPost, deletePost, updatePost, 
      addReview, deleteReview, updateReview,
      uploadMedia, loading
    }}>
      {children}
    </DataContext.Provider>
  );
};
