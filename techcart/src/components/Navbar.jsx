import { useMemo, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import { categories } from '../data/categories'
import { useProducts } from '../context/ProductsContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { useCompare } from '../context/CompareContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const [searchCategory, setSearchCategory] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [sectionsOpen, setSectionsOpen] = useState(false)
  const navigate = useNavigate()
  const { products } = useProducts()
  const { itemCount } = useCart()
  const { productIds: wishIds } = useWishlist()
  const { productIds: compareIds } = useCompare()
  const { isAuthenticated, currentUser, isAdmin, logout } = useAuth()

  const suggestions = useMemo(() => {
    if (query.trim().length < 2) return []
    const q = query.trim().toLowerCase()
    return products
      .filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
      .slice(0, 6)
  }, [query, products])

  const submitSearch = (e) => {
    e.preventDefault()
    setShowSuggestions(false)
    const searchPath = searchCategory ? `/shop/${searchCategory}` : '/shop'
    navigate(`${searchPath}?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.topRow}>
        <Link to="/" className={styles.logo}>
          Tech<span>Cart</span>
        </Link>

        <form className={styles.searchWrap} onSubmit={submitSearch}>
          <select
            className={styles.searchCategory}
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            aria-label="Search category"
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true) }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
          <button className={styles.searchButton} type="submit" aria-label="Search" title="Search">
            <span className={styles.searchGlyph} aria-hidden="true" />
          </button>
          {showSuggestions && suggestions.length > 0 && (
            <div className={styles.suggestions}>
              {suggestions.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className={styles.suggestionItem}
                  onMouseDown={() => setShowSuggestions(false)}
                >
                  <img src={p.images[0]} alt="" />
                  <span>{p.brand} {p.name}</span>
                </Link>
              ))}
            </div>
          )}
        </form>

        <div className={styles.headerActions}>
          <nav className={styles.primaryLinks} aria-label="Main navigation">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
          </nav>
          <nav className={styles.quickLinks} aria-label="Account navigation">
            <Link to={isAuthenticated ? '/account' : '/login'} className={styles.accountLink}>
              {isAuthenticated ? currentUser?.name?.split(' ')[0] || 'Account' : 'Login'}
            </Link>
            <Link to="/cart" className={styles.cartLink} aria-label={`Cart${itemCount > 0 ? `, ${itemCount} items` : ''}`}>
              <strong>Cart</strong>
              {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
            </Link>
          </nav>
          <div className={styles.sectionsMenu}>
            <button
              className={styles.sectionsButton}
              type="button"
              aria-label="Open sections menu"
              aria-expanded={sectionsOpen}
              onClick={() => setSectionsOpen((open) => !open)}
            >
              <span aria-hidden="true">⋮</span>
            </button>
            {sectionsOpen && (
              <nav className={styles.sectionsPanel} aria-label="All sections">
                <Link to="/" onClick={() => setSectionsOpen(false)}>Home</Link>
                <Link to="/shop" onClick={() => setSectionsOpen(false)}>Shop</Link>
                <div className={styles.menuGroupLabel}>Categories</div>
                {categories.map((category) => (
                  <Link key={category.id} to={`/shop/${category.id}`} onClick={() => setSectionsOpen(false)}>
                    {category.name}
                  </Link>
                ))}
                <Link to="/deals" onClick={() => setSectionsOpen(false)}>Deals</Link>
                <Link to="/compare" onClick={() => setSectionsOpen(false)}>
                  Compare{compareIds.length > 0 && ` (${compareIds.length})`}
                </Link>
                <Link to="/wishlist" onClick={() => setSectionsOpen(false)}>
                  Wishlist{wishIds.length > 0 && ` (${wishIds.length})`}
                </Link>
                <Link to="/cart" onClick={() => setSectionsOpen(false)}>
                  Cart{itemCount > 0 && ` (${itemCount})`}
                </Link>
                {isAuthenticated ? (
                  <>
                    {isAdmin && <Link to="/admin" onClick={() => setSectionsOpen(false)}>Admin Dashboard</Link>}
                    <Link to="/account" onClick={() => setSectionsOpen(false)}>{currentUser?.name || 'My Account'}</Link>
                    <Link to="/orders" onClick={() => setSectionsOpen(false)}>My Orders</Link>
                    <button className={styles.logoutButton} type="button" onClick={() => { logout(); setSectionsOpen(false) }}>
                      Log out
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setSectionsOpen(false)}>Login</Link>
                )}
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
