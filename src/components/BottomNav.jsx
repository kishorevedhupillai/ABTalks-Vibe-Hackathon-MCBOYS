export default function BottomNav({ navigate, active }) {
  return (
    <div className="bottom-nav">

      <button
        className={active === 'home' ? 'bottom-active' : ''}
        onClick={() => navigate('/')}
      >
        <span>⌂</span>
        <small>Home</small>
      </button>

      <button
        className={active === 'dashboard' ? 'bottom-active' : ''}
        onClick={() => navigate('/dashboard')}
      >
        <span>▦</span>
        <small>Dashboard</small>
      </button>

      <button
        className={active === 'challenge' ? 'bottom-active' : ''}
        onClick={() => navigate('/day/12')}
      >
        <span>⌁</span>
        <small>Challenge</small>
      </button>

      <button
        className="bottom-profile"
        onClick={() => navigate('/dashboard')}
      >
        <span>K</span>
        <small>Profile</small>
      </button>

    </div>
  )
}