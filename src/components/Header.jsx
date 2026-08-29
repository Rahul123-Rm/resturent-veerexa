import { Link } from 'react-router-dom'

export default function Header({ restaurant }) {
  return (
    <header className="menu-header">
      <Link to="/" className="menu-header__back">
        ← All menus
      </Link>
      <p className="menu-header__eyebrow">{restaurant.location}</p>
      <h1 className="menu-header__name">{restaurant.name}</h1>
      <p className="menu-header__tagline">{restaurant.tagline}</p>
    </header>
  )
}
