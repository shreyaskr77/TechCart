import { createContext, useContext, useEffect, useState } from 'react'
import { products as seedProducts } from '../data/products'
import { loadJSON, saveJSON } from '../utils/format'

const ProductsContext = createContext(null)
const KEY = 'techcart_products'

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => loadJSON(KEY, seedProducts))

  useEffect(() => saveJSON(KEY, products), [products])

  const getProductById = (id) => products.find((p) => p.id === id)

  const addProduct = (product) => {
    const id = product.id || `${product.category?.slice(0, 3) || 'gen'}-${Date.now().toString().slice(-6)}`
    setProducts((prev) => [{ ...product, id }, ...prev])
  }

  const updateProduct = (id, updates) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <ProductsContext.Provider value={{ products, getProductById, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => useContext(ProductsContext)
