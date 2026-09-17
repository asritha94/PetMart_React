import React from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, ShieldCheck, ShoppingBag, Eye } from "lucide-react";
import { useApp } from "../context/AppContext";

export function PetCard({ pet }) {
  const { addCart, toggleWish, wishlist, cart } = useApp();
  const isWished = wishlist.some((item) => item.id === pet.id);
  const isInCart = cart.some((item) => item.id === pet.id);

  return (
    <article className="pm-card pet-card">
      <div className="card-media pet-media">
        <Link to={`/pets/${pet.id}`} className="media-link">
          <img
            src={pet.image}
            alt={`${pet.name} the ${pet.breed}`}
            loading="lazy"
            className="media-img"
          />
        </Link>

        {/* Status Badge */}
        <div className="badge-stack">
          <span className={`badge ${pet.availability === "Available" ? "badge-success" : "badge-neutral"}`}>
            {pet.availability}
          </span>
          <span className="badge badge-species">{pet.species}</span>
        </div>

        {/* Wishlist Button */}
        <button
          className={`wishlist-btn ${isWished ? "active" : ""}`}
          onClick={() => toggleWish(pet)}
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
          title={isWished ? "Saved in Wishlist" : "Add to Wishlist"}
        >
          <Heart size={18} fill={isWished ? "#e11d48" : "none"} stroke={isWished ? "#e11d48" : "currentColor"} />
        </button>

        {/* Vaccination verification pill */}
        <div className="pet-verified-pill" title={pet.vaccination}>
          <ShieldCheck size={13} />
          <span>Health Certified</span>
        </div>
      </div>

      <div className="card-content">
        <div className="pet-location-row">
          <span className="pet-location">
            <MapPin size={13} /> {pet.location}
          </span>
          <span className="pet-gender-tag">{pet.gender}</span>
        </div>

        <h3 className="card-title pet-title">
          <Link to={`/pets/${pet.id}`}>
            {pet.name} <span className="breed-sep">•</span> <small>{pet.breed}</small>
          </Link>
        </h3>

        <div className="pet-attributes-row">
          <span className="pet-chip">Age: {pet.age}</span>
          <span className="pet-chip">{pet.color}</span>
        </div>

        <div className="card-price-row">
          <div className="price-box">
            <span className="current-price">₹{pet.price.toLocaleString("en-IN")}</span>
            <small className="adoption-note">Adoption Fee</small>
          </div>
        </div>

        <div className="pet-card-actions">
          <Link to={`/pets/${pet.id}`} className="btn btn-sm btn-outline">
            <Eye size={15} /> Details
          </Link>
          <button
            className={`btn btn-sm ${isInCart ? "btn-secondary" : "btn-primary"}`}
            onClick={() => addCart({ ...pet, type: "pet" }, 1)}
          >
            <ShoppingBag size={15} /> {isInCart ? "In Cart" : "Adopt / Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default PetCard;
