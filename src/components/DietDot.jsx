export default function DietDot({ veg }) {
  return (
    <span
      className={`diet-dot ${veg ? 'diet-dot--veg' : 'diet-dot--nonveg'}`}
      title={veg ? 'Veg' : 'Non-veg'}
      aria-label={veg ? 'Vegetarian' : 'Non-vegetarian'}
    >
      <span className="diet-dot__inner" />
    </span>
  )
}
