import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CreditCard,
  QrCode,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Package,
  Clock,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageTitle, Empty } from "../components/Common";

export default function Checkout() {
  const {
    cart,
    cartSubtotal,
    cartSavings,
    coupon,
    couponDiscountAmount,
    deliveryFee,
    taxAmount,
    cartGrandTotal,
    currentUser,
    placeOrder,
    notify
  } = useApp();

  const navigate = useNavigate();

  // Completed order state
  const [completedOrder, setCompletedOrder] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Default address from profile if available
  const defaultAddr = currentUser?.addresses?.find((a) => a.isDefault) || currentUser?.addresses?.[0];

  // Delivery Form State
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || defaultAddr?.fullName || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || defaultAddr?.phone || "",
    address: defaultAddr?.street || "",
    city: defaultAddr?.city || "Hyderabad",
    state: defaultAddr?.state || "Telangana",
    pincode: defaultAddr?.pincode || ""
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState("upi"); // "upi" | "card" | "cod"
  const [cardInfo, setCardInfo] = useState({
    number: "4532 •••• •••• 8821",
    name: currentUser?.name || "Priya Sharma",
    expiry: "12/28",
    cvv: "•••"
  });
  const [upiId, setUpiId] = useState("petparent@okhdfcbank");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.pincode.trim()
    ) {
      notify("Please complete all shipping address fields.", "error");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      notify("Please enter a valid 10-digit mobile phone number.", "error");
      return;
    }

    if (!/^[0-9]{6}$/.test(formData.pincode.replace(/[^0-9]/g, ""))) {
      notify("Please enter a valid 6-digit Indian postal pincode.", "error");
      return;
    }

    setIsProcessing(true);

    let payMethodName = "Cash on Delivery (COD)";
    if (paymentMethod === "upi") payMethodName = `UPI (${upiId})`;
    if (paymentMethod === "card") payMethodName = `Card (ending in ${cardInfo.number.slice(-4)})`;

    // Simulate 1.2s processing delay for realism
    setTimeout(() => {
      const order = placeOrder(formData, payMethodName);
      setIsProcessing(false);
      setCompletedOrder(order);
    }, 1200);
  };

  // Order Success Screen
  if (completedOrder) {
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + 3);

    return (
      <div className="order-success-view">
        <div className="container py-12">
          <div className="success-confirmation-card">
            <div className="success-icon-badge">
              <CheckCircle2 size={50} />
            </div>

            <span className="success-pill">Order Placed Successfully!</span>
            <h1 className="success-title">Thank You, {completedOrder.customer.split(" ")[0]}! 🎉</h1>
            <p className="success-subtitle">
              Your order <b>#{completedOrder.id}</b> has been received and is being prepared with love.
            </p>

            {/* Quick Stats Grid */}
            <div className="success-meta-grid">
              <div className="success-meta-item">
                <Clock size={18} />
                <div>
                  <span>Estimated Delivery</span>
                  <b>{estimatedDate.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" })}</b>
                </div>
              </div>

              <div className="success-meta-item">
                <ShieldCheck size={18} />
                <div>
                  <span>Payment Mode</span>
                  <b>{completedOrder.payment}</b>
                </div>
              </div>

              <div className="success-meta-item">
                <Package size={18} />
                <div>
                  <span>Total Paid</span>
                  <b>₹{completedOrder.total.toLocaleString("en-IN")}</b>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="success-address-box">
              <h4>Shipping Destination:</h4>
              <p>{completedOrder.address}</p>
              <small>Updates will be sent to {completedOrder.email}</small>
            </div>

            {/* Purchased Items List */}
            <div className="success-items-list">
              <h4>Ordered Items ({completedOrder.items.length}):</h4>
              <div className="items-scroll">
                {completedOrder.items.map((item) => (
                  <div className="success-item-row" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div className="item-info">
                      <b>{item.name}</b>
                      <span>Qty: {item.qty} × ₹{item.price.toLocaleString("en-IN")}</span>
                    </div>
                    <span className="item-subtotal">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="success-actions-row">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => navigate("/orders")}
              >
                View My Orders <ArrowRight size={18} />
              </button>
              <Link to="/categories" className="btn btn-outline btn-lg">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="container py-16">
        <Empty
          icon="🛒"
          title="Your Cart is Empty"
          description="You cannot proceed to checkout without adding any products or pets to your cart."
          actionText="Explore Pet Shop"
          actionLink="/categories"
          secondaryText="Browse Pets"
          secondaryLink="/pets"
        />
      </div>
    );
  }

  return (
    <div className="checkout-page-view">
      <PageTitle
        title="Secure Checkout 🔐"
        subtitle="Frontend-only payment simulation. Review delivery address and confirm your order."
        breadcrumbs={[
          { label: "Cart", link: "/cart" },
          { label: "Checkout" }
        ]}
      />

      <div className="container py-8">
        <div className="checkout-layout-grid">
          {/* Left: Shipping & Payment Form */}
          <form className="checkout-form-column" onSubmit={handlePlaceOrder}>
            {/* 1. Customer Shipping Address */}
            <div className="checkout-section-card">
              <div className="section-card-header">
                <span className="step-num">1</span>
                <div>
                  <h3>Delivery Address</h3>
                  <p>Where should we send your pet's essentials?</p>
                </div>
              </div>

              <div className="checkout-form-grid mt-4">
                <div className="form-group col-span-2">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Priya Sharma"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Mobile Phone * (10 digits)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    maxLength={10}
                    required
                  />
                </div>

                <div className="form-group col-span-2">
                  <label>Street Address / Apartment *</label>
                  <textarea
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Flat / House No., Building Name, Road"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group col-span-2">
                  <label>Postal Pincode * (6 digits)</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="e.g. 500081"
                    maxLength={6}
                    required
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method Simulation */}
            <div className="checkout-section-card mt-6">
              <div className="section-card-header">
                <span className="step-num">2</span>
                <div>
                  <h3>Payment Method</h3>
                  <p>Frontend simulation only — no real financial transaction is processed.</p>
                </div>
              </div>

              <div className="payment-options-list mt-4">
                {/* UPI Option */}
                <label className={`payment-method-tile ${paymentMethod === "upi" ? "active" : ""}`}>
                  <div className="tile-radio-row">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                    />
                    <QrCode size={20} className="payment-icon" />
                    <div>
                      <b>UPI (Google Pay, PhonePe, Paytm, BHIM)</b>
                      <small>Instant & contactless payment</small>
                    </div>
                  </div>
                  {paymentMethod === "upi" && (
                    <div className="payment-subform">
                      <label>Enter UPI VPA ID:</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                      />
                    </div>
                  )}
                </label>

                {/* Credit/Debit Card Option */}
                <label className={`payment-method-tile ${paymentMethod === "card" ? "active" : ""}`}>
                  <div className="tile-radio-row">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    <CreditCard size={20} className="payment-icon" />
                    <div>
                      <b>Credit or Debit Card</b>
                      <small>Visa, MasterCard, RuPay, Amex</small>
                    </div>
                  </div>
                  {paymentMethod === "card" && (
                    <div className="payment-subform">
                      <div className="card-fields-grid">
                        <div className="form-group col-span-2">
                          <label>Card Number</label>
                          <input
                            type="text"
                            value={cardInfo.number}
                            onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Cardholder Name</label>
                          <input
                            type="text"
                            value={cardInfo.name}
                            onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Expiry (MM/YY)</label>
                          <input
                            type="text"
                            value={cardInfo.expiry}
                            onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </label>

                {/* Cash on Delivery Option */}
                <label className={`payment-method-tile ${paymentMethod === "cod" ? "active" : ""}`}>
                  <div className="tile-radio-row">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <Banknote size={20} className="payment-icon" />
                    <div>
                      <b>Cash on Delivery (COD)</b>
                      <small>Pay in cash or scan QR upon physical package delivery</small>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Place Order CTA */}
            <div className="checkout-submit-area mt-6">
              <button
                type="submit"
                className="btn btn-primary btn-lg full-width"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner-dot" /> Authorizing & Processing...
                  </>
                ) : (
                  <>
                    <Lock size={17} /> Confirm & Place Order • ₹{cartGrandTotal.toLocaleString("en-IN")}
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Right: Order Summary Sidebar */}
          <aside className="checkout-summary-column">
            <div className="checkout-summary-card">
              <h3>Order Summary ({cart.length} items)</h3>

              <div className="checkout-items-preview">
                {cart.map((item) => (
                  <div className="checkout-mini-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div className="mini-info">
                      <span className="mini-title">{item.name}</span>
                      <small>Qty: {item.qty} × ₹{item.price.toLocaleString("en-IN")}</small>
                    </div>
                    <span className="mini-price">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="summary-divider" />

              <div className="summary-breakdown">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <b>₹{cartSubtotal.toLocaleString("en-IN")}</b>
                </div>

                {coupon && (
                  <div className="summary-row text-success">
                    <span>Coupon ({coupon.code})</span>
                    <span>−₹{couponDiscountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="summary-row">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? <b className="text-success">FREE</b> : `₹${deliveryFee}`}</span>
                </div>

                <div className="summary-row">
                  <span>GST Tax (5%)</span>
                  <span>₹{taxAmount.toLocaleString("en-IN")}</span>
                </div>

                <hr className="summary-divider" />

                <div className="summary-total-row">
                  <span>Grand Total</span>
                  <strong className="grand-total-price">
                    ₹{cartGrandTotal.toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>

              <div className="checkout-security-notice mt-4">
                <ShieldCheck size={16} /> 256-bit Encrypted Frontend Simulation
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
