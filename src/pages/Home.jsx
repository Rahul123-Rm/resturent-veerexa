import { Link } from 'react-router-dom'
import { restaurantList } from '../data/loadRestaurants.js'

/* ── Dynamically load PLACES from JSON files ── */
const PLACES = restaurantList.map(r => ({
  slug: r.slug,
  name: r.name,
  subtitle: r.tagline || 'Restaurant & Cafe',
  tags: [r.categories?.[0]?.name || 'Food', r.categories?.[1]?.name || 'Beverages'].filter(Boolean),
  location: r.location || 'Indore',
  rating: 4.5,
  image: `/images/${r.slug}.jpg`, // Optional: Add images with these names in public/images/
}))

export default function Home() {
  return (
    <div className="vm">

      {/* ── Navbar ── */}
      <nav className="vm__nav">
        <div className="vm__container vm__nav-inner">
          <Link to="/" className="vm__nav-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
              <path d="M12 8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"/>
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
            </svg>
            Veerexa<span>Menu</span>
          </Link>

          <div className="vm__nav-links">
            <a href="#" className="vm__nav-link active">Home</a>
            <a href="#explore" className="vm__nav-link">Explore Menus</a>
            <a href="#how-it-works" className="vm__nav-link">For Restaurants</a>
            <a href="#about" className="vm__nav-link">About Us</a>
          </div>

          <a href="mailto:hello@veerexa.com" className="vm__btn vm__btn--primary vm__btn--sm">
            List Your Restaurant
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="vm__hero">
        <div className="vm__hero-glow"></div>
        <div className="vm__container vm__hero-grid">
          
          {/* Left content */}
          <div className="vm__hero-content">
            <h1 className="vm__hero-h1">
              Your Menu.<br/>
              <span className="vm__hero-highlight">Beautifully Online.</span>
            </h1>
            <p className="vm__hero-sub">
              Discover local restaurants and cafés, or launch<br/>a premium digital menu for your business.
            </p>
            <div className="vm__hero-actions">
              <a href="#explore" className="vm__btn vm__btn--primary vm__btn--lg">
                Explore Restaurants
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#" className="vm__btn vm__btn--outline vm__btn--lg">
                Create Your Menu
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>

          {/* Right visual — phone + card mockup */}
          <div className="vm__hero-visual">
            {/* Decorative glow behind mockups */}
            <div className="vm__hero-visual-glow"></div>

            {/* Phone mockup */}
            <div className="vm__mockup vm__mockup--phone">
              <div className="vm__phone-inner">
                <div className="vm__phone-header">
                  <div className="vm__phone-logo">🍽️ FAT TIGER</div>
                  <div className="vm__phone-sub">Indian Kitchen & Bar</div>
                  <div className="vm__phone-badge">Our Specials</div>
                </div>
                {[
                  {name:'Butter Chicken', price:'₹280', img:'🍛'},
                  {name:'Dal Makhani', price:'₹220', img:'🥘'},
                  {name:'Paneer Tikka', price:'₹249', img:'🥗'},
                  {name:'Biryani', price:'₹280', img:'🍚'},
                ].map((item, i) => (
                  <div className="vm__phone-item" key={i}>
                    <div className="vm__phone-item-img">{item.img}</div>
                    <div className="vm__phone-item-info">
                      <div className="vm__phone-item-name">{item.name}</div>
                      <div className="vm__phone-item-price">{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card mockup — food image */}
            <div className="vm__mockup vm__mockup--card">
              <img src="/images/hero-food.jpg" alt="Premium food spread" className="vm__card-food-img" />
            </div>

            {/* Floating badge */}
            <div className="vm__hero-float-badge">
              <span className="vm__hero-float-dot"></span>
              <span>Live menus · Real-time updates</span>
            </div>
          </div>
        </div>

        {/* Built-for strip */}
        <div className="vm__built-strip">
          <div className="vm__container vm__built-inner">
            <div className="vm__built-check">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <span>Built for Restaurants, Cafés &amp; Cloud Kitchens</span>
            <div className="vm__built-icons">
              <span title="Restaurant">🏪</span>
              <span title="Cafe">☕</span>
              <span title="Cloud Kitchen">🍕</span>
              <span title="Chef">👨‍🍳</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Explore Popular Places ── */}
      <section id="explore" className="vm__restaurants">
        <div className="vm__container">
          <div className="vm__section-header">
            <h2>Explore Popular Places</h2>
            <div className="vm__section-underline"></div>
          </div>

          <div className="vm__places-grid">
            {PLACES.map((place, i) => {
              const linkTarget = place.slug ? `/${place.slug}` : '#'
              return (
                <Link key={i} to={linkTarget} className="vm__place-card">
                  <div className="vm__place-img-wrap">
                    <img src={place.image} alt={place.name} className="vm__place-img" />
                    <div className="vm__place-rating">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      {place.rating}
                    </div>
                  </div>
                  <div className="vm__place-body">
                    <h3 className="vm__place-name">{place.name}</h3>
                    <div className="vm__place-tags">
                      {place.tags.map(t => <span key={t} className="vm__place-tag">{t}</span>)}
                    </div>
                    <div className="vm__place-loc">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {place.location}
                    </div>
                    <div className="vm__place-cta">
                      <span>View Menu</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="vm__hiw">
        <div className="vm__container">
          <div className="vm__section-header">
            <h2>How it works</h2>
            <div className="vm__section-underline"></div>
          </div>

          <div className="vm__hiw-grid">
            {[
              {
                num: '1',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                ),
                title: 'Choose a place',
                desc: 'Find your favorite restaurant or café near you.',
              },
              {
                num: '2',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                ),
                title: 'Browse the menu',
                desc: 'Explore beautifully curated menus with photos & details.',
              },
              {
                num: '3',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                ),
                title: 'Order your favourites',
                desc: 'Choose your dishes and place your order with ease.',
              },
            ].map((step, i, arr) => (
              <div className="vm__hiw-col" key={i}>
                <div className="vm__step">
                  <div className="vm__step-circle">
                    <span className="vm__step-num">{step.num}</span>
                    {step.icon}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
                {i < arr.length - 1 && <div className="vm__step-connector"><div className="vm__step-dots"></div></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Digital Experience Banner ── */}
      <section className="vm__banner-section">
        <div className="vm__container">
          <div className="vm__banner">
            <div className="vm__banner-left">
              <h2>
                Turn your paper menu into<br/>
                <span>a premium digital experience</span>
              </h2>
              <div className="vm__banner-feats">
                {[
                  {icon:'📱', title:'Mobile Friendly', desc:'Looks perfect on every device.'},
                  {icon:'✏️', title:'Easy updates', desc:'Update menu & prices in real time.'},
                  {icon:'📲', title:'Shareable QR code', desc:'Let customers access your menu instantly.'},
                ].map((f,i) => (
                  <div className="vm__banner-feat" key={i}>
                    <div className="vm__banner-feat-icon">{f.icon}</div>
                    <div>
                      <div className="vm__banner-feat-title">{f.title}</div>
                      <div className="vm__banner-feat-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#" className="vm__btn vm__btn--primary vm__btn--lg">
                Get Started with Veerexa
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
            <div className="vm__banner-right">
              <div className="vm__qr-card">
                <div className="vm__qr-label">SCAN TO VIEW<br/>OUR MENU</div>
                <div className="vm__qr-code">
                  {/* SVG QR pattern */}
                  <svg viewBox="0 0 100 100" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
                    {/* Top-left finder */}
                    <rect x="5" y="5" width="30" height="30" fill="none" stroke="#000" strokeWidth="4"/>
                    <rect x="12" y="12" width="16" height="16" fill="#000"/>
                    {/* Top-right finder */}
                    <rect x="65" y="5" width="30" height="30" fill="none" stroke="#000" strokeWidth="4"/>
                    <rect x="72" y="12" width="16" height="16" fill="#000"/>
                    {/* Bottom-left finder */}
                    <rect x="5" y="65" width="30" height="30" fill="none" stroke="#000" strokeWidth="4"/>
                    <rect x="12" y="72" width="16" height="16" fill="#000"/>
                    {/* Data modules */}
                    <rect x="40" y="5" width="6" height="6" fill="#000"/>
                    <rect x="50" y="5" width="6" height="6" fill="#000"/>
                    <rect x="40" y="15" width="6" height="6" fill="#000"/>
                    <rect x="40" y="25" width="6" height="6" fill="#000"/>
                    <rect x="50" y="25" width="6" height="6" fill="#000"/>
                    <rect x="60" y="15" width="6" height="6" fill="#000"/>
                    <rect x="5" y="40" width="6" height="6" fill="#000"/>
                    <rect x="15" y="40" width="6" height="6" fill="#000"/>
                    <rect x="25" y="50" width="6" height="6" fill="#000"/>
                    <rect x="40" y="40" width="6" height="6" fill="#000"/>
                    <rect x="50" y="40" width="6" height="6" fill="#000"/>
                    <rect x="60" y="40" width="6" height="6" fill="#000"/>
                    <rect x="70" y="40" width="6" height="6" fill="#000"/>
                    <rect x="80" y="40" width="6" height="6" fill="#000"/>
                    <rect x="90" y="40" width="6" height="6" fill="#000"/>
                    <rect x="40" y="50" width="6" height="6" fill="#000"/>
                    <rect x="60" y="50" width="6" height="6" fill="#000"/>
                    <rect x="80" y="50" width="6" height="6" fill="#000"/>
                    <rect x="40" y="60" width="6" height="6" fill="#000"/>
                    <rect x="50" y="60" width="6" height="6" fill="#000"/>
                    <rect x="70" y="60" width="6" height="6" fill="#000"/>
                    <rect x="90" y="60" width="6" height="6" fill="#000"/>
                    <rect x="40" y="70" width="6" height="6" fill="#000"/>
                    <rect x="60" y="70" width="6" height="6" fill="#000"/>
                    <rect x="80" y="70" width="6" height="6" fill="#000"/>
                    <rect x="40" y="80" width="6" height="6" fill="#000"/>
                    <rect x="50" y="80" width="6" height="6" fill="#000"/>
                    <rect x="60" y="80" width="6" height="6" fill="#000"/>
                    <rect x="80" y="80" width="6" height="6" fill="#000"/>
                    <rect x="90" y="80" width="6" height="6" fill="#000"/>
                    <rect x="40" y="90" width="6" height="6" fill="#000"/>
                    <rect x="70" y="90" width="6" height="6" fill="#000"/>
                    <rect x="90" y="90" width="6" height="6" fill="#000"/>
                  </svg>
                </div>
                <div className="vm__qr-brand">
                  <span>🍽️</span> Veerexa Menu
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer Cards ── */}
      <section id="about" className="vm__about-section">
        <div className="vm__container vm__about-grid">
          {/* Built by Veerexa */}
          <div className="vm__about-card">
            <div className="vm__about-icon-wrap">
              <svg width="52" height="52" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" fill="none" stroke="#f97316" strokeWidth="3"/>
                <text x="50" y="65" textAnchor="middle" fontSize="38" fill="#f97316">🏛️</text>
              </svg>
            </div>
            <div>
              <h3 className="vm__about-title">Built by <span>Veerexa</span></h3>
              <p className="vm__about-desc">We build simple, reliable digital products that help local businesses grow online.</p>
            </div>
          </div>

          {/* Contact */}
          <div className="vm__about-card vm__about-card--contact">
            <div className="vm__about-contact-left">
              <h3 className="vm__about-title">Let's build your<br/>restaurant menu</h3>
              <div className="vm__about-contacts">
                <div className="vm__contact-row">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  veerexa.com
                </div>
                <div className="vm__contact-row">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  hello@veerexa.com
                </div>
                <div className="vm__contact-row">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Indore, Madhya Pradesh
                </div>
              </div>
            </div>
            <div className="vm__about-food-img">
              <img src="/images/fat-tiger.jpg" alt="restaurant ambiance" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="vm__footer">
        <div className="vm__container vm__footer-inner">
          <Link to="/" className="vm__footer-logo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--vm-orange)'}}>
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
              <path d="M12 8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"/>
            </svg>
            Veerexa<span>Menu</span>
          </Link>
          <div className="vm__footer-copy">© 2026 Veerexa. All rights reserved.</div>
          <div className="vm__footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
