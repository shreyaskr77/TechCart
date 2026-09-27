import { Link } from 'react-router-dom'
import styles from './Orders.module.css'
import { useAuth } from '../context/AuthContext.jsx'
import { useOrders } from '../context/OrdersContext.jsx'
import { formatINR } from '../utils/format'

const statusBadge = (status) => {
  if (status === 'Delivered') return 'badge-green'
  if (status === 'Cancelled') return 'badge-red'
  return 'badge-blue'
}

export default function Orders() {
  const { currentUser } = useAuth()
  const { getOrdersForUser, cancelOrder, ORDER_STATUSES } = useOrders()
  const orders = getOrdersForUser(currentUser.email)

  if (orders.length === 0) {
    return (
      <div className="container empty-state">
        <h3>No orders yet</h3>
        <p>Your order history and tracking will show up here.</p>
        <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
      </div>
    )
  }

  return (
    <div className="container section">
      <h1 style={{ marginBottom: 20 }}>My Orders</h1>
      {orders.map((order) => {
        const stepIndex = ORDER_STATUSES.indexOf(order.status)
        const isCancelled = order.status === 'Cancelled'
        return (
          <div key={order.id} className={`card ${styles.orderCard}`}>
            <div className={styles.orderHead}>
              <div>
                <strong>Order {order.id}</strong>
                <div className={styles.orderMeta}>Placed on {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · {formatINR(order.total)}</div>
              </div>
              <span className={`badge ${isCancelled ? 'badge-red' : statusBadge(order.status)}`}>{order.status}</span>
            </div>

            {order.items.map((item) => (
              <div key={item.productId} className={styles.itemRow}>
                <img src={item.image} alt={item.name} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                  <div className={styles.orderMeta}>Qty {item.qty} · {formatINR(item.price)} each</div>
                </div>
              </div>
            ))}

            {!isCancelled && (
              <div className={styles.trackRow}>
                {ORDER_STATUSES.map((s, i) => (
                  <div key={s} className={`${styles.trackStep} ${i <= stepIndex ? styles.done : ''}`}>
                    <div className="dot" />
                    <div className="label">{s}</div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <Link to={`/orders/${order.id}`} className="btn btn-secondary btn-sm">View Details</Link>
              {['Order Placed', 'Confirmed'].includes(order.status) && (
                <button className="btn btn-danger btn-sm" onClick={() => cancelOrder(order.id)}>Cancel Order</button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
