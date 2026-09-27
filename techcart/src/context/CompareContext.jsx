import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { findProductById } from '../data/products'
import { loadJSON, saveJSON } from '../utils/format'
import { useToast } from './ToastContext'
import { useProducts } from './ProductsContext'

const CompareContext = createContext(null)
const KEY = 'techcart_compare'
const MAX_COMPARE = 4

export function CompareProvider({ children }) {
  const [productIds, setProductIds] = useState(() => loadJSON(KEY, []))
  const { showToast } = useToast() || {}
  const { products: catalogue } = useProducts() || { products: [] }

  useEffect(() => saveJSON(KEY, productIds), [productIds])

  const isComparing = (id) => productIds.includes(id)

  const toggleCompare = (id) => {
    setProductIds((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id)
      if (prev.length >= MAX_COMPARE) {
        showToast?.(`You can compare up to ${MAX_COMPARE} products at a time`, 'error')
        return prev
      }
      return [...prev, id]
    })
  }

  const removeFromCompare = (id) => setProductIds((prev) => prev.filter((p) => p !== id))
  const clearCompare = () => setProductIds([])

  const products = useMemo(
    () => productIds.map((id) => findProductById(catalogue, id)).filter(Boolean),
    [productIds, catalogue]
  )

  return (
    <CompareContext.Provider
      value={{ productIds, products, isComparing, toggleCompare, removeFromCompare, clearCompare, MAX_COMPARE }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export const useCompare = () => useContext(CompareContext)
