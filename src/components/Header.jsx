export default function Header({ restaurant }) {
  return (
    <div className="menu-hero">
      {/* Cover image / placeholder */}
      <div className="menu-hero__cover">
        <img
          src={`/images/${restaurant.slug || 'hero'}.jpg`}
          alt={restaurant.name}
          className="menu-hero__cover-img"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextSibling.style.display = 'none'
            e.currentTarget.parentElement.querySelector('.menu-hero__cover-placeholder').style.display = 'flex'
          }}
        />
        <div className="menu-hero__cover-overlay" />
        <div className="menu-hero__cover-placeholder" style={{ display: 'none' }}>
          🍽️
        </div>
      </div>

      {/* Info */}
      <div className="menu-hero__info">

        <h1 className="menu-hero__name" id="menu-resto-name">{restaurant.name}</h1>
        <p className="menu-hero__tagline">{restaurant.tagline}</p>

        <div className="menu-hero__chips">
          <div className="menu-hero__chip menu-hero__chip--rating">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            4.5 · Excellent
          </div>

          {restaurant.location && (
            <div className="menu-hero__chip">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {restaurant.location}
            </div>
          )}

          <div className="menu-hero__chip">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            30–45 min
          </div>

          <div className="menu-hero__chip">
            🟢 Open Now
          </div>
        </div>
      </div>
    </div>
  )
}
