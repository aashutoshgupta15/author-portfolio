import { Download } from 'lucide-react';
import { useData } from '../context/DataContext';

const Library = () => {
  const { books } = useData();

  return (
    <div className="container animate-on-scroll visible">
      <section className="section">
        <div className="section-header">
          <h1 className="section-title">The Library</h1>
        </div>
        
        <div className="grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.cover} alt={book.title} className="book-cover" />
              <div className="book-info">
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                  {book.type}
                </span>
                <h3>{book.title}</h3>
                <p>{book.synopsis}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                  {book.sample_url && (
                    <a href={book.sample_url} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                      <Download size={16} /> Download Sample
                    </a>
                  )}
                  {book.payment_link && (
                    <a href={book.payment_link} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', background: 'var(--text-primary)', color: 'var(--bg-primary)' }}>
                      Purchase Book {book.price ? `(${book.price})` : ''}
                    </a>
                  )}
                  {(!book.sample_url && !book.payment_link) && (
                    <button className="btn btn-outline" disabled style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', opacity: 0.5, cursor: 'not-allowed' }}>
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Library;
