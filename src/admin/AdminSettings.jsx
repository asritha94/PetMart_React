import React, { useState } from "react";
import { Settings, Save, ShieldCheck, Sparkles, Store, IndianRupee } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function AdminSettings() {
  const { settings, updateSettings, notify } = useApp();

  const [form, setForm] = useState({
    storeName: settings?.storeName || "PetMart Online Store",
    supportEmail: settings?.supportEmail || "support@petmart.com",
    supportPhone: settings?.supportPhone || "+91 90000 12345",
    storeAddress: settings?.storeAddress || "Road No. 36, Jubilee Hills, Hyderabad 500033",
    currency: "₹",
    freeDeliveryThreshold: settings?.freeDeliveryThreshold || 999,
    standardDeliveryFee: settings?.standardDeliveryFee || 99,
    taxRatePercent: settings?.taxRatePercent || 5,
    showAnnouncement: settings?.showAnnouncement ?? true,
    announcementText:
      settings?.announcementText ||
      "🎉 Grand Pet Celebration: Use coupon PETMART10 for flat 10% off! Free Delivery over ₹999."
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings({
      ...form,
      freeDeliveryThreshold: Number(form.freeDeliveryThreshold),
      standardDeliveryFee: Number(form.standardDeliveryFee),
      taxRatePercent: Number(form.taxRatePercent)
    });
  };

  return (
    <div className="admin-manage-view">
      <div className="admin-view-header">
        <div>
          <span className="admin-breadcrumb-tag">CONFIGURATION & PREFERENCES</span>
          <h1 className="admin-page-title">Store Settings</h1>
          <p className="admin-page-subtitle">
            Configure global shipping thresholds, tax rates, announcement promotions, and support contacts.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="admin-settings-form mt-6">
        <div className="admin-card-section">
          <h3>
            <Store size={18} /> General Store Identity
          </h3>
          <p className="section-subtext">Brand name and customer support contact details.</p>

          <div className="form-grid-2 mt-4">
            <div className="form-group mb-4">
              <label>Store Name</label>
              <input
                type="text"
                name="storeName"
                value={form.storeName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-4">
              <label>Operating Currency</label>
              <input
                type="text"
                value="₹ INR (Indian Rupee)"
                disabled
                className="bg-gray-100"
              />
            </div>

            <div className="form-group mb-4">
              <label>Customer Support Email</label>
              <input
                type="email"
                name="supportEmail"
                value={form.supportEmail}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-4">
              <label>Support Helpline Number</label>
              <input
                type="text"
                name="supportPhone"
                value={form.supportPhone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-4 col-span-2">
              <label>Registered Store Address</label>
              <input
                type="text"
                name="storeAddress"
                value={form.storeAddress}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="admin-card-section mt-6">
          <h3>
            <IndianRupee size={18} /> Commerce & Delivery Rules
          </h3>
          <p className="section-subtext">Control delivery fees and taxes applied across all shopping carts.</p>

          <div className="form-grid-3 mt-4">
            <div className="form-group mb-4">
              <label>Free Shipping Threshold (₹)</label>
              <input
                type="number"
                name="freeDeliveryThreshold"
                value={form.freeDeliveryThreshold}
                onChange={handleChange}
                required
              />
              <small className="text-muted">Carts above this amount receive free delivery.</small>
            </div>

            <div className="form-group mb-4">
              <label>Standard Delivery Fee (₹)</label>
              <input
                type="number"
                name="standardDeliveryFee"
                value={form.standardDeliveryFee}
                onChange={handleChange}
                required
              />
              <small className="text-muted">Applied when cart total is below threshold.</small>
            </div>

            <div className="form-group mb-4">
              <label>Estimated GST Tax Rate (%)</label>
              <input
                type="number"
                name="taxRatePercent"
                value={form.taxRatePercent}
                onChange={handleChange}
                required
              />
              <small className="text-muted">Percentage calculated at checkout.</small>
            </div>
          </div>
        </div>

        <div className="admin-card-section mt-6">
          <h3>
            <Sparkles size={18} /> Promotional Announcement Bar
          </h3>
          <p className="section-subtext">Manage the top promotional strip displayed across the customer storefront.</p>

          <div className="form-group mb-4 mt-4">
            <label className="checkbox-toggle-label">
              <input
                type="checkbox"
                name="showAnnouncement"
                checked={form.showAnnouncement}
                onChange={handleChange}
              />
              <span>Display Announcement Bar at the top of PetMart storefront</span>
            </label>
          </div>

          <div className="form-group mb-4">
            <label>Announcement Message</label>
            <input
              type="text"
              name="announcementText"
              value={form.announcementText}
              onChange={handleChange}
              placeholder="e.g. Free delivery on orders over ₹999..."
            />
          </div>
        </div>

        <div className="settings-submit-strip mt-6">
          <button type="submit" className="btn btn-primary btn-lg">
            <Save size={18} /> Save Store Settings
          </button>
        </div>
      </form>
    </div>
  );
}
