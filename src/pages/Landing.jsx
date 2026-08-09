import React from "react";

export default function Landing({ navigate }) {
  const goToDashboard = () => {
    if (navigate) {
      navigate("/dashboard");
    } else {
      window.location.href = "/dashboard";
    }
  };

  const goToLogin = () => {
    if (navigate) {
      navigate("/login");
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className="app-shell">

      {/* ================= NAVBAR ================= */}
      <nav className="top-navbar">

        <button
          className="logo"
          onClick={() => {
            if (navigate) {
              navigate("/");
            } else {
              window.location.href = "/";
            }
          }}
        >
          AB<span>Talks</span>
        </button>

        <div className="nav-right">

          <button
            className="nav-dashboard"
            onClick={goToDashboard}
          >
            Dashboard
          </button>

          <button
            className="nav-login"
            onClick={goToLogin}
          >
            Login
          </button>

        </div>

      </nav>


      {/* ================= MAIN ================= */}
      <main className="landing-container">

        {/* ================= HERO ================= */}
        <section className="hero-section">

          <span className="small-label">
            ✦ BUILT FOR STUDENTS
          </span>

          <h1>
            Build every day.
            <br />
            <span>Be seen.</span>
          </h1>

          <p>
            A 60-day coding challenge that helps Indian college
            students build consistently, prove their work and get
            noticed by recruiters.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={goToDashboard}
            >
              Start your challenge →
            </button>

            <button
              className="secondary-button"
              onClick={goToLogin}
            >
              Login to continue
            </button>

          </div>

          <div className="hero-meta">
            <span>Free</span>
            <span>•</span>
            <span>Student focused</span>
            <span>•</span>
            <span>60 days</span>
          </div>

        </section>


        {/* ================= NUMBERS ================= */}
        <section className="numbers-section">

          <div className="number-card">
            <span>🔥</span>
            <strong>60</strong>
            <small>Days</small>
          </div>

          <div className="number-card">
            <span>&lt;/&gt;</span>
            <strong>1</strong>
            <small>Build / day</small>
          </div>

          <div className="number-card">
            <span>🏆</span>
            <strong>∞</strong>
            <small>Growth</small>
          </div>

        </section>


        {/* ================= HOW IT WORKS ================= */}
        <section className="how-section">

          <span className="small-label">
            HOW IT WORKS
          </span>

          <h2>
            Small progress.
            <br />
            <span>Every single day.</span>
          </h2>


          <div className="feature-grid">

            {/* CARD 1 */}
            <article className="feature-card">

              <div className="feature-icon">
                &lt;/&gt;
              </div>

              <h3>
                Build something
              </h3>

              <p>
                Complete a daily coding task and push your work
                to GitHub.
              </p>

            </article>


            {/* CARD 2 */}
            <article className="feature-card">

              <div className="feature-icon">
                ✓
              </div>

              <h3>
                Prove your work
              </h3>

              <p>
                Share your progress through GitHub and LinkedIn.
              </p>

            </article>


            {/* CARD 3 */}
            <article className="feature-card">

              <div className="feature-icon">
                🏆
              </div>

              <h3>
                Get discovered
              </h3>

              <p>
                Build a public track record that recruiters can
                actually see.
              </p>

            </article>

          </div>

        </section>


        {/* ================= CTA ================= */}
        <section className="cta-section">

          <span className="small-label">
            YOUR JOURNEY STARTS HERE
          </span>

          <h2>
            Ready to build
            <br />
            your streak?
          </h2>

          <button
            className="primary-button"
            onClick={goToDashboard}
          >
            Explore dashboard →
          </button>

        </section>

      </main>


      {/* ================= FOOTER ================= */}
      <footer className="site-footer">

        <strong>
          AB<span>Talks</span>
        </strong>

        <small>
          60-Day Coding Challenge
        </small>

      </footer>

    </div>
  );
}