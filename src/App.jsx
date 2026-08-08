import { useEffect, useState } from "react";

/* =========================================================
   DATA
========================================================= */

const student = {
  name: "Kishore",
  streak: 12,
  completed: 18,
  totalDays: 60,
  rank: 24,
};

const today = {
  day: 12,
  title: "Build a Smart Student Dashboard",
  description:
    "Create a responsive dashboard that helps students track their learning progress.",
  difficulty: "Intermediate",
  time: "60 mins",
};

const tasks = [
  "Create a responsive student dashboard",
  "Add progress tracking",
  "Show current streak",
  "Add today's challenge",
  "Create a mobile-first layout",
];

const achievements = [
  {
    icon: "🔥",
    title: "7 Day Streak",
    description: "Built consistently for one week",
  },
  {
    icon: "⚡",
    title: "Fast Builder",
    description: "Completed 5 tasks ahead of time",
  },
  {
    icon: "🏆",
    title: "Consistency",
    description: "Completed 18 challenge days",
  },
];

/* =========================================================
   IMPORTANT LINKS
========================================================= */

const GITHUB_URL =
  "https://github.com/kishorevedhupillai/ABTalks-Vibe-Hackathon-MCBOYS";

const LINKEDIN_URL =
  "https://www.linkedin.com/in/kishore-vedhupillai-jayaraman-074201339/";

/* =========================================================
   APP
========================================================= */

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigate = (url) => {
    window.history.pushState({}, "", url);
    setPath(url);
    window.scrollTo(0, 0);
  };

  if (path === "/dashboard") {
    return <Dashboard navigate={navigate} />;
  }

  if (path === "/day/12") {
    return <ChallengeDay navigate={navigate} />;
  }

  return <Landing navigate={navigate} />;
}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar({ navigate }) {
  return (
    <header className="navbar">

      <button
        className="logo"
        onClick={() => navigate("/")}
        type="button"
      >
        AB<span>Talks</span>
      </button>

      <div className="nav-right">

        <button
          className="nav-dashboard"
          onClick={() => navigate("/dashboard")}
          type="button"
        >
          Dashboard
        </button>

        <button
          className="profile-button"
          onClick={() => navigate("/dashboard")}
          type="button"
        >
          K
        </button>

      </div>

    </header>
  );
}

/* =========================================================
   LANDING PAGE
========================================================= */

function Landing({ navigate }) {
  return (
    <div className="app">

      <Navbar navigate={navigate} />

      <main>

        <section className="hero">

          <div className="badge">
            ✦ BUILT FOR STUDENTS
          </div>

          <h1>
            Build every day.
            <br />
            <span>Be seen.</span>
          </h1>

          <p className="hero-description">
            A 60-day coding challenge that helps Indian college
            students build consistently, prove their work and get
            noticed by recruiters.
          </p>

          <button
            className="primary-button"
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            Start your challenge →
          </button>

          <p className="hero-note">
            Free · Student focused · 60 days
          </p>

        </section>

        {/* STATS */}

        <section className="stats">

          <div className="stat">
            <span className="stat-icon">🔥</span>
            <strong>60</strong>
            <small>Days</small>
          </div>

          <div className="stat">
            <span className="stat-icon code-icon">
              {"</>"}
            </span>
            <strong>1</strong>
            <small>Build / day</small>
          </div>

          <div className="stat">
            <span className="stat-icon">🏆</span>
            <strong>∞</strong>
            <small>Growth</small>
          </div>

        </section>

        {/* HOW IT WORKS */}

        <section className="how-section">

          <div className="section-label">
            HOW IT WORKS
          </div>

          <h2>
            Small progress.
            <br />
            <span>Every single day.</span>
          </h2>

          <div className="feature-list">

            <Feature
              icon={"</>"}
              title="Build something"
              text="Complete a daily coding task and push your work to GitHub."
            />

            <Feature
              icon="✓"
              title="Prove your work"
              text="Share your progress through GitHub and LinkedIn."
            />

            <Feature
              icon="🏆"
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
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            Explore dashboard →
          </button>

        </section>

      </main>

      <Footer />

    </div>
  );
}

/* =========================================================
   FEATURE
========================================================= */

