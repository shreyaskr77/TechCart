import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './ProductDetails.module.css'
import { findProductById, getRelated } from '../data/products'
import { getReviews } from '../data/reviews'
import { categories } from '../data/categories'
import { useProducts } from '../context/ProductsContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { useCompare } from '../context/CompareContext.jsx'
import Rating from '../components/Rating.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { formatINR, discountPercent, estimatedDelivery } from '../utils/format'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products } = useProducts()
  const product = findProductById(products, id)
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { isComparing, toggleCompare } = useCompare()

  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('specs')

  const related = useMemo(() => (product ? getRelated(products, product, 4) : []), [product, products])
  const reviews = product ? getReviews(product.id) : []
  const category = product ? categories.find((c) => c.id === product.category) : null

  if (!product) {
    return (
      <div className="container empty-state">
        <h3>Product not found</h3>
        <p>This product may have been removed or is no longer available.</p>
        <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
      </div>
    )
  }

  const discount = discountPercent(product.price, product.originalPrice)

  const handleBuyNow = () => {
    addToCart(product.id, qty)
    navigate('/checkout')
  }

  return (
    <div className="container">
      <div className="breadcrumb" style={{ paddingTop: 20 }}>
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link>
        {category && <> / <Link to={`/shop/${category.id}`}>{category.name}</Link></>} / {product.name}
      </div>

      <div className={styles.layout}>
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <img src={product.images[activeImage]} alt={product.name} />
          </div>
          {product.images.length > 1 && (
            <div className={styles.thumbRow}>
              {product.images.map((img, i) => (
                <button
                  key={img}
                  className={`${styles.thumb} ${i === activeImage ? styles.active : ''}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.info}>
          <span className={styles.brandLine}>{product.brand} · {category?.name}</span>
          <h1>{product.name}</h1>
          <Rating value={product.rating} reviews={product.reviews} />

          <div className={styles.priceBlock}>
            <span className={styles.price}>{formatINR(product.price)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className={styles.original}>{formatINR(product.originalPrice)}</span>
                <span className={styles.discount}>{discount}% off</span>
              </>
            )}
          </div>

          <div className={styles.metaRow}>
            <span>{product.stock > 0 ? `✓ In stock (${product.stock} available)` : '✕ Out of stock'}</span>
            <span>Estimated delivery: {estimatedDelivery(product.stock > 0 ? 4 : 10)}</span>
          </div>

          <div className={styles.qtyRow}>
            <div className={styles.qtyControl}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} aria-label="Increase quantity" disabled={qty >= product.stock}>+</button>
            </div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Max {product.stock} per order</span>
          </div>

          <div className={styles.actionRow}>
            <button className="btn btn-primary" disabled={product.stock === 0} onClick={() => addToCart(product.id, qty)}>
              Add to Cart
            </button>
            <button className="btn btn-dark" disabled={product.stock === 0} onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
          <div className={styles.secondaryActions}>
            <button className="btn btn-secondary btn-sm" onClick={() => toggleWishlist(product.id)}>
              {isWishlisted(product.id) ? '♥ Wishlisted' : '♡ Add to Wishlist'}
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => toggleCompare(product.id)}>
              {isComparing(product.id) ? '✓ In Compare' : '⇄ Add to Compare'}
            </button>
          </div>

          <div className={styles.tabs}>
            <button className={`${styles.tabBtn} ${tab === 'specs' ? styles.active : ''}`} onClick={() => setTab('specs')}>Specifications</button>
            <button className={`${styles.tabBtn} ${tab === 'desc' ? styles.active : ''}`} onClick={() => setTab('desc')}>Description &amp; Features</button>
            <button className={`${styles.tabBtn} ${tab === 'reviews' ? styles.active : ''}`} onClick={() => setTab('reviews')}>Reviews ({product.reviews})</button>
          </div>

          {tab === 'specs' && (
            <table className={styles.specTable}>
              <tbody>
                {Object.entries(product.specs).map(([k, v]) => (
                  <tr key={k}><td>{k}</td><td>{v}</td></tr>
                ))}
                <tr><td>Warranty</td><td>1 year manufacturer warranty</td></tr>
              </tbody>
            </table>
          )}

          {tab === 'desc' && (
            <div>
              <p style={{ marginBottom: 16, color: 'var(--text)' }}>{product.description}</p>
              <h4 style={{ fontSize: '0.9rem', marginBottom: 10 }}>Key Features</h4>
              <ul className={styles.featureList}>
                {product.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>
          )}

          {tab === 'reviews' && (
            <div>
              {reviews.map((r, i) => (
                <div key={i} className={styles.reviewItem}>
                  <div className={styles.reviewHead}>
                    <strong>{r.user}</strong>
                    <span>{new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <Rating value={r.rating} size="sm" />
                  <p style={{ marginTop: 8, fontSize: '0.9rem' }}>{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="section">
          <div className="section-head"><h2>Related Products</h2></div>
          <div className="grid-products">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}
