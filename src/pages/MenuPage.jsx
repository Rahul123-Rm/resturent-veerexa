import { useEffect, useRef, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import restaurants from '../data/loadRestaurants.js'
import Header from '../components/Header.jsx'
import CategoryNav from '../components/CategoryNav.jsx'
import MenuItem from '../components/MenuItem.jsx'
import NotFound from './NotFound.jsx'

export default function MenuPage() {
  const { slug } = useParams()
  const restaurant = restaurants[slug]
  const [active, setActive] = useState(restaurant?.categories?.[0]?.name)
  const [searchQuery, setSearchQuery] = useState('')
  const sectionRefs = useRef({})

  // Highlight the category chip that's currently in view while scrolling
  useEffect(() => {
    if (!restaurant) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.dataset.category)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [restaurant])

  const filteredCategories = useMemo(() => {
    if (!restaurant) return []
    if (!searchQuery.trim()) return restaurant.categories

    const query = searchQuery.toLowerCase()
    return restaurant.categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            (item.description && item.description.toLowerCase().includes(query))
        ),
      }))
      .filter((cat) => cat.items.length > 0)
  }, [restaurant, searchQuery])

  if (!restaurant) return <NotFound reason="menu" slug={slug} />

  const scrollToCategory = (name) => {
    sectionRefs.current[name]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="menu-page" style={{ '--accent': restaurant.accent || '#C1502E' }}>
      <Header restaurant={restaurant} />
      
      <div className="search-container">
        <div className="search-bar">
          <span className="search-bar__icon">🔍</span>
          <input
            type="text"
            className="search-bar__input"
            placeholder="Search for dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {!searchQuery && (
        <CategoryNav categories={restaurant.categories} active={active} onSelect={scrollToCategory} />
      )}

      <main className="menu-sections">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <section
              key={cat.name}
              data-category={cat.name}
              ref={(el) => (sectionRefs.current[cat.name] = el)}
              className="menu-section"
            >
              <h2 className="menu-section__title">{cat.name}</h2>
              {cat.note && <p className="menu-section__note">{cat.note}</p>}
              <ul className="menu-list">
                {cat.items.map((item) => (
                  <MenuItem key={item.name} item={item} currency={restaurant.currency || '₹'} />
                ))}
              </ul>
            </section>
          ))
        ) : (
          <div className="no-results">
            <p>No dishes found for "{searchQuery}"</p>
          </div>
        )}
      </main>

      <footer className="menu-footer">Prices are inclusive of taxes.</footer>
    </div>
  )
}

