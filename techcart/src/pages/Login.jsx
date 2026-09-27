import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './Auth.module.css'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const from = location.state?.from?.pathname || '/'

  const submit = (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) {
      setError('Please enter both email and password.')
      return
    }
    const result = login(form)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div className={styles.wrap}>
      <div className={`card ${styles.card}`}>
        <h1>Welcome back</h1>
        <p className={styles.subtitle}>Log in to continue to TechCart.</p>
        {error && <p className="field-error" style={{ marginBottom: 14 }}>{error}</p>}
        <form onSubmit={submit}>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <Link to="/forgot-password" className={styles.forgot}>Forgot password?</Link>
          <button type="submit" className="btn btn-primary btn-block">Log In</button>
        </form>
        <p className={styles.footerLine}>New to TechCart? <Link to="/register">Create an account</Link></p>
        <div className={styles.demoBox}>
          Demo customer: demo@techcart.in / Demo@1234<br />
          Demo admin: admin@techcart.in / Admin@1234
        </div>
      </div>
    </div>
  )
}
