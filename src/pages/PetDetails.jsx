import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Award,
  Phone,
  Calendar,
  Zap
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageTitle, PetCard, Empty } from "../components/Common";

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pets, addCart, toggleWish, wishlist, cart } = useApp();

  const pet = pets.find((p) => p.id === id);

  // Multi-image gallery state
  const images = pet?.gallery?.length ? pet.gallery : [pet?.image];
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  if (!pet) {
    return (
      <div className="container py-16">
        <Empty
          icon="🔍"
          title="Pet Not Found"
          description="The pet you are looking for is either no longer available or the link is invalid."
          actionText="Explore All Pets"
          actionLink="/pets"
        />
      </div>
    );
  }

  const isWished = wishlist.some((item) => item.id === pet.id);
  const isInCart = cart.some((item) => item.id === pet.id);

  // Similar pets (excluding current pet, matching species or random)
  const similarPets = pets
    .filter((p) => p.id !== pet.id && p.species === pet.species)
    .slice(0, 4);

  const handleBuyNow = () => {
    addCart({ ...pet, type: "pet" }, 1);
    navigate("/checkout");
  };

  return (
    <div className="details-page-view">
      {/* Breadcrumbs & Navigation */}
      <div className="container pt-6 pb-2">
        <Link to="/categories" className="back-link-btn">
          <ArrowLeft size={16} /> Back to all pets
        </Link>
      </div>

      <div className="container pb-12">
        <div className="detail-layout-grid">
          {/* Left: Gallery */}
          <div className="detail-gallery-column">
            <div className="detail-main-img-wrap">
              <img
                src={images[activeImage] || pet.image}
                alt={pet.name}
                className="detail-featured-img"
              />
              <button
                className={`detail-wish-btn ${isWished ? "active" : ""}`}
                onClick={() => toggleWish(pet)}
                title={isWished ? "Saved in Wishlist" : "Add to Wishlist"}
              >
                <Heart size={20} fill={isWished ? "#e11d48" : "none"} stroke={isWished ? "#e11d48" : "currentColor"} />
              </button>
              <div className="detail-status-pill">
                <span className="dot-pulse" /> {pet.availability}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="detail-thumbnails-row">
                {images.map((imgUrl, index) => (
                  <button
                    key={index}
                    className={`thumb-btn ${activeImage === index ? "active" : ""}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Purchase */}
          <div className="detail-info-column">
            <div className="detail-species-tag">
              🐾 {pet.species} • {pet.breed}
            </div>

            <h1 className="detail-name-heading">{pet.name}</h1>

            <div className="detail-meta-tags-list">
              <span className="detail-tag">
                <MapPin size={14} /> {pet.location}
              </span>
              <span className="detail-tag">Age: {pet.age}</span>
              <span className="detail-tag">Gender: {pet.gender}</span>
              <span className="detail-tag">Color: {pet.color}</span>
            </div>

            {/* Price Box */}
            <div className="detail-price-box">
              <div className="price-label">Adoption / Rehoming Fee</div>
              <div className="detail-price-value">
                ₹{pet.price.toLocaleString("en-IN")}
              </div>
              <small className="detail-price-note">
                Includes complete veterinary screening, microchipping, and starter diet packet.
              </small>
            </div>

            {/* Quick Health Status Highlights */}
            <div className="pet-health-status-box">
              <div className="health-badge-item">
                <CheckCircle2 size={16} className="text-success" />
                <span><b>Vaccination:</b> {pet.vaccination}</span>
              </div>
              <div className="health-badge-item">
                <CheckCircle2 size={16} className="text-success" />
                <span><b>Health Checked:</b> Microchipped & Dewormed</span>
              </div>
              <div className="health-badge-item">
                <CheckCircle2 size={16} className="text-success" />
                <span><b>Availability:</b> In Stock for Immediate Companion Care</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="detail-actions-row">
              <button
                className={`btn btn-lg ${isInCart ? "btn-secondary" : "btn-primary"} flex-1`}
                onClick={() => addCart({ ...pet, type: "pet" }, 1)}
              >
                <ShoppingBag size={18} /> {isInCart ? "Added in Cart" : "Add to Cart"}
              </button>

              <button
                className="btn btn-lg btn-amber flex-1"
                onClick={handleBuyNow}
              >
                <Zap size={18} /> Adopt Now
              </button>
            </div>

            {/* Pet Care Guarantee Strip */}
            <div className="petmart-promise-card">
              <div className="promise-icon">
                <ShieldCheck size={26} />
              </div>
              <div>
                <h4>PetMart 10-Day Health Guarantee</h4>
                <p>
                  Every pet from PetMart is covered under a 10-day comprehensive health
                  guarantee and free veterinary consultation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Overview, Health & Diet */}
        <div className="detail-tabs-section mt-12">
          <div className="detail-tabs-header">
            <button
              className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview & Personality
            </button>
            <button
              className={`tab-btn ${activeTab === "health" ? "active" : ""}`}
              onClick={() => setActiveTab("health")}
            >
              Health & Vaccination
            </button>
            <button
              className={`tab-btn ${activeTab === "diet" ? "active" : ""}`}
              onClick={() => setActiveTab("diet")}
            >
              Diet & Daily Care
            </button>
          </div>

          <div className="detail-tab-content-card">
            {activeTab === "overview" && (
              <div className="tab-pane">
                <h3>About {pet.name}</h3>
                <p className="lead-text">{pet.description}</p>
                <div className="pet-specs-grid mt-6">
                  <div className="spec-card">
                    <span>Species</span>
                    <b>{pet.species}</b>
                  </div>
                  <div className="spec-card">
                    <span>Breed</span>
                    <b>{pet.breed}</b>
                  </div>
                  <div className="spec-card">
                    <span>Age</span>
                    <b>{pet.age}</b>
                  </div>
                  <div className="spec-card">
                    <span>Gender</span>
                    <b>{pet.gender}</b>
                  </div>
                  <div className="spec-card">
                    <span>Temperament</span>
                    <b>{pet.temperament || "Loving & Friendly"}</b>
                  </div>
                  <div className="spec-card">
                    <span>Location</span>
                    <b>{pet.location}</b>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "health" && (
              <div className="tab-pane">
                <h3>Veterinary & Health Passport</h3>
                <p>
                  {pet.healthInfo ||
                    "Up to date with core immunizations and registered microchip for lifetime safety."}
                </p>
                <ul className="health-checklist mt-4">
                  <li>✓ Complete 7-in-1 / 9-in-1 vaccination passport provided</li>
                  <li>✓ Dewormed with veterinary-grade oral suspension</li>
                  <li>✓ Tested negative for hereditary heart and bone disorders</li>
                  <li>✓ Microchip number registered with National Pet Registry</li>
                </ul>
              </div>
            )}

            {activeTab === "diet" && (
              <div className="tab-pane">
                <h3>Recommended Diet & Nutrition</h3>
                <p>
                  {pet.diet ||
                    "High quality age-appropriate kibble supplemented with fresh water and essential omega vitamins."}
                </p>
                <div className="diet-tips-callout mt-4">
                  <b>Care Tip from PetMart Vets:</b> Always maintain a steady feeding schedule and
                  introduce new treats gradually over 5-7 days to prevent digestive upset.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Pets Section */}
        {similarPets.length > 0 && (
          <div className="similar-pets-section mt-16">
            <h2 className="section-title">Similar Lovable Companions</h2>
            <p className="section-subtitle">
              Other friendly {pet.species.toLowerCase()}s you might fall in love with.
            </p>
            <div className="pm-grid-4 mt-6">
              {similarPets.map((p) => (
                <PetCard key={p.id} pet={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}