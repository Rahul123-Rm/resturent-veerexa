import DietDot from './DietDot.jsx'
import StampBadge from './StampBadge.jsx'

export default function MenuItem({ item, currency }) {
  return (
    <li className="menu-item" id={`item-${item.name?.toLowerCase().replace(/\s+/g, '-')}`}>
      {/* Content */}
      <div className="menu-item__content">
        {/* Top row: veg dot + badge */}
        <div className="menu-item__top">
          <DietDot veg={item.veg} />
          <div className="menu-item__badges">
            {item.tag && <StampBadge label={item.tag} />}
            {item.spicy > 0 && (
              <span className="menu-item__spicy" aria-label={`Spice level ${item.spicy}`}>
                {'🌶'.repeat(item.spicy)}
              </span>
            )}
          </div>
        </div>

        {/* Name */}
        <div className="menu-item__name">{item.name}</div>

        {/* Price */}
        <div style={{ margin: '6px 0 8px' }}>
          {item.price !== undefined ? (
            <span className="menu-item__price">
              {currency}{item.price}
              {item.serving && (
                <span className="price-half" style={{ marginLeft: '6px' }}>
                  ({item.serving})
                </span>
              )}
            </span>
          ) : item.regular !== undefined ? (
            <span className="menu-item__price menu-item__price--split">
              <span className="price-full">R {currency}{item.regular}</span>
              <span className="price-sep">·</span>
              <span className="price-full">M {currency}{item.medium}</span>
              <span className="price-sep">·</span>
              <span className="price-full">L {currency}{item.large}</span>
            </span>
          ) : (
            <span className="menu-item__price menu-item__price--split">
              <span className="price-full">Full {currency}{item.full}</span>
              <span className="price-sep">·</span>
              <span className="price-half">Half {currency}{item.half}</span>
            </span>
          )}
        </div>

        {/* Description */}
        {item.description && (
          <p className="menu-item__desc">{item.description}</p>
        )}
      </div>

      {/* Image block */}
      <div className="menu-item__img-wrap">
        {item.image ? (
          <img src={item.image} alt={item.name} className="menu-item__img" />
        ) : (
          <div className="menu-item__img-placeholder">
            {item.veg ? '🥗' : '🍖'}
          </div>
        )}
      </div>
    </li>
  )
}
