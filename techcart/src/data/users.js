// Demo user store seed. In Stage 2 this becomes a real Users collection with bcrypt hashing server-side.
export const seedUsers = [
  { name: 'Demo Customer', email: 'demo@techcart.in', mobile: '9876543210', password: 'Demo@1234', role: 'customer',
    addresses: [{ fullName: 'Shreyas', mobile: '9876543210', house: 'Flat 302, Sunrise Apartments', street: 'MG Road', city: 'Bengaluru', state: 'Karnataka', pin: '560001', isDefault: true }] },
  { name: 'TechCart Admin', email: 'admin@techcart.in', mobile: '9000000000', password: 'Admin@1234', role: 'admin', addresses: [] },
]
