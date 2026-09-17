import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Truck,
  CreditCard,
  Sparkles,
  CheckCircle
} from "lucide-react";
import { useApp } from "../context/AppContext";
import {
  CategoryCard,
  PetCard,
  ProductCard,
  SectionHead,
  Rating
} from "../components/Common";
import { testimonials } from "../data/data";
import { normalizeCategory } from "../utils/categoryUtils";

export default function Home() {
  const { categories, pets, products } = useApp();

  const featuredPets = pets.slice(0, 4);
  const shopCategories = categories.map((category) => {
    const count = products.filter(
      (product) =>
        normalizeCategory(product.primaryCategory) === category.slug ||
        normalizeCategory(product.category) === category.slug
    ).length;
    return { ...category, count };
  });

  const productSections = [
    ["pet-food", "Best Selling Pet Food", "Vet-approved nutrition for everyday energy and wellbeing."],
    ["accessories", "Popular Products", "Smart everyday essentials for walks, meals, and travel."]
  ];

  return (
    <div className="home-page-view">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-pill">
              <Sparkles size={15} /> 🐾 India's #1 Trusted Pet Care Destination
            </div>
            <h1 className="hero-headline">
              Everything Your Pet Needs, <span className="highlight-text">All in One Place</span>
            </h1>
            <p className="hero-description">
              Find lovable pets looking for forever homes, vet-approved nutrition,
              comforting beds, and engaging toys for your cherished companions.
            </p>

            <div className="hero-action-buttons">
              <Link to="/categories" className="btn btn-primary btn-lg">
                Explore Categories <ArrowRight size={18} />
              </Link>
              <Link to="/categories/pet-food" className="btn btn-outline btn-lg">
                Explore Pet Care
              </Link>
            </div>

            <div className="hero-trust-badges">
              <div className="trust-badge-item">
                <CheckCircle size={16} className="text-success" />
                <span>100% Genuine Nutrition</span>
              </div>
              <div className="trust-badge-item">
                <CheckCircle size={16} className="text-success" />
                <span>Health Verified Pets</span>
              </div>
              <div className="trust-badge-item">
                <CheckCircle size={16} className="text-success" />
                <span>Free Delivery Above ₹999</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85"
                alt="Lovable Golden Retriever"
                className="hero-main-img"
              />
              <div className="hero-floating-card trust-float">
                <div className="float-icon-gold">⭐</div>
                <div>
                  <strong>4.9 / 5.0 Rating</strong>
                  <span>Loved by 15,000+ pet parents</span>
                </div>
              </div>
              <div className="hero-floating-card care-float">
                <div className="float-icon-green">🩺</div>
                <div>
                  <strong>100% Vet Checked</strong>
                  <span>Vaccinated & microchipped</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-block categories-section">
        <div className="container">
          <SectionHead
            title="Shop by Category"
            subtitle="Explore curated pet essentials, nutritional kibble, and lovable species."
            link="/categories"
            linkText="All Categories"
          />
          <div className="category-grid-10">
            {shopCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="section-block featured-pets-section bg-soft">
        <div className="container">
          <SectionHead
            title="Meet Our Lovable Pets"
            subtitle="Healthy, joyful, and vet-certified companions waiting to bring love into your home."
            link="/categories"
            linkText="View All Categories"
          />
          <div className="pm-grid-4">
            {featuredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </div>
      </section>

      {productSections.map(([slug, title, subtitle], index) => (
        <section className={`section-block ${index % 2 ? "bg-soft" : ""}`} key={slug}>
          <div className="container">
            <SectionHead title={title} subtitle={subtitle} link={`/categories/${slug}`} linkText="View all" />
            <div className="pm-grid-4 mt-6">
              {products
                .filter(
                  (product) =>
                    normalizeCategory(product.primaryCategory) === slug ||
                    normalizeCategory(product.category) === slug
                )
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>
        </section>
      ))}

      {/* Why Choose PetMart Section */}
      <section className="section-block why-choose-section bg-soft">
        <div className="container">
          <SectionHead
            title="Why Pet Parents Choose PetMart"
            subtitle="We treat your pets like our own family, ensuring uncompromising standards of safety and love."
          />
          <div className="pm-grid-4 feature-cards-grid">
            <div className="pm-feature-card">
              <div className="feature-icon-wrapper">
                <ShieldCheck size={28} />
              </div>
              <h3 className="feature-title">Trusted Products</h3>
              <p className="feature-description">
                100% genuine brands sourced directly from licensed global manufacturers.
                Zero counterfeits or expired formulas.
              </p>
            </div>

            <div className="pm-feature-card">
              <div className="feature-icon-wrapper">
                <HeartHandshake size={28} />
              </div>
              <h3 className="feature-title">Healthy & Happy Pets</h3>
              <p className="feature-description">
                Every pet goes through comprehensive veterinary diagnostics, parasite deworming,
                and microchipping before adoption.
              </p>
            </div>

            <div className="pm-feature-card">
              <div className="feature-icon-wrapper">
                <Truck size={28} />
              </div>
              <h3 className="feature-title">Fast Delivery</h3>
              <p className="feature-description">
                Temperature-controlled swift doorstep dispatch across 100+ Indian cities.
                Free shipping on orders above ₹999.
              </p>
            </div>

            <div className="pm-feature-card">
              <div className="feature-icon-wrapper">
                <CreditCard size={28} />
              </div>
              <h3 className="feature-title">Secure Shopping</h3>
              <p className="feature-description">
                Encrypted payment simulation supporting UPI, Cards, and Cash on Delivery with
                instant transparent order tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-block testimonials-section">
        <div className="container">
          <SectionHead
            title="Loved by Pet Parents Across India"
            subtitle="Real reviews from our community of happy dog parents, cat lovers, and bird enthusiasts."
          />
          <div className="pm-grid-3 testimonials-grid">
            {testimonials.map((t) => (
              <div className="pm-testimonial-card" key={t.id || t.name}>
                <div className="testimonial-header">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="testimonial-avatar"
                  />
                  <div>
                    <h4 className="testimonial-author">{t.name}</h4>
                    <span className="testimonial-location">{t.location}</span>
                  </div>
                </div>
                <div className="testimonial-rating">
                  <Rating value={t.rating} size={14} showText={false} />
                </div>
                <p className="testimonial-quote">"{t.review}"</p>
                <div className="testimonial-pet-badge">
                  🐾 {t.pet}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner CTA */}
      <section className="promo-cta-strip">
        <div className="container promo-inner">
          <div className="promo-text-wrap">
            <span className="promo-eyebrow">SPECIAL PROMOTION</span>
            <h2>Get Flat 10% OFF on Your First Pet Order!</h2>
            <p>Apply promo code <b>PETMART10</b> at checkout. Free shipping on orders over ₹999.</p>
          </div>
          <div className="promo-btn-wrap">
            <Link to="/categories" className="btn btn-white btn-lg">
              Claim Discount Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
