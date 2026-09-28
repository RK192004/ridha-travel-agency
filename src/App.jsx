import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import FilterSection from './components/FilterSection';
import PackageCard from './components/PackageCard';
import TripCustomizerModal from './components/TripCustomizerModal';
import BookingConfirmationModal from './components/BookingConfirmationModal';
import MyBookingsModal from './components/MyBookingsModal';
import WishlistDrawer from './components/WishlistDrawer';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

import { TRAVEL_PACKAGES, INITIAL_REVIEWS } from './data/packagesData';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useCurrency } from './hooks/useCurrency';
import { useDebounce } from './hooks/useDebounce';
import { LayoutGrid, Table, Search, Sparkles, ArrowRight } from 'lucide-react';
import './App.css';

export default function App() {
  // --- Persistent Storage State ---
  const [wishlistIds, setWishlistIds] = useLocalStorage('ridha_wishlist', ['pkg-paris', 'pkg-switzerland']);
  const [bookings, setBookings] = useLocalStorage('ridha_bookings', [
    {
      bookingId: 'RIDHA-849201',
      createdAt: '2026-03-15T10:00:00.000Z',
      packageId: 'pkg-dubai',
      packageTitle: 'Dubai (4D/3N)',
      destination: 'Dubai',
      country: 'United Arab Emirates',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80',
      departureDate: '2026-05-10',
      adults: 2,
      children: 0,
      hotelTier: 'Deluxe Upgrade (4-Star)',
      addons: ['Comprehensive Travel & Medical Insurance'],
      leadName: 'Sameer Khan',
      leadEmail: 'sameer.k@example.com',
      leadPhone: '+91 9876543210',
      specialRequests: 'High floor with city view',
      appliedPromo: 'RIDHA10',
      subtotal: 139000,
      discountAmount: 13900,
      grandTotal: 125100,
      status: 'Confirmed'
    }
  ]);
  const [reviews, setReviews] = useLocalStorage('ridha_reviews', INITIAL_REVIEWS);

  // --- Currency Hook ---
  const {
    currencyCode,
    setCurrencyCode,
    availableCurrencies,
    formatPrice
  } = useCurrency('INR');

  // --- Search & Filter States ---
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 250);

  const [guestCount, setGuestCount] = useState(2);
  const [selectedMonth, setSelectedMonth] = useState('May 2026');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Min and Max budget bounds
  const minPossibleBudget = useMemo(() => {
    return Math.min(...TRAVEL_PACKAGES.map((p) => p.basePrice));
  }, []);

  const maxPossibleBudget = useMemo(() => {
    return Math.max(...TRAVEL_PACKAGES.map((p) => p.basePrice));
  }, []);

  const [maxBudget, setMaxBudget] = useState(maxPossibleBudget);

  // --- Modals State ---
  const [customizingPackage, setCustomizingPackage] = useState(null);
  const [recentConfirmation, setRecentConfirmation] = useState(null);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Available unique categories
  const categories = useMemo(() => {
    return ['All', ...new Set(TRAVEL_PACKAGES.map((p) => p.category))];
  }, []);

  // Filtered and Sorted Packages calculation with useMemo
  const filteredPackages = useMemo(() => {
    return TRAVEL_PACKAGES.filter((pkg) => {
      // Search term filter
      if (debouncedSearch.trim()) {
        const query = debouncedSearch.toLowerCase();
        const matchesName = pkg.destination.toLowerCase().includes(query);
        const matchesCountry = pkg.country.toLowerCase().includes(query);
        const matchesDesc = pkg.description.toLowerCase().includes(query);
        const matchesCategory = pkg.category.toLowerCase().includes(query);
        if (!matchesName && !matchesCountry && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'All' && pkg.category !== selectedCategory) {
        return false;
      }

      // Budget filter
      if (pkg.basePrice > maxBudget) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      if (sortBy === 'duration-desc') return b.durationDays - a.durationDays;
      // Default: featured pick
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [debouncedSearch, selectedCategory, maxBudget, sortBy]);

  // Wishlisted packages list
  const wishlistPackages = useMemo(() => {
    return TRAVEL_PACKAGES.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  // Dynamic Document Title
  useEffect(() => {
    if (bookings.length > 0) {
      document.title = `RIDHA Travel Agency (${bookings.length} Bookings)`;
    } else {
      document.title = 'RIDHA Travel Agency | Explore the World';
    }
  }, [bookings.length]);

  // --- Handlers ---
  const handleToggleWishlist = useCallback((packageId) => {
    setWishlistIds((prev) =>
      prev.includes(packageId)
        ? prev.filter((id) => id !== packageId)
        : [...prev, packageId]
    );
  }, [setWishlistIds]);

  const handleResetFilters = useCallback(() => {
    setSelectedCategory('All');
    setMaxBudget(maxPossibleBudget);
    setSortBy('featured');
    setSearchQuery('');
  }, [maxPossibleBudget]);

  const handleSearchSubmit = () => {
    const el = document.getElementById('packages');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleConfirmBooking = useCallback((bookingRecord) => {
    setBookings((prev) => [bookingRecord, ...prev]);
    setCustomizingPackage(null);
    setRecentConfirmation(bookingRecord);
  }, [setBookings]);

  const handleCancelBooking = useCallback((bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.bookingId === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
  }, [setBookings]);

  const handleAddReview = useCallback((newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  }, [setReviews]);

  return (
    <div className="app-root">
      {/* Navigation */}
      <Navbar
        currencyCode={currencyCode}
        setCurrencyCode={setCurrencyCode}
        availableCurrencies={availableCurrencies}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        bookingsCount={bookings.filter((b) => b.status === 'Confirmed').length}
        onOpenBookings={() => setIsMyBookingsOpen(true)}
      />

      {/* Hero Banner with Quick Search */}
      <HeroBanner
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        guestCount={guestCount}
        setGuestCount={setGuestCount}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* About Agency Section (Honoring original content) */}
      <section className="about-section">
        <div className="container about-container">
          <span className="section-sub-title">Our Heritage & Promise</span>
          <h2 className="section-main-title">About RIDHA Travel Agency</h2>
          <p className="about-text">
            RIDHA Travel Agency helps you explore amazing destinations with affordable travel packages and unforgettable experiences.
            We provide customized trips, comfortable stays, and exciting adventures for travellers around the world.
            Whether you dream of European romance, desert safaris, tropical islands, or alpine summits, our travel curators tailor every itinerary to perfection.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-num">01</div>
              <h4>Bespoke Packages</h4>
              <p>Flexible itineraries tailored to solo explorers, couples, and large family groups.</p>
            </div>
            <div className="feature-card">
              <div className="feature-num">02</div>
              <h4>Transparent Pricing</h4>
              <p>Zero hidden fees. All government taxes, airport transfers, and hotel permits clearly itemized.</p>
            </div>
            <div className="feature-card">
              <div className="feature-num">03</div>
              <h4>24/7 Ground Assistance</h4>
              <p>English and multilingual local tour managers ensuring your safety throughout.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations & Packages Section */}
      <section id="packages" className="packages-section">
        <div className="container">
          <div className="packages-header">
            <div>
              <span className="section-sub-title">Curated Itineraries</span>
              <h2 className="section-main-title">Explore Our Travel Packages</h2>
            </div>

            {/* View Switcher: Grid vs Comparison Table */}
            <div className="view-toggle-wrap">
              <button
                className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid Card View"
              >
                <LayoutGrid size={18} />
                <span>Cards</span>
              </button>
              <button
                className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                title="Comparison Table View"
              >
                <Table size={18} />
                <span>Compare Table</span>
              </button>
            </div>
          </div>

          {/* Interactive Filter Control Panel */}
          <FilterSection
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            maxBudget={maxBudget}
            setMaxBudget={setMaxBudget}
            minPossibleBudget={minPossibleBudget}
            maxPossibleBudget={maxPossibleBudget}
            sortBy={sortBy}
            setSortBy={setSortBy}
            resultCount={filteredPackages.length}
            totalCount={TRAVEL_PACKAGES.length}
            onResetFilters={handleResetFilters}
            formatPrice={formatPrice}
          />

          {/* Packages Display Area */}
          {filteredPackages.length === 0 ? (
            <div className="no-results-box">
              <Search size={40} className="no-res-icon" />
              <h3>No Travel Packages Match Your Criteria</h3>
              <p>Try increasing your budget filter, removing search terms, or exploring other categories.</p>
              <button className="reset-filters-cta" onClick={handleResetFilters}>
                Clear All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="packages-grid">
              {filteredPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  isWishlisted={wishlistIds.includes(pkg.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onSelectPackage={setCustomizingPackage}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          ) : (
            /* Interactive Comparison Table (Modern evolution of original table) */
            <div className="table-responsive-wrapper">
              <table className="interactive-packages-table">
                <thead>
                  <tr className="table-super-header">
                    <th colSpan="6">RIDHA Special Travel Packages Comparison</th>
                  </tr>
                  <tr className="table-column-headers">
                    <th>Destination</th>
                    <th>Category</th>
                    <th>Duration</th>
                    <th>Highlights</th>
                    <th>Starting Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPackages.map((pkg) => (
                    <tr key={pkg.id}>
                      <td className="dest-cell">
                        <div className="table-dest-flex">
                          <img src={pkg.image} alt={pkg.destination} className="table-dest-thumb" />
                          <div>
                            <strong>{pkg.destination}</strong>
                            <span className="table-country">{pkg.country}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="table-category-tag">{pkg.category}</span>
                      </td>
                      <td>{pkg.durationDays} Days / {pkg.durationNights} Nights</td>
                      <td className="table-highlights-cell">
                        {pkg.highlights[0]} & {pkg.highlights[1]}
                      </td>
                      <td className="table-price-cell">
                        <strong>{formatPrice(pkg.basePrice)}</strong>
                        <span className="per-person">/ person</span>
                      </td>
                      <td>
                        <button
                          className="table-book-btn"
                          onClick={() => setCustomizingPackage(pkg)}
                        >
                          <span>Book</span>
                          <ArrowRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <ReviewsSection reviews={reviews} onAddReview={handleAddReview} />

      {/* Contact & Tourism Information */}
      <ContactSection />

      {/* Footer */}
      <Footer onSelectCategory={(cat) => {
        setSelectedCategory(cat);
        const el = document.getElementById('packages');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* --- Modals & Drawers --- */}

      {/* Trip Customizer & Dynamic Pricing Modal */}
      {customizingPackage && (
        <TripCustomizerModal
          pkg={customizingPackage}
          onClose={() => setCustomizingPackage(null)}
          onConfirmBooking={handleConfirmBooking}
          formatPrice={formatPrice}
          initialGuestCount={guestCount}
          initialMonth={selectedMonth}
        />
      )}

      {/* Booking Confirmation Receipt */}
      {recentConfirmation && (
        <BookingConfirmationModal
          booking={recentConfirmation}
          onClose={() => setRecentConfirmation(null)}
          onViewMyBookings={() => setIsMyBookingsOpen(true)}
          formatPrice={formatPrice}
        />
      )}

      {/* My Bookings Self-Service Drawer/Modal */}
      {isMyBookingsOpen && (
        <MyBookingsModal
          bookings={bookings}
          onClose={() => setIsMyBookingsOpen(false)}
          onCancelBooking={handleCancelBooking}
          formatPrice={formatPrice}
        />
      )}

      {/* Saved Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistPackages={wishlistPackages}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectPackage={setCustomizingPackage}
        formatPrice={formatPrice}
      />
    </div>
  );
}
