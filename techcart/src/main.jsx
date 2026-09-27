import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ToastProvider } from './context/ToastContext.jsx'
import { ProductsProvider } from './context/ProductsContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { CompareProvider } from './context/CompareContext.jsx'
import { OrdersProvider } from './context/OrdersContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <ProductsProvider>
          <AuthProvider>
            <OrdersProvider>
              <CartProvider>
                <WishlistProvider>
                  <CompareProvider>
                    <App />
                  </CompareProvider>
                </WishlistProvider>
              </CartProvider>
            </OrdersProvider>
          </AuthProvider>
        </ProductsProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
)
