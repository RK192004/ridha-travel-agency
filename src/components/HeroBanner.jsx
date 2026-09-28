import React from 'react';
import { Search, Calendar, Users, ShieldCheck, Award, HeartHandshake, Sparkles } from 'lucide-react';

export default function HeroBanner({
  searchQuery,
  setSearchQuery,
  guestCount,
  setGuestCount,
  selectedMonth,
  setSelectedMonth,
  onSearchSubmit
}) {
  const months = ['Anytime', 'April 2026', 'May 2026', 'June 2026', 'July 2026', 'Autumn 2026'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="hero-badge">
          <Sparkles size={16} /> <span>Your Premier Travel Partner</span>
        </div>
        <h1 className="hero-title">
          Explore the World, <br />
          <span className="hero-title-accent">Create Memories That Last.</span>
        </h1>
        <p className="hero-description">
          From Paris to Bali, the Swiss Alps to desert dunes of Dubai. RIDHA Travel Agency designs custom luxury, adventure, and family getaways with uncompromised hospitality.
        </p>

        {/* Interactive Quick Search Widget */}
        <form className="hero-search-card" onSubmit={handleSubmit}>
          <div className="search-field">
            <label htmlFor="hero-search-input">
              <Search size={18} className="field-icon" />
              <span>Where to?</span>
            </label>
            <input
              id="hero-search-input"
              type="text"
              placeholder="e.g. Paris, Dubai, Bali..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="search-field">
            <label htmlFor="hero-month-select">
              <Calendar size={18} className="field-icon" />
              <span>When</span>
            </label>
            <select
              id="hero-month-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="search-field">
            <label htmlFor="hero-guests-select">
              <Users size={18} className="field-icon" />
              <span>Travelers</span>
            </label>
            <select
              id="hero-guests-select"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
            >
              <option value={1}>1 Solo Explorer</option>
              <option value={2}>2 Adults (Couple)</option>
              <option value={3}>3 Travelers (Small Group)</option>
              <option value={4}>4+ Travelers (Family)</option>
            </select>
          </div>

          <button type="submit" className="search-submit-btn">
            <Search size={20} />
            <span>Search Packages</span>
          </button>
        </form>

        {/* Trust Badges */}
        <div className="hero-trust-bar">
          <div className="trust-item">
            <ShieldCheck size={20} className="trust-icon" />
            <span>100% Verified Hotels</span>
          </div>
          <div className="trust-item">
            <Award size={20} className="trust-icon" />
            <span>Best Price Guarantee</span>
          </div>
          <div className="trust-item">
            <HeartHandshake size={20} className="trust-icon" />
            <span>24/7 Dedicated Concierge</span>
          </div>
        </div>
      </div>
    </section>
  );
}
