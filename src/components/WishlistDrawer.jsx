import React from 'react';
import { X, Heart, ArrowRight, Trash2 } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistPackages,
  onRemoveFromWishlist,
  onSelectPackage,
  formatPrice
}) {
  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-row">
            <Heart size={20} fill="#e63946" color="#e63946" />
            <h3>Saved Dream Trips</h3>
            <span className="drawer-count">({wishlistPackages.length})</span>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close wishlist">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-content">
          {wishlistPackages.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="drawer-empty-icon">
                <Heart size={36} color="#83c5be" />
              </div>
              <h4>No Saved Trips Yet</h4>
              <p>Click the heart icon on any travel package to curate your personalized dream vacation list.</p>
            </div>
          ) : (
            <div className="drawer-list">
              {wishlistPackages.map((pkg) => (
                <div key={pkg.id} className="drawer-item-card">
                  <img src={pkg.image} alt={pkg.destination} className="drawer-item-img" />
                  <div className="drawer-item-info">
                    <div className="drawer-item-header">
                      <h4>{pkg.destination}</h4>
                      <button
                        className="drawer-remove-btn"
                        onClick={() => onRemoveFromWishlist(pkg.id)}
                        title="Remove from wishlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <span className="drawer-item-duration">
                      {pkg.durationDays}D / {pkg.durationNights}N • {pkg.category}
                    </span>
                    <div className="drawer-item-footer">
                      <div className="drawer-price">{formatPrice(pkg.basePrice)}</div>
                      <button
                        className="drawer-book-btn"
                        onClick={() => {
                          onClose();
                          onSelectPackage(pkg);
                        }}
                      >
                        <span>Book</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
