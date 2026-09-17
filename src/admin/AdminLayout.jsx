import React, { useState } from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PawPrint,
  Package,
  Tags,
  ShoppingBag,
  Users,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  Store,
  ShieldCheck,
  Bell
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function AdminLayout() {
  const { adminSession, adminLogout } = useApp();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { to: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "pets", label: "Pets Management", icon: PawPrint },
    { to: "products", label: "Products Catalog", icon: Package },
    { to: "categories", label: "Categories", icon: Tags },
    { to: "orders", label: "Customer Orders", icon: ShoppingBag },
    { to: "users", label: "Users & Accounts", icon: Users },
    { to: "reviews", label: "Reviews & Feedback", icon: Star },
    { to: "settings", label: "Store Settings", icon: Settings }
  ];

  const handleLogout = () => {
    adminLogout();
    navigate("/");
  };

  return (
    <div className="admin-shell-layout">
      {/* Mobile Menu Toggle Button */}
      <button
        className="admin-mobile-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle Admin Sidebar"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Admin Sidebar Navigation */}
      <aside className={`admin-sidebar-nav ${sidebarOpen ? "open" : ""}`}>
        {/* Brand Header */}
        <div className="admin-sidebar-header">
          <Link to="/" className="admin-brand-link">
            <span>🐾</span> Pet<span className="brand-highlight">Mart</span>
          </Link>
          <span className="admin-role-tag">
            <ShieldCheck size={12} /> ADMIN PANEL
          </span>
        </div>

        {/* Links Navigation */}
        <nav className="admin-nav-links">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={`/admin/${to}`}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `admin-nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Storefront Link & Logout */}
        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-store-link" title="Open Customer Storefront">
            <Store size={16} /> View Storefront
          </Link>
          <button className="admin-logout-btn" onClick={handleLogout}>
            <LogOut size={16} /> Logout Admin
          </button>
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <div className="admin-main-viewport">
        {/* Top Navbar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <span className="admin-date-chip">
              🗓️ {new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
            </span>
          </div>

          <div className="admin-topbar-right">
            <Link to="/" className="btn btn-outline btn-sm">
              <Store size={14} /> Back to Store
            </Link>

            <div className="admin-profile-pill">
              <div className="admin-avatar">
                {adminSession?.name?.charAt(0) || "A"}
              </div>
              <div className="admin-name-role">
                <b>{adminSession?.name || "PetMart Admin"}</b>
                <small>Super Administrator</small>
              </div>
            </div>
          </div>
        </header>

        {/* Sub-view Outlet */}
        <main className="admin-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