function Feature({ icon, title, text }) {
  return (
    <div className="feature-card">

      <div className="feature-icon">
        {icon}
      </div>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({ navigate }) {

  const percentage = Math.round(
    (student.completed / student.totalDays) * 100
  );

  return (
    <div className="app">

      <Navbar navigate={navigate} />

      <main className="dashboard-page">

        <section className="dashboard-heading">

          <div>

            <div className="section-label">
              STUDENT DASHBOARD
            </div>

            <h1>
              Hey {student.name} 👋
            </h1>

            <p>
              Keep building. Your consistency is your advantage.
            </p>

          </div>

          <div className="day-pill">
            DAY {today.day}/60
          </div>

        </section>

        {/* DASHBOARD STATS */}

        <section className="dashboard-stats">

          <div className="dashboard-card">

            <div className="card-title-row">
              <span>Current streak</span>
              <span>🔥</span>
            </div>

            <div className="big-number">
              {student.streak}
              <small> days</small>
            </div>

            <p>
              You're on a roll! Keep your streak alive today.
            </p>

            <div className="progress-line">
              <div
                style={{
                  width: `${Math.min(student.streak * 5, 100)}%`,
                }}
              />
            </div>

          </div>

          <div className="dashboard-card">

            <div className="card-title-row">
              <span>Overall completion</span>
              <span>📈</span>
            </div>

            <div className="big-number">
              {percentage}%
            </div>

            <p>
              {student.completed} of {student.totalDays} days completed
            </p>

            <div className="progress-line">
              <div
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>

          </div>

        </section>

        {/* TODAY'S TASK */}

        <section className="today-card">

          <div className="today-top">

            <div>

              <div className="section-label">
                TODAY'S TASK
              </div>

              <h2>
                Day {today.day}: {today.title}
              </h2>

            </div>

            <span className="difficulty">
              {today.difficulty}
            </span>

          </div>

          <p className="today-description">
            {today.description}
          </p>

          <div className="task-tags">

            <span>◷ {today.time}</span>
            <span>💻 Coding</span>
            <span>🎯 Skill building</span>

          </div>

          <button
            className="primary-button"
            type="button"
            onClick={() => navigate("/day/12")}
          >
            Open today's challenge →
          </button>

        </section>

        {/* ACHIEVEMENTS */}

        <section className="achievements-section">

          <div className="section-label">
            ACHIEVEMENTS
          </div>

          <h2>
            Your wins
          </h2>

          <div className="achievement-grid">

            {achievements.map((item, index) => (
              <div
                className="achievement-card"
                key={index}
              >

                <div className="achievement-icon">
                  {item.icon}
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

              </div>
            ))}

          </div>

        </section>

        {/* RANK */}

        <section className="rank-card">

          <div>

            <div className="section-label">
              STUDENT STANDING
            </div>

            <h2>
              You're ranked #{student.rank}
            </h2>

            <p>
              Keep completing daily challenges to climb higher.
            </p>

          </div>

          <div className="rank-trophy">
            🏆
          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
}

/* =========================================================
   CHALLENGE DAY
========================================================= */

function ChallengeDay({ navigate }) {

  return (
    <div className="app">

      <Navbar navigate={navigate} />

      <main className="challenge-page">

        {/* BACK */}

        <button
          className="back-button"
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to dashboard
        </button>

        {/* HEADER */}

        <section className="challenge-header">

          <div className="day-label">
            DAY {today.day} / 60
          </div>

          <h1>
            {today.title}
          </h1>

          <p>
            {today.description}
          </p>

          <div className="challenge-tags">

            <span>⚡ {today.difficulty}</span>
            <span>◷ {today.time}</span>
            <span>💻 Web Development</span>

          </div>

        </section>

        {/* MAIN GRID */}

        <section className="challenge-grid">

          <div className="challenge-main">

            {/* MISSION */}

            <div className="content-card">

              <div className="section-label">
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

                {tasks.map((task, index) => (
                  <div
                    className="check-item"
                    key={index}
                  >

                    <span className="check-circle">
                      ✓
                    </span>

                    <span>
                      {task}
                    </span>

                  </div>
                ))}

              </div>

            </div>

            {/* PROOF */}

            <div className="proof-section">

              <div className="section-label">
                SUBMIT YOUR PROOF
              </div>

              <h2>
                Show what you built
              </h2>

              {/* GITHUB */}

              <div className="proof-box">

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

                <a
                  className="outline-button"
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Add GitHub →
                </a>

              </div>

              {/* LINKEDIN */}

              <div className="proof-box">

                <div className="proof-icon linkedin-icon">
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

                <a
                  className="outline-button"
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Add LinkedIn →
                </a>

              </div>

            </div>

          </div>

          {/* SIDEBAR */}

          <aside className="challenge-sidebar">

            <div className="side-card">

              <div className="section-label">
                YOUR PROGRESS
              </div>

              <div className="circle-progress">
                <strong>20%</strong>
              </div>

              <h3>
                18 / 60 days
              </h3>

              <p>
                You're building a strong public learning record.
              </p>

            </div>

            <div className="side-card">

              <div className="section-label">
                CURRENT STREAK
              </div>

              <div className="side-streak">
                🔥 12 days
              </div>

              <p>
                Complete today's task to keep it alive.
              </p>

            </div>

          </aside>

        </section>

      </main>

      <Footer />

    </div>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer className="footer">

      <strong>
        AB<span>Talks</span>
      </strong>

      <small>
        60-Day Coding Challenge
      </small>

    </footer>
  );
}

export default App;