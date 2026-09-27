import { createContext, useContext, useEffect, useState } from 'react'
import { seedOrders, ORDER_STATUSES } from '../data/orders'
import { loadJSON, saveJSON } from '../utils/format'
import { generateOrderId, estimatedDelivery } from '../utils/format'

const OrdersContext = createContext(null)
const KEY = 'techcart_orders'

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => loadJSON(KEY, seedOrders))

  useEffect(() => saveJSON(KEY, orders), [orders])

  const placeOrder = ({ userEmail, items, address, paymentMethod, subtotal, discount, delivery, tax, total }) => {
    const order = {
      id: generateOrderId(),
      userEmail,
      date: new Date().toISOString().slice(0, 10),
      status: 'Order Placed',
      items,
      address,
      paymentMethod,
      subtotal,
      discount,
      delivery,
      tax,
      total,
      estimatedDelivery: estimatedDelivery(5),
    }
    setOrders((prev) => [order, ...prev])
    return order
  }

  const getOrdersForUser = (email) => orders.filter((o) => o.userEmail === email).sort((a, b) => (a.date < b.date ? 1 : -1))

  const getOrderById = (id) => orders.find((o) => o.id === id)

  const cancelOrder = (id) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id && ['Order Placed', 'Confirmed'].includes(o.status) ? { ...o, status: 'Cancelled' } : o
      )
    )
  }

  const updateOrderStatus = (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
  }

  return (
    <OrdersContext.Provider
      value={{ orders, placeOrder, getOrdersForUser, getOrderById, cancelOrder, updateOrderStatus, ORDER_STATUSES }}
    >
      {children}
    </OrdersContext.Provider>
  )
}

export const useOrders = () => useContext(OrdersContext)
