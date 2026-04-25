import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const categories = ['All', 'Short Stories', 'Poems', 'Snippets'];

const Archive = () => {
  const { posts } = useData();
  const [activeCategory, setActiveCategory] = useState('All');
  const [readingPost, setReadingPost] = useState(null);

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(post => post.category === activeCategory);

  if (readingPost) {
    return (
      <div className="container animate-on-scroll visible">
        <section className="section" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <button onClick={() => setReadingPost(null)} className="btn btn-outline" style={{ marginBottom: '3rem', fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
            &larr; Back to Archive
          </button>

          <div className="post-meta" style={{ marginBottom: '2rem' }}>
            <span>{readingPost.date}</span>
            <span>•</span>
            <span>{readingPost.category}</span>
          </div>

          <h1 style={{ fontSize: '3rem', marginBottom: '3rem', fontFamily: 'var(--font-ui)', fontWeight: 400, lineHeight: 1.2 }}>
            {readingPost.title}
          </h1>

          {readingPost.media_url && (
            <div style={{ marginBottom: '3rem' }}>
              {readingPost.media_url.match(/\.(mp4|webm|ogg)$/i) ? (
                <video src={readingPost.media_url} controls style={{ width: '100%', borderRadius: '8px' }} />
              ) : (
                <img src={readingPost.media_url} alt={readingPost.title} style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} />
              )}
            </div>
          )}

          <div style={{ whiteSpace: 'pre-wrap', fontSize: '1.2rem', lineHeight: 2, color: 'var(--text-primary)' }}>
            {readingPost.excerpt}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="container animate-on-scroll visible">
      <section className="section">
        <div className="section-header">
          <h1 className="section-title">The Archive</h1>
        </div>

        <div className="filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="post-list">
          {filteredPosts.map(post => (
            <article key={post.id} className="post-item">
              <div className="post-meta">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.category}</span>
              </div>
              <h2 className="post-title">
                <Link to="#">{post.title}</Link>
              </h2>
              <p className="post-excerpt">{post.excerpt}</p>
              <button onClick={() => setReadingPost(post)} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
                Read
              </button>
            </article>
          ))}
          {filteredPosts.length === 0 && (
            <p style={{ color: 'var(--text-secondary)' }}>No entries found for this category.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Archive;
