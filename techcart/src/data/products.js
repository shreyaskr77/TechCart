// Realistic sample catalogue. Prices in INR (₹).
export const products = [
  // ---------------- LAPTOPS ----------------
  {
    id: 'lap-001', category: 'laptops', brand: 'ASUS', name: 'ASUS ROG Zephyrus G14',
    price: 134990, originalPrice: 159990, rating: 4.6, reviews: 812, stock: 14,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80',
    ],
    description: 'A compact 14-inch powerhouse built for creators and gamers who need serious performance on the move, with a crisp high-refresh display and all-day battery life.',
    features: ['AniMe Matrix LED lid', '165Hz QHD+ display', 'Dolby Atmos speakers', 'MUX switch for max GPU performance'],
    specs: { Processor: 'AMD Ryzen 9 8945HS', RAM: '32GB DDR5', Storage: '1TB NVMe SSD', 'Graphics card': 'NVIDIA RTX 4060 8GB', 'Display size and resolution': '14" QHD+ 2560x1600, 165Hz', 'Operating system': 'Windows 11 Home', 'Battery capacity': '76Wh', Weight: '1.72 kg' },
  },
  {
    id: 'lap-002', category: 'laptops', brand: 'Apple', name: 'MacBook Air M3 (13-inch)',
    price: 114900, originalPrice: 119900, rating: 4.8, reviews: 2140, stock: 22,
    images: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80',
    ],
    description: 'The thinnest, lightest MacBook Air yet, with the M3 chip delivering fast performance and up to 18 hours of battery life in a fanless design.',
    features: ['Fanless silent design', 'Liquid Retina display', 'MagSafe charging', '1080p FaceTime HD camera'],
    specs: { Processor: 'Apple M3 (8-core CPU)', RAM: '16GB unified memory', Storage: '512GB SSD', 'Graphics card': 'Apple 10-core GPU', 'Display size and resolution': '13.6" Liquid Retina 2560x1664', 'Operating system': 'macOS Sonoma', 'Battery capacity': '18 hours video playback', Weight: '1.24 kg' },
  },
  {
    id: 'lap-003', category: 'laptops', brand: 'Dell', name: 'Dell XPS 13 Plus',
    price: 129990, originalPrice: 149990, rating: 4.4, reviews: 356, stock: 9,
    images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80'],
    description: 'An ultra-premium ultrabook with a seamless glass haptic trackpad, edge-to-edge keyboard, and a stunning InfinityEdge display.',
    features: ['Zero-lattice keyboard', 'Capacitive touch function row', 'Gorilla Glass haptic trackpad', 'Carbon-fibre palm rest'],
    specs: { Processor: 'Intel Core i7-1360P', RAM: '16GB LPDDR5', Storage: '512GB SSD', 'Graphics card': 'Intel Iris Xe', 'Display size and resolution': '13.4" FHD+ 1920x1200', 'Operating system': 'Windows 11 Home', 'Battery capacity': '55Wh', Weight: '1.26 kg' },
  },
  {
    id: 'lap-004', category: 'laptops', brand: 'Lenovo', name: 'Lenovo IdeaPad Slim 5',
    price: 62990, originalPrice: 74990, rating: 4.2, reviews: 501, stock: 31,
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80'],
    description: 'A dependable everyday laptop that balances performance and battery life for study, work, and streaming.',
    features: ['Backlit keyboard', 'Rapid Charge support', 'Dolby Audio', 'Aluminium top cover'],
    specs: { Processor: 'AMD Ryzen 5 7530U', RAM: '16GB DDR5', Storage: '512GB SSD', 'Graphics card': 'AMD Radeon Graphics', 'Display size and resolution': '15.6" FHD 1920x1080', 'Operating system': 'Windows 11 Home', 'Battery capacity': '57Wh', Weight: '1.66 kg' },
  },

  // ---------------- SMARTPHONES ----------------
  {
    id: 'phn-001', category: 'smartphones', brand: 'Apple', name: 'iPhone 15 Pro',
    price: 134900, originalPrice: 139900, rating: 4.7, reviews: 3021, stock: 40,
    images: [
      'https://images.unsplash.com/photo-1592286927505-1def25115558?w=800&q=80',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
    ],
    description: 'Forged in titanium with the powerful A17 Pro chip, a customizable Action button, and the most advanced Pro camera system yet.',
    features: ['Titanium design', 'Action button', 'USB-C with USB 3 speeds', 'Ceramic Shield front'],
    specs: { Processor: 'Apple A17 Pro', 'RAM and storage': '8GB RAM, 256GB storage', Display: '6.1" Super Retina XDR, 120Hz', Camera: '48MP main + 12MP ultra-wide + 12MP telephoto', Battery: 'Up to 23 hrs video playback', 'Operating system': 'iOS 17', Connectivity: '5G, Wi-Fi 6E, Bluetooth 5.3' },
  },
  {
    id: 'phn-002', category: 'smartphones', brand: 'Samsung', name: 'Samsung Galaxy S24 Ultra',
    price: 129999, originalPrice: 134999, rating: 4.6, reviews: 1876, stock: 27,
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80'],
    description: 'A titanium-clad flagship with a built-in S Pen, a 200MP main camera, and Galaxy AI features for real-time translation and more.',
    features: ['Built-in S Pen', '200MP main camera', 'Titanium frame', 'Galaxy AI'],
    specs: { Processor: 'Snapdragon 8 Gen 3 for Galaxy', 'RAM and storage': '12GB RAM, 256GB storage', Display: '6.8" QHD+ Dynamic AMOLED 2X, 120Hz', Camera: '200MP main + 50MP periscope + 10MP telephoto + 12MP ultra-wide', Battery: '5000mAh', 'Operating system': 'Android 14, One UI 6.1', Connectivity: '5G, Wi-Fi 7, Bluetooth 5.3' },
  },
  {
    id: 'phn-003', category: 'smartphones', brand: 'OnePlus', name: 'OnePlus 12',
    price: 64999, originalPrice: 69999, rating: 4.5, reviews: 942, stock: 33,
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80'],
    description: 'Flagship performance with 100W fast charging, Hasselblad-tuned cameras, and a razor-sharp 2K LTPO display.',
    features: ['100W SuperVOOC charging', 'Hasselblad camera tuning', 'Aerospace-grade glass back', 'Dual speakers'],
    specs: { Processor: 'Snapdragon 8 Gen 3', 'RAM and storage': '16GB RAM, 512GB storage', Display: '6.82" 2K LTPO AMOLED, 120Hz', Camera: '50MP main + 64MP periscope + 48MP ultra-wide', Battery: '5400mAh', 'Operating system': 'Android 14, OxygenOS 14', Connectivity: '5G, Wi-Fi 7, Bluetooth 5.4' },
  },
  {
    id: 'phn-004', category: 'smartphones', brand: 'Google', name: 'Google Pixel 8',
    price: 59999, originalPrice: 75999, rating: 4.4, reviews: 611, stock: 18,
    images: ['https://static1.anpoimages.com/wordpress/wp-content/uploads/wm/2023/10/google-pixel-8-and-google-pixel-8-pro-back.jpg'],
    description: 'Pure Android with class-leading computational photography and 7 years of guaranteed OS and security updates.',
    features: ['Magic Eraser & Best Take', '7 years of OS updates', 'Gorilla Glass Victus', 'Titan M2 security chip'],
    specs: { Processor: 'Google Tensor G3', 'RAM and storage': '8GB RAM, 128GB storage', Display: '6.2" OLED, 120Hz', Camera: '50MP main + 12MP ultra-wide', Battery: '4575mAh', 'Operating system': 'Android 14', Connectivity: '5G, Wi-Fi 7, Bluetooth 5.3' },
  },

  // ---------------- HEADPHONES ----------------
  {
    id: 'hpn-001', category: 'headphones', brand: 'Sony', name: 'Sony WH-1000XM5',
    price: 26990, originalPrice: 34990, rating: 4.8, reviews: 4210, stock: 55,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'],
    description: 'Industry-leading noise cancellation meets exceptional sound quality in a lightweight, all-day comfortable design.',
    features: ['Industry-leading ANC', 'Multipoint Bluetooth', '30-hour battery', 'Speak-to-chat auto pause'],
    specs: { Type: 'Over-ear, wireless', Connectivity: 'Bluetooth 5.2, 3.5mm wired', 'Battery life': '30 hours (ANC on)', 'Noise cancellation': 'Dual Noise Sensor + QN1 processor', Microphone: '8-mic array with beamforming', 'Charging time': '3.5 hrs full, 3 min = 3 hrs playback' },
  },
  {
    id: 'hpn-002', category: 'headphones', brand: 'Bose', name: 'Bose QuietComfort Ultra',
    price: 34990, originalPrice: 37900, rating: 4.7, reviews: 1220, stock: 21,
    images: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80'],
    description: 'Immersive spatial audio and the deepest, quietest noise cancellation Bose has ever made.',
    features: ['Immersive Audio mode', 'CustomTune sound calibration', 'Aware mode', 'Plush memory-foam cushions'],
    specs: { Type: 'Over-ear, wireless', Connectivity: 'Bluetooth 5.3, 2.5mm wired', 'Battery life': '24 hours (ANC on)', 'Noise cancellation': 'Adaptive world-class ANC', Microphone: '4-mic array', 'Charging time': '2.5 hrs full, 15 min = 2.5 hrs playback' },
  },
  {
    id: 'hpn-003', category: 'headphones', brand: 'boAt', name: 'boAt Airdopes 141',
    price: 1299, originalPrice: 2990, rating: 4.1, reviews: 18400, stock: 200,
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80'],
    description: 'Budget-friendly true wireless earbuds with punchy bass and a long-lasting case battery for everyday use.',
    features: ['42h total playback', 'IPX4 splash resistance', 'Low-latency gaming mode', 'Touch controls'],
    specs: { Type: 'In-ear, true wireless', Connectivity: 'Bluetooth 5.3', 'Battery life': '6 hrs (42 hrs with case)', 'Noise cancellation': 'ENx environmental noise cancellation (calls)', Microphone: 'Dual mic', 'Charging time': '1.5 hrs full' },
  },
  {
    id: 'hpn-004', category: 'headphones', brand: 'Sennheiser', name: 'Sennheiser Momentum 4',
    price: 24990, originalPrice: 34990, rating: 4.6, reviews: 730, stock: 16,
    images: ['https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'],
    description: 'Audiophile-grade sound with an exceptional 60-hour battery life and adaptive noise cancellation.',
    features: ['60-hour battery', 'Adaptive ANC', 'Sound Personalisation', 'Smart Pause'],
    specs: { Type: 'Over-ear, wireless', Connectivity: 'Bluetooth 5.2, 3.5mm/USB-C wired', 'Battery life': '60 hours (ANC on)', 'Noise cancellation': 'Adaptive ANC', Microphone: '4-mic beamforming array', 'Charging time': '2 hrs full, 10 min = 6 hrs playback' },
  },

  // ---------------- SMARTWATCHES ----------------
  {
    id: 'wch-001', category: 'smartwatches', brand: 'Apple', name: 'Apple Watch Series 9',
    price: 41900, originalPrice: 45900, rating: 4.7, reviews: 980, stock: 24,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'],
    description: 'A brighter display, the new S9 chip, and a double tap gesture make everyday use faster and easier than ever.',
    features: ['Double Tap gesture', 'Always-On Retina display', 'ECG & blood oxygen', 'Crash detection'],
    specs: { Display: '45mm Always-On Retina LTPO OLED', Battery: '18 hours (36h Low Power Mode)', Connectivity: 'GPS + Cellular optional, Wi-Fi, Bluetooth 5.3', 'Water resistance': '50m', Sensors: 'ECG, blood oxygen, temperature', 'Operating system': 'watchOS 10' },
  },
  {
    id: 'wch-002', category: 'smartwatches', brand: 'Noise', name: 'Noise ColorFit Pro 5',
    price: 2299, originalPrice: 5999, rating: 4.0, reviews: 6120, stock: 88,
    images: ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80'],
    description: 'An affordable AMOLED smartwatch with Bluetooth calling and a week-long battery for everyday fitness tracking.',
    features: ['Bluetooth calling', '1.43" AMOLED display', '100+ sports modes', '7-day battery'],
    specs: { Display: '1.43" AMOLED, 466x466', Battery: '7 days typical use', Connectivity: 'Bluetooth 5.2 calling', 'Water resistance': 'IP68', Sensors: 'SpO2, heart rate, sleep', 'Operating system': 'Proprietary RTOS' },
  },

  // ---------------- TABLETS ----------------
  {
    id: 'tab-001', category: 'tablets', brand: 'Apple', name: 'iPad Air (5th Gen)',
    price: 59900, originalPrice: 64900, rating: 4.7, reviews: 845, stock: 19,
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80'],
    description: 'Serious performance in a thin, light design with the powerful M1 chip and support for Apple Pencil (2nd gen).',
    features: ['M1 chip', 'Apple Pencil 2 support', 'Centre Stage front camera', 'USB-C with USB 3 speeds'],
    specs: { Processor: 'Apple M1', 'RAM and storage': '8GB RAM, 64GB storage', Display: '10.9" Liquid Retina, 2360x1640', Camera: '12MP wide + 12MP ultra-wide front', Battery: 'Up to 10 hours', 'Operating system': 'iPadOS 17', Connectivity: 'Wi-Fi 6, optional 5G' },
  },
  {
    id: 'tab-002', category: 'tablets', brand: 'Samsung', name: 'Samsung Galaxy Tab S9',
    price: 72999, originalPrice: 84999, rating: 4.5, reviews: 412, stock: 11,
    images: ['https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80'],
    description: 'An IP68-rated flagship tablet with a stunning Dynamic AMOLED 2X display and a bundled S Pen.',
    features: ['S Pen included', 'IP68 water resistance', 'Dex desktop mode', 'Quad speakers by AKG'],
    specs: { Processor: 'Snapdragon 8 Gen 2 for Galaxy', 'RAM and storage': '12GB RAM, 256GB storage', Display: '11" Dynamic AMOLED 2X, 120Hz', Camera: '13MP main + 12MP front', Battery: '8400mAh', 'Operating system': 'Android 13, One UI 5.1', Connectivity: 'Wi-Fi 6E, optional 5G' },
  },

  // ---------------- GAMING ACCESSORIES ----------------
  {
    id: 'gam-001', category: 'gaming', brand: 'Logitech', name: 'Logitech G Pro X Superlight 2',
    price: 12995, originalPrice: 14995, rating: 4.8, reviews: 1560, stock: 40,
    images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80'],
    description: 'An ultra-lightweight wireless gaming mouse trusted by esports pros, built for speed and precision.',
    features: ['60g ultra-light body', 'HERO 2 32K sensor', '95-hour battery', 'Zero-additive PTFE feet'],
    specs: { Type: 'Wireless gaming mouse', Connectivity: 'LIGHTSPEED wireless, USB-C', 'Battery life': '95 hours', Sensor: 'HERO 2, up to 32,000 DPI', Buttons: '5 programmable', Weight: '60g' },
  },
  {
    id: 'gam-002', category: 'gaming', brand: 'Razer', name: 'Razer BlackWidow V4 Pro',
    price: 18999, originalPrice: 21999, rating: 4.6, reviews: 390, stock: 12,
    images: ['https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=800&q=80'],
    description: 'A premium mechanical keyboard with a dedicated command dial and plush magnetic wrist rest.',
    features: ['Green mechanical switches', 'Command dial + 8 macro keys', 'Doubleshot ABS keycaps', 'Magnetic wrist rest'],
    specs: { Type: 'Mechanical gaming keyboard', Connectivity: 'USB-C wired', 'Switch type': 'Razer Green (tactile & clicky)', Backlight: 'Per-key RGB Chroma', 'Extra controls': 'Command dial, media roller', Weight: '1.75 kg' },
  },

  // ---------------- SPEAKERS ----------------
  {
    id: 'spk-001', category: 'speakers', brand: 'JBL', name: 'JBL Flip 6',
    price: 8999, originalPrice: 11999, rating: 4.5, reviews: 3040, stock: 60,
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80'],
    description: 'A portable Bluetooth speaker with punchy JBL Pro Sound and an IP67 rating for pool-side use.',
    features: ['IP67 waterproof & dustproof', '12 hours playtime', 'PartyBoost pairing', 'Signature JBL sound'],
    specs: { Type: 'Portable Bluetooth speaker', Connectivity: 'Bluetooth 5.1', 'Battery life': '12 hours', 'Water resistance': 'IP67', Output: '20W RMS', Weight: '0.55 kg' },
  },
  {
    id: 'spk-002', category: 'speakers', brand: 'Sonos', name: 'Sonos Era 100',
    price: 24999, originalPrice: 27999, rating: 4.6, reviews: 210, stock: 8,
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80'],
    description: 'Rich, room-filling stereo sound with support for Wi-Fi, Bluetooth, Trueplay tuning, and voice control.',
    features: ['Trueplay auto-tuning', 'Built-in mic for voice control', 'Wi-Fi + Bluetooth', 'Stereo pairing support'],
    specs: { Type: 'Smart home speaker', Connectivity: 'Wi-Fi, Bluetooth 5.0, USB-C line-in', 'Battery life': 'Mains powered', 'Water resistance': 'IP54', Output: 'Dual tweeters + mid-woofer', Weight: '2.02 kg' },
  },

  // ---------------- ACCESSORIES ----------------
  {
    id: 'acc-001', category: 'accessories', brand: 'Anker', name: 'Anker 737 Power Bank (140W)',
    price: 8999, originalPrice: 10999, rating: 4.5, reviews: 1440, stock: 45,
    images: ['https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80'],
    description: 'A 24,000mAh power bank with a smart digital display and enough output to fast-charge a laptop.',
    features: ['140W max output', 'Digital charge display', 'GaN II tech for compact size', 'Charges 3 devices at once'],
    specs: { Type: 'Power bank', Capacity: '24,000mAh', 'Output ports': '2x USB-C, 1x USB-A', 'Max output': '140W', Weight: '0.62 kg' },
  },
  {
    id: 'acc-002', category: 'accessories', brand: 'Samsung', name: 'Samsung 25W USB-C Charger',
    price: 1499, originalPrice: 1999, rating: 4.3, reviews: 980, stock: 120,
    images: ['https://m.media-amazon.com/images/I/61duyz5iSKL._AC_.jpg'],
    description: 'A compact fast charger that gets your phone from 0 to 50% in about 30 minutes.',
    features: ['Super-fast charging 2.0', 'Compact travel-friendly size', 'Overcharge protection'],
    specs: { Type: 'Wall charger', Capacity: 'N/A', 'Output ports': '1x USB-C', 'Max output': '25W', Weight: '0.04 kg' },
  },
]

// Pure helpers — accept a product list so callers can pass either the static
// seed above or the live list from ProductsContext (which the admin can edit).
export const findProductById = (list, id) => list.find((p) => p.id === id)
export const getRelated = (list, product, count = 4) =>
  list.filter((p) => p.category === product.category && p.id !== product.id).slice(0, count)
