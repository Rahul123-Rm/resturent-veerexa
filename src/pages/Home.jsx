import { useState } from 'react'
import { Link } from 'react-router-dom'
import { restaurantList } from '../data/loadRestaurants.js'

/* ── Build PLACES from JSON data ── */
const PLACES = restaurantList.map((r) => ({
  slug: r.slug,
  name: r.name,
  subtitle: r.tagline || 'Restaurant & Café',
  tags: [r.categories?.[0]?.name, r.categories?.[1]?.name].filter(Boolean),
  location: r.location || 'Indore',
  rating: (4.2 + Math.random() * 0.7).toFixed(1),
  deliveryTime: `${25 + Math.floor(Math.random() * 20)} min`,
  image: `/images/${r.slug}.jpg`,
  emoji: ['🍛', '☕', '🍕', '🥘', '🍜', '🍔', '🥗'][Math.floor(Math.random() * 7)],
}))

const QUICK_CATS = [
  { emoji: '🍽️', label: 'All' },
  { emoji: '🍛', label: 'Indian' },
  { emoji: '☕', label: 'Café' },
  { emoji: '🍕', label: 'Fast Food' },
  { emoji: '🥗', label: 'Healthy' },
  { emoji: '🍜', label: 'Chinese' },
  { emoji: '🍔', label: 'Burgers' },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCat, setActiveCat] = useState('All')

  const filtered = PLACES.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div>
      {/* ── Navbar ── */}
      <nav className="nav">
        <div className="nav__inner">
          <Link to="/" className="nav__logo" id="nav-logo">
            <div className="nav__logo-icon">🍽️</div>
            Veerexa<span>Menu</span>
          </Link>

          <button className="nav__location" id="nav-location-btn">
            <div className="nav__location-dot" />
            Indore, MP
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          <div className="nav__links">
            <a href="#explore" className="nav__link" id="nav-explore">Explore</a>
            <a href="#how-it-works" className="nav__link" id="nav-hiw">For Restaurants</a>
          </div>

          <a href="mailto:hello@veerexa.com" className="nav__cta" id="nav-cta">
            List Restaurant
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero" id="hero">
        <div className="hero__tag">
          <span>🔥</span>
          7 restaurants · Indore
        </div>

        <h1 className="hero__h1" id="hero-title">
          Hungry? Order from<br />
          <span>your favourite spots</span>
        </h1>

        <p className="hero__sub">
          Discover menus from the best restaurants and cafés in your city — all in one place.
        </p>

        {/* Search */}
        <div className="hero__search-wrap">
          <div className="hero__search" id="hero-search">
            <span className="hero__search-icon">🔍</span>
            <input
              type="text"
              className="hero__search-input"
              id="hero-search-input"
              placeholder="Search restaurants, cuisines, dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="hero__search-btn" id="hero-search-btn">
              Search
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">7+</span>
            <span className="hero__stat-label">Restaurants</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-num">100+</span>
            <span className="hero__stat-label">Dishes</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-num">4.5★</span>
            <span className="hero__stat-label">Avg Rating</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-num">Free</span>
            <span className="hero__stat-label">Browse Menus</span>
          </div>
        </div>
      </section>

      {/* ── Quick Category Chips ── */}
      <div className="quick-cats" id="quick-cats">
        <div className="quick-cats__inner">
          {QUICK_CATS.map((cat) => (
            <button
              key={cat.label}
              id={`cat-${cat.label.toLowerCase()}`}
              className={`quick-cat ${activeCat === cat.label ? 'active' : ''}`}
              onClick={() => setActiveCat(cat.label)}
            >
              <span className="quick-cat__emoji">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Restaurant Grid ── */}
      <section id="explore">
        <div className="section">
          <div className="section__header">
            <h2 className="section__title" id="explore-title">
              {searchQuery ? `Results for "${searchQuery}"` : 'All Restaurants'}
              {' '}<span>near you</span>
            </h2>
            <span className="section__count">{filtered.length} places</span>
          </div>

          {filtered.length > 0 ? (
            <div className="resto-grid" id="resto-grid">
              {filtered.map((place, i) => (
                <Link
                  key={place.slug || i}
                  to={place.slug ? `/${place.slug}` : '#'}
                  className="resto-card"
                  id={`resto-card-${place.slug || i}`}
                >
                  {/* Image */}
                  <div className="resto-card__img-wrap">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="resto-card__img"
                      onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
                    />
                    <div className="resto-card__img-placeholder" style={{ display: 'none' }}>
                      {place.emoji}
                    </div>

                    <div className="resto-card__badge">Open Now</div>

                    <div className="resto-card__rating">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#fbbf24' }}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      {place.rating}
                    </div>

                    <div className="resto-card__fav" onClick={(e) => { e.preventDefault(); }}>❤️</div>
                  </div>

                  {/* Body */}
                  <div className="resto-card__body">
                    <h3 className="resto-card__name">{place.name}</h3>
                    <p className="resto-card__sub">{place.subtitle}</p>

                    <div className="resto-card__tags">
                      {place.tags.map((t) => (
                        <span key={t} className="resto-card__tag">{t}</span>
                      ))}
                    </div>

                    <div className="resto-card__meta">
                      <div className="resto-card__meta-item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {place.location}
                      </div>
                      <div className="resto-card__meta-item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {place.deliveryTime}
                      </div>
                    </div>
                  </div>

                  {/* Offer strip */}
                  <div className="resto-card__offer">
                    <span>🏷️</span>
                    View Full Menu
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 'auto' }}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="no-results" id="no-results">
              <div className="no-results__emoji">🔍</div>
              <p>No restaurants found</p>
              <p className="no-results__sub">Try searching for something else</p>
            </div>
          )}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="hiw">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h2 className="section__title" style={{ textAlign: 'center', marginBottom: '36px' }}>
            How it <span>works</span>
          </h2>
          <div className="hiw__inner">
            {[
              { emoji: '🏪', num: '1', title: 'Pick a Restaurant', desc: 'Browse our curated list of local restaurants and cafés.' },
              { emoji: '📋', num: '2', title: 'Browse the Menu', desc: 'Explore beautiful digital menus with categories, prices & more.' },
              { emoji: '📲', num: '3', title: 'Order or Visit', desc: 'Plan your order or walk-in — the choice is yours.' },
            ].map((step, i, arr) => (
              <>
                <div className="hiw__step" key={step.num} id={`hiw-step-${step.num}`}>
                  <div className="hiw__step-icon">
                    {step.emoji}
                    <span className="hiw__step-num">{step.num}</span>
                  </div>
                  <div className="hiw__step-title">{step.title}</div>
                  <p className="hiw__step-desc">{step.desc}</p>
                </div>
                {i < arr.length - 1 && <div className="hiw__connector" key={`conn-${i}`} />}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promo Banner ── */}
      <div className="section" style={{ paddingTop: '16px' }}>
        <div className="promo-banner" id="promo-banner">
          <div className="promo-banner__left">
            <div className="promo-banner__tag">
              <span>🚀</span> For Restaurant Owners
            </div>
            <h2 className="promo-banner__h2">
              Turn your paper menu into<br />a premium digital experience
            </h2>
            <p className="promo-banner__desc">
              Get your own Veerexa Menu page — share it with customers via QR code, WhatsApp, or link. Always up to date.
            </p>
            <div className="promo-banner__feats">
              {[
                { emoji: '📱', label: 'Mobile-first design' },
                { emoji: '✏️', label: 'Real-time updates' },
                { emoji: '📲', label: 'Shareable QR code' },
              ].map((f) => (
                <div className="promo-banner__feat" key={f.label}>
                  <div className="promo-banner__feat-icon">{f.emoji}</div>
                  {f.label}
                </div>
              ))}
            </div>
            <a href="mailto:hello@veerexa.com" className="promo-banner__btn" id="promo-cta">
              Get Started — It's Free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="promo-banner__right">🍽️</div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="site-footer" id="site-footer">
        <div className="site-footer__inner">

          {/* Brand */}
          <div className="site-footer__col">
            <div className="site-footer__logo">🍽️ Veerexa<span>Menu</span></div>
            <p className="site-footer__about">
              Indore ke best restaurants ke menus ek jagah — explore karo, discover karo, enjoy karo.
            </p>
            <div className="site-footer__socials">
              <a href="mailto:veerexa0@gmail.com" className="site-footer__social-btn" id="footer-email-icon" title="Email us">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
              <a href="tel:+918264216929" className="site-footer__social-btn" id="footer-phone-icon" title="Call us">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.66-.66a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="site-footer__col">
            <div className="site-footer__col-title">Quick Links</div>
            <ul className="site-footer__list">
              <li><a href="#explore" id="footer-explore">🍽️ Restaurants</a></li>
              <li><a href="#how-it-works" id="footer-hiw">📋 How It Works</a></li>
              <li><a href="#" id="footer-privacy">🔒 Privacy Policy</a></li>
              <li><a href="#" id="footer-terms">📄 Terms of Use</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="site-footer__col">
            <div className="site-footer__col-title">Contact Us</div>
            <ul className="site-footer__list">
              <li>
                <a href="mailto:veerexa0@gmail.com" id="footer-contact-email" className="site-footer__contact-link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  veerexa0@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+918264216929" id="footer-contact-phone" className="site-footer__contact-link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.66-.66a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  +91 82642 16929
                </a>
              </li>
              <li>
                <span className="site-footer__contact-link" style={{ cursor: 'default' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  Indore, Madhya Pradesh
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="site-footer__bottom" id="footer-bottom">
          <span>© 2026 Veerexa. Crafted with ❤️ in Indore.</span>
          <span>All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
