export default function ProgressCard({
  completed = 11,
  total = 60,
  percentage = 18
}) {
  return (
    <div className="card progress-card">

      <div className="card-heading">
        <div>
          <p className="eyebrow">YOUR PROGRESS</p>
          <h3>Challenge progress</h3>
        </div>

        <strong>{percentage}%</strong>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="progress-meta">
        <span>{completed} days completed</span>
        <span>{total - completed} remaining</span>
      </div>

    </div>
  )
}