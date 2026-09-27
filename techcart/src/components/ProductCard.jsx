import { Link } from 'react-router-dom'
import styles from './ProductCard.module.css'
import Rating from './Rating.jsx'
import { formatINR, discountPercent } from '../utils/format'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { useCompare } from '../context/CompareContext.jsx'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { isComparing, toggleCompare } = useCompare()
  const discount = discountPercent(product.price, product.originalPrice)
  const stockLabel =
    product.stock === 0 ? { text: 'Out of stock', cls: 'out' } :
    product.stock <= 5 ? { text: `Only ${product.stock} left`, cls: 'low' } :
    { text: 'In stock', cls: 'in' }

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageWrap}>
        {discount > 0 && <span className={styles.discountBadge}>{discount}% OFF</span>}
        <img src={product.images[0]} alt={product.name} loading="lazy" />
      </Link>
      <button
        className={`${styles.wishBtn} ${isWishlisted(product.id) ? styles.active : ''}`}
        onClick={() => toggleWishlist(product.id)}
        aria-label="Toggle wishlist"
      >
        {isWishlisted(product.id) ? '♥' : '♡'}
      </button>

      <div className={styles.body}>
        <span className={styles.brand}>{product.brand}</span>
        <Link to={`/product/${product.id}`} className={styles.name}>{product.name}</Link>
        <Rating value={product.rating} reviews={product.reviews} size="sm" />
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatINR(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className={styles.originalPrice}>{formatINR(product.originalPrice)}</span>
          )}
        </div>
        <span className={`${styles.stock} ${styles[stockLabel.cls]}`}>{stockLabel.text}</span>

        <div className={styles.actions}>
          <button
            className="btn btn-primary btn-sm"
            disabled={product.stock === 0}
            onClick={() => addToCart(product.id, 1)}
          >
            Add to Cart
          </button>
        </div>
        <label className={styles.compareLabel}>
          <input type="checkbox" checked={isComparing(product.id)} onChange={() => toggleCompare(product.id)} />
          Add to compare
        </label>
      </div>
    </div>
  )
}
