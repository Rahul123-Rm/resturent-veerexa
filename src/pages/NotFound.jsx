import { Link } from 'react-router-dom'

export default function NotFound({ reason, slug }) {
  return (
    <div className="not-found" id="not-found-page">
      <div className="not-found__emoji">
        {reason === 'menu' ? '🍽️' : '😕'}
      </div>
      <p className="not-found__code">
        {reason === 'menu' ? 'Menu Not Found' : '404 Error'}
      </p>
      <h1 className="not-found__title">
        {reason === 'menu'
          ? `"${slug}" ka menu nahi mila`
          : 'Page nahi mila bhai!'}
      </h1>
      <p className="not-found__desc">
        {reason === 'menu'
          ? 'Yeh restaurant abhi available nahi hai ya galat link hai. Wapas home pe jao aur try karo.'
          : 'Yeh page exist nahi karta. Home pe wapas jao.'}
      </p>
      <Link to="/" className="not-found__btn" id="not-found-home-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Wapas Home Jao
      </Link>
    </div>
  )
}
