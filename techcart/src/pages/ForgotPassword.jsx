import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Auth.module.css'
import { useAuth } from '../context/AuthContext.jsx'

export default function ForgotPassword() {
  const { users } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const exists = users.some((u) => u.email === email.trim().toLowerCase())
    if (!exists) {
      setError('We could not find an account with that email.')
      return
    }
    setError('')
    setSent(true)
  }

  return (
    <div className={styles.wrap}>
      <div className={`card ${styles.card}`}>
        <h1>Reset your password</h1>
        <p className={styles.subtitle}>Enter your email and we'll send you a reset link.</p>
        {sent ? (
          <div className="badge badge-green" style={{ display: 'block', padding: '12px 16px', fontSize: '0.85rem' }}>
            If an account exists for {email}, a password reset link has been sent.
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              {error && <span className="field-error">{error}</span>}
            </div>
            <button type="submit" className="btn btn-primary btn-block">Send Reset Link</button>
          </form>
        )}
        <p className={styles.footerLine}><Link to="/login">Back to login</Link></p>
      </div>
    </div>
  )
}
