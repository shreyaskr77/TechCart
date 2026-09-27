import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Account.module.css'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

const emptyAddress = { fullName: '', mobile: '', house: '', street: '', city: '', state: '', pin: '', isDefault: false }

export default function Account() {
  const { currentUser, updateProfile, addAddress, removeAddress } = useAuth()
  const { showToast } = useToast()
  const [tab, setTab] = useState('profile')
  const [profileForm, setProfileForm] = useState({ name: currentUser.name, mobile: currentUser.mobile })
  const [addressForm, setAddressForm] = useState(emptyAddress)
  const [showAddressForm, setShowAddressForm] = useState(false)

  const saveProfile = (e) => {
    e.preventDefault()
    updateProfile(profileForm)
    showToast('Profile updated')
  }

  const saveAddress = (e) => {
    e.preventDefault()
    if (!addressForm.fullName || !addressForm.mobile || !addressForm.city || !addressForm.pin) {
      showToast('Please fill in all required address fields', 'error')
      return
    }
    addAddress(addressForm)
    setAddressForm(emptyAddress)
    setShowAddressForm(false)
    showToast('Address added')
  }

  return (
    <div className="container">
      <h1 style={{ padding: '24px 0 0', fontSize: '1.6rem' }}>My Account</h1>
      <div className={styles.layout}>
        <nav className={`card ${styles.nav}`} style={{ padding: 10 }}>
          <button className={tab === 'profile' ? styles.active : ''} onClick={() => setTab('profile')}>View &amp; Edit Profile</button>
          <button className={tab === 'addresses' ? styles.active : ''} onClick={() => setTab('addresses')}>Delivery Addresses</button>
          <Link to="/orders" style={{ padding: '10px 14px', fontSize: '0.9rem' }}>Order History &amp; Tracking</Link>
          <Link to="/wishlist" style={{ padding: '10px 14px', fontSize: '0.9rem' }}>Manage Wishlist</Link>
        </nav>

        <div className={`card ${styles.panel}`}>
          {tab === 'profile' && (
            <>
              <h3 style={{ marginBottom: 18 }}>Profile Details</h3>
              <form onSubmit={saveProfile}>
                <div className={styles.formGrid}>
                  <div className="field">
                    <label>Full name</label>
                    <input value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} />
                  </div>
                  <div className="field">
                    <label>Mobile number</label>
                    <input value={profileForm.mobile} onChange={(e) => setProfileForm({ ...profileForm, mobile: e.target.value })} />
                  </div>
                </div>
                <div className="field">
                  <label>Email address</label>
                  <input value={currentUser.email} disabled />
                  <span className="field-hint">Email address cannot be changed.</span>
                </div>
                <button className="btn btn-primary" type="submit">Save Changes</button>
              </form>
            </>
          )}

          {tab === 'addresses' && (
            <>
              <div className="section-head" style={{ marginBottom: 16 }}>
                <h3>Delivery Addresses</h3>
                <button className="btn btn-secondary btn-sm" onClick={() => setShowAddressForm((s) => !s)}>
                  {showAddressForm ? 'Cancel' : '+ Add Address'}
                </button>
              </div>

              {showAddressForm && (
                <form onSubmit={saveAddress} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
                  <div className={styles.formGrid}>
                    <div className="field"><label>Full name</label><input value={addressForm.fullName} onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })} /></div>
                    <div className="field"><label>Mobile number</label><input value={addressForm.mobile} onChange={(e) => setAddressForm({ ...addressForm, mobile: e.target.value })} /></div>
                  </div>
                  <div className="field"><label>House / building details</label><input value={addressForm.house} onChange={(e) => setAddressForm({ ...addressForm, house: e.target.value })} /></div>
                  <div className="field"><label>Street</label><input value={addressForm.street} onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })} /></div>
                  <div className={styles.formGrid}>
                    <div className="field"><label>City</label><input value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} /></div>
                    <div className="field"><label>State</label><input value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} /></div>
                  </div>
                  <div className="field"><label>PIN code</label><input value={addressForm.pin} onChange={(e) => setAddressForm({ ...addressForm, pin: e.target.value })} /></div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', marginBottom: 16 }}>
                    <input type="checkbox" checked={addressForm.isDefault} onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })} />
                    Set as default address
                  </label>
                  <button className="btn btn-primary" type="submit">Save Address</button>
                </form>
              )}

              {(currentUser.addresses || []).length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No saved addresses yet.</p>
              ) : (
                currentUser.addresses.map((a, i) => (
                  <div key={i} className={styles.addressCard}>
                    {a.isDefault && <span className="badge badge-blue" style={{ position: 'absolute', top: 12, right: 12 }}>Default</span>}
                    <strong>{a.fullName}</strong> · {a.mobile}
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '6px 0 10px' }}>
                      {a.house}, {a.street}, {a.city}, {a.state} - {a.pin}
                    </p>
                    <button className="btn btn-danger btn-sm" onClick={() => removeAddress(i)}>Remove</button>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
