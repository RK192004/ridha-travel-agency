import React, { useState, useMemo } from 'react';
import { X, Users, Calendar, Hotel, ShieldPlus, Tag, Check, AlertCircle } from 'lucide-react';
import { HOTEL_TIERS, ADDONS, PROMO_CODES } from '../data/packagesData';

export default function TripCustomizerModal({
  pkg,
  onClose,
  onConfirmBooking,
  formatPrice,
  initialGuestCount = 2,
  initialMonth = 'May 2026'
}) {
  // Customization state
  const [adults, setAdults] = useState(initialGuestCount);
  const [children, setChildren] = useState(0);
  const [departureDate, setDepartureDate] = useState('');
  const [selectedHotelTier, setSelectedHotelTier] = useState(HOTEL_TIERS[0].id);
  const [selectedAddons, setSelectedAddons] = useState({
    insurance: true,
    airportTransfer: false,
    guidedPass: false
  });

  // Promo code state
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  // Traveler contact state
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [validationError, setValidationError] = useState('');

  // Dynamic cost computations using useMemo
  const chosenTier = useMemo(() => {
    return HOTEL_TIERS.find((t) => t.id === selectedHotelTier) || HOTEL_TIERS[0];
  }, [selectedHotelTier]);

  const totalTravelers = adults + children;

  const baseTotal = useMemo(() => {
    // Children pay 60% of base fare
    const adultFare = pkg.basePrice * adults;
    const childFare = (pkg.basePrice * 0.6) * children;
    return adultFare + childFare;
  }, [pkg.basePrice, adults, children]);

  const hotelUpgradeTotal = useMemo(() => {
    return chosenTier.priceModifier * totalTravelers;
  }, [chosenTier, totalTravelers]);

  const addonsTotal = useMemo(() => {
    let sum = 0;
    ADDONS.forEach((addon) => {
      if (selectedAddons[addon.id]) {
        // Insurance is per traveler; airport transfer is per party
        if (addon.id === 'insurance') {
          sum += addon.price * totalTravelers;
        } else {
          sum += addon.price;
        }
      }
    });
    return sum;
  }, [selectedAddons, totalTravelers]);

  const subtotal = baseTotal + hotelUpgradeTotal + addonsTotal;

  // Calculate Discount
  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.discountPercent) {
      return Math.round((subtotal * appliedPromo.discountPercent) / 100);
    }
    if (appliedPromo.discountFixed) {
      return Math.min(appliedPromo.discountFixed, subtotal);
    }
    return 0;
  }, [appliedPromo, subtotal]);

  const grandTotal = Math.max(0, subtotal - discountAmount);

  // Toggle Addon
  const handleToggleAddon = (addonId) => {
    setSelectedAddons((prev) => ({
      ...prev,
      [addonId]: !prev[addonId]
    }));
  };

  // Apply Promo Code
  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    const promo = PROMO_CODES[code];
    if (!promo) {
      setPromoError('Invalid coupon code. Try RIDHA10 or FIRSTTRIP');
      setAppliedPromo(null);
      return;
    }

    if (promo.minSpend && subtotal < promo.minSpend) {
      setPromoError(`Minimum spend of ${formatPrice(promo.minSpend)} required for this code.`);
      setAppliedPromo(null);
      return;
    }

    setAppliedPromo({ ...promo, code });
    setPromoError('');
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoError('');
  };

  // Submit Booking
  const handleSubmitBooking = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!leadName.trim()) {
      setValidationError('Please enter lead traveler full name.');
      return;
    }
    if (!leadEmail.trim() || !leadEmail.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    if (!leadPhone.trim() || leadPhone.length < 8) {
      setValidationError('Please enter a valid contact phone number.');
      return;
    }
    if (!departureDate) {
      setValidationError('Please select your preferred departure date.');
      return;
    }

    const bookingRecord = {
      bookingId: `RIDHA-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      packageId: pkg.id,
      packageTitle: `${pkg.destination} (${pkg.durationDays}D/${pkg.durationNights}N)`,
      destination: pkg.destination,
      country: pkg.country,
      image: pkg.image,
      departureDate,
      adults,
      children,
      hotelTier: chosenTier.name,
      addons: Object.keys(selectedAddons)
        .filter((k) => selectedAddons[k])
        .map((k) => ADDONS.find((a) => a.id === k)?.name),
      leadName,
      leadEmail,
      leadPhone,
      specialRequests,
      appliedPromo: appliedPromo ? appliedPromo.code : null,
      subtotal,
      discountAmount,
      grandTotal,
      status: 'Confirmed'
    };

    onConfirmBooking(bookingRecord);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content customizer-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-sub">Customizing Travel Package</span>
            <h2 className="modal-title">{pkg.destination} Experience</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={22} />
          </button>
        </div>

        <div className="customizer-grid">
          {/* Left Column: Customization Options */}
          <div className="customizer-options-col">
            {/* Step 1: Travelers */}
            <div className="step-card">
              <div className="step-heading">
                <Users size={18} className="step-icon" />
                <h3>1. Select Travelers</h3>
              </div>
              <div className="traveler-steppers">
                <div className="stepper-item">
                  <div className="stepper-meta">
                    <span className="stepper-label">Adults (12+ yrs)</span>
                    <span className="stepper-sub">{formatPrice(pkg.basePrice)} each</span>
                  </div>
                  <div className="stepper-controls">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                    >
                      -
                    </button>
                    <span className="stepper-num">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="stepper-item">
                  <div className="stepper-meta">
                    <span className="stepper-label">Children (2-11 yrs)</span>
                    <span className="stepper-sub">{formatPrice(pkg.basePrice * 0.6)} (40% off)</span>
                  </div>
                  <div className="stepper-controls">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                    >
                      -
                    </button>
                    <span className="stepper-num">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Departure Date */}
            <div className="step-card">
              <div className="step-heading">
                <Calendar size={18} className="step-icon" />
                <h3>2. Departure Date</h3>
              </div>
              <div className="date-input-wrap">
                <label htmlFor="departure-date">Select Preferred Departure:</label>
                <input
                  id="departure-date"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="custom-date-input"
                />
              </div>
            </div>

            {/* Step 3: Hotel Tier */}
            <div className="step-card">
              <div className="step-heading">
                <Hotel size={18} className="step-icon" />
                <h3>3. Choose Hotel Category</h3>
              </div>
              <div className="hotel-tiers-list">
                {HOTEL_TIERS.map((tier) => (
                  <label
                    key={tier.id}
                    className={`hotel-tier-option ${selectedHotelTier === tier.id ? 'tier-selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="hotelTier"
                      value={tier.id}
                      checked={selectedHotelTier === tier.id}
                      onChange={() => setSelectedHotelTier(tier.id)}
                    />
                    <div className="tier-info">
                      <div className="tier-header-line">
                        <span className="tier-name">{tier.name}</span>
                        <span className="tier-price">
                          {tier.priceModifier === 0
                            ? 'Included'
                            : `+${formatPrice(tier.priceModifier)} / person`}
                        </span>
                      </div>
                      <p className="tier-desc">{tier.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 4: Optional Add-ons */}
            <div className="step-card">
              <div className="step-heading">
                <ShieldPlus size={18} className="step-icon" />
                <h3>4. Travel Protection & Experience Add-ons</h3>
              </div>
              <div className="addons-list">
                {ADDONS.map((addon) => (
                  <label
                    key={addon.id}
                    className={`addon-option ${selectedAddons[addon.id] ? 'addon-selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={!!selectedAddons[addon.id]}
                      onChange={() => handleToggleAddon(addon.id)}
                    />
                    <div className="addon-info">
                      <div className="addon-header-line">
                        <span className="addon-name">{addon.name}</span>
                        <span className="addon-price">
                          +{formatPrice(addon.price)}
                          {addon.id === 'insurance' ? ' / person' : ' total'}
                        </span>
                      </div>
                      <p className="addon-desc">{addon.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 5: Contact Details */}
            <div className="step-card">
              <div className="step-heading">
                <Users size={18} className="step-icon" />
                <h3>5. Lead Traveler Information</h3>
              </div>
              <div className="contact-form-fields">
                <div className="form-group">
                  <label htmlFor="lead-name">Full Name (As on Passport/Gov ID) *</label>
                  <input
                    id="lead-name"
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="lead-email">Email Address *</label>
                    <input
                      id="lead-email"
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lead-phone">Mobile Number *</label>
                    <input
                      id="lead-phone"
                      type="tel"
                      placeholder="e.g. +91 9876543210"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="special-requests">Special Requests / Dietary Preferences</label>
                  <textarea
                    id="special-requests"
                    rows={2}
                    placeholder="e.g. Vegetarian meals, high floor room, honeymoon bed decoration..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Price Summary & Promo Engine */}
          <div className="customizer-summary-col">
            <div className="summary-sticky-card">
              <div className="summary-package-preview">
                <img src={pkg.image} alt={pkg.destination} className="summary-img" />
                <div>
                  <h4 className="summary-dest">{pkg.destination}</h4>
                  <p className="summary-duration">{pkg.durationDays} Days • {pkg.durationNights} Nights</p>
                </div>
              </div>

              {/* Coupon Engine */}
              <div className="promo-box">
                <label htmlFor="coupon-code">
                  <Tag size={15} /> Have a Promo Code?
                </label>
                {appliedPromo ? (
                  <div className="promo-active-badge">
                    <div className="promo-info">
                      <Check size={16} className="check-icon" />
                      <span><strong>{appliedPromo.code}</strong> applied ({appliedPromo.label})</span>
                    </div>
                    <button type="button" className="remove-promo-btn" onClick={handleRemovePromo}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="promo-input-row">
                    <input
                      id="coupon-code"
                      type="text"
                      placeholder="e.g. RIDHA10"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    />
                    <button type="button" onClick={handleApplyPromo} className="apply-btn">
                      Apply
                    </button>
                  </div>
                )}
                {promoError && <p className="promo-error">{promoError}</p>}
                <p className="promo-hint">💡 Try <strong>RIDHA10</strong> for 10% instant off</p>
              </div>

              {/* Live Cost Breakdown Table */}
              <div className="cost-breakdown">
                <h4>Pricing Breakdown</h4>
                <div className="breakdown-row">
                  <span>Base Package ({adults} {adults > 1 ? 'Adults' : 'Adult'})</span>
                  <span>{formatPrice(pkg.basePrice * adults)}</span>
                </div>

                {children > 0 && (
                  <div className="breakdown-row">
                    <span>Child Fare ({children} {children > 1 ? 'Children' : 'Child'})</span>
                    <span>{formatPrice(pkg.basePrice * 0.6 * children)}</span>
                  </div>
                )}

                {hotelUpgradeTotal > 0 && (
                  <div className="breakdown-row">
                    <span>Hotel ({chosenTier.name})</span>
                    <span>+{formatPrice(hotelUpgradeTotal)}</span>
                  </div>
                )}

                {addonsTotal > 0 && (
                  <div className="breakdown-row">
                    <span>Selected Add-ons</span>
                    <span>+{formatPrice(addonsTotal)}</span>
                  </div>
                )}

                <div className="breakdown-divider"></div>

                <div className="breakdown-row subtotal-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="breakdown-row discount-row">
                    <span>Promo Discount ({appliedPromo?.code})</span>
                    <span className="discount-value">-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="breakdown-divider"></div>

                <div className="breakdown-row total-row">
                  <div>
                    <span className="grand-label">Grand Total</span>
                    <span className="taxes-note">Inclusive of GST & Tourism Taxes</span>
                  </div>
                  <span className="grand-amount">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {validationError && (
                <div className="validation-error-banner">
                  <AlertCircle size={18} />
                  <span>{validationError}</span>
                </div>
              )}

              <button
                type="button"
                className="confirm-booking-btn"
                onClick={handleSubmitBooking}
              >
                Confirm & Reserve Booking
              </button>

              <p className="guarantee-note">
                🔒 Free cancellation up to 72 hours before departure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
