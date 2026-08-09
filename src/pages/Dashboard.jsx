import React, { useState } from "react";

export default function Dashboard({
  navigate,
  user,
  onLogout
}) {

  const currentUser = user || {
    name: "Student",
    email: ""
  };

  const [github, setGithub] = useState(
    currentUser.github || ""
  );

  const [linkedin, setLinkedin] = useState(
    currentUser.linkedin || ""
  );

  const [saved, setSaved] = useState(false);


  const saveProfileLinks = () => {

    const updatedUser = {
      ...currentUser,
      github,
      linkedin
    };

    localStorage.setItem(
      "abtalks_user",
      JSON.stringify(updatedUser)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };


  const openExternal = (url) => {

    if (!url) return;

    let finalUrl = url.trim();

    if (!finalUrl.startsWith("http")) {
      finalUrl = "https://" + finalUrl;
    }

    window.open(
      finalUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };


  return (
    <div className="app-shell">

      {/* NAVBAR */}
      <nav className="top-navbar">

        <button
          className="logo"
          onClick={() => navigate("/")}
        >
          AB<span>Talks</span>
        </button>

        <div className="nav-right">

          <button
            className="nav-dashboard"
          >
            Dashboard
          </button>

          <button
            className="nav-login"
            onClick={onLogout}
          >
            Logout
          </button>

          <div className="avatar">
            {currentUser.name
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

        </div>

      </nav>


      <main className="dashboard-container">

        {/* INTRO */}
        <section className="dashboard-intro">

          <div>

            <span className="small-label">
              STUDENT DASHBOARD
            </span>

            <h1>
              Hey {currentUser.name || "Student"} 👋
            </h1>

            <p>
              Keep building. Your consistency is your advantage.
            </p>

          </div>

          <span className="day-counter">
            DAY 12 / 60
          </span>

        </section>


        {/* STATS */}
        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-title">
              <span>
                Current streak
              </span>

              <span>
                🔥
              </span>
            </div>

            <strong>
              12 <small>days</small>
            </strong>

            <p>
              You're on a roll. Keep your streak alive today!
            </p>

            <div className="progress-bar">
              <div style={{ width: "60%" }} />
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-title">
              <span>
                Overall completion
              </span>

              <span>
                📊
              </span>
            </div>

            <strong>
              30%
            </strong>

            <p>
              18 of 60 days completed.
            </p>

            <div className="progress-bar">
              <div style={{ width: "30%" }} />
            </div>

          </div>

        </section>


        {/* TODAY'S TASK */}
        <section className="today-card">

          <div className="today-top">

            <div>

              <span className="day-label">
                TODAY'S TASK
              </span>

              <h2>
                Day 12: Build a Smart Student Dashboard
              </h2>

            </div>

            <span className="difficulty">
              Intermediate
            </span>

          </div>


          <p>
            Create a clean and responsive student dashboard
            that helps students understand their learning
            progress, current streak, today's task and overall
            completion.
          </p>


          <div className="tags">

            <span>
              ⏱ 60 mins
            </span>

            <span>
              💻 Coding
            </span>

            <span>
              🎨 UI/UX
            </span>

            <span>
              ⚛ React
            </span>

          </div>


          <button
            className="primary-button"
            onClick={() => navigate("/day/12")}
          >
            Open today's challenge →
          </button>

        </section>


        {/* PROFILE LINKS */}
        <section className="section-block">

          <div className="section-title">

            <span className="small-label">
              YOUR PROFILE LINKS
            </span>

            <h2>
              Connect your work
            </h2>

          </div>

          <p className="profile-description">
            These links belong only to your logged-in account.
            Add your own profiles so recruiters can find your work.
          </p>


          <div className="profile-card">

            <label>
              GitHub profile / repository URL
            </label>

            <input
              type="url"
              placeholder="https://github.com/yourusername"
              value={github}
              onChange={(e) =>
                setGithub(e.target.value)
              }
            />


            <label>
              LinkedIn profile / post URL
            </label>

            <input
              type="url"
              placeholder="https://linkedin.com/in/yourusername"
              value={linkedin}
              onChange={(e) =>
                setLinkedin(e.target.value)
              }
            />


            <button
              className="primary-button"
              onClick={saveProfileLinks}
            >
              Save profile links →
            </button>


            {saved && (
              <div className="profile-message">
                ✓ Profile links saved successfully.
              </div>
            )}

          </div>

        </section>


        {/* QUICK LINKS */}
        <section className="section-block">

          <div className="section-title">

            <span className="small-label">
              YOUR WORK
            </span>

            <h2>
              Open your profiles
            </h2>

          </div>


          <div className="action-grid">

            <button
              className="action-card"
              onClick={() => openExternal(github)}
            >

              <span>
                GH
              </span>

              <strong>
                GitHub
              </strong>

              <small>
                Open your GitHub profile or repository.
              </small>

            </button>


            <button
              className="action-card"
              onClick={() => openExternal(linkedin)}
            >

              <span>
                in
              </span>

              <strong>
                LinkedIn
              </strong>

              <small>
                Open your LinkedIn profile or post.
              </small>

            </button>

          </div>

        </section>


        {/* ACHIEVEMENTS */}
        <section className="section-block">

          <div className="section-title">

            <span className="small-label">
              ACHIEVEMENTS
            </span>

            <h2>
              Your wins
            </h2>

          </div>


          <div className="achievement-grid">

            <div className="achievement-card">
              <span>🔥</span>
              <strong>7 Day Streak</strong>
              <small>Built consistency for a week.</small>
            </div>

            <div className="achievement-card">
              <span>⚡</span>
              <strong>Fast Builder</strong>
              <small>Completed multiple challenges.</small>
            </div>

            <div className="achievement-card">
              <span>🏆</span>
              <strong>Consistency</strong>
              <small>Completed 12 challenge days.</small>
            </div>

          </div>

        </section>

      </main>


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