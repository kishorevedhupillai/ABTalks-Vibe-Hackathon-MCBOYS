import Navbar from '../components/Navbar'
import BottomNav from '../components/BottomNav'

export default function Landing({ navigate }) {
  return (
    <div className="app-shell">

      <Navbar navigate={navigate} active="home" />

      <main>

        {/* HERO */}

        <section className="hero">

          <div className="hero-badge">
            <span>✦</span>
            BUILT FOR STUDENTS
          </div>

          <h1>
            Build every day.
            <br />
            <span>Be seen.</span>
          </h1>

          <p className="hero-text">
            A 60-day coding challenge that helps Indian college
            students build consistently, prove their work and get
            noticed by recruiters.
          </p>

          <button
            className="primary-button hero-button"
            onClick={() => navigate('/dashboard')}
          >
            Start your challenge
            <span>→</span>
          </button>

          <p className="hero-note">
            Free · Student focused · 60 days
          </p>

        </section>


        {/* STATS */}

        <section className="stats-card">

          <div className="stat">
            <span className="stat-icon">♨</span>
            <strong>60</strong>
            <small>Days</small>
          </div>

          <div className="stat-divider" />

          <div className="stat">
            <span className="stat-icon">⌘</span>
            <strong>1</strong>
            <small>Build / day</small>
          </div>

          <div className="stat-divider" />

          <div className="stat">
            <span className="stat-icon">♕</span>
            <strong>∞</strong>
            <small>Growth</small>
          </div>

        </section>


        {/* HOW IT WORKS */}

        <section className="section">

          <div className="section-label">
            HOW IT WORKS
          </div>

          <h2 className="section-title">
            Small progress.
            <br />
            <span>Every single day.</span>
          </h2>

          <div className="feature-list">

            <Feature
              icon="⌘"
              title="Build something"
              text="Complete a daily coding task and push your work to GitHub."
            />

            <Feature
              icon="✓"
              title="Prove your work"
              text="Share your progress through GitHub and LinkedIn."
            />

            <Feature
              icon="♕"
              title="Get discovered"
              text="Build a public track record that recruiters can actually see."
            />

          </div>

        </section>


        {/* CTA */}

        <section className="cta-card">

          <h2>
            Ready to build your streak?
          </h2>

          <button
            className="secondary-button"
            onClick={() => navigate('/dashboard')}
          >
            Explore dashboard
            <span>→</span>
          </button>

        </section>

      </main>

      <footer className="footer">
        <strong>ABTalks</strong>
        <span>60-Day Coding Challenge</span>
      </footer>

      <BottomNav navigate={navigate} active="home" />

    </div>
  )
}


function Feature({ icon, title, text }) {
  return (
    <div className="feature">

      <div className="feature-icon">
        {icon}
      </div>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

    </div>
  )
}