import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Trash2,
  Tag,
  Truck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  X
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageTitle, CartItem, Empty } from "../components/Common";

export default function Cart() {
  const {
    cart,
    cartSubtotal,
    cartSavings,
    coupon,
    couponDiscountAmount,
    deliveryFee,
    taxAmount,
    cartGrandTotal,
    applyCoupon,
    removeCoupon,
    clearCart,
    settings
  } = useApp();

  const [couponInput, setCouponInput] = useState("");
  const navigate = useNavigate();

  const threshold = settings?.freeDeliveryThreshold || 999;
  const neededForFreeShipping = Math.max(0, threshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / threshold) * 100));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCoupon(couponInput);
    setCouponInput("");
  };

  return (
    <div className="cart-page-view">
      <PageTitle
        title="Your Shopping Cart 🛒"
        subtitle={
          cart.length > 0
            ? `You have ${cart.length} unique item${cart.length > 1 ? "s" : ""} in your shopping bag.`
            : "Your shopping bag is currently empty."
        }
        breadcrumbs={[{ label: "Shopping Cart" }]}
      />

      <div className="container py-8">
        {cart.length === 0 ? (
          <Empty
            icon="🛒"
            title="Your Cart is Empty"
            description="Looks like you haven't added anything to your cart yet. Discover high-quality pet foods, toys, and lovable companions now!"
            actionText="Start Shopping"
            actionLink="/categories"
            secondaryText="Explore Pets"
            secondaryLink="/pets"
          />
        ) : (
          <div className="cart-layout-grid">
            {/* Left Column: Cart Items List */}
            <div className="cart-items-column">
              {/* Free Delivery Meter */}
              <div className="delivery-meter-card">
                <div className="meter-header">
                  <Truck size={18} className="meter-icon" />
                  {neededForFreeShipping > 0 ? (
                    <span>
                      Add <b>₹{neededForFreeShipping.toLocaleString("en-IN")}</b> more to enjoy <b>FREE Delivery</b>!
                    </span>
                  ) : (
                    <span className="text-success font-semibold">
                      🎉 Congratulations! You have unlocked <b>FREE Express Delivery</b>!
                    </span>
                  )}
                </div>
                <div className="meter-track">
                  <div
                    className="meter-bar"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Container */}
              <div className="cart-items-container-card">
                <div className="cart-table-header">
                  <span>Product</span>
                  <span>Quantity</span>
                  <span>Total</span>
                  <span>Action</span>
                </div>

                <div className="cart-items-list">
                  {cart.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>

                <div className="cart-actions-footer">
                  <Link to="/categories" className="btn btn-outline btn-sm">
                    ← Continue Shopping
                  </Link>
                  <button className="btn btn-ghost btn-sm danger" onClick={clearCart}>
                    <Trash2 size={15} /> Clear Entire Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary Card */}
            <aside className="cart-summary-column">
              <div className="order-summary-card">
                <h3 className="summary-title">Order Summary</h3>

                {/* Coupon Code Box */}
                <div className="coupon-box-wrap">
                  {coupon ? (
                    <div className="applied-coupon-card">
                      <div className="coupon-info">
                        <Tag size={16} />
                        <div>
                          <b>{coupon.code} Applied</b>
                          <small>{coupon.discountPercent}% Instant Savings</small>
                        </div>
                      </div>
                      <button
                        className="remove-coupon-btn"
                        onClick={removeCoupon}
                        title="Remove Coupon"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ) : (
                    <form className="coupon-form" onSubmit={handleApplyCoupon}>
                      <div className="coupon-input-wrap">
                        <Tag size={15} className="coupon-icon" />
                        <input
                          type="text"
                          placeholder="Coupon code (Try PETMART10)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="btn btn-dark btn-sm">
                        Apply
                      </button>
                    </form>
                  )}
                </div>

                {/* Pricing Breakdown Rows */}
                <div className="summary-breakdown">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <b>₹{cartSubtotal.toLocaleString("en-IN")}</b>
                  </div>

                  {cartSavings > 0 && (
                    <div className="summary-row text-success">
                      <span>Catalog Discount</span>
                      <span>−₹{cartSavings.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  {coupon && (
                    <div className="summary-row text-success">
                      <span>Coupon Discount ({coupon.discountPercent}%)</span>
                      <span>−₹{couponDiscountAmount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="summary-row">
                    <span>Delivery Fee</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <b className="text-success">FREE</b>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>

                  <div className="summary-row">
                    <span>Estimated GST (5%)</span>
                    <span>₹{taxAmount.toLocaleString("en-IN")}</span>
                  </div>

                  <hr className="summary-divider" />

                  <div className="summary-total-row">
                    <span>Total Amount</span>
                    <strong className="grand-total-price">
                      ₹{cartGrandTotal.toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="summary-action-area">
                  <button
                    className="btn btn-primary btn-lg full-width"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout <ArrowRight size={18} />
                  </button>
                </div>

                {/* Guarantee assurances */}
                <div className="summary-trust-assurances">
                  <div className="assurance-item">
                    <ShieldCheck size={16} /> 100% Secure Checkout Simulation
                  </div>
                  <div className="assurance-item">
                    <CheckCircle2 size={16} /> Guaranteed Freshness & Genuine Quality
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
