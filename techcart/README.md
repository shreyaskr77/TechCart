# TechCart

A modern electronics e-commerce web application built with React, Vite, React Router,
and the Context API. This is **Stage 1** of the project as specified in the brief:
a complete, fully working frontend shopping experience with realistic sample data
(products, categories, orders). Authentication is a working mock (stored in
localStorage) and checkout/payment is a simulated flow — no real backend, database,
or payment gateway is wired up yet. Stage 2 (Node/Express + MongoDB + JWT + Razorpay
test mode) can be layered on top of this frontend without changing its structure,
since all data access already goes through small service-like modules in `src/data`
and `src/context` that can be swapped for real API calls.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## What works

- Home page: hero, shop-by-category, featured/trending products, offers banner, newsletter, footer.
- Shop page: search, category/brand/price/rating/availability/discount filters, sorting, responsive grid, empty states.
- Product details: image gallery, specs table (category-specific), quantity selector, add to cart / buy now / wishlist / compare, reviews, related products.
- Cart: quantity controls, stock-aware limits, coupon codes, tax + delivery calculation, persists to localStorage.
- Wishlist: add/remove, move to cart, persists to localStorage.
- Compare: up to 4 products side by side, category-specific spec rows, differences highlighted.
- Auth: register/login (mock, localStorage-backed, password "hashed" client-side for demo only), forgot-password stub.
- Account: profile, addresses, order history/tracking, cancel eligible orders.
- Checkout: 4-step flow (address → summary → payment → confirmation) with a simulated payment step and generated order ID.
- Admin dashboard: overview stats, product CRUD (in-memory + localStorage), order status management, customer list. Gated to a demo admin account.

## Demo accounts

- Customer: register any new account, or log in with `demo@techcart.in` / `Demo@1234`.
- Admin: log in with `admin@techcart.in` / `Admin@1234`.

## Try coupon codes at checkout

`TECH10`, `WELCOME50`, `SAVE500`
