# ToyFactory India — Deployment Guide

## ✅ Production-Ready Website Summary

### What's Built:
- **Homepage** with hero, gender filters, categories, featured products, live orders ticker, stats, reviews, SEO cities section
- **Product Listing** (`/products`) with filters: gender, category, price, rating, sort
- **Product Detail** (`/products/[id]`) with 5 images, reviews, specs, add to cart, buy now, Razorpay
- **Cart** (`/cart`) with qty management, savings display, Korea tour promo
- **Checkout** (`/checkout`) with full address form, Razorpay & COD payment
- **Order Success** (`/orders/success`) with confirmation, payment ID
- **Favourites** (`/favorites`) saved across sessions
- **All Static Pages:** About Us, Contact Us, Privacy, Terms, Shipping, Returns, Toy Safety, Age Policy
- **Recent Orders Ticker** (top bar) with live-feed effect
- **SEO** with geo meta tags, schema.org structured data, India-wide city keywords

### Product Categories:
- Kids Toys: Hot Wheels, Plush, Dolls, Teddies, Ride-On Cars, Scooters, Kitchen Sets, Dollhouses
- STEM & Educational
- Collectibles & Blind Boxes
- Adult Wellness (18+): Massagers, Supplements, Skincare, Couples Kits

### Gender Filters: Boys, Girls, Men, Women, Adults 18+, Unisex, LGBTQ+, Trans & Non-Binary

---

## 🚀 Deploy to Vercel (Recommended — FREE)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd toyfactory
   vercel --prod
   ```

4. **Set Environment Variables in Vercel Dashboard:**
   - `RAZORPAY_KEY_ID` = your Razorpay key ID (from razorpay.com dashboard)
   - `RAZORPAY_KEY_SECRET` = your Razorpay key secret
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` = same as RAZORPAY_KEY_ID

---

## 💳 Razorpay Setup (Payment Gateway)

1. Sign up at **https://razorpay.com**
2. Complete KYC verification
3. Get Test Keys from Dashboard → Settings → API Keys
4. Replace in `.env.local`:
   ```
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
   ```
5. For production, use Live Keys (requires KYC approval)

---

## 🏠 Registered Business Address (for all legal pages)

**ToyFactory India Pvt. Ltd.**  
42, Sector 18, Atta Market  
Noida, Uttar Pradesh 201301  
India

Phone: +91-9310-123456  
Email: hello@toyfactoryindia.com

---

## 📂 Project Structure

```
toyfactory/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Root layout with SEO
│   │   ├── globals.css
│   │   ├── products/
│   │   │   ├── page.tsx          # Product listing with filters
│   │   │   └── [id]/page.tsx     # Product detail
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx     # Razorpay + COD
│   │   ├── favorites/page.tsx
│   │   ├── orders/
│   │   │   ├── page.tsx
│   │   │   └── success/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── shipping/page.tsx
│   │   ├── refunds/page.tsx
│   │   ├── toy-safety/page.tsx
│   │   ├── age-policy/page.tsx
│   │   └── api/razorpay/create-order/route.ts
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   └── RecentOrdersTicker.tsx
│   └── lib/
│       ├── store.ts              # Zustand cart + favorites
│       └── data/products.ts     # All products, categories, reviews
├── .env.local                   # Add your Razorpay keys
└── vercel.json                  # Vercel config (Mumbai region)
```
