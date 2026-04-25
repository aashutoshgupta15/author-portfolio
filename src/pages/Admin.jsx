import { useState } from 'react';
import { useData } from '../context/DataContext';

const Admin = () => {
  const { isAuthenticated, login, logout, books, posts, reviews, addBook, deleteBook, updateBook, addPost, deletePost, updatePost, addReview, deleteReview, updateReview, uploadMedia } = useData();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState('posts'); // 'posts', 'books', or 'reviews'
  
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingBookId, setEditingBookId] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const [newPost, setNewPost] = useState({ title: '', excerpt: '', category: 'Short Stories', date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), media_url: '' });
  const [newBook, setNewBook] = useState({ title: '', synopsis: '', type: 'Novel', cover: '/book1.png', sample_url: '', payment_link: '', price: '' });
  const [newReview, setNewReview] = useState({ title: '', content: '', category: 'Books', date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), media_url: '', external_link: '' });

  const [uploadingPostMedia, setUploadingPostMedia] = useState(false);
  const [uploadingBookMedia, setUploadingBookMedia] = useState(false);
  const [uploadingBookSample, setUploadingBookSample] = useState(false);
  const [uploadingReviewMedia, setUploadingReviewMedia] = useState(false);

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'post') setUploadingPostMedia(true);
    else if (type === 'book') setUploadingBookMedia(true);
    else if (type === 'book_sample') setUploadingBookSample(true);
    else setUploadingReviewMedia(true);

    const url = await uploadMedia(file);

    if (url) {
      if (type === 'post') setNewPost({ ...newPost, media_url: url });
      else if (type === 'book') setNewBook({ ...newBook, cover: url });
      else if (type === 'book_sample') setNewBook({ ...newBook, sample_url: url });
      else setNewReview({ ...newReview, media_url: url });
    }

    if (type === 'post') setUploadingPostMedia(false);
    else if (type === 'book') setUploadingBookMedia(false);
    else if (type === 'book_sample') setUploadingBookSample(false);
    else setUploadingReviewMedia(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(password)) {
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    if (newPost.title) {
      if (editingPostId) {
        updatePost(editingPostId, newPost);
        setEditingPostId(null);
      } else {
        addPost(newPost);
      }
      setNewPost({ title: '', excerpt: '', category: 'Short Stories', date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), media_url: '' });
    }
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    if (newBook.title) {
      if (editingBookId) {
        updateBook(editingBookId, newBook);
        setEditingBookId(null);
      } else {
        addBook(newBook);
      }
      setNewBook({ title: '', synopsis: '', type: 'Novel', cover: '/book1.png', sample_url: '', payment_link: '', price: '' });
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (newReview.title) {
      if (editingReviewId) {
        updateReview(editingReviewId, newReview);
        setEditingReviewId(null);
      } else {
        addReview(newReview);
      }
      setNewReview({ title: '', content: '', category: 'Books', date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), media_url: '', external_link: '' });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
          <h2>Admin Login</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Password is: <strong>admin</strong></p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            style={{ padding: '0.75rem', fontFamily: 'var(--font-ui)', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-primary)' }}
          />
          {error && <span style={{ color: 'red', fontSize: '0.8rem' }}>{error}</span>}
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container animate-on-scroll visible">
      <section className="section">
        <div className="section-header">
          <h1 className="section-title">Admin Dashboard</h1>
          <button onClick={logout} className="btn btn-outline">Logout</button>
        </div>

        <div className="filters">
          <button className={`filter-btn ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>Manage Writings</button>
          <button className={`filter-btn ${activeTab === 'books' ? 'active' : ''}`} onClick={() => setActiveTab('books')}>Manage Books</button>
          <button className={`filter-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Manage Reviews</button>
        </div>

        {activeTab === 'posts' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            <div>
              <h3>{editingPostId ? 'Edit Writing' : 'Add New Writing'}</h3>
              <form onSubmit={handleAddPost} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <input required placeholder="Title" value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} style={inputStyle} />
                <textarea required placeholder="Excerpt / Content" value={newPost.excerpt} onChange={e => setNewPost({ ...newPost, excerpt: e.target.value })} style={{ ...inputStyle, minHeight: '100px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Attach Image or Video (Optional)</label>
                  <input type="file" accept="image/*,video/*" onChange={e => handleFileUpload(e, 'post')} style={{ color: 'var(--text-secondary)' }} />
                  {newPost.media_url && !uploadingPostMedia && <small style={{ color: 'var(--text-primary)' }}>✓ Media securely attached</small>}
                </div>
                {uploadingPostMedia && <small style={{ color: 'var(--text-secondary)' }}>Uploading file to cloud...</small>}
                <select value={newPost.category} onChange={e => setNewPost({ ...newPost, category: e.target.value })} style={inputStyle}>
                  <option>Short Stories</option>
                  <option>Poems</option>
                  <option>Snippets</option>
                </select>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="btn btn-primary">{editingPostId ? 'Update' : 'Publish'}</button>
                  {editingPostId && (
                    <button type="button" className="btn btn-outline" onClick={() => { setEditingPostId(null); setNewPost({ title: '', excerpt: '', category: 'Short Stories', date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), media_url: '' }); }}>Cancel</button>
                  )}
                </div>
              </form>
            </div>
            <div>
              <h3>Published Writings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                {posts.map(post => (
                  <div key={post.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border-color)' }}>
                    <div>
                      <strong>{post.title}</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{post.category}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button onClick={() => { setEditingPostId(post.id); setNewPost(post); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Edit</button>
                      <button onClick={() => deletePost(post.id)} style={{ color: 'red', textDecoration: 'underline' }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'books' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            <div>
              <h3>{editingBookId ? 'Edit Book' : 'Add New Book'}</h3>
              <form onSubmit={handleAddBook} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <input required placeholder="Book Title" value={newBook.title} onChange={e => setNewBook({ ...newBook, title: e.target.value })} style={inputStyle} />
                <textarea required placeholder="Synopsis" value={newBook.synopsis} onChange={e => setNewBook({ ...newBook, synopsis: e.target.value })} style={{ ...inputStyle, minHeight: '100px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Book Cover Image</label>
                  <input type="file" accept="image/*" onChange={e => handleFileUpload(e, 'book')} style={{ color: 'var(--text-secondary)' }} />
                  {newBook.cover && !uploadingBookMedia && <small style={{ color: 'var(--text-primary)' }}>✓ Cover securely attached</small>}
                </div>
                {uploadingBookMedia && <small style={{ color: 'var(--text-secondary)' }}>Uploading file to cloud...</small>}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Free Sample PDF</label>
                  <input type="file" accept="application/pdf" onChange={e => handleFileUpload(e, 'book_sample')} style={{ color: 'var(--text-secondary)' }} />
                  {newBook.sample_url && !uploadingBookSample && <small style={{ color: 'var(--text-primary)' }}>✓ Sample PDF securely attached</small>}
                </div>
                {uploadingBookSample && <small style={{ color: 'var(--text-secondary)' }}>Uploading file to cloud...</small>}

                <input placeholder="Payment Link (e.g., Stripe/Gumroad/Razorpay)" value={newBook.payment_link || ''} onChange={e => setNewBook({ ...newBook, payment_link: e.target.value })} style={inputStyle} />
                <input placeholder="Price (e.g., $9.99)" value={newBook.price || ''} onChange={e => setNewBook({ ...newBook, price: e.target.value })} style={inputStyle} />

                <select value={newBook.type} onChange={e => setNewBook({ ...newBook, type: e.target.value })} style={inputStyle}>
                  <option>Novel</option>
                  <option>Poetry Collection</option>
                  <option>Short Story Collection</option>
                </select>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="btn btn-primary">{editingBookId ? 'Update' : 'Add Book'}</button>
                  {editingBookId && (
                    <button type="button" className="btn btn-outline" onClick={() => { setEditingBookId(null); setNewBook({ title: '', synopsis: '', type: 'Novel', cover: '/book1.png' }); }}>Cancel</button>
                  )}
                </div>
              </form>
            </div>
            <div>
              <h3>Published Books</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                {books.map(book => (
                  <div key={book.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border-color)' }}>
                    <div>
                      <strong>{book.title}</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{book.type}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button onClick={() => { setEditingBookId(book.id); setNewBook(book); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Edit</button>
                      <button onClick={() => deleteBook(book.id)} style={{ color: 'red', textDecoration: 'underline' }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            <div>
              <h3>{editingReviewId ? 'Edit Review' : 'Add New Review'}</h3>
              <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <input required placeholder="Review Title / Subject" value={newReview.title} onChange={e => setNewReview({ ...newReview, title: e.target.value })} style={inputStyle} />
                <textarea required placeholder="Review Content" value={newReview.content} onChange={e => setNewReview({ ...newReview, content: e.target.value })} style={{ ...inputStyle, minHeight: '100px' }} />
                <input placeholder="External Link (Optional, e.g., link to movie/book)" value={newReview.external_link} onChange={e => setNewReview({ ...newReview, external_link: e.target.value })} style={inputStyle} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Attach Image or Video (Optional)</label>
                  <input type="file" accept="image/*,video/*" onChange={e => handleFileUpload(e, 'review')} style={{ color: 'var(--text-secondary)' }} />
                  {newReview.media_url && !uploadingReviewMedia && <small style={{ color: 'var(--text-primary)' }}>✓ Media securely attached</small>}
                </div>
                {uploadingReviewMedia && <small style={{ color: 'var(--text-secondary)' }}>Uploading file to cloud...</small>}
                <select value={newReview.category} onChange={e => setNewReview({ ...newReview, category: e.target.value })} style={inputStyle}>
                  <option>Books</option>
                  <option>Movies</option>
                  <option>Events</option>
                  <option>Other</option>
                </select>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="btn btn-primary">{editingReviewId ? 'Update' : 'Publish Review'}</button>
                  {editingReviewId && (
                    <button type="button" className="btn btn-outline" onClick={() => { setEditingReviewId(null); setNewReview({ title: '', content: '', category: 'Books', date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), media_url: '', external_link: '' }); }}>Cancel</button>
                  )}
                </div>
              </form>
            </div>
            <div>
              <h3>Published Reviews</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                {reviews?.map(review => (
                  <div key={review.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border-color)' }}>
                    <div>
                      <strong>{review.title}</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{review.category}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button onClick={() => { setEditingReviewId(review.id); setNewReview(review); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>Edit</button>
                      <button onClick={() => deleteReview(review.id)} style={{ color: 'red', textDecoration: 'underline' }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </section>
    </div>
  );
};

const inputStyle = {
  padding: '0.75rem',
  fontFamily: 'var(--font-ui)',
  border: '1px solid var(--border-color)',
  background: 'transparent',
  color: 'var(--text-primary)',
  width: '100%'
};

export default Admin;
