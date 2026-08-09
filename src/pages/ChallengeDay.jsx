import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const TOTAL_DAYS = 60;
const COMPLETED_DAYS = 18;
const CURRENT_STREAK = 12;

const today = {
  day: 12,
  title: "Build a Smart Student Dashboard",
  description:
    "Create a clean and responsive student dashboard that helps students track their learning progress.",
  difficulty: "Intermediate",
  time: "60 mins",
  category: "Web Development",
};

const tasks = [
  "Create a responsive student dashboard",
  "Add progress tracking",
  "Show current streak",
  "Add today's challenge",
  "Create a mobile-first layout",
];

const problemStatement = {
  title: "Build a Smart Student Dashboard",
  description:
    "Students often struggle to understand their learning progress because their tasks, streaks, goals, and completed work are scattered across different platforms. Build a clean and responsive dashboard that brings all important learning information into one place.",
  requirements: [
    "Display the student's current learning streak",
    "Display overall completion percentage",
    "Show today's coding challenge",
    "Show completed challenge days",
    "Provide a mobile-first responsive interface",
    "Allow students to connect their GitHub and LinkedIn work",
  ],
};

function calculatePercentage(days) {
  return Math.round((days / TOTAL_DAYS) * 100);
}

function cleanUrl(value) {
  if (!value) return "";

  const trimmed = value.trim();

  if (!trimmed) return "";

  const finalUrl = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const parsed = new URL(finalUrl);

    if (
      parsed.protocol !== "http:" &&
      parsed.protocol !== "https:"
    ) {
      return "";
    }

    return parsed.href;
  } catch {
    return "";
  }
}

