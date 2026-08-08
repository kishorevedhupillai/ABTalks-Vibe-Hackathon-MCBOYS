import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [showGithub, setShowGithub] = useState(false);
  const [showLinkedin, setShowLinkedin] = useState(false);

  const currentDay = 12;
  const totalDays = 60;
  const completedDays = 18;
  const streak = 12;

  const completion = Math.round((completedDays / totalDays) * 100);

  return (
    <div className="dashboard-page">

      {/* NAVBAR */}
      <header className="dashboard-navbar">
        <div className="logo">
          AB<span>Talks</span>
        </div>

        <div className="nav-right">
          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>

          <div className="avatar">K</div>
        </div>
      </header>


      {/* HERO */}
      <main className="dashboard-container">

        <section className="dashboard-hero">

          <div>
            <p className="eyebrow">STUDENT DASHBOARD</p>

            <h1>
              Hey Kishore 👋
            </h1>

            <p className="hero-description">
              Keep building. Your consistency is your advantage.
            </p>
          </div>

          <div className="day-badge">
            DAY {currentDay}/60
          </div>

        </section>


        {/* STATS */}
        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-top">
              <span>Current streak</span>
              <span>🔥</span>
            </div>

            <h2>
              {streak}
              <small> days</small>
            </h2>

            <p>
              You're on a roll! Keep your streak alive today.
            </p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(streak / 30) * 100}%` }}
              />
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-top">
              <span>Overall completion</span>
              <span>📈</span>
            </div>

            <h2>
              {completion}%
            </h2>

            <p>
              {completedDays} of {totalDays} days completed
            </p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${completion}%` }}
              />
            </div>

          </div>

        </section>


        {/* TODAY'S TASK */}
        <section className="task-card">

          <div className="task-header">

            <div>
              <p className="eyebrow">
                TODAY'S TASK
              </p>

              <h2>
                Day 12: Build a Smart Student Dashboard
              </h2>

              <p>
                Create a responsive dashboard that helps students
                track their learning progress.
              </p>
            </div>

            <div className="difficulty">
              Intermediate
            </div>

          </div>


          <div className="task-tags">
            <span>⏱ 60 mins</span>
            <span>💻 Coding</span>
            <span>🎯 Skill building</span>
          </div>


          <button
            className="primary-button"
            onClick={() => navigate("/day/12")}
          >
            Open today's challenge →
          </button>

        </section>


        {/* ACHIEVEMENTS */}
        <section className="achievements">

          <p className="eyebrow">
            ACHIEVEMENTS
          </p>

          <h2>
            Your wins
          </h2>

          <div className="achievement-grid">

            <div className="achievement-card">
              <span className="achievement-icon">🔥</span>

              <div>
                <strong>7 Day Streak</strong>
                <p>
                  Built consistently for one week
                </p>
              </div>
            </div>


            <div className="achievement-card">
              <span className="achievement-icon">⚡</span>

              <div>
                <strong>Fast Builder</strong>
                <p>
                  Completed 5 tasks ahead of time
                </p>
              </div>
            </div>


            <div className="achievement-card">
              <span className="achievement-icon">🏆</span>

              <div>
                <strong>Consistency</strong>
                <p>
                  Completed 18 challenge days
                </p>
              </div>
            </div>

          </div>

        </section>


        {/* STUDENT RANK */}
        <section className="rank-card">

          <div>

            <p className="eyebrow">
              STUDENT STANDING
            </p>

            <h2>
              You're ranked #24
            </h2>

            <p>
              Keep completing daily challenges to climb higher.
            </p>

          </div>

          <div className="rank-trophy">
            🏆
          </div>

        </section>


        {/* PROOF SECTION */}
        <section className="proof-card">

          <p className="eyebrow">
            SUBMIT YOUR PROOF
          </p>

          <h2>
            Show what you built
          </h2>

          <div className="proof-item">

            <div className="proof-icon">
              GH
            </div>

            <div className="proof-content">
              <strong>GitHub repository</strong>
              <p>
                Push your completed work to a public GitHub repository.
              </p>
            </div>

            <button
              className="secondary-button"
              onClick={() => setShowGithub(true)}
            >
              Add GitHub →
            </button>

          </div>


          <div className="proof-item">

            <div className="proof-icon">
              in
            </div>

            <div className="proof-content">
              <strong>LinkedIn post</strong>
              <p>
                Share your progress and what you learned today.
              </p>
            </div>

            <button
              className="secondary-button"
              onClick={() => setShowLinkedin(true)}
            >
              Add LinkedIn →
            </button>

          </div>

        </section>

      </main>


      {/* GITHUB MODAL */}
      {showGithub && (
        <div
          className="modal-overlay"
          onClick={() => setShowGithub(false)}
        >

          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setShowGithub(false)}
            >
              ×
            </button>

            <div className="modal-icon">
              GH
            </div>

            <h2>
              Add GitHub proof
            </h2>

            <p>
              Paste the public repository or commit URL for today's work.
            </p>

            <input
              type="url"
              placeholder="https://github.com/username/repository"
            />

            <button className="primary-button">
              Save GitHub proof
            </button>

          </div>

        </div>
      )}


      {/* LINKEDIN MODAL */}
      {showLinkedin && (
        <div
          className="modal-overlay"
          onClick={() => setShowLinkedin(false)}
        >

          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setShowLinkedin(false)}
            >
              ×
            </button>

            <div className="modal-icon">
              in
            </div>

            <h2>
              Add LinkedIn proof
            </h2>

            <p>
              Paste the LinkedIn post URL where you shared today's progress.
            </p>

            <input
              type="url"
              placeholder="https://linkedin.com/posts/..."
            />

            <button className="primary-button">
              Save LinkedIn proof
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Dashboard;