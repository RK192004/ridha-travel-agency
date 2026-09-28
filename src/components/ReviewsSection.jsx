import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, ThumbsUp } from 'lucide-react';

export default function ReviewsSection({ reviews, onAddReview }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [destination, setDestination] = useState('Paris');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      destination,
      rating,
      date: 'Just now',
      comment: comment.trim(),
      verified: true
    };

    onAddReview(newRev);
    setAuthor('');
    setComment('');
    setRating(5);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowAddForm(false);
    }, 2000);
  };

  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <div className="section-head-row">
          <div>
            <span className="section-sub-title">Traveler Testimonials</span>
            <h2 className="section-main-title">Stories From Our Adventurers</h2>
          </div>
          <button
            className="write-review-toggle-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <MessageSquarePlus size={18} />
            <span>{showAddForm ? 'Cancel Review' : 'Share Your Experience'}</span>
          </button>
        </div>

        {/* Add Review Form Modal / Inline Box */}
        {showAddForm && (
          <div className="add-review-card">
            <h3>Leave Your Verified Travel Review</h3>
            {submittedMessage ? (
              <div className="review-success-banner">
                <CheckCircle size={20} />
                <span>Thank you! Your review has been published.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="review-form">
                <div className="review-inputs-row">
                  <div className="review-field">
                    <label htmlFor="review-author">Your Name *</label>
                    <input
                      id="review-author"
                      type="text"
                      placeholder="e.g. Maya Patel"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      required
                    />
                  </div>

                  <div className="review-field">
                    <label htmlFor="review-dest">Destination Visited *</label>
                    <select
                      id="review-dest"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    >
                      <option value="Paris">Paris, France</option>
                      <option value="Dubai">Dubai, UAE</option>
                      <option value="Bali">Bali, Indonesia</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Maldives">Maldives</option>
                      <option value="Tokyo">Tokyo & Kyoto</option>
                      <option value="Kashmir">Kashmir</option>
                    </select>
                  </div>

                  <div className="review-field">
                    <label>Rating *</label>
                    <div className="star-picker">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          className="star-pick-btn"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                        >
                          <Star
                            size={22}
                            fill={(hoverRating || rating) >= star ? '#f4a261' : 'none'}
                            color={(hoverRating || rating) >= star ? '#f4a261' : '#ccc'}
                          />
                        </button>
                      ))}
                      <span className="rating-num-label">{rating} / 5</span>
                    </div>
                  </div>
                </div>

                <div className="review-field full-width">
                  <label htmlFor="review-comment">Your Review Feedback *</label>
                  <textarea
                    id="review-comment"
                    rows={3}
                    placeholder="Tell other travelers about your accommodations, local guides, sightseeing experiences..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                </div>

                <div className="review-submit-wrap">
                  <button type="submit" className="post-review-btn">
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {reviews.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="review-card-top">
                <div className="review-rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < rev.rating ? '#f4a261' : 'none'}
                      color={i < rev.rating ? '#f4a261' : '#ddd'}
                    />
                  ))}
                </div>
                <span className="review-dest-badge">{rev.destination}</span>
              </div>

              <p className="review-text">"{rev.comment}"</p>

              <div className="review-author-meta">
                <div className="author-avatar">
                  {rev.author.charAt(0)}
                </div>
                <div className="author-info">
                  <div className="author-name-line">
                    <strong>{rev.author}</strong>
                    {rev.verified && (
                      <span className="verified-badge">
                        <CheckCircle size={12} /> Verified Traveler
                      </span>
                    )}
                  </div>
                  <span className="review-date">{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
