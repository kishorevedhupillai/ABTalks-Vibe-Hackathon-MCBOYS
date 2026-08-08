export default function TaskCard({ task, navigate }) {
  return (
    <div className="task-card">

      <div className="task-top">
        <div>
          <span className="day-badge">
            DAY {task.day}
          </span>

          <h2>{task.title}</h2>
        </div>

        <div className="task-status">
          TODAY
        </div>
      </div>

      <p className="task-description">
        {task.description}
      </p>

      <div className="task-info">

        <div>
          <span>Difficulty</span>
          <strong>{task.difficulty}</strong>
        </div>

        <div>
          <span>Time</span>
          <strong>{task.estimatedTime}</strong>
        </div>

      </div>

      <div className="skill-list">
        {task.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <button
        className="primary-button full"
        onClick={() => navigate('/day/12')}
      >
        Open today's challenge
        <span>→</span>
      </button>

    </div>
  )
}