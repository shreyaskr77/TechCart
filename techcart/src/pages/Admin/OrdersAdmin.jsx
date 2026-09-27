import { useState } from 'react'
import styles from './Admin.module.css'
import { useOrders } from '../../context/OrdersContext.jsx'
import { formatINR } from '../../utils/format'

export default function AdminOrders() {
  const { orders, updateOrderStatus, ORDER_STATUSES } = useOrders()
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = statusFilter === 'All' ? orders : orders.filter((o) => o.status === statusFilter)
  const sorted = [...filtered].sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <div>
      <div className="section-head" style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.5rem' }}>Order Management</h1>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1.5px solid var(--border)' }}>
          <option value="All">All statuses</option>
          {[...ORDER_STATUSES, 'Cancelled'].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="card" style={{ padding: 20, overflowX: 'auto' }}>
        <table className={styles.table}>
          <thead>
            <tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th></tr>
          </thead>
          <tbody>
            {sorted.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.userEmail}</td>
                <td>{o.date}</td>
                <td>{o.items.reduce((s, i) => s + i.qty, 0)} item(s)</td>
                <td>{formatINR(o.total)}</td>
                <td>
                  <select
                    value={o.status}
                    onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                    style={{ padding: '6px 10px', borderRadius: 6, border: '1.5px solid var(--border)', fontSize: '0.82rem' }}
                  >
                    {[...ORDER_STATUSES, 'Cancelled'].map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sorted.length === 0 && <p style={{ color: 'var(--text-muted)', padding: 20 }}>No orders match this filter.</p>}
      </div>
    </div>
  )
}
