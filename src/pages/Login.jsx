import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShieldAlert, ArrowRight, UserCheck } from "lucide-react";
import { useApp } from "../context/AppContext";

export function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-split-container">
      {/* Left Art Panel */}
      <div className="auth-art-panel">
        <div className="auth-art-content">
          <Link to="/" className="auth-brand-logo">
            🐾 Pet<span className="text-highlight">Mart</span>
          </Link>
          <h2 className="auth-art-heading">Where Every Pet Finds A Happy Home.</h2>
          <p className="auth-art-sub">
            Join thousands of pet parents shopping for premium food, durable accessories,
            and vet-certified lovable companions.
          </p>
          <div className="auth-art-badges">
            <span>✓ 100% Genuine Nutrition</span>
            <span>✓ Free Delivery Above ₹999</span>
            <span>✓ Vet-Inspected Health Passports</span>
          </div>
        </div>
      </div>

      {/* Right Form Box */}
      <div className="auth-form-panel">
        <div className="auth-card-inner">
          <h1 className="auth-title">{title}</h1>
          <p className="auth-subtitle">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const user = login(email, password);
    if (!user) {
      setError("Invalid email or password. Check credentials or use Demo Login below.");
      return;
    }
    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate(from, { replace: true });
    }
  };

  const handleDemoLogin = (role) => {
    setError("");
    if (role !== "user") return;
    const u = login("user@petmart.com", "user123");
    if (u) navigate(from, { replace: true });
  };

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Sign in to your PetMart account to access orders, wishlist and profile."
    >
      <form className="auth-form-wrap" onSubmit={handleSubmit}>
        {error && (
          <div className="auth-error-alert">
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="form-group mb-4">
          <label>Email Address</label>
          <div className="input-with-icon">
            <Mail size={17} className="input-icon" />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group mb-4">
          <label>Password</label>
          <div className="input-with-icon">
            <Lock size={17} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="pwd-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="auth-options-row mb-5">
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="forgot-link-btn"
            onClick={() => alert("Demo Password Reset: Use user@petmart.com / user123")}
          >
            Forgot password?
          </button>
        </div>

        <button type="submit" className="btn btn-primary btn-lg full-width">
          Sign In to PetMart <ArrowRight size={17} />
        </button>

        <div className="auth-switch-prompt mt-4">
          Don't have an account yet?{" "}
          <Link to="/register" className="font-semibold text-primary">
            Create an Account
          </Link>
        </div>

        {/* 1-Click Fast Demo Login Buttons */}
        <div className="demo-credentials-box mt-6">
          <div className="demo-box-header">
            <UserCheck size={16} /> Quick Demo Access (1-Click Fill & Sign In):
          </div>
          <div className="demo-buttons-row">
            <button
              type="button"
              className="demo-pill-btn customer"
              onClick={() => handleDemoLogin("user")}
            >
              👤 Login as <b>Customer</b> (user@petmart.com)
            </button>
            <Link to="/admin/login" className="demo-pill-btn admin">
              🛡️ Open <b>Admin Login</b>
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
