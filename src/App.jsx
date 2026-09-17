import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Common UI Components
import { Navbar, Footer, Toast, GlobalSearchModal, ProtectedRoute } from "./components/Common";

// Storefront Pages
import Home from "./pages/Home";
import PetDetails from "./pages/PetDetails";
import ProductDetails from "./pages/ProductDetails";
import Category from "./pages/Category";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Info from "./pages/Info";

// Admin Portal Pages
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ManagePets from "./admin/ManagePets";
import ManageProducts from "./admin/ManageProducts";
import ManageCategories from "./admin/ManageCategories";
import ManageOrders from "./admin/ManageOrders";
import ManageUsers from "./admin/ManageUsers";
import ManageReviews from "./admin/ManageReviews";
import AdminSettings from "./admin/AdminSettings";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="petmart-app-root">
      <ScrollToTop />

      {/* Render Customer Header & Search only on customer routes */}
      {!isAdminRoute && <Navbar />}
      <GlobalSearchModal />

      <main className={`app-main-content ${isAdminRoute ? "admin-mode" : ""}`}>
        <Routes>
          {/* Customer Storefront Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/categories/:category" element={<Category />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<Info type="about" />} />
          <Route path="/contact" element={<Info type="contact" />} />

          {/* Admin Portal Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="pets" element={<ManagePets />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="categories" element={<ManageCategories />} />
            <Route path="orders" element={<ManageOrders />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="reviews" element={<ManageReviews />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Catch-all 404 Route */}
          <Route
            path="*"
            element={
              <div className="container py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">404 - Page Not Found 🐾</h1>
                <p className="text-muted mb-6">
                  The page you are looking for does not exist or has been relocated.
                </p>
                <a href="/" className="btn btn-primary">
                  Return to Home
                </a>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Render Customer Footer only on customer routes */}
      {!isAdminRoute && <Footer />}

      {/* Global Toast Alerts */}
      <Toast />
    </div>
  );
}
