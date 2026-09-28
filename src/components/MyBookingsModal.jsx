import React, { useState } from 'react';
import { X, Calendar, MapPin, Users, Trash2, Printer, AlertTriangle, Briefcase } from 'lucide-react';

export default function MyBookingsModal({
  bookings,
  onClose,
  onCancelBooking,
  formatPrice
}) {
  const [cancellingId, setCancellingId] = useState(null);

  const confirmCancel = (id) => {
    onCancelBooking(id);
    setCancellingId(null);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content my-bookings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-with-badge">
            <Briefcase size={22} className="modal-icon" />
            <div>
              <h2 className="modal-title">My Travel Bookings</h2>
              <span className="modal-sub">
                Manage your confirmed itineraries & vouchers
              </span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={22} />
          </button>
        </div>

        <div className="bookings-body">
          {bookings.length === 0 ? (
            <div className="empty-bookings-state">
              <div className="empty-icon-circle">
                <Briefcase size={40} />
              </div>
              <h3>No Active Bookings Found</h3>
              <p>You haven't reserved any travel packages yet. Explore our destinations and customize your dream vacation!</p>
              <button className="browse-trips-btn" onClick={onClose}>
                Explore Featured Packages
              </button>
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.map((b) => (
                <div key={b.bookingId} className={`booking-record-card ${b.status === 'Cancelled' ? 'cancelled-booking' : ''}`}>
                  <div className="booking-card-top">
                    <div className="booking-ref-badge">
                      <span>REF:</span> <strong>{b.bookingId}</strong>
                    </div>
                    <span className={`booking-status-pill status-${b.status.toLowerCase()}`}>
                      {b.status}
                    </span>
                  </div>

                  <div className="booking-main-grid">
                    <div className="booking-img-col">
                      <img src={b.image} alt={b.destination} />
                    </div>

                    <div className="booking-info-col">
                      <h4 className="booking-dest-title">{b.packageTitle}</h4>
                      
                      <div className="booking-meta-row">
                        <div className="meta-bit">
                          <MapPin size={15} />
                          <span>{b.destination}, {b.country}</span>
                        </div>
                        <div className="meta-bit">
                          <Calendar size={15} />
                          <span>Departure: <strong>{b.departureDate}</strong></span>
                        </div>
                        <div className="meta-bit">
                          <Users size={15} />
                          <span>{b.adults} Adults {b.children > 0 ? `+ ${b.children} Kids` : ''}</span>
                        </div>
                      </div>

                      <div className="booking-secondary-details">
                        <span>Hotel: <strong>{b.hotelTier}</strong></span>
                        <span>Guest: <strong>{b.leadName}</strong> ({b.leadEmail})</span>
                      </div>
                    </div>

                    <div className="booking-pricing-col">
                      <span className="price-tag-sub">Total Paid:</span>
                      <div className="booking-grand-total">{formatPrice(b.grandTotal)}</div>

                      <div className="booking-card-actions">
                        <button
                          type="button"
                          className="booking-action-btn print-mini-btn"
                          onClick={() => window.print()}
                          title="Print Itinerary"
                        >
                          <Printer size={15} />
                          <span>Print</span>
                        </button>

                        {b.status !== 'Cancelled' && (
                          <button
                            type="button"
                            className="booking-action-btn cancel-mini-btn"
                            onClick={() => setCancellingId(b.bookingId)}
                            title="Cancel Booking"
                          >
                            <Trash2 size={15} />
                            <span>Cancel</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {cancellingId === b.bookingId && (
                    <div className="cancel-confirm-banner">
                      <AlertTriangle size={18} className="warn-icon" />
                      <span>Are you sure you want to cancel booking <strong>{b.bookingId}</strong>?</span>
                      <div className="cancel-confirm-btns">
                        <button
                          className="cancel-yes-btn"
                          onClick={() => confirmCancel(b.bookingId)}
                        >
                          Yes, Cancel Trip
                        </button>
                        <button
                          className="cancel-no-btn"
                          onClick={() => setCancellingId(null)}
                        >
                          Keep Booking
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
