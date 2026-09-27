import { useState } from 'react'
import styles from './Admin.module.css'
import { useProducts } from '../../context/ProductsContext.jsx'
import { categories } from '../../data/categories'
import { formatINR } from '../../utils/format'
import { useToast } from '../../context/ToastContext.jsx'

const emptyForm = {
  name: '', brand: '', category: 'laptops', price: '', originalPrice: '', stock: '',
  image: '', description: '',
}

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const { showToast } = useToast()
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [search, setSearch] = useState('')

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))

  const openAdd = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowModal(true)
  }

  const openEdit = (p) => {
    setForm({
      name: p.name, brand: p.brand, category: p.category, price: p.price, originalPrice: p.originalPrice,
      stock: p.stock, image: p.images[0], description: p.description,
    })
    setEditingId(p.id)
    setShowModal(true)
  }

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.brand || !form.price) {
      showToast('Please fill in name, brand, and price', 'error')
      return
    }
    const payload = {
      name: form.name, brand: form.brand, category: form.category,
      price: Number(form.price), originalPrice: Number(form.originalPrice) || Number(form.price),
      stock: Number(form.stock) || 0,
      images: [form.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80'],
      description: form.description || 'No description provided yet.',
      features: [], specs: {}, rating: 0, reviews: 0,
    }
    if (editingId) {
      updateProduct(editingId, payload)
      showToast('Product updated')
    } else {
      addProduct(payload)
      showToast('Product added')
    }
    setShowModal(false)
  }

  return (
    <div>
      <div className="section-head" style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.5rem' }}>Product Management</h1>
        <button className="btn btn-primary btn-sm" onClick={openAdd}>+ Add New Product</button>
      </div>

      <input
        placeholder="Search products by name or brand..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid var(--border)', width: '100%', maxWidth: 360, marginBottom: 16 }}
      />

      <div className="card" style={{ padding: 20, overflowX: 'auto' }}>
        <table className={styles.table}>
          <thead>
            <tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td><img src={p.images[0]} alt={p.name} /></td>
                <td>{p.brand} {p.name}</td>
                <td>{categories.find((c) => c.id === p.category)?.name || p.category}</td>
                <td>{formatINR(p.price)}</td>
                <td>
                  <span className={`badge ${p.stock === 0 ? 'badge-red' : p.stock <= 5 ? 'badge-gray' : 'badge-green'}`}>
                    {p.stock}
                  </span>
                </td>
                <td>
                  <button className="btn btn-secondary btn-sm" style={{ marginRight: 8 }} onClick={() => openEdit(p)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: 18 }}>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={submit}>
              <div className={styles.formGrid}>
                <div className="field"><label>Product name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div className="field"><label>Brand</label><input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} /></div>
              </div>
              <div className="field">
                <label>Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className={styles.formGrid}>
                <div className="field"><label>Price (₹)</label><input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
                <div className="field"><label>Original price (₹)</label><input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} /></div>
              </div>
              <div className="field"><label>Stock quantity</label><input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></div>
              <div className="field"><label>Image URL</label><input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." /></div>
              <div className="field"><label>Description</label><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingId ? 'Save Changes' : 'Add Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
