import React, { useState } from 'react';
import { Compass, Heart, Briefcase, Menu, X } from 'lucide-react';

export default function Navbar({
  currencyCode,
  setCurrencyCode,
  availableCurrencies,
  wishlistCount,
  onOpenWishlist,
  bookingsCount,
  onOpenBookings
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="site-header">
      {/* Top Banner Notice */}
      <div className="top-notice-bar">
        <div className="container notice-content">
          <span>✨ Special Season Offer: Use coupon code <strong>RIDHA10</strong> for 10% instant off!</span>
          <div className="notice-links">
            <span>24/7 Support: +91 98765 43210</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="main-navbar">
        <div className="container nav-container">
          <div className="brand" onClick={() => scrollTo('home')}>
            <div className="brand-logo-wrap">
              <Compass className="brand-icon" size={28} />
            </div>
            <div className="brand-text">
              <span className="brand-name">RIDHA</span>
              <span className="brand-subtitle">TRAVEL AGENCY</span>
            </div>
          </div>

          <div className={`nav-links ${mobileMenuOpen ? 'nav-links-mobile-open' : ''}`}>
            <button className="nav-link" onClick={() => scrollTo('home')}>Home</button>
            <button className="nav-link" onClick={() => scrollTo('destinations')}>Destinations</button>
            <button className="nav-link" onClick={() => scrollTo('packages')}>Packages</button>
            <button className="nav-link" onClick={() => scrollTo('reviews')}>Reviews</button>
            <button className="nav-link" onClick={() => scrollTo('contact')}>Contact</button>
          </div>

          <div className="nav-actions">
            {/* Currency Selector */}
            <div className="currency-selector-wrap">
              <select
                aria-label="Select Currency"
                value={currencyCode}
                onChange={(e) => setCurrencyCode(e.target.value)}
                className="currency-select"
              >
                {availableCurrencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Wishlist Button */}
            <button
              className="action-btn wishlist-btn"
              onClick={onOpenWishlist}
              title="Saved Wishlist"
              aria-label="Saved Wishlist"
            >
              <Heart size={20} className={wishlistCount > 0 ? 'heart-active' : ''} />
              {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
            </button>

            {/* My Bookings Button */}
            <button
              className="action-btn bookings-btn"
              onClick={onOpenBookings}
              title="My Bookings"
              aria-label="My Bookings"
            >
              <Briefcase size={20} />
              <span>Bookings</span>
              {bookingsCount > 0 && <span className="action-badge count-highlight">{bookingsCount}</span>}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
