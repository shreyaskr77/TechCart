import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Checkout.module.css'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useOrders } from '../context/OrdersContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { formatINR, estimatedDelivery } from '../utils/format'

const STEP_LABELS = ['Address', 'Order Summary', 'Payment', 'Confirmation']
const emptyAddress = { fullName: '', mobile: '', house: '', street: '', city: '', state: '', pin: '' }

export default function Checkout() {
  const { detailed, subtotal, discount, delivery, tax, total, coupon, clearCart } = useCart()
  const { currentUser, addAddress } = useAuth()
  const { placeOrder } = useOrders()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const savedAddresses = currentUser.addresses || []
  const [selectedAddressIdx, setSelectedAddressIdx] = useState(savedAddresses.findIndex((a) => a.isDefault) >= 0 ? savedAddresses.findIndex((a) => a.isDefault) : (savedAddresses.length ? 0 : -1))
  const [newAddress, setNewAddress] = useState(emptyAddress)
  const [addressErrors, setAddressErrors] = useState({})
  const [paymentMethod, setPaymentMethod] = useState('UPI')
  const [upiId, setUpiId] = useState('')
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [processing, setProcessing] = useState(false)

  if (detailed.length === 0 && step < 4) {
    return (
      <div className="container empty-state">
        <h3>Your cart is empty</h3>
        <p>Add some products before checking out.</p>
        <Link to="/shop" className="btn btn-primary">Browse Products</Link>
      </div>
    )
  }

  const getAddress = () => (selectedAddressIdx >= 0 ? savedAddresses[selectedAddressIdx] : newAddress)

  const validateAddress = () => {
    const a = selectedAddressIdx >= 0 ? savedAddresses[selectedAddressIdx] : newAddress
    const e = {}
    if (!a.fullName) e.fullName = 'Required'
    if (!/^\d{10}$/.test(a.mobile || '')) e.mobile = 'Enter a valid 10-digit number'
    if (!a.house) e.house = 'Required'
    if (!a.street) e.street = 'Required'
    if (!a.city) e.city = 'Required'
    if (!a.state) e.state = 'Required'
    if (!/^\d{6}$/.test(a.pin || '')) e.pin = 'Enter a valid 6-digit PIN'
    setAddressErrors(e)
    return Object.keys(e).length === 0
  }

  const handleAddressNext = () => {
    if (!validateAddress()) return
    if (selectedAddressIdx < 0) {
      addAddress({ ...newAddress, isDefault: savedAddresses.length === 0 })
    }
    setStep(2)
  }

  const handlePayment = () => {
    if (paymentMethod === 'UPI' && !/^[\w.-]+@[\w]+$/.test(upiId)) {
      showToast('Enter a valid UPI ID (e.g. name@bank)', 'error')
      return
    }
    if (paymentMethod === 'Card' && (card.number.replace(/\s/g, '').length < 12 || card.cvv.length < 3 || !card.expiry)) {
      showToast('Please fill in valid card details', 'error')
      return
    }
    setProcessing(true)
    // Simulated payment gateway — no real card credentials are stored, this is a prototype flow only.
    setTimeout(() => {
      const order = placeOrder({
        userEmail: currentUser.email,
        items: detailed.map((d) => ({ productId: d.product.id, name: d.product.name, price: d.product.price, qty: d.qty, image: d.product.images[0] })),
        address: getAddress(),
        paymentMethod: paymentMethod === 'Card' ? 'Credit/Debit Card' : paymentMethod === 'COD' ? 'Cash on Delivery' : 'UPI',
        subtotal, discount, delivery, tax, total,
      })
      clearCart()
      setProcessing(false)
      navigate(`/order-confirmation/${order.id}`, { replace: true })
    }, 1400)
  }

  return (
    <div className="container section" style={{ maxWidth: 1100 }}>
      <div className={styles.steps}>
        {STEP_LABELS.map((label, i) => (
          <div key={label} className={`${styles.step} ${step === i + 1 ? styles.active : ''} ${step > i + 1 ? styles.done : ''}`}>
            <span className="num">{i + 1}</span> {label}
          </div>
        ))}
      </div>

      <div className={styles.layout}>
        <div className={`card ${styles.panel}`}>
          {step === 1 && (
            <>
              <h3 style={{ marginBottom: 18 }}>Delivery Address</h3>
              {savedAddresses.map((a, i) => (
                <label key={i} className={styles.paymentOption} style={{ display: 'flex' }} data-selected={selectedAddressIdx === i}>
                  <input type="radio" checked={selectedAddressIdx === i} onChange={() => setSelectedAddressIdx(i)} />
                  <div style={{ fontSize: '0.88rem' }}>
                    <strong>{a.fullName}</strong> · {a.mobile}
                    <div style={{ color: 'var(--text-muted)' }}>{a.house}, {a.street}, {a.city}, {a.state} - {a.pin}</div>
                  </div>
                </label>
              ))}
              <label className={styles.paymentOption} style={{ display: 'flex' }}>
                <input type="radio" checked={selectedAddressIdx === -1} onChange={() => setSelectedAddressIdx(-1)} />
                <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Deliver to a new address</span>
              </label>

              {selectedAddressIdx === -1 && (
                <div style={{ marginTop: 16 }}>
                  <div className={styles.formGrid}>
                    <div className="field"><label>Full name</label><input value={newAddress.fullName} onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })} />{addressErrors.fullName && <span className="field-error">{addressErrors.fullName}</span>}</div>
                    <div className="field"><label>Mobile number</label><input value={newAddress.mobile} onChange={(e) => setNewAddress({ ...newAddress, mobile: e.target.value })} />{addressErrors.mobile && <span className="field-error">{addressErrors.mobile}</span>}</div>
                  </div>
                  <div className="field"><label>House / building details</label><input value={newAddress.house} onChange={(e) => setNewAddress({ ...newAddress, house: e.target.value })} />{addressErrors.house && <span className="field-error">{addressErrors.house}</span>}</div>
                  <div className="field"><label>Street</label><input value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} />{addressErrors.street && <span className="field-error">{addressErrors.street}</span>}</div>
                  <div className={styles.formGrid}>
                    <div className="field"><label>City</label><input value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />{addressErrors.city && <span className="field-error">{addressErrors.city}</span>}</div>
                    <div className="field"><label>State</label><input value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} />{addressErrors.state && <span className="field-error">{addressErrors.state}</span>}</div>
                  </div>
                  <div className="field"><label>PIN code</label><input value={newAddress.pin} onChange={(e) => setNewAddress({ ...newAddress, pin: e.target.value })} />{addressErrors.pin && <span className="field-error">{addressErrors.pin}</span>}</div>
                </div>
              )}
              <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={handleAddressNext} disabled={selectedAddressIdx === null}>
                Continue to Order Summary
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h3 style={{ marginBottom: 18 }}>Order Summary</h3>
              {detailed.map(({ product, qty }) => (
                <div key={product.id} className={styles.miniItem}>
                  <img src={product.images[0]} alt={product.name} />
                  <div style={{ flex: 1 }}>{product.name} <span style={{ color: 'var(--text-muted)' }}>× {qty}</span></div>
                  <div style={{ fontWeight: 600 }}>{formatINR(product.price * qty)}</div>
                </div>
              ))}
              <div style={{ marginTop: 16, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                <div className={styles.summaryLine}><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
                {discount > 0 && <div className={styles.summaryLine} style={{ color: 'var(--success)' }}><span>Discount {coupon ? `(${coupon.code})` : ''}</span><span>−{formatINR(discount)}</span></div>}
                <div className={styles.summaryLine}><span>Delivery</span><span>{delivery === 0 ? 'FREE' : formatINR(delivery)}</span></div>
                <div className={styles.summaryLine}><span>Tax</span><span>{formatINR(tax)}</span></div>
                <div className={`${styles.summaryLine} ${styles.summaryTotal}`}><span>Total</span><span>{formatINR(total)}</span></div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <button className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
                <button className="btn btn-primary" onClick={() => setStep(3)}>Continue to Payment</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3 style={{ marginBottom: 18 }}>Payment</h3>
              {['UPI', 'Card', 'COD'].map((method) => (
                <label key={method} className={`${styles.paymentOption} ${paymentMethod === method ? styles.selected : ''}`}>
                  <input type="radio" checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    {method === 'UPI' && 'UPI'}
                    {method === 'Card' && 'Credit / Debit Card'}
                    {method === 'COD' && 'Cash on Delivery'}
                  </span>
                </label>
              ))}

              {paymentMethod === 'UPI' && (
                <div className="field" style={{ marginTop: 10 }}>
                  <label>UPI ID</label>
                  <input placeholder="yourname@bank" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                </div>
              )}
              {paymentMethod === 'Card' && (
                <div style={{ marginTop: 10 }}>
                  <div className="field"><label>Card number</label><input placeholder="1234 5678 9012 3456" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} /></div>
                  <div className="field"><label>Name on card</label><input value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} /></div>
                  <div className={styles.formGrid}>
                    <div className="field"><label>Expiry (MM/YY)</label><input placeholder="MM/YY" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} /></div>
                    <div className="field"><label>CVV</label><input placeholder="•••" value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} /></div>
                  </div>
                  <p className="field-hint">This is a simulated payment for demo purposes — no real card details are transmitted or stored.</p>
                </div>
              )}
              {paymentMethod === 'COD' && (
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: 10 }}>Pay in cash when your order is delivered. A small COD handling fee may apply on select orders.</p>
              )}

              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button className="btn btn-secondary" onClick={() => setStep(2)} disabled={processing}>Back</button>
                <button className="btn btn-primary" onClick={handlePayment} disabled={processing}>
                  {processing ? 'Processing payment…' : `Pay ${formatINR(total)}`}
                </button>
              </div>
            </>
          )}
        </div>

        <div className={`card ${styles.panel}`}>
          <h3 style={{ marginBottom: 14, fontSize: '1rem' }}>Summary</h3>
          {detailed.map(({ product, qty }) => (
            <div key={product.id} className={styles.miniItem}>
              <img src={product.images[0]} alt={product.name} />
              <div style={{ flex: 1 }}>{product.name} × {qty}</div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--border)', marginTop: 10, paddingTop: 10 }}>
            <div className={`${styles.summaryLine} ${styles.summaryTotal}`}><span>Total</span><span>{formatINR(total)}</span></div>
          </div>
          <p className="field-hint" style={{ marginTop: 10 }}>Estimated delivery: {estimatedDelivery(5)}</p>
        </div>
      </div>
    </div>
  )
}
