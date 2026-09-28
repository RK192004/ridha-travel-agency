import React from 'react';
import { Star, Heart, Clock, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

export default function PackageCard({
  pkg,
  isWishlisted,
  onToggleWishlist,
  onSelectPackage,
  formatPrice
}) {
  return (
    <div className="package-card">
      <div className="card-image-wrap">
        <img src={pkg.image} alt={pkg.destination} loading="lazy" />
        <div className="card-category-tag">{pkg.category}</div>
        <button
          className={`wishlist-heart-btn ${isWishlisted ? 'favorited' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(pkg.id);
          }}
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-label="Toggle favorite"
        >
          <Heart size={18} fill={isWishlisted ? '#e63946' : 'none'} color={isWishlisted ? '#e63946' : 'white'} />
        </button>
      </div>

      <div className="card-content">
        <div className="card-header-row">
          <div className="card-location">
            <MapPin size={16} className="loc-icon" />
            <span>{pkg.destination}, {pkg.country}</span>
          </div>
          <div className="card-rating">
            <Star size={15} fill="#f4a261" color="#f4a261" />
            <span className="rating-score">{pkg.rating}</span>
            <span className="rating-count">({pkg.reviewCount})</span>
          </div>
        </div>

        <h3 className="card-title">{pkg.tagline}</h3>
        <p className="card-desc">{pkg.description}</p>

        <div className="card-duration">
          <Clock size={15} />
          <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
        </div>

        <div className="card-highlights">
          <div className="highlights-title">Package Inclusions:</div>
          <ul className="inclusions-list">
            {pkg.inclusions.slice(0, 3).map((item, idx) => (
              <li key={idx}>
                <CheckCircle size={14} className="inclusion-check" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-footer">
          <div className="card-price-block">
            <span className="price-label">Starting from</span>
            <div className="price-amount">{formatPrice(pkg.basePrice)}</div>
            <span className="price-sub">per person / incl. taxes</span>
          </div>

          <button
            className="book-now-btn"
            onClick={() => onSelectPackage(pkg)}
          >
            <span>Customize & Book</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
