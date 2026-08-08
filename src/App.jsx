import { useEffect, useState } from "react";

const mockData = {
  student: {
    name: "Kishore",
    track: "AI & Data Science",
    streak: 12,
    longestStreak: 21,
    completed: 18,
    totalDays: 60,
    rank: 24,
  },

  today: {
    day: 12,
    title: "Build a Smart Student Dashboard",
    description:
      "Create a responsive dashboard that helps students track their learning progress.",
    difficulty: "Intermediate",
    estimatedTime: "60 mins",
  },

  achievements: [
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
  ],

  tasks: [
    "Create a responsive student dashboard",
    "Add progress tracking",
    "Show current streak",
    "Add today's challenge",
    "Create a mobile-first layout",
  ],
};

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
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

/* =========================
   NAVBAR
========================= */

function Navbar({ navigate }) {
  return (
    <nav className="navbar">
      <button className="logo" onClick={() => navigate("/")}>
        AB<span>Talks</span>
      </button>

      <div className="nav-actions">
        <button
          className="nav-link"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        <button
          className="nav-profile"
          onClick={() => navigate("/dashboard")}
        >
          K
        </button>
      </div>
    </nav>
  );
}

/* =========================
   LANDING PAGE
========================= */

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

          <p className="hero-text">
            A 60-day coding challenge that helps Indian college
            students build consistently, prove their work and get
            noticed by recruiters.
          </p>

          <button
            className="primary-btn"
            onClick={() => navigate("/dashboard")}
          >
            Start your challenge
            <span>→</span>
          </button>

          <p className="small-note">
            Free · Student focused · 60 days
          </p>
        </section>

        <section className="stats-card">
          <Stat icon="🔥" number="60" label="Days" />
          <Stat icon="</>" number="1" label="Build / day" />
          <Stat icon="🏆" number="∞" label="Growth" />
        </section>

        <section className="how-section">
          <div className="section-label">HOW IT WORKS</div>

          <h2>
            Small progress.
            <br />
            <span>Every single day.</span>
          </h2>

          <div className="feature-list">
            <Feature
              icon="</>"
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

        <section className="cta-card">
          <h3>Ready to build your streak?</h3>

          <button
            className="secondary-btn"
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

/* =========================
   DASHBOARD
========================= */

