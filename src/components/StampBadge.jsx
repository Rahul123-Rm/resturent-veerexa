export default function StampBadge({ label }) {
  if (!label) return null
  return <span className="stamp">{label}</span>
}
