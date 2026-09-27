export default function Rating({ value, reviews, size = 'md' }) {
  const rounded = Math.round(value * 2) / 2
  const fontSize = size === 'sm' ? '0.75rem' : '0.85rem'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize }}>
      <span style={{ color: '#f59e0b', letterSpacing: '1px' }}>
        {'★'.repeat(Math.floor(rounded))}
        {rounded % 1 !== 0 ? '⯨' : ''}
        {'☆'.repeat(5 - Math.ceil(rounded))}
      </span>
      <span style={{ color: 'var(--text-muted)' }}>
        {value.toFixed(1)}{reviews !== undefined ? ` (${reviews.toLocaleString('en-IN')})` : ''}
      </span>
    </span>
  )
}
