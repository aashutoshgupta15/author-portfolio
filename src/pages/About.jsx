const About = () => {
  return (
    <div className="container animate-on-scroll visible">
      <section className="section">
        <div className="about-layout">
          <div>
            <img src="/author.png" alt="Author portrait" className="about-image" />
          </div>
          <div className="about-content">
            <h1 style={{ fontFamily: 'var(--font-ui)', fontWeight: 400 }}>About the Author</h1>
            <p className="hero-blurb" style={{ margin: '0 0 2rem 0', fontSize: '1.2rem', color: 'var(--text-primary)' }}>
              "Writing is the footprint of our soul on the sands of time."
            </p>
            <p>
              I am student who writes to understand the world and express what I cannot say in words.
            </p>

            <div style={{ marginTop: '3rem' }}>
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Contact</h3>
              <p>For literary representation inquiries, rights, or simply to say hello, please reach out via email.</p>
              <a href="mailto:aashutoshguptaofficial@gmail.com" className="btn btn-outline" style={{ marginTop: '1rem' }}>
                aashutoshguptaofficial@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
