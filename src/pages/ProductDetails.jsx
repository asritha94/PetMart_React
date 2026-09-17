import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Zap,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Minus,
  Plus,
  Send
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { ProductCard, Rating, Empty } from "../components/Common";
import { getImageFallback } from "../utils/imageFallbacks";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addCart, toggleWish, wishlist, reviews, addReview, notify } = useApp();

  const product = products.find((p) => p.id === id);

  const [qty, setQty] = useState(1);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  const seededReviews = [
    {
      id: "rev-1",
      author: "Sneha Menon",
      rating: 5,
      date: "2 days ago",
      comment: "Outstanding quality! My dog loves this food and his coat has become so shiny in just two weeks."
    },
    {
      id: "rev-2",
      author: "Aditya Roy",
      rating: 4.8,
      date: "1 week ago",
      comment: "Authentic original packaging with prompt delivery. Will definitely buy again from PetMart."
    }
  ];
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");

  if (!product) {
    return (
      <div className="container py-16">
        <Empty
          icon="🔍"
          title="Product Not Found"
          description="The item you're looking for might have been moved or removed from our inventory."
          actionText="Back to Shop"
          actionLink="/categories"
        />
      </div>
    );
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const reviewsList = [
    ...reviews.filter((review) => review.productId === product.id),
    ...seededReviews
  ];
  const isWished = wishlist.some((item) => item.id === product.id);

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleBuyNow = () => {
    addCart(product, qty);
    navigate("/checkout");
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      notify("Please fill in your name and review message.", "error");
      return;
    }
    addReview({
      productId: product.id,
      author: newReviewAuthor.trim(),
      rating: Number(newReviewRating),
      comment: newReviewComment.trim()
    });
    setNewReviewAuthor("");
    setNewReviewComment("");
    notify("Thank you for sharing your review! ⭐");
  };

  return (
    <div className="details-page-view">
      {/* Back button */}
      <div className="container pt-6 pb-2">
        <Link to="/categories" className="back-link-btn">
          <ArrowLeft size={16} /> Back to shop
        </Link>
      </div>

      <div className="container pb-12">
        <div className="detail-layout-grid">
          {/* Left: Gallery Column */}
          <div className="detail-gallery-column">
            <div className="detail-main-img-wrap">
              <img
                src={gallery[activeImgIndex] || product.image}
                alt={product.name}
                className="detail-featured-img"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = getImageFallback(product);
                }}
              />
              <button
                className={`detail-wish-btn ${isWished ? "active" : ""}`}
                onClick={() => toggleWish(product)}
                title={isWished ? "Saved in Wishlist" : "Add to Wishlist"}
              >
                <Heart size={20} fill={isWished ? "#e11d48" : "none"} stroke={isWished ? "#e11d48" : "currentColor"} />
              </button>
              {product.discount > 0 && (
                <span className="detail-discount-badge">-{product.discount}% OFF</span>
              )}
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="detail-thumbnails-row">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={`${imgUrl}-${idx}`}
                    className={`thumb-btn ${activeImgIndex === idx ? "active" : ""}`}
                    onClick={() => setActiveImgIndex(idx)}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumb ${idx + 1}`}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = getImageFallback(product);
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info Column */}
          <div className="detail-info-column">
            <div className="detail-category-brand-row">
              <span className="detail-category-pill">{product.category}</span>
              <span className="detail-brand-name">Brand: <b>{product.brand}</b></span>
            </div>

            <h1 className="detail-product-title">{product.name}</h1>

            {/* Rating */}
            <div className="detail-rating-row">
              <Rating value={product.rating} reviews={product.reviews} size={16} />
              <span className="verified-buyer-note">✓ Verified Buyer Ratings</span>
            </div>

            {/* Pricing Box */}
            <div className="detail-price-box">
              <div className="detail-price-row">
                <span className="detail-price-value">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.oldPrice && product.oldPrice > product.price && (
                  <>
                    <del className="detail-old-price">
                      ₹{product.oldPrice.toLocaleString("en-IN")}
                    </del>
                    <span className="detail-savings-pill">
                      Save ₹{(product.oldPrice - product.price).toLocaleString("en-IN")} ({product.discount}%)
                    </span>
                  </>
                )}
              </div>
              <span className="inclusive-taxes-note">Inclusive of all taxes & GST</span>
            </div>

            {/* Stock status */}
            <div className="stock-status-box">
              {product.stock > 5 ? (
                <span className="stock-tag in-stock">
                  <CheckCircle2 size={16} /> In Stock ({product.stock} units available)
                </span>
              ) : product.stock > 0 ? (
                <span className="stock-tag low-stock">
                  ⚠️ Only {product.stock} left in stock - order soon!
                </span>
              ) : (
                <span className="stock-tag out-of-stock">
                  ✕ Currently Out of Stock
                </span>
              )}
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="detail-purchase-controls">
              <div className="qty-control-wrapper">
                <label className="qty-label">Quantity:</label>
                <div className="qty-box">
                  <button
                    className="qty-adjust-btn"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    disabled={qty <= 1 || product.stock === 0}
                  >
                    <Minus size={15} />
                  </button>
                  <span className="qty-num">{qty}</span>
                  <button
                    className="qty-adjust-btn"
                    onClick={() => setQty(Math.min(product.stock || 10, qty + 1))}
                    disabled={qty >= (product.stock || 10) || product.stock === 0}
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              <div className="detail-actions-row mt-4">
                <button
                  className="btn btn-lg btn-primary flex-1"
                  onClick={() => addCart(product, qty)}
                  disabled={product.stock === 0}
                >
                  <ShoppingBag size={18} /> Add to Cart
                </button>
                <button
                  className="btn btn-lg btn-amber flex-1"
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                >
                  <Zap size={18} /> Buy Now
                </button>
              </div>
            </div>

            {/* Service & Trust Badges */}
            <div className="product-trust-strip">
              <div className="service-badge-item">
                <Truck size={18} />
                <span>Free delivery over ₹999</span>
              </div>
              <div className="service-badge-item">
                <RotateCcw size={18} />
                <span>7-day easy returns</span>
              </div>
              <div className="service-badge-item">
                <ShieldCheck size={18} />
                <span>100% genuine product</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs (Description, Specifications, Reviews) */}
        <div className="detail-tabs-section mt-12">
          <div className="detail-tabs-header">
            <button
              className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
              onClick={() => setActiveTab("description")}
            >
              Description & Highlights
            </button>
            <button
              className={`tab-btn ${activeTab === "specifications" ? "active" : ""}`}
              onClick={() => setActiveTab("specifications")}
            >
              Specifications
            </button>
            <button
              className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Customer Reviews ({reviewsList.length})
            </button>
          </div>

          <div className="detail-tab-content-card">
            {activeTab === "description" && (
              <div className="tab-pane">
                <h3>Product Overview</h3>
                <p className="lead-text">{product.description}</p>
                <h4 className="mt-6 font-semibold">Key Benefits:</h4>
                <ul className="health-checklist mt-2">
                  <li>Formulated with high-grade, bioavailable nutrients</li>
                  <li>Manufactured in ISO-certified pet care facilities</li>
                  <li>Recommended by leading veterinary nutritionists</li>
                  <li>Zero artificial dyes, harmful binders, or untested fillers</li>
                </ul>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="tab-pane">
                <h3>Technical Specifications</h3>
                <div className="specs-table-wrap mt-4">
                  <table className="specs-table">
                    <tbody>
                      {Object.entries(product.specifications || {}).map(([key, val]) => (
                        <tr key={key}>
                          <td className="spec-key">{key}</td>
                          <td className="spec-val">{String(val)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="tab-pane">
                <div className="reviews-section-layout">
                  {/* Reviews List */}
                  <div className="reviews-list-col">
                    <h3>Verified Customer Reviews</h3>
                    <div className="reviews-list mt-4">
                      {reviewsList.map((rev) => (
                        <div className="review-card-item" key={rev.id}>
                          <div className="rev-header">
                            <div className="rev-author-circle">
                              {rev.author.charAt(0)}
                            </div>
                            <div>
                              <b>{rev.author}</b>
                              <span className="rev-date">{rev.date}</span>
                            </div>
                            <div className="rev-stars ml-auto">
                              <Rating value={rev.rating} size={14} showText={false} />
                            </div>
                          </div>
                          <p className="rev-comment">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Write a Review Form */}
                  <div className="write-review-col">
                    <div className="write-review-card">
                      <h4>Write a Review</h4>
                      <p>Share your pet's experience with other parents.</p>
                      <form onSubmit={handleAddReview} className="mt-4">
                        <div className="form-group mb-3">
                          <label>Your Name</label>
                          <input
                            type="text"
                            value={newReviewAuthor}
                            onChange={(e) => setNewReviewAuthor(e.target.value)}
                            placeholder="e.g. Ramesh Kumar"
                            required
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label>Rating</label>
                          <select
                            value={newReviewRating}
                            onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          >
                            <option value={5}>5 Stars - Outstanding</option>
                            <option value={4}>4 Stars - Very Good</option>
                            <option value={3}>3 Stars - Average</option>
                            <option value={2}>2 Stars - Below Average</option>
                            <option value={1}>1 Star - Poor</option>
                          </select>
                        </div>

                        <div className="form-group mb-4">
                          <label>Your Feedback</label>
                          <textarea
                            rows={3}
                            value={newReviewComment}
                            onChange={(e) => setNewReviewComment(e.target.value)}
                            placeholder="What did your pet think of this product?"
                            required
                          />
                        </div>

                        <button type="submit" className="btn btn-primary full-width">
                          Submit Review <Send size={15} />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section mt-16">
            <h2 className="section-title">You May Also Like</h2>
            <p className="section-subtitle">
              More premium essentials from the {product.category} collection.
            </p>
            <div className="pm-grid-4 mt-6">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}