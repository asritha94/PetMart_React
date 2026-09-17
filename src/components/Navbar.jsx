import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  Package,
  LogOut,
  Sparkles,
  PhoneCall,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export function Navbar() {
  const {
    cart,
    wishlist,
    categories,
    currentUser,
    logout,
    settings,
    setSearchModalOpen,
    login,
    adminLogin
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setCategoriesDropdownOpen(false);
  }, [location.pathname]);

  // Handle outside click for user dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleQuickDemoLogin = (role) => {
    if (role === "admin") {
      adminLogin("admin@petmart.com", "admin123");
      navigate("/admin/dashboard");
    } else {
      login("user@petmart.com", "user123");
      navigate("/profile");
    }
  };

  return (
    <header className={`pm-header ${scrolled ? "header-scrolled" : ""}`}>
      {/* Top Announcement Bar */}
      {settings?.showAnnouncement && (
        <div className="announcement-bar">
          <div className="container announcement-inner">
            <span className="announcement-text">
              <Sparkles size={14} className="sparkle-icon" /> {settings.announcementText}
            </span>
            <div className="announcement-links">
              <span className="announcement-contact">
                <PhoneCall size={12} /> {settings.supportPhone}
              </span>
              <span className="announcement-sep">•</span>
              <button
                className="demo-quick-btn"
                onClick={() => handleQuickDemoLogin("admin")}
                title="Log in directly as Admin"
              >
                Admin Demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="container navbar-main">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <span className="brand-logo-icon">🐾</span>
          <span className="brand-name">
            Pet<span className="brand-highlight">Mart</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-desktop-menu">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} end>
            Home
          </NavLink>
          {/* Categories dropdown */}
          <div
            className="nav-dropdown-wrapper"
            onMouseEnter={() => setCategoriesDropdownOpen(true)}
            onMouseLeave={() => setCategoriesDropdownOpen(false)}
          >
            <NavLink
              to="/categories"
              className={({ isActive }) => `nav-link nav-dropdown-trigger ${isActive ? "active" : ""}`}
            >
              Categories <ChevronDown size={14} className="dropdown-arrow" />
            </NavLink>
            {categoriesDropdownOpen && (
              <div className="categories-mega-menu">
                <div className="mega-menu-grid">
                  {categories.map((category) => (
                    <Link to={`/categories/${category.slug}`} className="mega-item" key={category.id}>
                      <span>{category.icon}</span>
                      <div><b>{category.name}</b><small>{category.description}</small></div>
                    </Link>
                  ))}
                </div>
                <div className="mega-footer">
                  <Link to="/categories">View All Categories →</Link>
                </div>
              </div>
            )}
          </div>

          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Contact
          </NavLink>
        </nav>

        {/* Action Icons (Search, Wishlist, Cart, User) */}
        <div className="nav-actions-group">
          {/* Search trigger */}
          <button
            className="nav-action-btn search-trigger"
            onClick={() => setSearchModalOpen(true)}
            title="Search pet food, accessories and care essentials (Esc to close)"
            aria-label="Search"
          >
            <Search size={20} />
            <span className="search-pill-label">Search...</span>
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" className="nav-action-btn" title="Wishlist" aria-label="Wishlist">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="nav-counter-badge pulse">{wishlist.length}</span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="nav-action-btn cart-btn-highlight" title="Shopping Cart" aria-label="Shopping Cart">
            <ShoppingBag size={20} />
            {totalCartCount > 0 && (
              <span className="nav-counter-badge">{totalCartCount}</span>
            )}
          </Link>

          {/* User Account / Dropdown */}
          <div className="user-menu-wrapper" ref={dropdownRef}>
            {currentUser ? (
              <button
                className="user-profile-trigger"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                title={currentUser.name}
              >
                <div className="user-avatar-circle">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="user-firstname">
                  {currentUser.name.split(" ")[0]}
                </span>
                <ChevronDown size={14} />
              </button>
            ) : (
              <div className="auth-links-group">
                <Link to="/login" className="btn btn-sm btn-ghost">
                  Login
                </Link>
                <Link to="/register" className="btn btn-sm btn-primary">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Logged-In User Dropdown */}
            {currentUser && userDropdownOpen && (
              <div className="user-dropdown-card">
                <div className="user-dropdown-header">
                  <div className="user-dropdown-name">{currentUser.name}</div>
                  <div className="user-dropdown-email">{currentUser.email}</div>
                  <span className={`user-role-badge ${currentUser.role}`}>
                    {currentUser.role === "admin" ? "Store Administrator" : "Verified Customer"}
                  </span>
                </div>

                <div className="user-dropdown-menu">
                  {currentUser.role === "admin" ? (
                    <Link
                      to="/admin/dashboard"
                      className="dropdown-menu-item admin-highlight-item"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <LayoutDashboard size={16} /> Admin Dashboard
                    </Link>
                  ) : null}

                  <Link
                    to="/profile"
                    className="dropdown-menu-item"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <User size={16} /> My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="dropdown-menu-item"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <Package size={16} /> My Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    className="dropdown-menu-item"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <Heart size={16} /> Wishlist ({wishlist.length})
                  </Link>
                </div>

                <div className="user-dropdown-footer">
                  <button
                    className="dropdown-menu-item logout-item"
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                      navigate("/");
                    }}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-search-bar">
            <button
              className="mobile-search-inner"
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchModalOpen(true);
              }}
            >
              <Search size={18} />
              <span>Search pets, food, toys, grooming...</span>
            </button>
          </div>

          <div className="mobile-nav-links">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/categories" onClick={() => setMobileMenuOpen(false)}>
              Categories
            </Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
              About PetMart
            </Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              Contact Support
            </Link>
          </div>

          <div className="mobile-user-section">
            {currentUser ? (
              <div className="mobile-user-info">
                <div className="mobile-user-row">
                  <div className="user-avatar-circle">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <b>{currentUser.name}</b>
                    <small>{currentUser.email}</small>
                  </div>
                </div>
                <div className="mobile-user-links">
                  {currentUser.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="btn btn-dark full-width"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LayoutDashboard size={16} /> Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="btn btn-outline full-width"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile Information
                  </Link>
                  <Link
                    to="/orders"
                    className="btn btn-outline full-width"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    className="btn btn-ghost danger full-width"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="mobile-auth-actions">
                <Link
                  to="/login"
                  className="btn btn-primary full-width"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="btn btn-outline full-width"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Create Account
                </Link>
                <div className="mobile-demo-buttons">
                  <button
                    className="demo-btn-mobile"
                    onClick={() => {
                      handleQuickDemoLogin("user");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Demo User Login
                  </button>
                  <button
                    className="demo-btn-mobile admin"
                    onClick={() => {
                      handleQuickDemoLogin("admin");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Demo Admin Login
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
