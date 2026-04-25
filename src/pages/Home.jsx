import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
import { useData } from '../context/DataContext';

const Home = () => {
  const { books } = useData();
  const latestBook = books[0];

  return (
    <div className="container animate-on-scroll visible">
      <section className="hero">
        <h1 className="hero-title">Words that breathe.</h1>
        <p className="hero-blurb">
          I'm an explorer beyond the boundaries of reality & imagination. A space of silence, words & stories.
          Discover curated collection of my literary fiction, poetry,
          and the raw, unedited thoughts that fall out between the lines.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/library" className="btn btn-primary">Discover Books</Link>
          <Link to="/archive" className="btn btn-outline">Read Archive</Link>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Featured Work</h2>
          <Link to="/library" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            View Library <ArrowRight size={16} />
          </Link>
        </div>

        {latestBook && (
          <div className="grid">
            <div className="book-card" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: '3rem', gridColumn: '1 / -1' }}>
              <img
                src={latestBook.cover}
                alt={latestBook.title}
                className="book-cover"
                style={{ width: '100%', maxWidth: '300px', flexShrink: 0, margin: '0 auto' }}
              />
              <div className="book-info" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-ui)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em', color: 'var(--text-tertiary)', marginBottom: '1rem' }}>Latest Release</span>
                <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-ui)', fontWeight: 400 }}>{latestBook.title}</h3>
                <p style={{ fontSize: '1.1rem', marginBottom: '2rem', display: 'block', WebkitLineClamp: 'unset' }}>
                  {latestBook.synopsis}
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {latestBook.sample_url && (
                    <a href={latestBook.sample_url} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Download size={16} /> Download Sample
                    </a>
                  )}
                  {latestBook.payment_link && (
                    <a href={latestBook.payment_link} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--text-primary)', color: 'var(--bg-primary)' }}>
                      Purchase Book {latestBook.price ? `(${latestBook.price})` : ''}
                    </a>
                  )}
                  {(!latestBook.sample_url && !latestBook.payment_link) && (
                    <Link to="/library" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      View in Library <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
