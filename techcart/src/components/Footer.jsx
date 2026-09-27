import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import { useToast } from '../context/ToastContext.jsx'
import { useState } from 'react'

export default function Footer() {
  const { showToast } = useToast()
  const [email, setEmail] = useState('')

  const subscribe = (e) => {
    e.preventDefault()
    if (!email.includes('@')) {
      showToast('Please enter a valid email address', 'error')
      return
    }
    showToast('Subscribed! Watch your inbox for exclusive deals.')
    setEmail('')
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.newsletter}>
        <div className={`container ${styles.newsletterInner}`}>
          <div>
            <h3>Never miss a deal</h3>
            <p>Subscribe for early access to sales, new launches, and exclusive coupons.</p>
          </div>
          <form className={styles.newsletterForm} onSubmit={subscribe}>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn-dark" type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <div className={styles.logo}>Tech<span>Cart</span></div>
            <p>Your one-stop shop for laptops, smartphones, headphones, and everything electronic — genuine products, secure checkout, fast delivery.</p>
            <div className={styles.social}>
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">◎</a>
              <a href="#" aria-label="Twitter">𝕏</a>
              <a href="#" aria-label="YouTube">▶</a>
            </div>
          </div>
          <div>
            <h4>Customer Support</h4>
            <ul>
              <li><Link to="/">Help Centre</Link></li>
              <li><Link to="/">Shipping Info</Link></li>
              <li><Link to="/orders">Track Order</Link></li>
              <li><Link to="/">Returns &amp; Refunds</Link></li>
              <li><Link to="/">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Policies</h4>
            <ul>
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Terms of Service</Link></li>
              <li><Link to="/">Warranty Policy</Link></li>
              <li><Link to="/">Cancellation Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><Link to="/shop/laptops">Laptops</Link></li>
              <li><Link to="/shop/smartphones">Smartphones</Link></li>
              <li><Link to="/deals">Today's Deals</Link></li>
              <li><Link to="/compare">Compare Products</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <span>© 2026 TechCart. All rights reserved.</span>
          <span>Contact: support@techcart.in · 1800-123-4567</span>
        </div>
      </div>
    </footer>
  )
}
