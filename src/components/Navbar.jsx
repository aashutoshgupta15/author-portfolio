import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">Aashutosh Gupta.</Link>
        <nav className="nav-links">
        <Link to="/library" className={`nav-link ${location.pathname === '/library' ? 'active' : ''}`}>My Books</Link>
        <Link to="/archive" className={`nav-link ${location.pathname === '/archive' ? 'active' : ''}`}>Archives</Link>
        <Link to="/reviews" className={`nav-link ${location.pathname === '/reviews' ? 'active' : ''}`}>Reviews</Link>
        <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
      </nav>
      </div>
    </nav>
  );
};

export default Navbar;
