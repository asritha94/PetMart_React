import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Eye, Check } from "lucide-react";
import { useApp } from "../context/AppContext";
import Rating from "./Rating";
import { getImageFallback } from "../utils/imageFallbacks";

export function ProductCard({ product }) {
  const { addCart, toggleWish, wishlist, cart } = useApp();
  const isWished = wishlist.some((item) => item.id === product.id);
  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <article className="pm-card product-card">
      <div className="card-media">
        <Link to={`/products/${product.id}`} className="media-link">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="media-img"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = getImageFallback(product);
            }}
          />
        </Link>

        {/* Badges */}
        <div className="badge-stack">
          {product.discount > 0 && (
            <span className="badge badge-discount">-{product.discount}% OFF</span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="badge badge-warning">Only {product.stock} Left</span>
          )}
          {product.stock === 0 && (
            <span className="badge badge-danger">Out of Stock</span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          className={`wishlist-btn ${isWished ? "active" : ""}`}
          onClick={() => toggleWish(product)}
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
          title={isWished ? "Saved in Wishlist" : "Add to Wishlist"}
        >
          <Heart size={18} fill={isWished ? "#e11d48" : "none"} stroke={isWished ? "#e11d48" : "currentColor"} />
        </button>

        {/* Quick View Link */}
        <Link to={`/products/${product.id}`} className="quick-view-overlay" title="Quick View">
          <Eye size={16} /> Quick View
        </Link>
      </div>

      <div className="card-content">
        <div className="card-meta">
          <span className="card-category">{product.category}</span>
          <span className="card-brand">{product.brand}</span>
        </div>

        <h3 className="card-title" title={product.name}>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="card-rating">
          <Rating value={product.rating} reviews={product.reviews} size={14} />
        </div>

        <div className="card-price-row">
          <div className="price-box">
            <span className="current-price">₹{product.price.toLocaleString("en-IN")}</span>
            {product.oldPrice && product.oldPrice > product.price && (
              <del className="old-price">₹{product.oldPrice.toLocaleString("en-IN")}</del>
            )}
          </div>
        </div>

        <div className="card-action">
          <button
            className={`btn btn-sm ${isInCart ? "btn-secondary" : "btn-primary"} full-width`}
            onClick={() => addCart(product, 1)}
            disabled={product.stock === 0}
          >
            {isInCart ? (
              <>
                <Check size={16} /> Added in Cart
              </>
            ) : (
              <>
                <ShoppingBag size={16} /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
