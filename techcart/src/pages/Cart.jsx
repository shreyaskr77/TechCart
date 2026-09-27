import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Cart.module.css'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { formatINR } from '../utils/format'

export default function Cart() {
  const {
    detailed, subtotal, discount, delivery, tax, total, coupon, applyCoupon, removeCoupon, updateQty, removeFromCart,
  } = useCart()
  const { isAuthenticated } = useAuth()
  const [couponInput, setCouponInput] = useState('')
  const navigate = useNavigate()

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    if (!couponInput.trim()) return
    if (applyCoupon(couponInput)) setCouponInput('')
  }

  const goToCheckout = () => {
    navigate(isAuthenticated ? '/checkout' : '/login', { state: isAuthenticated ? undefined : { from: { pathname: '/checkout' } } })
  }

  if (detailed.length === 0) {
    return (
      <div className="container empty-state">
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet. Let's fix that.</p>
        <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 style={{ padding: '24px 0 0', fontSize: '1.6rem' }}>Shopping Cart</h1>
      <div className={styles.layout}>
        <div className={`card ${styles.itemsCard}`}>
          {detailed.map(({ product, qty, itemSubtotal }) => (
            <div key={product.id} className={styles.item}>
              <Link to={`/product/${product.id}`}><img src={product.images[0]} alt={product.name} /></Link>
              <div>
                <span className={styles.itemBrand}>{product.brand}</span>
                <Link to={`/product/${product.id}`} className={styles.itemName} style={{ display: 'block' }}>{product.name}</Link>
                <div className={styles.itemPrice}>{formatINR(product.price)} each</div>
                <button className={styles.removeBtn} onClick={() => removeFromCart(product.id)}>Remove</button>
              </div>
              <div className={styles.qtyControl}>
                <button onClick={() => updateQty(product.id, qty - 1)}>−</button>
                <span>{qty}</span>
                <button onClick={() => updateQty(product.id, qty + 1)} disabled={qty >= product.stock}>+</button>
              </div>
              <div className={styles.itemTotal}>{formatINR(itemSubtotal)}</div>
            </div>
          ))}
        </div>

        <div className={`card ${styles.summary}`}>
          <h3>Order Summary</h3>
          <div className={styles.summaryRow}><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
          {discount > 0 && (
            <div className={styles.summaryRow} style={{ color: 'var(--success)' }}>
              <span>Discount {coupon ? `(${coupon.code})` : ''}</span><span>−{formatINR(discount)}</span>
            </div>
          )}
          <div className={styles.summaryRow}><span>Delivery</span><span>{delivery === 0 ? 'FREE' : formatINR(delivery)}</span></div>
          <div className={styles.summaryRow}><span>Tax (5%)</span><span>{formatINR(tax)}</span></div>
          <div className={`${styles.summaryRow} total`}><span>Total</span><span>{formatINR(total)}</span></div>

          {coupon ? (
            <div className={styles.couponRow}>
              <span className="badge badge-green" style={{ flex: 1, padding: '9px 12px' }}>{coupon.code} applied</span>
              <button className="btn btn-secondary btn-sm" onClick={removeCoupon}>Remove</button>
            </div>
          ) : (
            <form className={styles.couponRow} onSubmit={handleApplyCoupon}>
              <input placeholder="Coupon code" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} />
              <button className="btn btn-secondary btn-sm" type="submit">Apply</button>
            </form>
          )}

          <button className="btn btn-primary btn-block" onClick={goToCheckout} style={{ marginTop: 8 }}>
            Proceed to Checkout
          </button>
          <Link to="/shop" className="btn btn-ghost btn-block" style={{ marginTop: 8 }}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}
