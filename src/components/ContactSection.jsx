import React, { useState } from 'react';
import { Phone, Mail, MapPin, ExternalLink, Send, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'Paris',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        destination: 'Paris',
        message: ''
      });
    }, 4000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-head text-center">
          <span className="section-sub-title">Get in Touch</span>
          <h2 className="section-main-title">Start Planning Your Dream Holiday</h2>
          <p className="section-intro">
            Have questions about visas, flights, or custom itineraries? Our travel specialists are available 24/7.
          </p>
        </div>

        <div className="contact-grid">
          {/* Agency Info */}
          <div className="contact-info-card">
            <h3>RIDHA Travel Agency</h3>
            <p className="contact-tagline">
              Explore the World, Create Memories! We deliver customized journeys, luxury stays, and seamless global adventures.
            </p>

            <div className="info-items-list">
              <div className="info-item">
                <div className="info-icon-box">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="info-item-label">Direct Line</span>
                  <a href="tel:+919876543210" className="info-item-val">+91 98765 43210</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="info-item-label">Email Inquiries</span>
                  <a href="mailto:bookings@ridhatravel.com" className="info-item-val">bookings@ridhatravel.com</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="info-item-label">Headquarters</span>
                  <span className="info-item-val">Chennai, Tamil Nadu, India</span>
                </div>
              </div>
            </div>

            <div className="external-partner-box">
              <h4>Official Tourism Partner</h4>
              <p>Certified partner promoting cultural exploration and incredible heritage.</p>
              <a
                href="https://www.incredibleindia.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="external-link-btn"
              >
                <span>Visit Incredible India Official Portal</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Interactive Inquiry Form */}
          <div className="contact-form-card">
            <h3>Send an Inquiry</h3>
            {submitted ? (
              <div className="inquiry-success-box">
                <CheckCircle2 size={42} className="success-icon" />
                <h4>Thank You!</h4>
                <p>We've received your travel request. A dedicated destination manager will contact you within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="inquiry-form">
                <div className="form-group">
                  <label htmlFor="inquiry-name">Your Full Name *</label>
                  <input
                    id="inquiry-name"
                    type="text"
                    placeholder="e.g. Ananya Sen"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="inquiry-email">Email Address *</label>
                    <input
                      id="inquiry-email"
                      type="email"
                      placeholder="e.g. ananya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="inquiry-phone">Phone Number</label>
                    <input
                      id="inquiry-phone"
                      type="tel"
                      placeholder="e.g. +91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="inquiry-destination">Destination of Interest</label>
                  <select
                    id="inquiry-destination"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  >
                    <option value="Paris">Paris, France</option>
                    <option value="Dubai">Dubai, UAE</option>
                    <option value="Bali">Bali, Indonesia</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Tokyo">Tokyo, Japan</option>
                    <option value="Kashmir">Kashmir Paradise</option>
                    <option value="Custom">Custom Destination</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="inquiry-message">Trip Requirements / Questions</label>
                  <textarea
                    id="inquiry-message"
                    rows={4}
                    placeholder="Tell us estimated travel dates, group size, or budget preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="submit-inquiry-btn">
                  <Send size={18} />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
