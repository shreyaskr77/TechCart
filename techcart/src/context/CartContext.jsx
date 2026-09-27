import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { findProductById } from '../data/products'
import { loadJSON, saveJSON } from '../utils/format'
import { useToast } from './ToastContext'
import { useProducts } from './ProductsContext'

const CartContext = createContext(null)
const CART_KEY = 'techcart_cart'

const VALID_COUPONS = {
  TECH10: { type: 'percent', value: 10, label: '10% off' },
  WELCOME50: { type: 'flat', value: 50, label: '₹50 off' },
  SAVE500: { type: 'flat', value: 500, label: '₹500 off (orders above ₹5,000)', minSubtotal: 5000 },
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadJSON(CART_KEY, [])) // [{productId, qty}]
  const [coupon, setCoupon] = useState(() => loadJSON('techcart_coupon', null))
  const { showToast } = useToast() || {}
  const { products: catalogue } = useProducts() || { products: [] }

  useEffect(() => saveJSON(CART_KEY, items), [items])
  useEffect(() => saveJSON('techcart_coupon', coupon), [coupon])

  const addToCart = (productId, qty = 1) => {
    const product = findProductById(catalogue, productId)
    if (!product) return
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId)
      if (existing) {
        const newQty = Math.min(existing.qty + qty, product.stock)
        return prev.map((i) => (i.productId === productId ? { ...i, qty: newQty } : i))
      }
      return [...prev, { productId, qty: Math.min(qty, product.stock) }]
    })
    showToast?.(`${product.name} added to cart`)
  }

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }

  const updateQty = (productId, qty) => {
    const product = findProductById(catalogue, productId)
    if (!product) return
    if (qty < 1) {
      removeFromCart(productId)
      return
    }
    const clamped = Math.min(qty, product.stock)
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, qty: clamped } : i)))
  }

  const clearCart = () => {
    setItems([])
    setCoupon(null)
  }

  const applyCoupon = (code) => {
    const upper = code.trim().toUpperCase()
    const found = VALID_COUPONS[upper]
    if (!found) {
      showToast?.('Invalid coupon code', 'error')
      return false
    }
    setCoupon({ code: upper, ...found })
    showToast?.(`Coupon ${upper} applied`)
    return true
  }

  const removeCoupon = () => setCoupon(null)

  const cartDetails = useMemo(() => {
    const detailed = items
      .map((i) => {
        const product = findProductById(catalogue, i.productId)
        if (!product) return null
        return { ...i, product, itemSubtotal: product.price * i.qty }
      })
      .filter(Boolean)

    const subtotal = detailed.reduce((sum, i) => sum + i.itemSubtotal, 0)

    let discount = 0
    if (coupon) {
      if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
        discount = 0
      } else if (coupon.type === 'percent') {
        discount = Math.round(subtotal * (coupon.value / 100))
      } else {
        discount = coupon.value
      }
    }
    discount = Math.min(discount, subtotal)

    const afterDiscount = subtotal - discount
    const delivery = subtotal === 0 || afterDiscount >= 999 ? 0 : 49
    const tax = Math.round(afterDiscount * 0.05) // 5% GST-style demo tax
    const total = afterDiscount + delivery + tax
    const itemCount = detailed.reduce((sum, i) => sum + i.qty, 0)

    return { detailed, subtotal, discount, delivery, tax, total, itemCount }
  }, [items, coupon, catalogue])

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQty, clearCart, applyCoupon, removeCoupon, coupon, ...cartDetails }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
