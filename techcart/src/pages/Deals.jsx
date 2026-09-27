import { useMemo } from 'react'
import { useProducts } from '../context/ProductsContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { discountPercent } from '../utils/format'

export default function Deals() {
  const { products } = useProducts()
  const deals = useMemo(
    () => products.filter((p) => discountPercent(p.price, p.originalPrice) >= 10)
      .sort((a, b) => discountPercent(b.price, b.originalPrice) - discountPercent(a.price, a.originalPrice)),
    [products]
  )

  return (
    <div className="container section">
      <div className="section-head">
        <h1>Today's Deals</h1>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{deals.length} deals live now</span>
      </div>
      {deals.length === 0 ? (
        <div className="empty-state card"><h3>No active deals right now</h3><p>Check back soon for new offers.</p></div>
      ) : (
        <div className="grid-products">
          {deals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
