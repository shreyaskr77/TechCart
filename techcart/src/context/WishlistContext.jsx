import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { findProductById } from '../data/products'
import { loadJSON, saveJSON } from '../utils/format'
import { useToast } from './ToastContext'
import { useProducts } from './ProductsContext'

const WishlistContext = createContext(null)
const KEY = 'techcart_wishlist'

export function WishlistProvider({ children }) {
  const [productIds, setProductIds] = useState(() => loadJSON(KEY, []))
  const { showToast } = useToast() || {}
  const { products: catalogue } = useProducts() || { products: [] }

  useEffect(() => saveJSON(KEY, productIds), [productIds])

  const isWishlisted = (id) => productIds.includes(id)

  const toggleWishlist = (id) => {
    setProductIds((prev) => {
      if (prev.includes(id)) {
        showToast?.('Removed from wishlist')
        return prev.filter((p) => p !== id)
      }
      showToast?.('Added to wishlist')
      return [...prev, id]
    })
  }

  const removeFromWishlist = (id) => setProductIds((prev) => prev.filter((p) => p !== id))

  const products = useMemo(
    () => productIds.map((id) => findProductById(catalogue, id)).filter(Boolean),
    [productIds, catalogue]
  )

  return (
    <WishlistContext.Provider value={{ productIds, products, isWishlisted, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
