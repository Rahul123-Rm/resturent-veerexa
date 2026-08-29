export default function CategoryNav({ categories, active, onSelect }) {
  return (
    <nav className="category-nav">
      <ul className="category-nav__list">
        {categories.map((cat) => (
          <li key={cat.name}>
            <button
              className={`category-nav__chip ${active === cat.name ? 'is-active' : ''}`}
              onClick={() => onSelect(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
