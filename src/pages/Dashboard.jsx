import data from '../data/mockData.json'

import Navbar from '../components/Navbar'
import BottomNav from '../components/BottomNav'
import StreakCard from '../components/StreakCard'
import ProgressCard from '../components/ProgressCard'
import TaskCard from '../components/TaskCard'

export default function Dashboard({ navigate }) {
  const {
    student,
    challenge,
    today,
    achievements,
    recentDays
  } = data

  return (
    <div className="app-shell">

      <Navbar
        navigate={navigate}
        active="dashboard"
      />

      <main className="dashboard">

        {/* HEADER */}

        <section className="dashboard-header">

          <div>
            <p className="section-label">
              STUDENT DASHBOARD
            </p>

            <h1>
              Hey, {student.name} 👋
            </h1>

            <p>
              Day {challenge.currentDay} of your 60-day journey.
            </p>
          </div>

          <div className="student-avatar">
            {student.initials}
          </div>

        </section>


        {/* STREAK */}

        <StreakCard
          streak={challenge.currentStreak}
          longest={challenge.longestStreak}
        />


        {/* TODAY TASK */}

        <section className="dashboard-section">

          <div className="section-heading">

            <div>
              <p className="eyebrow">
                TODAY'S TASK
              </p>

              <h2>
                Keep the streak alive.
              </h2>
            </div>

            <span className="day-count">
              DAY {challenge.currentDay}
            </span>

          </div>

          <TaskCard
            task={{
              ...today,
              day: challenge.currentDay
            }}
            navigate={navigate}
          />

        </section>


        {/* PROGRESS */}

        <section className="dashboard-section">

          <ProgressCard
            completed={challenge.completedDays}
            total={challenge.totalDays}
            percentage={challenge.overallCompletion}
          />

        </section>


        {/* RECENT DAYS */}

        <section className="dashboard-section">

          <div className="section-heading">
            <div>
              <p className="eyebrow">
                RECENT ACTIVITY
              </p>

              <h2>
                Your latest builds
              </h2>
            </div>
          </div>

          <div className="recent-list">

            {recentDays.map((item) => (
              <div
                className="recent-item"
                key={item.day}
              >

                <div className="recent-day">
                  {item.day}
                </div>

                <div className="recent-info">
                  <strong>{item.title}</strong>
                  <span>Challenge Day {item.day}</span>
                </div>

                <div className="completed">
                  ✓
                </div>

              </div>
            ))}

          </div>

        </section>


        {/* ACHIEVEMENTS */}

        <section className="dashboard-section">

          <div className="section-heading">

            <div>
              <p className="eyebrow">
                ACHIEVEMENTS
              </p>

              <h2>
                You're making progress.
              </h2>
            </div>

          </div>

          <div className="achievement-grid">

            {achievements.map((achievement) => (
              <div
                className="achievement"
                key={achievement.title}
              >

                <div className="achievement-icon">
                  {achievement.icon}
                </div>

                <h3>
                  {achievement.title}
                </h3>

                <p>
                  {achievement.description}
                </p>

              </div>
            ))}

          </div>

        </section>

      </main>

      <BottomNav
        navigate={navigate}
        active="dashboard"
      />

    </div>
  )
}