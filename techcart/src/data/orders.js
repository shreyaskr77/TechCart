// Sample seed orders for the demo customer account (demo@techcart.in)
export const seedOrders = [
  {
    id: 'TC-20260912-4471', userEmail: 'demo@techcart.in', date: '2026-09-12',
    status: 'Delivered',
    items: [{ productId: 'hpn-001', name: 'Sony WH-1000XM5', price: 26990, qty: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80' }],
    address: { fullName: 'Shreyas', mobile: '9876543210', house: 'Flat 302, Sunrise Apartments', street: 'MG Road', city: 'Bengaluru', state: 'Karnataka', pin: '560001' },
    subtotal: 26990, discount: 2699, delivery: 0, tax: 1216, total: 25507, paymentMethod: 'UPI',
  },
  {
    id: 'TC-20260918-2290', userEmail: 'demo@techcart.in', date: '2026-09-18',
    status: 'Shipped',
    items: [{ productId: 'wch-002', name: 'Noise ColorFit Pro 5', price: 2299, qty: 2, image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=200&q=80' }],
    address: { fullName: 'Shreyas', mobile: '9876543210', house: 'Flat 302, Sunrise Apartments', street: 'MG Road', city: 'Bengaluru', state: 'Karnataka', pin: '560001' },
    subtotal: 4598, discount: 0, delivery: 49, tax: 209, total: 4856, paymentMethod: 'Cash on Delivery',
  },
  {
    id: 'TC-20260924-8813', userEmail: 'demo@techcart.in', date: '2026-09-24',
    status: 'Order Placed',
    items: [{ productId: 'acc-001', name: 'Anker 737 Power Bank (140W)', price: 8999, qty: 1, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=200&q=80' }],
    address: { fullName: 'Shreyas', mobile: '9876543210', house: 'Flat 302, Sunrise Apartments', street: 'MG Road', city: 'Bengaluru', state: 'Karnataka', pin: '560001' },
    subtotal: 8999, discount: 0, delivery: 49, tax: 407, total: 9455, paymentMethod: 'Credit/Debit Card',
  },
]

export const ORDER_STATUSES = ['Order Placed', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered']
