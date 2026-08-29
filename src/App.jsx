import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import MenuPage from './pages/MenuPage.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* URL ab directly slug par chalega: /spice-garden */}
      <Route path="/:slug" element={<MenuPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
