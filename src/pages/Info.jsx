import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Heart,
  Truck,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  Send,
  MessageSquare
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageTitle } from "../components/Common";

export default function Info({ type = "about" }) {
  const { notify } = useApp();

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "Adoption Inquiry",
    message: ""
  });

  // FAQs state
  const [expandedFaq, setExpandedFaq] = useState(0);

  const faqs = [
    {
      q: "How does pet adoption and delivery work on PetMart?",
      a: "Every pet listing comes with verified vaccination and health check certifications. Once you place an adoption order, our veterinary care team conducts an adoption briefing call to discuss dietary needs and schedule safe, climate-controlled doorstep transport."
    },
    {
      q: "What is PetMart's Free Shipping threshold?",
      a: "All pet food, accessories, and supplies orders with a cart total of ₹999 or above qualify for 100% Free Express Delivery across India. For orders below ₹999, a flat nominal delivery fee of ₹99 is applied."
    },
    {
      q: "Are the pet food brands 100% authentic and fresh?",
      a: "Yes. PetMart sources directly from certified authorized brand distributors (Royal Canin, Pedigree, Whiskas, Drools, etc.). All products have a minimum of 6 to 18 months shelf-life remaining."
    },
    {
      q: "What is the return and cancellation policy?",
      a: "Accessories and sealed supplies can be returned within 7 days of delivery for a replacement or store credit. Orders can be cancelled anytime before dispatch from the 'My Orders' section."
    },
    {
      q: "Can I use discount coupons on first-time orders?",
      a: "Yes! Use coupon code PETMART10 at checkout to enjoy a flat 10% instant discount across all products and pet adoption fees."
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      notify("Please fill in all required fields.", "error");
      return;
    }
    notify(`Thank you, ${contactForm.name}! Your inquiry has been sent to our veterinary team.`);
    setContactForm({
      name: "",
      email: "",
      subject: "Adoption Inquiry",
      message: ""
    });
  };

  if (type === "contact") {
    return (
      <div className="contact-page-view">
        <PageTitle
          title="Contact PetMart Support 💬"
          subtitle="Have questions about adoption, product nutrition, or an active shipment? We're here for you 6 days a week."
          breadcrumbs={[{ label: "Contact" }]}
        />

        <div className="container py-12">
          <div className="contact-layout-grid">
            {/* Contact Form Column */}
            <div className="contact-form-card">
              <h3>Send Us a Message</h3>
              <p>Our veterinary support representatives respond within 2-4 hours.</p>

              <form onSubmit={handleContactSubmit} className="mt-6">
                <div className="form-group mb-4">
                  <label>Your Full Name *</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label>Subject Topic</label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  >
                    <option>Pet Adoption & Health Records</option>
                    <option>Order Shipping & Delivery Status</option>
                    <option>Product Nutrition & Brand Advice</option>
                    <option>Wholesale & Partnership Inquiry</option>
                  </select>
                </div>

                <div className="form-group mb-4">
                  <label>Message *</label>
                  <textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="How can we assist you and your furry friend today?"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg full-width">
                  Send Inquiry <Send size={16} />
                </button>
              </form>
            </div>

            {/* Contact Info & Hours Column */}
            <div className="contact-info-column">
              <div className="contact-details-card">
                <h3>Customer Care Channels</h3>

                <div className="contact-card-item">
                  <Phone size={20} className="info-icon" />
                  <div>
                    <b>Telephone Helpline</b>
                    <p>+91 90000 12345</p>
                    <small>Available Mon - Sat, 9:00 AM - 8:00 PM IST</small>
                  </div>
                </div>

                <div className="contact-card-item">
                  <Mail size={20} className="info-icon" />
                  <div>
                    <b>Email Support</b>
                    <p>support@petmart.com</p>
                    <small>Official responses within 4 business hours</small>
                  </div>
                </div>

                <div className="contact-card-item">
                  <MapPin size={20} className="info-icon" />
                  <div>
                    <b>Experience Store & Headquarters</b>
                    <p>Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033</p>
                  </div>
                </div>

                <div className="contact-card-item">
                  <Clock size={20} className="info-icon" />
                  <div>
                    <b>Operational Hours</b>
                    <p>Monday – Saturday: 9:00 AM to 8:00 PM</p>
                    <small>Sunday: Emergency Veterinary Support Only</small>
                  </div>
                </div>
              </div>

              {/* Veterinary Clinic Help Promo */}
              <div className="vet-callout-card mt-6">
                <div className="vet-callout-icon">🩺</div>
                <div>
                  <h4>Free Vet Consultation for New Adopters</h4>
                  <p>Adopting Bruno, Milo or another PetMart companion? You receive a 30-minute free tele-vet session!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive FAQs Accordion */}
          <div className="faqs-section-block mt-16">
            <div className="text-center mb-8">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">
                Quick answers to common questions about pet adoption, nutrition, shipping, and returns.
              </p>
            </div>

            <div className="faqs-accordion-list">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`faq-accordion-item ${expandedFaq === i ? "open" : ""}`}
                >
                  <button
                    className="faq-question-btn"
                    onClick={() => setExpandedFaq(expandedFaq === i ? -1 : i)}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className="faq-chevron" />
                  </button>
                  {expandedFaq === i && (
                    <div className="faq-answer-pane">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // "About" Page View
  return (
    <div className="about-page-view">
      <PageTitle
        title="About PetMart 🐾"
        subtitle="Empowering pet parents with verified healthy companions, authentic nutrition, and dependable supplies since 2024."
        breadcrumbs={[{ label: "About" }]}
      />

      <div className="container py-12">
        {/* Story Section */}
        <div className="about-story-grid">
          <div className="about-story-text">
            <span className="pill">OUR PASSION & PURPOSE</span>
            <h2 className="story-heading">
              Creating a Happier, Healthier World for Pets & Their Families.
            </h2>
            <p className="lead-paragraph">
              PetMart started with a simple observation: finding authentic, fresh pet food
              and healthy, ethically raised companion pets in India was often stressful and opaque.
            </p>
            <p className="body-paragraph">
              We built PetMart to be the superstore pet parents can trust with eyes closed.
              From champion breed Golden Retrievers to Persian cats and budgerigars, every animal
              under our care receives certified medical vaccinations and ethical socialization.
              Simultaneously, we curate only genuine products from verified brands like Royal Canin,
              Pedigree, Drools, and Whiskas.
            </p>

            <div className="story-metrics-grid mt-6">
              <div className="story-metric-box">
                <strong>15,000+</strong>
                <span>Pets Rehomed & Happy</span>
              </div>
              <div className="story-metric-box">
                <strong>100%</strong>
                <span>Vet Inspected & Dewormed</span>
              </div>
              <div className="story-metric-box">
                <strong>120+</strong>
                <span>Cities Served in India</span>
              </div>
              <div className="story-metric-box">
                <strong>4.9 ★</strong>
                <span>Average Parent Rating</span>
              </div>
            </div>
          </div>

          <div className="about-story-media">
            <img
              src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=900&q=85"
              alt="Veterinary Care at PetMart"
              className="about-hero-img"
            />
          </div>
        </div>

        {/* Pillars of PetMart */}
        <div className="about-pillars-section mt-16">
          <div className="text-center mb-10">
            <h2 className="section-title">The Four PetMart Commitments</h2>
            <p className="section-subtitle">The standards that guide every adoption and order dispatch.</p>
          </div>

          <div className="pm-grid-4">
            <div className="pillar-card">
              <div className="pillar-icon-wrap">
                <ShieldCheck size={28} />
              </div>
              <h4>Zero Counterfeit Policy</h4>
              <p>Direct manufacturer sourcing guarantees that every bag of kibble is 100% genuine and nutrient-dense.</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-wrap">
                <Heart size={28} />
              </div>
              <h4>Ethical Rehoming</h4>
              <p>We work exclusively with certified breeders and animal shelters, never with puppy mills or unregulated sources.</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-wrap">
                <Truck size={28} />
              </div>
              <h4>Climate-Safe Transit</h4>
              <p>Our delivery vehicles use temperature ventilation and secure harness crates so companions travel stress-free.</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-wrap">
                <Award size={28} />
              </div>
              <h4>Lifetime Care Advisory</h4>
              <p>Our licensed veterinary team remains available to advise on nutrition transitions, grooming, and training.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
