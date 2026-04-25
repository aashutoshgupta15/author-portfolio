const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Author Name. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem', color: 'var(--text-tertiary)' }}>
          Minimalist reading experience.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
