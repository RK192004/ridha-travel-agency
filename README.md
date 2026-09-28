# ✈️ RIDHA Travel Agency - Modern React Web Application

A full-featured, responsive React application for **RIDHA Travel Agency** built with React, JSX, modern built-in & custom hooks, and dynamic pricing engines.

---

## 🌟 Real-World Problems Solved

1. **Dynamic Catalog Search & Multi-Factor Filtering**:
   - Live search by destination keyword, country, or vibe with debounce (`useDebounce`).
   - Category filtering (Romantic, Luxury, Adventure, Family).
   - Dynamic budget range slider with instant conversion.
   - Sorting by featured pick, price (low-high / high-low), rating, and duration.
   - Dual viewing modes: Modern Card Grid vs. Interactive Comparison Table.

2. **Trip Customizer & Dynamic Pricing Engine**:
   - Customize travelers (Adults & discounted Child fares).
   - Real-time departure date picker with calendar constraints.
   - Hotel tier upgrades (Standard 3★, Deluxe 4★, Ultra-Luxury 5★).
   - Add-on services: Comprehensive Travel Insurance, VIP Airport Chauffeur, Fast-Track City Pass.
   - Promo coupon engine (`RIDHA10` for 10% off, `FIRSTTRIP` for ₹5,000 off, `GLOBAL20`).
   - Dynamic itemized cost breakdown with live recalculation.

3. **Self-Service Booking & Reservation Hub**:
   - Instant booking confirmation receipt modal with generated unique Booking IDs (`RIDHA-XXXXX`).
   - Printable / saveable itinerary vouchers (`window.print()`).
   - Dedicated "My Bookings" manager with live status badges and trip cancellation.
   - State persistent across browser reloads using `useLocalStorage`.

4. **Multi-Currency Global Support**:
   - Live switching between **INR (₹)**, **USD ($)**, **EUR (€)**, and **AED (د.إ)** powered by custom hook `useCurrency`.

5. **Saved Dream Trips (Wishlist)**:
   - Save favorite destinations with animated heart toggle and slide-in drawer.

6. **Interactive Testimonials & Inquiry System**:
   - Interactive star rating picker and review submission.
   - Inquiry contact form with instant validation and feedback.

---

## 🏗️ Project Architecture & Components

```
ridha-travel-agency/
├── index.html                   # HTML mount point
├── vite.config.js               # Vite build configuration
├── package.json                 # Dependencies (React 18, Vite, Lucide Icons)
├── legacy-index.html            # Original static HTML backup
├── legacy-style.css             # Original static CSS backup
└── src/
    ├── main.jsx                 # React root renderer
    ├── App.jsx                  # Main coordinator with state & modal management
    ├── App.css                  # Modern responsive design & print stylesheet
    ├── index.css                # CSS reset & color design tokens
    ├── data/
    │   └── packagesData.js      # Rich travel packages, initial reviews, add-ons
    ├── hooks/
    │   ├── useLocalStorage.js   # Generic reactive localStorage sync hook
    │   ├── useCurrency.js       # Multi-currency conversion & formatting hook
    │   └── useDebounce.js       # Debounced search input hook
    └── components/
        ├── Navbar.jsx           # Currency switch, wishlist count, bookings count
        ├── HeroBanner.jsx       # Hero banner with interactive search card
        ├── FilterSection.jsx    # Category pills, budget slider, sort selector
        ├── PackageCard.jsx      # Card with ratings, tags, wishlist toggle, booking CTA
        ├── TripCustomizerModal.jsx # Multi-step customizer & dynamic pricing breakdown
        ├── BookingConfirmationModal.jsx # Printable confirmation receipt
        ├── MyBookingsModal.jsx  # Self-service booking management & cancellation
        ├── WishlistDrawer.jsx   # Slide-in drawer for bookmarked trips
        ├── ReviewsSection.jsx   # Testimonials with interactive star rating form
        ├── ContactSection.jsx   # Contact info & interactive inquiry form
        └── Footer.jsx           # Agency footer with navigation links
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

### 3. Build for Production
```bash
npm run build
```
Generates production-optimized assets in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```
