import { Link, useParams } from 'react-router-dom'
import { useOrders } from '../context/OrdersContext.jsx'
import { formatINR } from '../utils/format'

export default function OrderConfirmation() {
  const { id } = useParams()
  const { getOrderById } = useOrders()
  const order = getOrderById(id)

  if (!order) {
    return (
      <div className="container empty-state">
        <h3>Order not found</h3>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    )
  }

  return (
    <div className="container section" style={{ maxWidth: 640 }}>
      <div className="card" style={{ padding: 40, textAlign: 'center' }}>
        <div style={{ fontSize: '2.6rem', color: 'var(--success)', marginBottom: 10 }}>✓</div>
        <h1 style={{ fontSize: '1.5rem' }}>Order placed successfully!</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Thank you for shopping with TechCart. A confirmation has been recorded for your order.</p>

        <div style={{ background: 'var(--bg)', borderRadius: 10, padding: 20, margin: '28px 0', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}><span>Order ID</span><strong>{order.id}</strong></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}><span>Total paid</span><strong>{formatINR(order.total)}</strong></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}><span>Payment method</span><strong>{order.paymentMethod}</strong></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Estimated delivery</span><strong>{order.estimatedDelivery}</strong></div>
        </div>

        <div style={{ textAlign: 'left', marginBottom: 24 }}>
          <h4 style={{ fontSize: '0.9rem', marginBottom: 8 }}>Delivering to</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            {order.address.fullName}, {order.address.house}, {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pin}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link to={`/orders/${order.id}`} className="btn btn-secondary">Track Order</Link>
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}
