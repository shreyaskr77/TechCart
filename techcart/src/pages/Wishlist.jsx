import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatINR } from '../utils/format'
import Rating from '../components/Rating.jsx'

export default function Wishlist() {
  const { products, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (products.length === 0) {
    return (
      <div className="container empty-state">
        <h3>Your wishlist is empty</h3>
        <p>Save products you love here so you don't lose track of them.</p>
        <Link to="/shop" className="btn btn-primary">Browse Products</Link>
      </div>
    )
  }

  return (
    <div className="container section">
      <div className="section-head"><h1>My Wishlist</h1><span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{products.length} items</span></div>
      <div className="grid-products">
        {products.map((product) => (
          <div key={product.id} className="card" style={{ padding: 14 }}>
            <Link to={`/product/${product.id}`}>
              <img src={product.images[0]} alt={product.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 8, marginBottom: 10 }} />
            </Link>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{product.brand}</span>
            <Link to={`/product/${product.id}`} style={{ display: 'block', fontWeight: 600, color: 'var(--navy)', margin: '4px 0' }}>{product.name}</Link>
            <Rating value={product.rating} reviews={product.reviews} size="sm" />
            <div style={{ fontWeight: 700, color: 'var(--navy)', margin: '8px 0' }}>{formatINR(product.price)}</div>
            <span className={`badge ${product.stock > 0 ? 'badge-green' : 'badge-red'}`}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
                disabled={product.stock === 0}
                onClick={() => { addToCart(product.id, 1); removeFromWishlist(product.id) }}
              >
                Move to Cart
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => removeFromWishlist(product.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
