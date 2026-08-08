import { useState } from 'react'
import data from '../data/mockData.json'

import Navbar from '../components/Navbar'
import BottomNav from '../components/BottomNav'

export default function ChallengeDay({ navigate }) {

  const [submitted, setSubmitted] = useState(false)

  const task = data.today

  return (
    <div className="app-shell">

      <Navbar
        navigate={navigate}
        active="challenge"
      />

      <main className="challenge-page">

        {/* BACK */}

        <button
          className="back-button"
          onClick={() => navigate('/dashboard')}
        >
          ← Back to dashboard
        </button>


        {/* DAY HEADER */}

        <section className="challenge-header">

          <span className="day-badge">
            DAY 12
          </span>

          <h1>
            {task.title}
          </h1>

          <p>
            {task.description}
          </p>

          <div className="challenge-meta">

            <span>
              ◷ {task.estimatedTime}
            </span>

            <span>
              ● {task.difficulty}
            </span>

          </div>

        </section>


        {/* TASK */}

        <section className="challenge-card">

          <div className="challenge-card-header">
            <span className="section-label">
              TODAY'S MISSION
            </span>

            <span className="mission-status">
              {submitted ? 'SUBMITTED' : 'IN PROGRESS'}
            </span>
          </div>

          <h2>
            Build a Student Progress Card
          </h2>

          <p>
            Create a responsive component that helps a student
            understand their current coding journey at a glance.
          </p>


          <div className="requirements">

            <h3>
              What to build
            </h3>

            <Requirement text="Show the student's current streak." />
            <Requirement text="Display today's coding task." />
            <Requirement text="Show overall challenge progress." />
            <Requirement text="Include completed and remaining days." />
            <Requirement text="Make the interface mobile-first." />

          </div>


          <div className="requirements">

            <h3>
              Suggested skills
            </h3>

            <div className="skill-list">
              {task.skills.map((skill) => (
                <span key={skill}>
                  {skill}
                </span>
              ))}
            </div>

          </div>


          {/* PROOF */}

          <div className="proof-section">

            <h3>
              Submit your proof
            </h3>

            <p>
              Add your GitHub repository and LinkedIn post
              after completing the task.
            </p>

            <div className="proof-input">
              <span>GitHub</span>
              <input
                placeholder="https://github.com/username/project"
              />
            </div>

            <div className="proof-input">
              <span>LinkedIn</span>
              <input
                placeholder="https://linkedin.com/posts/..."
              />
            </div>

          </div>


          <button
            className="primary-button full"
            onClick={() => setSubmitted(true)}
          >
            {submitted
              ? '✓ Proof submitted'
              : 'Mark challenge complete'
            }
          </button>

        </section>


        {/* EDGE CASE */}

        <section className="edge-card">

          <span>💡</span>

          <div>
            <strong>
              Missed yesterday?
            </strong>

            <p>
              Don't worry. Your challenge continues.
              Focus on today's task and rebuild your streak.
            </p>
          </div>

        </section>

      </main>

      <BottomNav
        navigate={navigate}
        active="challenge"
      />

    </div>
  )
}


function Requirement({ text }) {
  return (
    <div className="requirement">
      <span>✓</span>
      <p>{text}</p>
    </div>
  )
}