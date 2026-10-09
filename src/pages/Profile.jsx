import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Edit2,
  Plus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Save
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageTitle } from "../components/Common";

export default function Profile() {
  const {
    currentUser,
    updateProfile,
    addAddress,
    deleteAddress,
    logout,
    orders,
    userOrders: contextUserOrders,
    wishlist,
    notify
  } = useApp();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info"); // "info" | "addresses" | "security"

  // Edit profile form state
  const [editMode, setEditMode] = useState(false);
  const [nameInput, setNameInput] = useState(currentUser?.name || "");
  const [phoneInput, setPhoneInput] = useState(currentUser?.phone || "");

  // Add Address modal/state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    title: "Home",
    fullName: currentUser?.name || "",
    phone: currentUser?.phone || "",
    street: "",
    city: "Hyderabad",
    state: "Telangana",
    pincode: ""
  });

  // Password change state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Keep form inputs strictly in sync with the authenticated user (prevent state leakage)
  useEffect(() => {
    if (currentUser) {
      setNameInput(currentUser.name || "");
      setPhoneInput(currentUser.phone || "");
      setEditMode(false);
      setNewAddr((prev) => ({
        ...prev,
        fullName: currentUser.name || "",
        phone: currentUser.phone || ""
      }));
    }
  }, [currentUser?.id, currentUser?.name, currentUser?.phone]);

  if (!currentUser) return null;

  // Filter orders strictly made by this authenticated user
  const userOrders = contextUserOrders || orders.filter((o) => {
    if (o.userId && currentUser?.id) {
      return o.userId === currentUser.id;
    }
    return Boolean(o.email && currentUser?.email && o.email.toLowerCase() === currentUser.email.toLowerCase());
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ name: nameInput, phone: phoneInput });
    setEditMode(false);
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.pincode) {
      notify("Please fill in the street address and pincode.", "error");
      return;
    }
    addAddress(newAddr);
    setShowAddressModal(false);
    setNewAddr({
      title: "Home",
      fullName: currentUser.name,
      phone: currentUser.phone,
      street: "",
      city: "Hyderabad",
      state: "Telangana",
      pincode: ""
    });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (oldPassword !== currentUser.password) {
      notify("Current password does not match.", "error");
      return;
    }
    if (newPassword.length < 6) {
      notify("New password must be at least 6 characters.", "error");
      return;
    }
    updateProfile({ password: newPassword });
    setOldPassword("");
    setNewPassword("");
    notify("Password updated successfully!");
  };

  return (
    <div className="profile-page-view">
      <PageTitle
        title="My Account Dashboard 👤"
        subtitle={`Welcome back, ${currentUser.name}. Manage your delivery addresses, track orders, and update credentials.`}
        breadcrumbs={[{ label: "Profile" }]}
      />

      <div className="container py-8">
        <div className="profile-layout-grid">
          {/* Left: Profile Navigation Card */}
          <aside className="profile-sidebar-card">
            <div className="profile-user-hero">
              <div className="profile-avatar-large">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="profile-name-text">{currentUser.name}</h3>
              <span className="profile-email-text">{currentUser.email}</span>
              <span className={`profile-role-badge ${currentUser.role}`}>
                {currentUser.role === "admin" ? "Store Administrator" : "Loyal Pet Parent"}
              </span>
            </div>

            <div className="profile-nav-menu">
              <button
                className={`profile-nav-btn ${activeTab === "info" ? "active" : ""}`}
                onClick={() => setActiveTab("info")}
              >
                <User size={17} /> Personal Information
              </button>

              <button
                className={`profile-nav-btn ${activeTab === "addresses" ? "active" : ""}`}
                onClick={() => setActiveTab("addresses")}
              >
                <MapPin size={17} /> Delivery Addresses ({currentUser.addresses?.length || 0})
              </button>

              <button
                className={`profile-nav-btn ${activeTab === "security" ? "active" : ""}`}
                onClick={() => setActiveTab("security")}
              >
                <Settings size={17} /> Account Security
              </button>

              <Link to="/orders" className="profile-nav-btn">
                <Package size={17} /> My Orders ({userOrders.length})
              </Link>

              <Link to="/wishlist" className="profile-nav-btn">
                <Heart size={17} /> Saved Wishlist ({wishlist.length})
              </Link>

              {currentUser.role === "admin" && (
                <Link to="/admin/dashboard" className="profile-nav-btn admin-link">
                  <ShieldCheck size={17} /> Admin Dashboard
                </Link>
              )}

              <hr className="profile-nav-divider" />

              <button
                className="profile-nav-btn logout-btn"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                <LogOut size={17} /> Sign Out
              </button>
            </div>
          </aside>

          {/* Right: Tab Content Area */}
          <main className="profile-main-card">
            {/* Quick Metrics Cards */}
            <div className="profile-stats-grid mb-6">
              <div className="profile-stat-box">
                <div className="stat-icon-wrap green">
                  <Package size={22} />
                </div>
                <div>
                  <span className="stat-label">Total Orders</span>
                  <strong className="stat-number">{userOrders.length}</strong>
                </div>
              </div>

              <div className="profile-stat-box">
                <div className="stat-icon-wrap amber">
                  <Heart size={22} />
                </div>
                <div>
                  <span className="stat-label">Wishlist Items</span>
                  <strong className="stat-number">{wishlist.length}</strong>
                </div>
              </div>

              <div className="profile-stat-box">
                <div className="stat-icon-wrap blue">
                  <MapPin size={22} />
                </div>
                <div>
                  <span className="stat-label">Saved Addresses</span>
                  <strong className="stat-number">{currentUser.addresses?.length || 0}</strong>
                </div>
              </div>
            </div>

            {/* TAB 1: Personal Information */}
            {activeTab === "info" && (
              <div className="profile-tab-pane">
                <div className="pane-header-row">
                  <div>
                    <h3>Profile Information</h3>
                    <p>Update your personal details and contact credentials.</p>
                  </div>
                  {!editMode && (
                    <button className="btn btn-outline btn-sm" onClick={() => setEditMode(true)}>
                      <Edit2 size={14} /> Edit Profile
                    </button>
                  )}
                </div>

                {editMode ? (
                  <form onSubmit={handleSaveProfile} className="mt-6">
                    <div className="form-grid-2">
                      <div className="form-group mb-4">
                        <label>Full Name</label>
                        <input
                          type="text"
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group mb-4">
                        <label>Phone Number</label>
                        <input
                          type="text"
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                        />
                      </div>

                      <div className="form-group mb-4 col-span-2">
                        <label>Email Address</label>
                        <input type="email" value={currentUser.email} disabled />
                        <small className="text-muted">Email address is fixed for security identification.</small>
                      </div>
                    </div>

                    <div className="form-actions-row">
                      <button type="submit" className="btn btn-primary">
                        <Save size={15} /> Save Changes
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => setEditMode(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="info-display-list mt-6">
                    <div className="info-display-row">
                      <span className="info-label">Full Name:</span>
                      <span className="info-val">{currentUser.name}</span>
                    </div>
                    <div className="info-display-row">
                      <span className="info-label">Email Address:</span>
                      <span className="info-val">{currentUser.email}</span>
                    </div>
                    <div className="info-display-row">
                      <span className="info-label">Phone Number:</span>
                      <span className="info-val">{currentUser.phone || "Not provided"}</span>
                    </div>
                    <div className="info-display-row">
                      <span className="info-label">Account Role:</span>
                      <span className="info-val capitalize">{currentUser.role}</span>
                    </div>
                    <div className="info-display-row">
                      <span className="info-label">Member Since:</span>
                      <span className="info-val">{currentUser.joined || "2024-01-01"}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Addresses */}
            {activeTab === "addresses" && (
              <div className="profile-tab-pane">
                <div className="pane-header-row">
                  <div>
                    <h3>Saved Delivery Addresses</h3>
                    <p>Manage home and office shipping locations for faster checkout.</p>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setShowAddressModal(true)}
                  >
                    <Plus size={15} /> Add New Address
                  </button>
                </div>

                <div className="addresses-cards-grid mt-6">
                  {currentUser.addresses && currentUser.addresses.length > 0 ? (
                    currentUser.addresses.map((addr) => (
                      <div className="address-card-item" key={addr.id}>
                        <div className="addr-card-header">
                          <span className="addr-title-pill">{addr.title}</span>
                          {addr.isDefault && (
                            <span className="addr-default-badge">Default</span>
                          )}
                          <button
                            className="addr-delete-btn"
                            onClick={() => deleteAddress(addr.id)}
                            title="Delete address"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <h4 className="addr-recipient">{addr.fullName}</h4>
                        <p className="addr-street">{addr.street}</p>
                        <p className="addr-city">
                          {addr.city}, {addr.state} - <b>{addr.pincode}</b>
                        </p>
                        <span className="addr-phone">Phone: {addr.phone}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No saved addresses yet. Click "Add New Address" above.</p>
                  )}
                </div>

                {/* Add Address Modal */}
                {showAddressModal && (
                  <div className="modal-backdrop-overlay" onClick={() => setShowAddressModal(false)}>
                    <div className="modal-dialog-box" onClick={(e) => e.stopPropagation()}>
                      <h3>Add New Shipping Address</h3>
                      <form onSubmit={handleAddAddress} className="mt-4">
                        <div className="form-group mb-3">
                          <label>Address Label (e.g. Home, Office)</label>
                          <input
                            type="text"
                            value={newAddr.title}
                            onChange={(e) => setNewAddr({ ...newAddr, title: e.target.value })}
                            required
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label>Full Name</label>
                          <input
                            type="text"
                            value={newAddr.fullName}
                            onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                            required
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label>Phone Number (10 digits)</label>
                          <input
                            type="tel"
                            value={newAddr.phone}
                            onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                            maxLength={10}
                            required
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label>Street Address</label>
                          <textarea
                            rows={2}
                            value={newAddr.street}
                            onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                            required
                          />
                        </div>

                        <div className="form-grid-2">
                          <div className="form-group mb-3">
                            <label>City</label>
                            <input
                              type="text"
                              value={newAddr.city}
                              onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                              required
                            />
                          </div>

                          <div className="form-group mb-3">
                            <label>Pincode (6 digits)</label>
                            <input
                              type="text"
                              value={newAddr.pincode}
                              onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                              maxLength={6}
                              required
                            />
                          </div>
                        </div>

                        <div className="modal-actions-footer mt-4">
                          <button type="submit" className="btn btn-primary">
                            Save Address
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline"
                            onClick={() => setShowAddressModal(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Account Security */}
            {activeTab === "security" && (
              <div className="profile-tab-pane">
                <div className="pane-header-row">
                  <div>
                    <h3>Account Security</h3>
                    <p>Update your secret login password.</p>
                  </div>
                </div>

                <form onSubmit={handlePasswordChange} className="max-w-md mt-6">
                  <div className="form-group mb-4">
                    <label>Current Password</label>
                    <input
                      type="password"
                      placeholder="Enter current password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label>New Password (min 6 characters)</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Update Password
                  </button>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