export default function ChallengeDay({
  navigate,
  user,
  logout,
}) {
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  /*
   * IMPORTANT
   *
   * 18 / 60 = 30%
   */
  const progressPercentage =
    calculatePercentage(COMPLETED_DAYS);

  /*
   * 12 / 60 = 20%
   */
  const streakPercentage =
    calculatePercentage(CURRENT_STREAK);

  /*
   * Get logged-in user's saved links.
   */
  useEffect(() => {
    let active = true;

    async function loadUserLinks() {
      try {
        setLoading(true);

        /*
         * First try the user passed from App.
         */
        const metadata =
          user?.user_metadata || {};

        if (active) {
          setGithubUrl(
            metadata.github_url || ""
          );

          setLinkedinUrl(
            metadata.linkedin_url || ""
          );
        }

        /*
         * Then get the latest user from Supabase.
         */
        const {
          data,
          error,
        } = await supabase.auth.getUser();

        if (
          !error &&
          data?.user &&
          active
        ) {
          setGithubUrl(
            data.user.user_metadata
              ?.github_url || ""
          );

          setLinkedinUrl(
            data.user.user_metadata
              ?.linkedin_url || ""
          );
        }
      } catch (error) {
        console.error(
          "Error loading profile links:",
          error
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadUserLinks();

    return () => {
      active = false;
    };
  }, [user]);

  /*
   * Save GitHub and LinkedIn links
   * to the currently logged-in user.
   */
  async function saveLinks() {
    setMessage("");
    setMessageType("");

    const github = cleanUrl(githubUrl);
    const linkedin = cleanUrl(linkedinUrl);

    if (githubUrl && !github) {
      setMessage(
        "Please enter a valid GitHub URL."
      );
      setMessageType("error");
      return;
    }

    if (linkedinUrl && !linkedin) {
      setMessage(
        "Please enter a valid LinkedIn URL."
      );
      setMessageType("error");
      return;
    }

    try {
      setSaving(true);

      const {
        data,
        error,
      } = await supabase.auth.updateUser({
        data: {
          github_url: github,
          linkedin_url: linkedin,
        },
      });

      if (error) {
        throw error;
      }

      setGithubUrl(
        data?.user?.user_metadata
          ?.github_url || github
      );

      setLinkedinUrl(
        data?.user?.user_metadata
          ?.linkedin_url || linkedin
      );

      setMessage(
        "Your GitHub and LinkedIn links were saved successfully."
      );

      setMessageType("success");
    } catch (error) {
      console.error(
        "Error saving links:",
        error
      );

      setMessage(
        "Unable to save your links. Please try again."
      );

      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  /*
   * Open GitHub only when this user
   * actually has a GitHub URL.
   */
  function handleGithub() {
    const url = cleanUrl(githubUrl);

    if (!url) {
      setMessage(
        "No GitHub link added. Add your GitHub link from Dashboard."
      );

      setMessageType("error");

      navigate("/dashboard");
      return;
    }

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  }

  /*
   * Open LinkedIn only when this user
   * actually has a LinkedIn URL.
   */
  function handleLinkedin() {
    const url = cleanUrl(linkedinUrl);

    if (!url) {
      setMessage(
        "No LinkedIn link added. Add your LinkedIn link from Dashboard."
      );

      setMessageType("error");

      navigate("/dashboard");
      return;
    }

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <div className="app">

      {/* ==========================================
          NAVBAR
      ========================================== */}

      <header className="navbar">

        <button
          className="logo"
          type="button"
          onClick={() => navigate("/")}
        >
          AB<span>Talks</span>
        </button>

        <div className="nav-right">

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
          >
            {(
              user?.user_metadata?.name ||
              user?.email ||
              "U"
            )
              .charAt(0)
              .toUpperCase()}
          </button>

        </div>
      </header>

      {/* ==========================================
          PAGE
      ========================================== */}

      <main className="challenge-page">

        <button
          className="back-button"
          type="button"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          ← Back to dashboard
        </button>

        {/* ========================================
            CHALLENGE HEADER
        ======================================== */}

        <section className="challenge-hero">

          <div className="day-label">
            DAY {today.day} / {TOTAL_DAYS}
          </div>

          <h1>
            {today.title}
          </h1>

          <p>
            {today.description}
          </p>

          <div className="challenge-meta">

            <span>
              ⚡ {today.difficulty}
            </span>

            <span>
              ◷ {today.time}
            </span>

            <span>
              💻 {today.category}
            </span>

          </div>

        </section>

        {/* ========================================
            MAIN CONTENT
        ======================================== */}

        <section className="challenge-content">

          {/* ======================================
              LEFT SIDE
          ====================================== */}

          <div>

            {/* PROBLEM STATEMENT */}

            <section className="content-card">

              <div className="section-label">
                PROBLEM STATEMENT
              </div>

              <h2>
                {problemStatement.title}
              </h2>

              <p>
                {problemStatement.description}
              </p>

              <h3>
                What you need to build
              </h3>

              <div className="check-list">

                {problemStatement.requirements.map(
                  (item, index) => (
                    <div
                      className="check-item"
                      key={index}
                    >

                      <span>
                        ✓
                      </span>

                      <span>
                        {item}
                      </span>

                    </div>
                  )
                )}

              </div>

            </section>

            {/* TODAY'S MISSION */}

            <section className="content-card">

              <div className="section-label">
                TODAY'S MISSION
              </div>

              <h2>
                Build today's challenge
              </h2>

              <p>
                Build a clean and responsive
                student dashboard that allows
                students to understand their
                current progress, track their
                streak and complete today's
                learning goal.
              </p>

              <h3>
                Required features
              </h3>

              <div className="check-list">

                {tasks.map(
                  (task, index) => (
                    <div
                      className="check-item"
                      key={index}
                    >

                      <span>
                        ✓
                      </span>

                      <span>
                        {task}
                      </span>

                    </div>
                  )
                )}

              </div>

            </section>

            {/* ==================================
                PROOF
            ================================== */}

            <section className="content-card">

              <div className="section-label">
                SUBMIT YOUR PROOF
              </div>

              <h2>
                Show what you built
              </h2>

              <p>
                Connect your own GitHub
                repository and LinkedIn
                profile or post. These links
                belong only to your logged-in
                account.
              </p>

              {/* GITHUB */}

              <div className="proof-box">

                <div className="proof-icon">
                  GH
                </div>

                <div className="proof-info">

                  <strong>
                    GitHub repository
                  </strong>

                  <p>
                    Open your own GitHub
                    profile or repository.
                  </p>

                </div>

                {loading ? (

                  <button
                    className="outline-btn"
                    type="button"
                    disabled
                  >
                    Loading...
                  </button>

                ) : githubUrl ? (

                  <button
                    className="outline-btn"
                    type="button"
                    onClick={handleGithub}
                  >
                    Open GitHub →
                  </button>

                ) : (

                  <button
                    className="outline-btn"
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

                <div className="proof-icon">
                  in
                </div>

                <div className="proof-info">

                  <strong>
                    LinkedIn post
                  </strong>

                  <p>
                    Open your own LinkedIn
                    profile or post.
                  </p>

                </div>

                {loading ? (

                  <button
                    className="outline-btn"
                    type="button"
                    disabled
                  >
                    Loading...
                  </button>

                ) : linkedinUrl ? (

                  <button
                    className="outline-btn"
                    type="button"
                    onClick={handleLinkedin}
                  >
                    Open LinkedIn →
                  </button>

                ) : (

                  <button
                    className="outline-btn"
                    type="button"
                    onClick={() =>
                      navigate("/dashboard")
                    }
                  >
                    Add LinkedIn →
                  </button>

                )}

              </div>

              {/* MESSAGE */}

              {message && (
                <div
                  style={{
                    marginTop: "14px",
                    padding: "11px 13px",
                    borderRadius: "7px",
                    background:
                      messageType === "success"
                        ? "#0d2418"
                        : "#281016",
                    color:
                      messageType === "success"
                        ? "#5ee38a"
                        : "#ff7288",
                    fontSize: "10px",
                  }}
                >
                  {message}
                </div>
              )}

              {/* SAVE */}

              <button
                className="primary-button"
                type="button"
                onClick={saveLinks}
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save my links →"}
              </button>

            </section>

          </div>

          {/* ======================================
              RIGHT SIDEBAR
          ====================================== */}

          <aside className="challenge-sidebar">

            {/* ====================================
                OVERALL PROGRESS
            ==================================== */}

            <div className="side-card">

              <div className="section-label">
                YOUR PROGRESS
              </div>

              <div
                className="circle-progress"
                style={{
                  background: `conic-gradient(
                    #8b5cf6 ${progressPercentage * 3.6}deg,
                    #211b2b ${progressPercentage * 3.6}deg
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

              <div className="progress-line">

                <div
                  style={{
                    width:
                      `${progressPercentage}%`,
                  }}
                />

              </div>

            </div>

            {/* ====================================
                CURRENT STREAK
            ==================================== */}

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

            {/* ====================================
                DAY INFORMATION
            ==================================== */}

            <div className="side-card">

              <div className="section-label">
                TODAY
              </div>

              <h3>
                Day {today.day}
              </h3>

              <p>
                Keep building every day.
                Your consistency becomes
                your portfolio.
              </p>

            </div>

          </aside>

        </section>

      </main>

      {/* ==========================================
          FOOTER
      ========================================== */}

      <footer>

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