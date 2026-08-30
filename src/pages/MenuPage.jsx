import { useEffect, useRef, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import restaurants from '../data/loadRestaurants.js'
import Header from '../components/Header.jsx'
import CategoryNav from '../components/CategoryNav.jsx'
import MenuItem from '../components/MenuItem.jsx'
import NotFound from './NotFound.jsx'

/* ── Filter definitions ── */
const FILTERS = [
  { id: 'veg',        label: '🟢 Veg',        check: (item) => item.veg === true },
  { id: 'nonveg',     label: '🔴 Non-Veg',    check: (item) => item.veg === false },
  { id: 'spicy',      label: '🌶️ Spicy',       check: (item) => item.spicy > 0 },
  { id: 'bestseller', label: '⭐ Bestseller',  check: (item) => item.tag?.toLowerCase().includes('best') },
  { id: 'new',        label: '✨ New',         check: (item) => item.tag?.toLowerCase().includes('new') },
]

export default function MenuPage() {
  const { slug } = useParams()
  const restaurant = restaurants[slug]
  const [active, setActive]         = useState(restaurant?.categories?.[0]?.name)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState([])   // array of filter IDs
  const sectionRefs = useRef({})

  // Scroll-spy: highlight sidebar item in view
  useEffect(() => {
    if (!restaurant) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.dataset.category)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [restaurant])

  // Toggle a filter on/off
  const toggleFilter = (id) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  // Apply search + filters together
  const filteredCategories = useMemo(() => {
    if (!restaurant) return []

    // Check which filter functions are active
    const activeFns = FILTERS
      .filter((f) => activeFilters.includes(f.id))
      .map((f) => f.check)

    const q = searchQuery.trim().toLowerCase()

    return restaurant.categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => {
          // Search match
          const matchesSearch =
            !q ||
            item.name.toLowerCase().includes(q) ||
            (item.description && item.description.toLowerCase().includes(q))

          // Filter match — item must pass ALL active filters
          const matchesFilter =
            activeFns.length === 0 || activeFns.every((fn) => fn(item))

          return matchesSearch && matchesFilter
        }),
      }))
      .filter((cat) => cat.items.length > 0)
  }, [restaurant, searchQuery, activeFilters])

  // Count items that match each filter (for showing counts)
  const filterCounts = useMemo(() => {
    if (!restaurant) return {}
    const counts = {}
    FILTERS.forEach((f) => {
      let n = 0
      restaurant.categories.forEach((cat) =>
        cat.items.forEach((item) => { if (f.check(item)) n++ })
      )
      counts[f.id] = n
    })
    return counts
  }, [restaurant])

  if (!restaurant) return <NotFound reason="menu" slug={slug} />

  const scrollToCategory = (name) => {
    sectionRefs.current[name]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(name)
  }

  const totalFiltered = filteredCategories.reduce((s, c) => s + c.items.length, 0)
  const isFiltering   = activeFilters.length > 0 || searchQuery.trim()

  return (
    <div className="menu-page" style={{ '--accent': restaurant.accent || '#fc8019' }}>

      {/* Restaurant Cover + Info */}
      <Header restaurant={{ ...restaurant, slug }} />

      {/* ── Search + Filter Bar ── */}
      <div className="mfilter-zone" id="menu-filter-zone">

        {/* Search */}
        <div className="msearch__bar" id="menu-search-bar">
          <span className="msearch__icon">🔍</span>
          <input
            type="text"
            className="msearch__input"
            id="menu-search-input"
            placeholder={`Search in ${restaurant.name}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="msearch__clear" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="mfilter-chips" id="menu-filter-chips">
          {FILTERS.map((f) => {
            const count = filterCounts[f.id] || 0
            if (count === 0) return null   // hide filters with no items
            const isOn = activeFilters.includes(f.id)
            return (
              <button
                key={f.id}
                id={`filter-${f.id}`}
                className={`mfilter-chip ${isOn ? 'mfilter-chip--active' : ''}`}
                onClick={() => toggleFilter(f.id)}
              >
                {f.label}
                <span className="mfilter-chip__count">{count}</span>
              </button>
            )
          })}

          {/* Clear All */}
          {activeFilters.length > 0 && (
            <button
              id="filter-clear-all"
              className="mfilter-chip mfilter-chip--clear"
              onClick={() => setActiveFilters([])}
            >
              ✕ Clear
            </button>
          )}
        </div>

        {/* Result count when filtering */}
        {isFiltering && (
          <div className="mfilter-result" id="filter-result-count">
            {totalFiltered} {totalFiltered === 1 ? 'item' : 'items'} found
          </div>
        )}
      </div>

      {/* Mobile: Top Category Tabs */}
      {!searchQuery && activeFilters.length === 0 && (
        <CategoryNav
          categories={restaurant.categories}
          active={active}
          onSelect={scrollToCategory}
        />
      )}

      {/* ── Desktop: Sidebar + Content ── */}
      <div className="menu-layout" id="menu-layout">

        {/* Left Sidebar */}
        {!searchQuery && activeFilters.length === 0 && (
          <aside className="menu-sidebar" id="menu-sidebar">
            <div className="menu-sidebar__title">Menu</div>
            <ul className="menu-sidebar__list">
              {restaurant.categories.map((cat) => (
                <li key={cat.name}>
                  <button
                    id={`sidebar-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`menu-sidebar__btn ${active === cat.name ? 'is-active' : ''}`}
                    onClick={() => scrollToCategory(cat.name)}
                  >
                    <span>{cat.name}</span>
                    <span className="menu-sidebar__count">{cat.items.length}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Right Content */}
        <div
          className={`menu-content ${(searchQuery || activeFilters.length > 0) ? 'menu-content--full' : ''}`}
          id="menu-content"
        >
          {filteredCategories.length > 0 ? (
            <div className="menu-sections" id="menu-sections">
              {filteredCategories.map((cat) => (
                <section
                  key={cat.name}
                  id={`section-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                  data-category={cat.name}
                  ref={(el) => (sectionRefs.current[cat.name] = el)}
                  className="menu-section"
                >
                  <h2 className="menu-section__title">{cat.name}</h2>
                  <p className="menu-section__count">{cat.items.length} items</p>
                  {cat.note && <p className="menu-section__note">{cat.note}</p>}

                  <ul className="menu-list">
                    {cat.items.map((item) => (
                      <MenuItem
                        key={item.name}
                        item={item}
                        currency={restaurant.currency || '₹'}
                      />
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            <div className="no-results" id="menu-no-results">
              <div className="no-results__emoji">
                {activeFilters.includes('veg') ? '🥗' : activeFilters.includes('nonveg') ? '🍖' : '🔍'}
              </div>
              <p>
                {isFiltering
                  ? 'Koi dish nahi mila is filter mein'
                  : `"${searchQuery}" nahi mila`}
              </p>
              <p className="no-results__sub">
                {activeFilters.length > 0
                  ? 'Filter hata ke try karo'
                  : 'Alag keyword try karo'}
              </p>
              {activeFilters.length > 0 && (
                <button
                  className="mfilter-chip mfilter-chip--clear"
                  style={{ margin: '16px auto 0', display: 'inline-flex' }}
                  onClick={() => setActiveFilters([])}
                >
                  ✕ Filters Hatao
                </button>
              )}
            </div>
          )}
        </div>

      </div>

      <footer className="menu-footer" id="menu-footer">
        🌿 All prices are inclusive of applicable taxes.
      </footer>
    </div>
  )
}
