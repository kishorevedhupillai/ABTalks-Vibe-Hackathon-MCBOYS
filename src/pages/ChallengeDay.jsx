import React from "react";

function ChallengeDay() {

  const openGitHub = () => {
    window.location.href =
      "https://github.com/kishorevedhupillai/ABTalks-Vibe-Hackathon-MCBOYS";
  };

  const openLinkedIn = () => {
    window.location.href =
      "https://www.linkedin.com/in/kishore-vedhupillai-jayaraman-074201339/";
  };

  return (
    <div className="page">

      {/* NAVBAR */}
      <header className="navbar">

        <div className="brand">
          AB<span>Talks</span>
        </div>

        <div className="nav-right">

          <button
            className="nav-link-button"
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          >
            Dashboard
          </button>

          <div className="profile-circle">
            K
          </div>

        </div>

      </header>


      {/* MAIN */}
      <main className="challenge-page">

        <button
          className="back-button"
          onClick={() => {
            window.location.href = "/dashboard";
          }}
        >
          ← Back to dashboard
        </button>


        {/* HEADER */}
        <section className="challenge-header">

          <div className="eyebrow">
            DAY 12 / 60
          </div>

          <h1>
            Build a Smart Student
            <br />
            Dashboard
          </h1>

          <p className="challenge-description">
            Create a responsive dashboard that helps students
            track their learning progress.
          </p>

          <div className="challenge-tags">

            <span className="tag">
              ⚡ Intermediate
            </span>

            <span className="tag">
              ◷ 60 mins
            </span>

            <span className="tag">
              💻 Web Development
            </span>

          </div>

        </section>


        {/* CONTENT */}
        <div className="challenge-grid">

          <section className="mission-card">

            <div className="eyebrow">
              YOUR MISSION
            </div>

            <h2>
              Build today's challenge
            </h2>

            <p>
              Create a clean and responsive student dashboard.
              The dashboard should help a student understand
              their current progress and what they need to
              complete today.
            </p>

            <h3>
              What you need to build
            </h3>

            <div className="check-list">

              <div className="check-item">
                <span className="check">✓</span>
                Create a responsive student dashboard
              </div>

              <div className="check-item">
                <span className="check">✓</span>
                Add progress tracking
              </div>

              <div className="check-item">
                <span className="check">✓</span>
                Show current streak
              </div>

              <div className="check-item">
                <span className="check">✓</span>
                Add today's challenge
              </div>

              <div className="check-item">
                <span className="check">✓</span>
                Create a mobile-first layout
              </div>

            </div>

          </section>


          {/* RIGHT */}
          <aside className="side-column">

            <div className="progress-card">

              <div className="eyebrow">
                YOUR PROGRESS
              </div>

              <div className="progress-circle">
                <span>20%</span>
              </div>

              <h3>
                18 / 60 days
              </h3>

              <p>
                You're building a strong public learning record.
              </p>

            </div>


            <div className="streak-card">

              <div className="eyebrow">
                CURRENT STREAK
              </div>

              <div className="streak-number">
                🔥 12 days
              </div>

              <p>
                Complete today's task to keep it alive.
              </p>

            </div>

          </aside>

        </div>


        {/* SUBMIT PROOF */}
        <section className="proof-card">

          <div className="eyebrow">
            SUBMIT YOUR PROOF
          </div>

          <h2>
            Show what you built
          </h2>


          {/* GITHUB */}
          <div className="proof-row">

            <div className="proof-icon">
              ⌘
            </div>

            <div className="proof-info">

              <h3>
                GitHub repository
              </h3>

              <p>
                Push your completed work to a public
                GitHub repository.
              </p>

            </div>

            <button
              type="button"
              className="outline-btn"
              onClick={openGitHub}
            >
              Add GitHub →
            </button>

          </div>


          {/* LINKEDIN */}
          <div className="proof-row">

            <div className="proof-icon">
              in
            </div>

            <div className="proof-info">

              <h3>
                LinkedIn post
              </h3>

              <p>
                Share your progress and what you learned today.
              </p>

            </div>

            <button
              type="button"
              className="outline-btn"
              onClick={openLinkedIn}
            >
              Add LinkedIn →
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default ChallengeDay;