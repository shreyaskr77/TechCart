import { createContext, useContext, useEffect, useState } from 'react'
import { seedUsers } from '../data/users'
import { loadJSON, saveJSON } from '../utils/format'
import { useToast } from './ToastContext'

const AuthContext = createContext(null)
const USERS_KEY = 'techcart_users'
const SESSION_KEY = 'techcart_session'

// Demo-only "hashing" so we are not storing plaintext passwords verbatim in localStorage.
// This is NOT secure and must be replaced by bcrypt on a real backend (Stage 2).
const demoHash = (pw) => btoa(unescape(encodeURIComponent(pw))).split('').reverse().join('')

const withHashed = (user) => ({ ...user, password: demoHash(user.password) })

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => loadJSON(USERS_KEY, seedUsers.map(withHashed)))
  const [session, setSession] = useState(() => loadJSON(SESSION_KEY, null)) // { email }
  const { showToast } = useToast() || {}

  useEffect(() => saveJSON(USERS_KEY, users), [users])
  useEffect(() => saveJSON(SESSION_KEY, session), [session])

  const currentUser = session ? users.find((u) => u.email === session.email) : null

  const register = ({ name, email, mobile, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    if (users.some((u) => u.email === normalizedEmail)) {
      return { ok: false, error: 'An account with this email already exists.' }
    }
    const newUser = withHashed({ name, email: normalizedEmail, mobile, password, role: 'customer', addresses: [] })
    setUsers((prev) => [...prev, newUser])
    setSession({ email: normalizedEmail })
    showToast?.(`Welcome to TechCart, ${name}!`)
    return { ok: true }
  }

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const user = users.find((u) => u.email === normalizedEmail)
    if (!user || user.password !== demoHash(password)) {
      return { ok: false, error: 'Invalid email or password.' }
    }
    setSession({ email: normalizedEmail })
    showToast?.(`Welcome back, ${user.name.split(' ')[0]}!`)
    return { ok: true }
  }

  const logout = () => {
    setSession(null)
  }

  const updateProfile = (updates) => {
    if (!currentUser) return
    setUsers((prev) => prev.map((u) => (u.email === currentUser.email ? { ...u, ...updates } : u)))
  }

  const addAddress = (address) => {
    if (!currentUser) return
    setUsers((prev) =>
      prev.map((u) => {
        if (u.email !== currentUser.email) return u
        const addresses = address.isDefault
          ? [...(u.addresses || []).map((a) => ({ ...a, isDefault: false })), address]
          : [...(u.addresses || []), address]
        return { ...u, addresses }
      })
    )
  }

  const removeAddress = (index) => {
    if (!currentUser) return
    setUsers((prev) =>
      prev.map((u) =>
        u.email === currentUser.email ? { ...u, addresses: u.addresses.filter((_, i) => i !== index) } : u
      )
    )
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'admin',
        users,
        register,
        login,
        logout,
        updateProfile,
        addAddress,
        removeAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
