import DietDot from './DietDot.jsx'
import StampBadge from './StampBadge.jsx'

export default function MenuItem({ item, currency }) {
  return (
    <li className="menu-item">
      <div className="menu-item__content">
        <div className="menu-item__header">
          <DietDot veg={item.veg} />
          {item.tag && <StampBadge label={item.tag} />}
        </div>
        
        <div className="menu-item__title-row">
          <span className="menu-item__name">{item.name}</span>
          {item.spicy > 0 && (
            <span className="menu-item__spicy" aria-label={`Spice level ${item.spicy}`}>
              {'🌶'.repeat(item.spicy)}
            </span>
          )}
        </div>
        
        {item.price !== undefined ? (
          <span className="menu-item__price">
            {currency}{item.price}
            {item.serving && <span className="price-half" style={{ marginLeft: '6px', fontSize: '13px' }}>({item.serving})</span>}
          </span>
        ) : item.regular !== undefined ? (
          <span className="menu-item__price menu-item__price--split">
            <span className="price-full">R {currency}{item.regular}</span>
            <span className="price-sep"> | </span>
            <span className="price-full">M {currency}{item.medium}</span>
            <span className="price-sep"> | </span>
            <span className="price-full">L {currency}{item.large}</span>
          </span>
        ) : (
          <span className="menu-item__price menu-item__price--split">
            <span className="price-full">Full {currency}{item.full}</span>
            <span className="price-sep"> | </span>
            <span className="price-half">Half {currency}{item.half}</span>
          </span>
        )}

        {item.description && <p className="menu-item__desc">{item.description}</p>}
      </div>
      
      <div className="menu-item__image-block">
        {/* Placeholder for future images */}
      </div>
    </li>
  )
}
