import { Link } from 'react-router-dom'

export default function NotFound({ reason, slug }) {
  return (
    <div className="not-found">
      <p className="not-found__code">404</p>
      <h1 className="not-found__title">
        {reason === 'menu' ? 'This menu isn\u2019t on the table yet' : 'Page not found'}
      </h1>
      <p className="not-found__desc">
        {reason === 'menu'
          ? `No JSON file matches "${slug}". Add src/data/restaurants/${slug}.json to create it.`
          : 'The page you\u2019re looking for doesn\u2019t exist.'}
      </p>
      <Link to="/" className="not-found__link">
        ← Back to all menus
      </Link>
    </div>
  )
}
