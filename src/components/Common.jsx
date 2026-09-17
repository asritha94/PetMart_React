import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Trash2, Minus, Plus } from "lucide-react";
import { useApp } from "../context/AppContext";

// Re-export modular components
export { Navbar } from "./Navbar";
export { Footer } from "./Footer";
export { ProductCard } from "./ProductCard";
export { PetCard } from "./PetCard";
export { CategoryCard } from "./CategoryCard";
export { GlobalSearchModal } from "./GlobalSearchModal";
export { Rating } from "./Rating";
export { Toast } from "./Toast";
export { EmptyState as Empty } from "./EmptyState";
export { ProtectedRoute } from "./ProtectedRoute";

// Page Title Banner
export function PageTitle({ title, subtitle, breadcrumbs = [] }) {
  return (
    <section className="page-title-banner">
      <div className="container">
        {breadcrumbs.length > 0 && (
          <nav className="breadcrumbs-nav" aria-label="breadcrumb">
            <Link to="/">Home</Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={`${crumb.label}-${idx}`}>
                <span className="crumb-separator">/</span>
                {crumb.link ? (
                  <Link to={crumb.link}>{crumb.label}</Link>
                ) : (
                  <span className="crumb-current">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="page-heading">{title}</h1>
        {subtitle && <p className="page-subheading">{subtitle}</p>}
      </div>
    </section>
  );
}

// Section Header with optional "View All" link
export function SectionHead({ title, subtitle, link, linkText = "View all" }) {
  return (
    <div className="section-header-block">
      <div className="section-title-wrap">
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {link && (
        <Link to={link} className="section-view-all-link">
          {linkText} <ChevronRight size={16} />
        </Link>
      )}
    </div>
  );
}

// Cart Item Component
export function CartItem({ item }) {
  const { updateQty, removeCart } = useApp();

  return (
    <div className="cart-item-row">
      <img
        src={item.image}
        alt={item.name}
        className="cart-item-image"
      />
      <div className="cart-item-details">
        <Link
          to={item.type === "pet" ? `/pets/${item.id}` : `/products/${item.id}`}
          className="cart-item-title"
        >
          {item.name}
        </Link>
        <span className="cart-item-sub">
          {item.type === "pet" ? `${item.species} • ${item.breed}` : `${item.brand} • ${item.category}`}
        </span>
        <div className="cart-item-unit-price">
          ₹{item.price.toLocaleString("en-IN")} each
        </div>
      </div>

      <div className="cart-qty-controller">
        <button
          type="button"
          className="qty-btn"
          onClick={() => updateQty(item.id, item.qty - 1)}
          aria-label="Decrease quantity"
        >
          <Minus size={14} />
        </button>
        <span className="qty-value">{item.qty}</span>
        <button
          type="button"
          className="qty-btn"
          onClick={() => updateQty(item.id, item.qty + 1)}
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="cart-item-line-total">
        <span>₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
      </div>

      <button
        type="button"
        className="cart-remove-btn"
        onClick={() => removeCart(item.id)}
        aria-label="Remove item"
        title="Remove from Cart"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
