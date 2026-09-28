/**
 * Simple dark/light theme toggle button
 */
function ThemeToggle({ theme, onToggle }) {
  return (
    <button onClick={onToggle} className="theme-toggle" aria-label="Toggle theme">
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}

export default ThemeToggle
