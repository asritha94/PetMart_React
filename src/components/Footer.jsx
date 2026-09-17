import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  Heart,
  Instagram,
  Facebook,
  Twitter,
  Youtube
} from "lucide-react";
import { useApp } from "../context/AppContext";

export function Footer() {
  const { notify, categories } = useApp();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      notify("Please provide a valid email address.", "error");
      return;
    }
    notify(`Thank you for subscribing to PetMart newsletters! 🐾`);
    setEmail("");
  };

  return (
    <footer className="pm-footer">
      {/* Trust Strip */}
      <div className="footer-trust-bar">
        <div className="container trust-bar-grid">
          <div className="trust-item">
            <div className="trust-icon-wrap">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4>100% Genuine Brands</h4>
              <p>Directly sourced authentic pet products</p>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon-wrap">
              <Heart size={24} />
            </div>
            <div>
              <h4>Ethical Pet Care</h4>
              <p>Health certified & vaccinated companions</p>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon-wrap">
              <Truck size={24} />
            </div>
            <div>
              <h4>Free Express Delivery</h4>
              <p>On all orders above ₹999 across India</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="container footer-main-content">
        <div className="footer-cols-grid">
          {/* Column 1: Brand & Bio */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-brand">
              <span className="brand-logo-icon">🐾</span>
              <span className="brand-name">Pet<span className="brand-highlight">Mart</span></span>
            </Link>
            <p className="footer-bio">
              PetMart is India's leading digital destination for lovable companions,
              premium food recipes, healthcare essentials, and durable accessories.
              Everything your furry family members need, delivered with joy.
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-link">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-link">
                <Facebook size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="social-link">
                <Twitter size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="social-link">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home Page</Link></li>
              <li><Link to="/categories">Browse Pets</Link></li>
              <li><Link to="/categories">Pet Food & Supplies</Link></li>
              <li><Link to="/wishlist">Saved Wishlist</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
              <li><Link to="/orders">Track My Orders</Link></li>
              <li><Link to="/admin/login">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="footer-col">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links-list">
              {categories.map((category) => (
                <li key={category.id}><Link to={`/categories/${category.slug}`}>{category.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 4: Customer Support & Hours */}
          <div className="footer-col support-col">
            <h4 className="footer-heading">Customer Care</h4>
            <div className="contact-meta-item">
              <Phone size={16} />
              <div>
                <span>Phone Support</span>
                <b>+91 90000 12345</b>
              </div>
            </div>
            <div className="contact-meta-item">
              <Mail size={16} />
              <div>
                <span>Email Inquiries</span>
                <b>support@petmart.com</b>
              </div>
            </div>
            <div className="contact-meta-item">
              <MapPin size={16} />
              <div>
                <span>Registered Office</span>
                <p>Road No. 36, Jubilee Hills, Hyderabad 500033</p>
              </div>
            </div>
            <div className="contact-meta-item">
              <Clock size={16} />
              <div>
                <span>Working Hours</span>
                <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Box */}
        <div className="footer-newsletter-banner">
          <div className="newsletter-text">
            <h3>Subscribe for Pawsome Deals & Pet Care Tips 🐶</h3>
            <p>Get ₹200 off on your first order and weekly veterinary wellness tips.</p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              Subscribe <Send size={15} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="footer-bottom-strip">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} PetMart Retail India Pvt. Ltd. All rights reserved.</p>
          <div className="footer-legal-links">
            <Link to="/about">About Us</Link>
            <span className="dot-sep">•</span>
            <Link to="/contact">Contact</Link>
            <span className="dot-sep">•</span>
            <span>Privacy Policy</span>
            <span className="dot-sep">•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
