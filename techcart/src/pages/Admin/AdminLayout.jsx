import { NavLink, Outlet } from 'react-router-dom'
import styles from './Admin.module.css'

export default function AdminLayout() {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>Tech<span>Cart</span> Admin</div>
        <NavLink to="/admin" end className={({ isActive }) => isActive ? styles.active : ''}>Dashboard Overview</NavLink>
        <NavLink to="/admin/products" className={({ isActive }) => isActive ? styles.active : ''}>Product Management</NavLink>
        <NavLink to="/admin/orders" className={({ isActive }) => isActive ? styles.active : ''}>Order Management</NavLink>
        <NavLink to="/admin/customers" className={({ isActive }) => isActive ? styles.active : ''}>Customer Management</NavLink>
        <div className={styles.backLink}>
          <NavLink to="/">← Back to Store</NavLink>
        </div>
      </aside>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
