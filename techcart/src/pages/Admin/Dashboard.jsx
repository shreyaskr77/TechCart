import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import styles from './Admin.module.css'
import { useProducts } from '../../context/ProductsContext.jsx'
import { useOrders } from '../../context/OrdersContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { formatINR } from '../../utils/format'

export default function Dashboard() {
  const { products } = useProducts()
  const { orders } = useOrders()
  const { users } = useAuth()

  const stats = useMemo(() => {
    const totalRevenue = orders.filter((o) => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0)
    const customers = users.filter((u) => u.role === 'customer')
    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalCustomers: customers.length,
      totalRevenue,
    }
  }, [products, orders, users])

  const recentOrders = [...orders].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5)

  const bestSellers = useMemo(() => {
    const counts = {}
    orders.forEach((o) => o.items.forEach((i) => { counts[i.productId] = (counts[i.productId] || 0) + i.qty }))
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([productId, qty]) => ({ product: products.find((p) => p.id === productId), qty }))
      .filter((x) => x.product)
  }, [orders, products])

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', marginBottom: 20 }}>Dashboard Overview</h1>
      <div className={styles.statGrid}>
        <div className={`card ${styles.statCard}`}><div className="label">Total Products</div><div className="value">{stats.totalProducts}</div></div>
        <div className={`card ${styles.statCard}`}><div className="label">Total Orders</div><div className="value">{stats.totalOrders}</div></div>
        <div className={`card ${styles.statCard}`}><div className="label">Total Customers</div><div className="value">{stats.totalCustomers}</div></div>
        <div className={`card ${styles.statCard}`}><div className="label">Total Revenue</div><div className="value">{formatINR(stats.totalRevenue)}</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ marginBottom: 14, fontSize: '1rem' }}>Recent Orders</h3>
          <table className={styles.table}>
            <thead><tr><th>Order ID</th><th>Date</th><th>Status</th><th>Total</th></tr></thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id}>
                  <td><Link to="/admin/orders">{o.id}</Link></td>
                  <td>{o.date}</td>
                  <td><span className="badge badge-blue">{o.status}</span></td>
                  <td>{formatINR(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ marginBottom: 14, fontSize: '1rem' }}>Best-Selling Products</h3>
          {bestSellers.length === 0 ? <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No sales data yet.</p> : (
            bestSellers.map(({ product, qty }) => (
              <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <img src={product.images[0]} alt="" style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 6 }} />
                <div style={{ flex: 1, fontSize: '0.85rem' }}>{product.name}</div>
                <span className="badge badge-gray">{qty} sold</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
