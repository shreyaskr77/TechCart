import styles from './Admin.module.css'
import { useAuth } from '../../context/AuthContext.jsx'
import { useOrders } from '../../context/OrdersContext.jsx'

export default function AdminCustomers() {
  const { users } = useAuth()
  const { orders } = useOrders()
  const customers = users.filter((u) => u.role === 'customer')

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', marginBottom: 20 }}>Customer Management</h1>
      <div className="card" style={{ padding: 20, overflowX: 'auto' }}>
        <table className={styles.table}>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Mobile</th><th>Orders Placed</th><th>Addresses Saved</th></tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.email}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.mobile}</td>
                <td>{orders.filter((o) => o.userEmail === c.email).length}</td>
                <td>{(c.addresses || []).length}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && <p style={{ color: 'var(--text-muted)', padding: 20 }}>No registered customers yet.</p>}
      </div>
    </div>
  )
}
