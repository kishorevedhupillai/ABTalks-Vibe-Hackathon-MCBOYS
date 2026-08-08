export default function Navbar({ navigate, active = '' }) {
  return (
    <header className="navbar">
      <div
        className="brand"
        onClick={() => navigate('/')}
      >
        <span className="brand-mark">A</span>
        <span>ABTalks</span>
      </div>

      <nav className="desktop-nav">
        <button
          className={active === 'dashboard' ? 'nav-active' : ''}
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </button>

        <button
          className={active === 'challenge' ? 'nav-active' : ''}
          onClick={() => navigate('/day/12')}
        >
          Today's Challenge
        </button>
      </nav>

      <button
        className="profile-mini"
        onClick={() => navigate('/dashboard')}
      >
        K
      </button>
    </header>
  )
}