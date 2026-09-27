import { Link } from 'react-router-dom'
import styles from './Compare.module.css'
import { useCompare } from '../context/CompareContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatINR } from '../utils/format'
import Rating from '../components/Rating.jsx'

export default function Compare() {
  const { products, removeFromCompare, clearCompare, MAX_COMPARE } = useCompare()
  const { addToCart } = useCart()

  if (products.length === 0) {
    return (
      <div className="container empty-state">
        <h3>Nothing to compare yet</h3>
        <p>Select up to {MAX_COMPARE} products from the shop to compare specs, prices, and ratings side by side.</p>
        <Link to="/shop" className="btn btn-primary">Browse Products</Link>
      </div>
    )
  }

  const allSpecKeys = [...new Set(products.flatMap((p) => Object.keys(p.specs)))]

  const isDifferent = (key) => {
    const values = products.map((p) => p.specs[key] ?? '—')
    return new Set(values).size > 1
  }

  return (
    <div className="container section">
      <div className="section-head">
        <h1>Compare Products</h1>
        <button className="btn btn-secondary btn-sm" onClick={clearCompare}>Clear all</button>
      </div>

      <div className={`card ${styles.wrap}`}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>Product</th>
              {products.map((p) => (
                <td key={p.id} className={styles.productCol}>
                  <img src={p.images[0]} alt={p.name} className={styles.productImg} />
                  <Link to={`/product/${p.id}`} style={{ fontWeight: 600, color: 'var(--navy)' }}>{p.name}</Link>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.brand}</div>
                  <button className={styles.removeBtn} onClick={() => removeFromCompare(p.id)}>Remove</button>
                </td>
              ))}
            </tr>
            <tr>
              <th>Price</th>
              {products.map((p) => <td key={p.id} style={{ fontWeight: 700 }}>{formatINR(p.price)}</td>)}
            </tr>
            <tr>
              <th>Rating</th>
              {products.map((p) => <td key={p.id}><Rating value={p.rating} reviews={p.reviews} size="sm" /></td>)}
            </tr>
            <tr>
              <th>Availability</th>
              {products.map((p) => (
                <td key={p.id}>
                  <span className={`badge ${p.stock > 0 ? 'badge-green' : 'badge-red'}`}>
                    {p.stock > 0 ? `In stock (${p.stock})` : 'Out of stock'}
                  </span>
                </td>
              ))}
            </tr>
            {allSpecKeys.map((key) => (
              <tr key={key}>
                <th>{key}</th>
                {products.map((p) => (
                  <td key={p.id} className={isDifferent(key) ? styles.diffCell : ''}>{p.specs[key] ?? '—'}</td>
                ))}
              </tr>
            ))}
            <tr>
              <th>Action</th>
              {products.map((p) => (
                <td key={p.id}>
                  <button className="btn btn-primary btn-sm" disabled={p.stock === 0} onClick={() => addToCart(p.id, 1)}>
                    Add to Cart
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 10 }}>Highlighted rows show specifications that differ between the selected products.</p>
    </div>
  )
}
