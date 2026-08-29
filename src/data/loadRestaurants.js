// Har .json file jo is folder me daali jaayegi, wo apne aap load ho jaayegi.
// File ka naam hi URL slug banega -> src/data/restaurants/spice-garden.json => /menu/spice-garden

const modules = import.meta.glob('./restaurants/*.json', { eager: true })

const restaurants = {}

Object.entries(modules).forEach(([path, mod]) => {
  const slug = path.split('/').pop().replace('.json', '')
  restaurants[slug] = mod.default || mod
})

export default restaurants

export const restaurantList = Object.entries(restaurants).map(([slug, data]) => ({
  slug,
  ...data,
}))
