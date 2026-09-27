import { useMemo, useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import styles from './Shop.module.css'
import { categories } from '../data/categories'
import { useProducts } from '../context/ProductsContext.jsx'
import ProductCard from '../components/ProductCard.jsx'

const emptyFilters = { brands: [], minPrice: '', maxPrice: '', minRating: 0, inStockOnly: false, discountOnly: false }

export default function Shop() {
  const { categoryId } = useParams()
  const [searchParams] = useSearchParams()
  const queryFromUrl = searchParams.get('q') || ''
  const { products } = useProducts()

  const [search, setSearch] = useState(queryFromUrl)
  const [filters, setFilters] = useState(emptyFilters)
  const [sort, setSort] = useState('popularity')

  useEffect(() => { setSearch(queryFromUrl) }, [queryFromUrl])
  useEffect(() => { setFilters(emptyFilters) }, [categoryId])

  const categoryProducts = useMemo(
    () => (categoryId ? products.filter((p) => p.category === categoryId) : products),
    [products, categoryId]
  )

  const brandsAvailable = useMemo(
    () => [...new Set(categoryProducts.map((p) => p.brand))].sort(),
    [categoryProducts]
  )

  const filtered = useMemo(() => {
    let list = categoryProducts

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.includes(q)
      )
    }
    if (filters.brands.length) list = list.filter((p) => filters.brands.includes(p.brand))
    if (filters.minPrice !== '') list = list.filter((p) => p.price >= Number(filters.minPrice))
    if (filters.maxPrice !== '') list = list.filter((p) => p.price <= Number(filters.maxPrice))
    if (filters.minRating > 0) list = list.filter((p) => p.rating >= filters.minRating)
    if (filters.inStockOnly) list = list.filter((p) => p.stock > 0)
    if (filters.discountOnly) list = list.filter((p) => p.originalPrice > p.price)

    const sorted = [...list]
    switch (sort) {
      case 'price-asc': sorted.sort((a, b) => a.price - b.price); break
      case 'price-desc': sorted.sort((a, b) => b.price - a.price); break
      case 'rating': sorted.sort((a, b) => b.rating - a.rating); break
      case 'newest': sorted.sort((a, b) => (a.id < b.id ? 1 : -1)); break
      case 'discount': sorted.sort((a, b) => (b.originalPrice - b.price) / b.originalPrice - (a.originalPrice - a.price) / a.originalPrice); break
      default: sorted.sort((a, b) => b.reviews - a.reviews)
    }
    return sorted
  }, [categoryProducts, search, filters, sort])

  const toggleBrand = (brand) => {
    setFilters((f) => ({
      ...f,
      brands: f.brands.includes(brand) ? f.brands.filter((b) => b !== brand) : [...f.brands, brand],
    }))
  }

  const currentCategory = categories.find((c) => c.id === categoryId)
  const hasActiveFilters =
    filters.brands.length || filters.minPrice || filters.maxPrice || filters.minRating || filters.inStockOnly || filters.discountOnly

  return (
    <div className="container">
      <div className="breadcrumb" style={{ paddingTop: 20 }}>
        <a href="/">Home</a> / <a href="/shop">Shop</a>{currentCategory ? ` / ${currentCategory.name}` : ''}
      </div>
      <h1 style={{ fontSize: '1.7rem', marginBottom: 4 }}>{currentCategory ? currentCategory.name : 'All Products'}</h1>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.topBar} style={{ marginBottom: 6 }}>
            <h4 style={{ margin: 0 }}>Filters</h4>
            {hasActiveFilters && (
              <button className={styles.clearBtn} onClick={() => setFilters(emptyFilters)}>Clear all</button>
            )}
          </div>

          <div className={styles.filterGroup}>
            <h4>Brand</h4>
            {brandsAvailable.map((brand) => (
              <label key={brand}>
                <input type="checkbox" checked={filters.brands.includes(brand)} onChange={() => toggleBrand(brand)} />
                {brand}
              </label>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <h4>Price range (₹)</h4>
            <div className={styles.priceRow}>
              <input
                type="number" placeholder="Min" value={filters.minPrice}
                onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value }))}
              />
              <span>–</span>
              <input
                type="number" placeholder="Max" value={filters.maxPrice}
                onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))}
              />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h4>Customer rating</h4>
            {[4, 3, 2].map((r) => (
              <label key={r}>
                <input
                  type="radio" name="rating" checked={filters.minRating === r}
                  onChange={() => setFilters((f) => ({ ...f, minRating: f.minRating === r ? 0 : r }))}
                />
                {r}★ &amp; above
              </label>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <h4>Availability &amp; Offers</h4>
            <label>
              <input type="checkbox" checked={filters.inStockOnly} onChange={(e) => setFilters((f) => ({ ...f, inStockOnly: e.target.checked }))} />
              In stock only
            </label>
            <label>
              <input type="checkbox" checked={filters.discountOnly} onChange={(e) => setFilters((f) => ({ ...f, discountOnly: e.target.checked }))} />
              On discount
            </label>
          </div>
        </aside>

        <div>
          <div className={styles.topBar}>
            <span className={styles.count}>{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</span>
            <select className={styles.sortSelect} value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="popularity">Popularity</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state card">
              <h3>No products match your search</h3>
              <p>Try adjusting your filters or searching for something else.</p>
              <button className="btn btn-primary" onClick={() => { setFilters(emptyFilters); setSearch('') }}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid-products">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
