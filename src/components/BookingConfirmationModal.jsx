import React from 'react';
import { CheckCircle2, Calendar, MapPin, Users, Printer, Briefcase, X, FileText } from 'lucide-react';

export default function BookingConfirmationModal({
  booking,
  onClose,
  onViewMyBookings,
  formatPrice
}) {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content confirmation-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close receipt">
          <X size={22} />
        </button>

        <div className="confirmation-header">
          <div className="success-icon-wrap">
            <CheckCircle2 size={54} className="success-icon" />
          </div>
          <span className="confirmation-badge">Reservation Confirmed</span>
          <h2>Your Journey is Booked!</h2>
          <p className="confirmation-lead">
            Thank you, <strong>{booking.leadName}</strong>. A confirmation voucher has been sent to{' '}
            <strong>{booking.leadEmail}</strong>.
          </p>
        </div>

        {/* Voucher Ticket Card */}
        <div className="voucher-card">
          <div className="voucher-top-band">
            <div className="voucher-brand">RIDHA TRAVEL AGENCY</div>
            <div className="voucher-id-pill">
              <span>BOOKING REF:</span>
              <strong>{booking.bookingId}</strong>
            </div>
          </div>

          <div className="voucher-details-grid">
            <div className="voucher-col">
              <span className="v-label">Destination</span>
              <div className="v-val with-icon">
                <MapPin size={16} />
                <span>{booking.packageTitle}</span>
              </div>
            </div>

            <div className="voucher-col">
              <span className="v-label">Departure Date</span>
              <div className="v-val with-icon">
                <Calendar size={16} />
                <span>{booking.departureDate}</span>
              </div>
            </div>

            <div className="voucher-col">
              <span className="v-label">Travelers</span>
              <div className="v-val with-icon">
                <Users size={16} />
                <span>
                  {booking.adults} Adults
                  {booking.children > 0 ? `, ${booking.children} Children` : ''}
                </span>
              </div>
            </div>

            <div className="voucher-col">
              <span className="v-label">Accommodation</span>
              <div className="v-val">{booking.hotelTier}</div>
            </div>

            {booking.addons && booking.addons.length > 0 && (
              <div className="voucher-col full-span">
                <span className="v-label">Included Add-ons</span>
                <div className="v-val add-on-tags">
                  {booking.addons.map((item, idx) => (
                    <span key={idx} className="addon-tag">{item}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="voucher-receipt-summary">
            <div className="receipt-line">
              <span>Total Paid</span>
              <span className="receipt-total">{formatPrice(booking.grandTotal)}</span>
            </div>
            {booking.appliedPromo && (
              <div className="receipt-coupon-tag">
                Promo Applied: <strong>{booking.appliedPromo}</strong> (-{formatPrice(booking.discountAmount)})
              </div>
            )}
          </div>
        </div>

        <div className="confirmation-actions">
          <button className="receipt-print-btn" onClick={handlePrint}>
            <Printer size={18} />
            <span>Print Itinerary Receipt</span>
          </button>
          <button
            className="receipt-view-bookings-btn"
            onClick={() => {
              onClose();
              onViewMyBookings();
            }}
          >
            <Briefcase size={18} />
            <span>View All My Bookings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
