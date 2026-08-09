import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

/* =========================================================
   CHALLENGE DATA
========================================================= */

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
   APP
========================================================= */

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (mounted) {
          setUser(user);
          setLoading(false);
        }
      } catch (error) {
        console.error("Auth error:", error);

        if (mounted) {
          setUser(null);
          setLoading(false);
        }
      }
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) {
          setUser(session?.user || null);
        }
      }
    );

    const handlePopState = () => {
      setPath(window.location.pathname);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      mounted = false;

      subscription.unsubscribe();

      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const navigate = (url) => {
    window.history.pushState({}, "", url);

    setPath(url);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const logout = async () => {
    try {
      await supabase.auth.signOut();

      setUser(null);

      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-logo">
          AB<span>Talks</span>
        </div>

        <p>Loading your workspace...</p>
      </div>
    );
  }

  /* =======================================================
     LOGIN
  ======================================================= */

  if (path === "/login") {
    return <Login navigate={navigate} />;
  }

  /* =======================================================
     SIGNUP
  ======================================================= */

  if (path === "/signup") {
    return <Signup navigate={navigate} />;
  }

  /* =======================================================
     DASHBOARD
  ======================================================= */

  if (path === "/dashboard") {
    if (!user) {
      navigate("/login");
      return null;
    }

    return (
      <Dashboard
        navigate={navigate}
        user={user}
        logout={logout}
      />
    );
  }

  /* =======================================================
     DAY 12
  ======================================================= */

  if (path === "/day/12") {
    if (!user) {
      navigate("/login");
      return null;
    }

    return (
      <ChallengeDay
        navigate={navigate}
        user={user}
        logout={logout}
      />
    );
  }

  /* =======================================================
     LANDING
  ======================================================= */

  return (
    <Landing
      navigate={navigate}
      user={user}
    />
  );
}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar({
  navigate,
  user,
  logout,
}) {
  const displayName =
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "U";

  return (
    <header className="navbar">

      <button
        className="logo"
        type="button"
        onClick={() => navigate("/")}
      >
        AB<span>Talks</span>
      </button>

      <div className="nav-right">

        {user ? (
          <>
            <button
              className="nav-dashboard"
              type="button"
              onClick={() =>
                navigate("/dashboard")
              }
            >
              Dashboard
            </button>

            <button
              className="logout-button"
              type="button"
              onClick={logout}
            >
              Logout
            </button>

            <button
              className="profile-button"
              type="button"
              onClick={() =>
                navigate("/dashboard")
              }
              title={displayName}
            >
              {displayName
                .charAt(0)
                .toUpperCase()}
            </button>
          </>
        ) : (
          <>
            <button
              className="nav-dashboard"
              type="button"
              onClick={() =>
                navigate("/login")
              }
            >
              Login
            </button>

            <button
              className="profile-button"
              type="button"
              onClick={() =>
                navigate("/signup")
              }
            >
              +
            </button>
          </>
        )}

      </div>
    </header>
  );
}

/* =========================================================
   LANDING PAGE
========================================================= */

function Landing({
  navigate,
  user,
}) {
  const handleStart = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="app">

      <Navbar
        navigate={navigate}
        user={user}
      />

      <main>

        {/* HERO */}

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
            A 60-day coding challenge that
            helps Indian college students
            build consistently, prove their
            work and get noticed by recruiters.
          </p>

          <button
            className="primary-button hero-button"
            type="button"
            onClick={handleStart}
          >
            {user
              ? "Go to dashboard →"
              : "Start your challenge →"}
          </button>

          <p className="hero-note">
            Free · Student focused · 60 days
          </p>

        </section>

        {/* STATS */}

        <section className="stats">

          <Stat
            icon="🔥"
            number="60"
            label="Days"
          />

          <Stat
            icon="</>"
            number="1"
            label="Build / day"
          />

          <Stat
            icon="🏆"
            number="∞"
            label="Growth"
          />

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

        {/* CTA */}

        <section className="cta-card">

          <h2>
            Ready to build your streak?
          </h2>

          <button
            className="secondary-button"
            type="button"
            onClick={handleStart}
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
   DASHBOARD
========================================================= */

function Dashboard({
  navigate,
  user,
  logout,
}) {
  const TOTAL_DAYS = 60;
  const COMPLETED_DAYS = 18;
  const CURRENT_STREAK = 12;

  const percentage = Math.round(
    (COMPLETED_DAYS / TOTAL_DAYS) * 100
  );

  const streakPercentage = Math.round(
    (CURRENT_STREAK / TOTAL_DAYS) * 100
  );

  const [githubUrl, setGithubUrl] =
    useState("");

  const [linkedinUrl, setLinkedinUrl] =
    useState("");

  const [saved, setSaved] =
    useState(false);

  const [saveError, setSaveError] =
    useState("");

  const name =
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Student";

  /* -------------------------------------------------------
     LOAD LINKS
  ------------------------------------------------------- */

  useEffect(() => {
    setGithubUrl(
      user?.user_metadata?.github_url || ""
    );

    setLinkedinUrl(
      user?.user_metadata?.linkedin_url || ""
    );
  }, [user]);

  /* -------------------------------------------------------
     SAVE LINKS
  ------------------------------------------------------- */

  const saveProfile = async () => {
    setSaved(false);
    setSaveError("");

    try {
      const {
        data,
        error,
      } = await supabase.auth.updateUser({
        data: {
          name:
            user?.user_metadata?.name ||
            user?.email?.split("@")[0] ||
            "Student",

          github_url:
            githubUrl.trim(),

          linkedin_url:
            linkedinUrl.trim(),
        },
      });

      if (error) {
        setSaveError(error.message);
        return;
      }

      if (data?.user) {
        setSaved(true);
      }
    } catch (error) {
      console.error(error);
      setSaveError(
        "Unable to save profile links."
      );
    }
  };

  return (
    <div className="app">

      <Navbar
        navigate={navigate}
        user={user}
        logout={logout}
      />

      <main className="dashboard-page">

        {/* HEADER */}

        <section className="dashboard-heading">

          <div>

            <div className="section-label">
              STUDENT DASHBOARD
            </div>

            <h1>
              Hey {name} 👋
            </h1>

            <p>
              Keep building. Your consistency
              is your advantage.
            </p>

          </div>

          <div className="day-pill">
            DAY 12 / 60
          </div>

        </section>

        {/* STATS */}

        <section className="dashboard-stats">

          {/* STREAK */}

          <div className="dashboard-card">

            <div className="card-title-row">

              <span>
                Current streak
              </span>

              <span>🔥</span>

            </div>

            <div className="big-number">
              {CURRENT_STREAK}
              <small> days</small>
            </div>

            <p>
              You're on a roll! Keep your
              streak alive today.
            </p>

            <div className="progress-line">

              <div
                style={{
                  width:
                    `${streakPercentage}%`,
                }}
              />

            </div>

          </div>

          {/* COMPLETION */}

          <div className="dashboard-card">

            <div className="card-title-row">

              <span>
                Overall completion
              </span>

              <span>📈</span>

            </div>

            <div className="big-number">
              {percentage}%
            </div>

            <p>
              {COMPLETED_DAYS} of{" "}
              {TOTAL_DAYS} days completed
            </p>

            <div className="progress-line">

              <div
                style={{
                  width:
                    `${percentage}%`,
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
                Day {today.day}:{" "}
                {today.title}
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

            <span>
              ◷ {today.time}
            </span>

            <span>
              💻 Coding
            </span>

            <span>
              🎯 Skill building
            </span>

          </div>

          <button
            className="primary-button"
            type="button"
            onClick={() =>
              navigate("/day/12")
            }
          >
            Open today's challenge →
          </button>

        </section>

        {/* PROFILE LINKS */}

        <section className="profile-card">

          <div className="section-label">
            YOUR PROFILE LINKS
          </div>

          <h2>
            Connect your work
          </h2>

          <p>
            These links belong only to your
            logged-in account.
          </p>

          <div className="profile-form">

            <div className="input-group">

              <label>
                GitHub profile / repository URL
              </label>

              <input
                type="url"
                placeholder="https://github.com/yourusername"
                value={githubUrl}
                onChange={(event) =>
                  setGithubUrl(
                    event.target.value
                  )
                }
              />

            </div>

            <div className="input-group">

              <label>
                LinkedIn profile / post URL
              </label>

              <input
                type="url"
                placeholder="https://linkedin.com/in/yourname"
                value={linkedinUrl}
                onChange={(event) =>
                  setLinkedinUrl(
                    event.target.value
                  )
                }
              />

            </div>

            <button
              className="primary-button save-button"
              type="button"
              onClick={saveProfile}
            >
              Save profile links →
            </button>

          </div>

          {saved && (
            <div className="auth-success">
              ✓ Profile links saved successfully.
            </div>
          )}

          {saveError && (
            <div className="auth-error">
              {saveError}
            </div>
          )}

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

            {achievements.map(
              (item, index) => (
                <div
                  className="achievement-card"
                  key={index}
                >

                  <div className="achievement-icon">
                    {item.icon}
                  </div>

                  <div>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.description}
                    </p>

                  </div>

                </div>
              )
            )}

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

function ChallengeDay({
  navigate,
  user,
  logout,
}) {
  const TOTAL_DAYS = 60;
  const COMPLETED_DAYS = 18;
  const CURRENT_STREAK = 12;

  /* 18 / 60 = 30% */
  const progressPercentage = Math.round(
    (COMPLETED_DAYS / TOTAL_DAYS) * 100
  );

  /* 12 / 60 = 20% */
  const streakPercentage = Math.round(
    (CURRENT_STREAK / TOTAL_DAYS) * 100
  );

  const [githubUrl, setGithubUrl] =
    useState("");

  const [linkedinUrl, setLinkedinUrl] =
    useState("");

  const [loadingLinks, setLoadingLinks] =
    useState(true);

  /* -------------------------------------------------------
     LOAD USER LINKS
  ------------------------------------------------------- */

  useEffect(() => {
    let mounted = true;

    const loadLinks = async () => {
      try {
        const {
          data,
          error,
        } = await supabase.auth.getUser();

        if (
          mounted &&
          !error &&
          data?.user
        ) {
          setGithubUrl(
            data.user.user_metadata?.github_url ||
              ""
          );

          setLinkedinUrl(
            data.user.user_metadata?.linkedin_url ||
              ""
          );
        }
      } catch (error) {
        console.error(
          "Profile link error:",
          error
        );
      } finally {
        if (mounted) {
          setLoadingLinks(false);
        }
      }
    };

    loadLinks();

    return () => {
      mounted = false;
    };
  }, []);

  /* -------------------------------------------------------
     NORMALIZE URL
  ------------------------------------------------------- */

  const normalizeUrl = (value) => {
    const trimmed =
      value?.trim() || "";

    if (!trimmed) {
      return "";
    }

    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://")
    ) {
      return trimmed;
    }

    return `https://${trimmed}`;
  };

  /* -------------------------------------------------------
     GITHUB
  ------------------------------------------------------- */

  const handleGithub = () => {
    const url =
      normalizeUrl(githubUrl);

    if (!url) {
      navigate("/dashboard");
      return;
    }

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* -------------------------------------------------------
     LINKEDIN
  ------------------------------------------------------- */

  const handleLinkedin = () => {
    const url =
      normalizeUrl(linkedinUrl);

    if (!url) {
      navigate("/dashboard");
      return;
    }

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="app">

      <Navbar
        navigate={navigate}
        user={user}
        logout={logout}
      />

      <main className="challenge-page">

        {/* BACK */}

        <button
          className="back-button"
          type="button"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          ← Back to dashboard
        </button>

        {/* HEADER */}

        <section className="challenge-header">

          <div className="day-label">
            DAY {today.day} / {TOTAL_DAYS}
          </div>

          <h1>
            {today.title}
          </h1>

          <p>
            {today.description}
          </p>

          <div className="challenge-tags">

            <span>
              ⚡ {today.difficulty}
            </span>

            <span>
              ◷ {today.time}
            </span>

            <span>
              💻 Web Development
            </span>

          </div>

        </section>

        {/* MAIN */}

        <section className="challenge-grid">

          {/* LEFT */}

          <div className="challenge-main">

            {/* PROBLEM */}

            <div className="content-card">

              <div className="section-label">
                YOUR MISSION
              </div>

              <h2>
                Build today's challenge
              </h2>

              <p>
                Create a clean and responsive
                student dashboard. The dashboard
                should help a student understand
                their current progress and what
                they need to complete today.
              </p>

              <h3>
                Problem statement
              </h3>

              <p>
                Students often struggle to
                understand their learning progress
                because their tasks, streaks,
                goals and completed work are
                scattered across different platforms.
              </p>

              <p>
                Build a clean and responsive
                student dashboard that brings
                all important learning information
                into one place.
              </p>

              <h3>
                What you need to build
              </h3>

              <div className="check-list">

                {tasks.map(
                  (task, index) => (
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
                  )
                )}

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

              <p>
                These links belong to your
                logged-in account.
              </p>

              {/* GITHUB */}

              <div className="proof-box">

                <div className="proof-icon">
                  GH
                </div>

                <div className="proof-info">

                  <h3>
                    GitHub repository
                  </h3>

                  <p>
                    Open your own GitHub
                    profile or repository.
                  </p>

                </div>

                {loadingLinks ? (
                  <button
                    className="outline-button"
                    type="button"
                    disabled
                  >
                    Loading...
                  </button>
                ) : githubUrl ? (
                  <button
                    className="outline-button"
                    type="button"
                    onClick={handleGithub}
                  >
                    Open GitHub →
                  </button>
                ) : (
                  <button
                    className="outline-button"
                    type="button"
                    onClick={() =>
                      navigate("/dashboard")
                    }
                  >
                    Add GitHub →
                  </button>
                )}

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
                    Open your own LinkedIn
                    profile or post.
                  </p>

                </div>

                {loadingLinks ? (
                  <button
                    className="outline-button"
                    type="button"
                    disabled
                  >
                    Loading...
                  </button>
                ) : linkedinUrl ? (
                  <button
                    className="outline-button"
                    type="button"
                    onClick={handleLinkedin}
                  >
                    Open LinkedIn →
                  </button>
                ) : (
                  <button
                    className="outline-button"
                    type="button"
                    onClick={() =>
                      navigate("/dashboard")
                    }
                  >
                    Add LinkedIn →
                  </button>
                )}

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <aside className="challenge-sidebar">

            {/* PROGRESS */}

            <div className="side-card">

              <div className="section-label">
                YOUR PROGRESS
              </div>

              <div
                className="circle-progress"
                style={{
                  background:
                    `conic-gradient(
                      #8b5cf6
                      ${progressPercentage * 3.6}deg,
                      #211b2b
                      ${progressPercentage * 3.6}deg
                    )`,
                }}
              >

                <strong>
                  {progressPercentage}%
                </strong>

              </div>

              <h3>
                {COMPLETED_DAYS} / {TOTAL_DAYS} days
              </h3>

              <p>
                You're building a strong
                public learning record.
              </p>

            </div>

            {/* STREAK */}

            <div className="side-card">

              <div className="section-label">
                CURRENT STREAK
              </div>

              <div className="side-streak">
                🔥 {CURRENT_STREAK} days
              </div>

              <p>
                Complete today's task
                to keep it alive.
              </p>

              <div className="progress-line">

                <div
                  style={{
                    width:
                      `${streakPercentage}%`,
                  }}
                />

              </div>

            </div>

            {/* DAY */}

            <div className="side-card">

              <div className="section-label">
                DAY {today.day}
              </div>

              <h3>
                Keep building.
              </h3>

              <p>
                One build every day.
                One stronger portfolio.
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
   STAT
========================================================= */

function Stat({
  icon,
  number,
  label,
}) {
  return (
    <div className="stat">

      <span className="stat-icon">
        {icon}
      </span>

      <strong>
        {number}
      </strong>

      <small>
        {label}
      </small>

    </div>
  );
}

/* =========================================================
   FEATURE
========================================================= */

function Feature({
  icon,
  title,
  text,
}) {
  return (
    <div className="feature-card">

      <div className="feature-icon">
        {icon}
      </div>

      <div>

        <h3>
          {title}
        </h3>

        <p>
          {text}
        </p>

      </div>

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