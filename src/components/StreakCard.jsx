export default function StreakCard({ streak = 7, longest = 9 }) {
  return (
    <div className="streak-card">

      <div className="streak-icon">
        🔥
      </div>

      <div className="streak-content">
        <p className="eyebrow">CURRENT STREAK</p>

        <div className="streak-number">
          {streak}
          <span> days</span>
        </div>

        <p className="muted">
          Keep building tomorrow.
        </p>
      </div>

      <div className="longest">
        <span>Best</span>
        <strong>{longest}</strong>
      </div>

    </div>
  )
}