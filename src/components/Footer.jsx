import React from 'react';
import { Compass, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onSelectCategory }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <Compass className="footer-icon" size={28} />
            <span className="footer-name">RIDHA Travel Agency</span>
          </div>
          <p className="footer-desc">
            Crafting extraordinary journeys worldwide since 2018. Member of the International Air Transport Association & Certified Tour Operators.
          </p>
          <div className="footer-badge-box">
            <ShieldCheck size={18} />
            <span>IATA Certified & 100% Insured Bookings</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Top Destinations</h4>
          <ul className="footer-links">
            <li><button onClick={() => scrollTo('packages')}>Paris Honeymoon Special</button></li>
            <li><button onClick={() => scrollTo('packages')}>Dubai Luxury Desert Escapes</button></li>
            <li><button onClick={() => scrollTo('packages')}>Bali Tropical Retreats</button></li>
            <li><button onClick={() => scrollTo('packages')}>Swiss Alpine Trains</button></li>
            <li><button onClick={() => scrollTo('packages')}>Singapore Family Fun</button></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Travel Styles</h4>
          <ul className="footer-links">
            <li><button onClick={() => onSelectCategory('Romantic')}>Romantic Getaways</button></li>
            <li><button onClick={() => onSelectCategory('Adventure')}>Adventure Expeditions</button></li>
            <li><button onClick={() => onSelectCategory('Luxury')}>Ultra Luxury Tours</button></li>
            <li><button onClick={() => onSelectCategory('Family')}>Family Vacations</button></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Agency Office</h4>
          <address className="footer-address">
            RIDHA Travel Agency<br />
            Mount Road, Anna Salai,<br />
            Chennai, Tamil Nadu 600002, India<br />
            Phone: +91 98765 43210<br />
            Email: bookings@ridhatravel.com
          </address>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} RIDHA Travel Agency. All Rights Reserved.</p>
          <p className="footer-credit">
            Built with modern React, JSX & Custom Hooks <Heart size={14} fill="#e63946" color="#e63946" />
          </p>
        </div>
      </div>
    </footer>
  );
}