function Dashboard({ navigate }) {
  const percentage = Math.round(
    (mockData.student.completed / mockData.student.totalDays) * 100
  );

  return (
    <div className="app">
      <Navbar navigate={navigate} />

      <main className="dashboard-page">
        <div className="page-heading">
          <div>
            <div className="section-label">STUDENT DASHBOARD</div>

            <h1>
              Hey {mockData.student.name} 👋
            </h1>

            <p>
              Keep building. Your consistency is your advantage.
            </p>
          </div>

          <div className="day-pill">
            DAY {mockData.today.day}/60
          </div>
        </div>

        {/* STREAK */}

        <section className="dashboard-grid">
          <div className="big-card streak-card">
            <div className="card-top">
              <span>Current streak</span>
              <span className="fire">🔥</span>
            </div>

            <div className="streak-number">
              {mockData.student.streak}
              <small> days</small>
            </div>

            <p>
              You're on a roll! Keep your streak alive today.
            </p>

            <div className="streak-bar">
              <div
                style={{
                  width: `${Math.min(
                    mockData.student.streak * 5,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>

          {/* PROGRESS */}

          <div className="big-card">
            <div className="card-top">
              <span>Overall completion</span>
              <span>📈</span>
            </div>

            <div className="progress-number">
              {percentage}%
            </div>

            <p>
              {mockData.student.completed} of{" "}
              {mockData.student.totalDays} days completed
            </p>

            <div className="progress-bar">
              <div
                style={{
                  width: `${percentage}%`,
                }}
              ></div>
            </div>
          </div>
        </section>

        {/* TODAY */}

        <section className="today-card">
          <div className="today-header">
            <div>
              <div className="section-label">
                TODAY'S TASK
              </div>

              <h2>
                Day {mockData.today.day}:{" "}
                {mockData.today.title}
              </h2>
            </div>

            <span className="difficulty">
              {mockData.today.difficulty}
            </span>
          </div>

          <p>{mockData.today.description}</p>

          <div className="task-meta">
            <span>⏱ {mockData.today.estimatedTime}</span>
            <span>💻 Coding</span>
            <span>🎯 Skill building</span>
          </div>

          <button
            className="primary-btn"
            onClick={() => navigate("/day/12")}
          >
            Open today's challenge →
          </button>
        </section>

        {/* ACHIEVEMENTS */}

        <section className="section-block">
          <div className="section-label">
            ACHIEVEMENTS
          </div>

          <h2>Your wins</h2>

          <div className="achievement-grid">
            {mockData.achievements.map((item, index) => (
              <div className="achievement-card" key={index}>
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
            <span className="section-label">
              STUDENT STANDING
            </span>

            <h2>
              You're ranked #{mockData.student.rank}
            </h2>

            <p>
              Keep completing daily challenges to climb
              higher.
            </p>
          </div>

          <div className="rank-icon">🏆</div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* =========================
   CHALLENGE DAY
========================= */

function ChallengeDay({ navigate }) {
  return (
    <div className="app">
      <Navbar navigate={navigate} />

      <main className="challenge-page">
        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to dashboard
        </button>

        <section className="challenge-hero">
          <div className="day-label">
            DAY {mockData.today.day} / 60
          </div>

          <h1>{mockData.today.title}</h1>

          <p>{mockData.today.description}</p>

          <div className="challenge-meta">
            <span>⚡ Intermediate</span>
            <span>⏱ 60 mins</span>
            <span>💻 Web Development</span>
          </div>
        </section>

        <section className="challenge-content">
          <div className="challenge-main">
            <div className="content-card">
              <div className="section-label">
                YOUR MISSION
              </div>

              <h2>Build today's challenge</h2>

              <p>
                Create a clean and responsive student
                dashboard. The dashboard should help a
                student understand their current progress
                and what they need to complete today.
              </p>

              <h3>What you need to build</h3>

              <div className="check-list">
                {mockData.tasks.map((task, index) => (
                  <div className="check-item" key={index}>
                    <span>✓</span>
                    <p>{task}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="content-card">
              <div className="section-label">
                SUBMIT YOUR PROOF
              </div>

              <h2>Show what you built</h2>

              <div className="proof-box">
                <div className="proof-icon">⌘</div>

                <div>
                  <h3>GitHub repository</h3>
                  <p>
                    Push your completed work to a public
                    GitHub repository.
                  </p>
                </div>

                <button className="outline-btn">
                  Add GitHub →
                </button>
              </div>

              <div className="proof-box">
                <div className="proof-icon">in</div>

                <div>
                  <h3>LinkedIn post</h3>
                  <p>
                    Share your progress and what you
                    learned today.
                  </p>
                </div>

                <button className="outline-btn">
                  Add LinkedIn →
                </button>
              </div>
            </div>
          </div>

          <aside className="challenge-sidebar">
            <div className="side-card">
              <div className="section-label">
                YOUR PROGRESS
              </div>

              <div className="circle-progress">
                <strong>20%</strong>
              </div>

              <h3>18 / 60 days</h3>

              <p>
                You're building a strong public learning
                record.
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

/* =========================
   SMALL COMPONENTS
========================= */

function Stat({ icon, number, label }) {
  return (
    <div className="stat">
      <div className="stat-icon">{icon}</div>
      <strong>{number}</strong>
      <span>{label}</span>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature">
      <div className="feature-icon">{icon}</div>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <strong>ABTalks</strong>
      <span>60-Day Coding Challenge</span>
    </footer>
  );
}

export default App;