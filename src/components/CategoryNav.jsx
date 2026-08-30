export default function CategoryNav({ categories, active, onSelect }) {
  return (
    <nav className="mcat-nav" id="category-nav">
      <ul className="mcat-nav__list" id="category-nav-list">
        {categories.map((cat) => (
          <li key={cat.name}>
            <button
              id={`cat-btn-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={`mcat-nav__btn ${active === cat.name ? 'is-active' : ''}`}
              onClick={() => onSelect(cat.name)}
            >
              {cat.name}
              {cat.items?.length > 0 && (
                <span style={{ marginLeft: '5px', opacity: 0.6, fontSize: '12px' }}>
                  ({cat.items.length})
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
