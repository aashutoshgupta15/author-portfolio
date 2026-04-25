import { useState } from 'react';
import { useData } from '../context/DataContext';

const categories = ['All', 'Books', 'Movies', 'Events', 'Other'];

const Reviews = () => {
  const { reviews } = useData();
  const [activeCategory, setActiveCategory] = useState('All');
  const [readingReview, setReadingReview] = useState(null);

  const filteredReviews = activeCategory === 'All'
    ? reviews
    : reviews.filter(review => review.category === activeCategory);

  if (readingReview) {
    return (
      <div className="container animate-on-scroll visible">
        <section className="section" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <button onClick={() => setReadingReview(null)} className="btn btn-outline" style={{ marginBottom: '3rem', fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
            &larr; Back to Reviews
          </button>
          
          <div className="post-meta" style={{ marginBottom: '2rem' }}>
            <span>{readingReview.date}</span>
            <span>•</span>
            <span>{readingReview.category}</span>
          </div>
          
          <h1 style={{ fontSize: '3rem', marginBottom: '3rem', fontFamily: 'var(--font-ui)', fontWeight: 400, lineHeight: 1.2 }}>
            {readingReview.title}
          </h1>
          
          {readingReview.media_url && (
            <div style={{ marginBottom: '3rem' }}>
              {readingReview.media_url.match(/\.(mp4|webm|ogg)$/i) ? (
                <video src={readingReview.media_url} controls style={{ width: '100%', borderRadius: '8px' }} />
              ) : (
                <img src={readingReview.media_url} alt={readingReview.title} style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} />
              )}
            </div>
          )}
          
          <div style={{ whiteSpace: 'pre-wrap', fontSize: '1.2rem', lineHeight: 2, color: 'var(--text-primary)' }}>
            {readingReview.content}
          </div>

          {readingReview.external_link && (
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
              <a href={readingReview.external_link} target="_blank" rel="noreferrer" className="btn btn-primary">
                View External Link &rarr;
              </a>
            </div>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="container animate-on-scroll visible">
      <section className="section">
        <div className="section-header">
          <h1 className="section-title">Reviews & Recommendations</h1>
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
          {filteredReviews?.map(review => (
            <article key={review.id} className="post-item">
              <div className="post-meta">
                <span>{review.date}</span>
                <span>•</span>
                <span>{review.category}</span>
              </div>
              <h2 className="post-title">
                <button onClick={() => setReadingReview(review)} style={{ color: 'var(--text-primary)', textAlign: 'left', fontSize: '2rem' }}>{review.title}</button>
              </h2>
              <p className="post-excerpt">{review.content}</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setReadingReview(review)} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
                  Read Full Review
                </button>
              </div>
            </article>
          ))}
          {(!filteredReviews || filteredReviews.length === 0) && (
            <p style={{ color: 'var(--text-secondary)' }}>No reviews found for this category.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Reviews;
