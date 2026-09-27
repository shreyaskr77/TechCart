import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import { categories } from '../data/categories'
import { useProducts } from '../context/ProductsContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { discountPercent } from '../utils/format'

export default function Home() {
  const { products } = useProducts()

  const featured = products.slice(0, 8)
  const trending = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 8)
  const renderCategoryCards = (duplicate = false) => categories.map((category) => (
    <Link
      key={`${duplicate ? 'duplicate-' : ''}${category.id}`}
      to={`/shop/${category.id}`}
      className={`card ${styles.categoryCard}`}
      tabIndex={duplicate ? -1 : undefined}
    >
      <div className={styles.categoryImage}>
        <img src={category.image} alt={duplicate ? '' : category.name} loading="lazy" />
      </div>
      <span className={styles.categoryName}>{category.name}</span>
    </Link>
  ))

  return (
    <div>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div>
            <span className={styles.kicker}>Fresh tech for everyday life</span>
            <h1>Upgrade Your Tech. Elevate Your Life.</h1>
            <p>Discover the latest laptops, smartphones, and gadgets at prices you'll love.</p>
            <div className={styles.heroActions}>
              <Link to="/shop" className="btn btn-primary">Shop Now</Link>
              <Link to="/deals" className="btn btn-secondary">Explore Deals</Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=900&q=80" alt="Latest laptop and smartphone lineup" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Shop by Category</h2>
          </div>
          <div className={styles.categoryGrid}>
            <div className={styles.categoryTrack}>
              <div className={styles.categorySet}>{renderCategoryCards()}</div>
              <div className={styles.categorySet} aria-hidden="true">{renderCategoryCards(true)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-head">
            <h2>Special Offers</h2>
          </div>
          <div className={styles.offersGrid}>
            <div className={styles.offerCard} style={{ background: 'linear-gradient(135deg,#eff6ff,#dbeafe)' }}>
              <h3 style={{ color: '#0f172a' }}>Up to 40% off Laptops</h3>
              <p style={{ color: '#334155' }}>Limited-time deals on ASUS, Dell, Lenovo &amp; more</p>
            </div>
            <div className={styles.offerCard} style={{ background: 'linear-gradient(135deg,#f8fafc,#e2e8f0)' }}>
              <h3 style={{ color: '#0f172a' }}>Flagship phones from ₹59,999</h3>
              <p style={{ color: '#334155' }}>Trade-in offers available on select models</p>
            </div>
            <div className={styles.offerCard} style={{ background: 'linear-gradient(135deg,#ecfeff,#d1fae5)' }}>
              <h3 style={{ color: '#0f172a' }}>Buy 1 Get 20% off Accessories</h3>
              <p style={{ color: '#334155' }}>Chargers, power banks, cases &amp; more</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Featured Products</h2>
            <Link to="/shop" className="view-all">View all →</Link>
          </div>
          <div className="grid-products">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Trending Products</h2>
            <Link to="/shop" className="view-all">View all →</Link>
          </div>
          <div className="grid-products">
            {trending.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-head"><h2>Why Shop With TechCart?</h2></div>
          <div className={styles.whyGrid}>
            {[
              ['✓', 'Genuine Products', '100% authentic, brand-warranted'],
              ['🔒', 'Secure Checkout', 'Encrypted payments, every time'],
              ['🚚', 'Fast Delivery', 'Next-day delivery in major cities'],
              ['↺', 'Easy Returns', '7-day hassle-free returns'],
              ['💬', 'Customer Support', '24/7 chat & phone support'],
            ].map(([icon, title, desc]) => (
              <div key={title} className={styles.whyItem}>
                <div className={styles.whyIcon}>{icon}</div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
