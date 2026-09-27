import { Link, useParams } from 'react-router-dom'
import styles from './Orders.module.css'
import { useOrders } from '../context/OrdersContext.jsx'
import { formatINR } from '../utils/format'

export default function OrderDetails() {
  const { id } = useParams()
  const { getOrderById, ORDER_STATUSES } = useOrders()
  const order = getOrderById(id)

  if (!order) {
    return (
      <div className="container empty-state">
        <h3>Order not found</h3>
        <Link to="/orders" className="btn btn-primary">Back to Orders</Link>
      </div>
    )
  }

  const stepIndex = ORDER_STATUSES.indexOf(order.status)
  const isCancelled = order.status === 'Cancelled'

  return (
    <div className="container section" style={{ maxWidth: 760 }}>
      <div className="breadcrumb"><Link to="/orders">My Orders</Link> / {order.id}</div>
      <div className="section-head" style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.5rem' }}>Order {order.id}</h1>
        <span className={`badge ${isCancelled ? 'badge-red' : 'badge-blue'}`}>{order.status}</span>
      </div>

      <div className={`card ${styles.orderCard}`}>
        <h3 style={{ marginBottom: 14, fontSize: '1rem' }}>Items</h3>
        {order.items.map((item) => (
          <div key={item.productId} className={styles.itemRow}>
            <img src={item.image} alt={item.name} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
              <div className={styles.orderMeta}>Qty {item.qty} · {formatINR(item.price)} each</div>
            </div>
            <div style={{ fontWeight: 700 }}>{formatINR(item.price * item.qty)}</div>
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
      </div>

      <div className={`card ${styles.orderCard}`}>
        <h3 style={{ marginBottom: 10, fontSize: '1rem' }}>Delivery Address</h3>
        <p style={{ fontSize: '0.9rem' }}>
          {order.address.fullName} · {order.address.mobile}<br />
          {order.address.house}, {order.address.street}<br />
          {order.address.city}, {order.address.state} - {order.address.pin}
        </p>
      </div>

      <div className={`card ${styles.orderCard}`}>
        <h3 style={{ marginBottom: 10, fontSize: '1rem' }}>Payment Summary</h3>
        <div style={{ fontSize: '0.9rem', display: 'grid', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal</span><span>{formatINR(order.subtotal)}</span></div>
          {order.discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}><span>Discount</span><span>−{formatINR(order.discount)}</span></div>}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Delivery</span><span>{order.delivery === 0 ? 'FREE' : formatINR(order.delivery)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Tax</span><span>{formatINR(order.tax)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, borderTop: '1px solid var(--border)', paddingTop: 8 }}><span>Total</span><span>{formatINR(order.total)}</span></div>
          <div style={{ color: 'var(--text-muted)' }}>Payment method: {order.paymentMethod}</div>
        </div>
      </div>
    </div>
  )
}
