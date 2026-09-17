import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ShieldCheck, ShieldAlert, ArrowRight, Store, KeyRound } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function AdminLogin() {
  const { adminLogin } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@petmart.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const user = adminLogin(email, password);
    if (user) {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid administrative credentials. Use the Demo credentials below.");
    }
  };

  const handleFillDemo = () => {
    setEmail("admin@petmart.com");
    setPassword("admin123");
    setError("");
  };

  return (
    <div className="admin-login-layout">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-shield-icon">
            <ShieldCheck size={36} />
          </div>
          <h1 className="admin-title">PetMart Admin Portal</h1>
          <p className="admin-desc">
            Secure administrative control for store inventory, orders, and customer management.
          </p>
        </div>

        {error && (
          <div className="auth-error-alert mb-4">
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="form-group mb-4">
            <label>Admin Email Address</label>
            <div className="input-with-icon">
              <Mail size={17} className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@petmart.com"
                required
              />
            </div>
          </div>

          <div className="form-group mb-5">
            <label>Master Password</label>
            <div className="input-with-icon">
              <Lock size={17} className="input-icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-dark btn-lg full-width">
            Access Dashboard <ArrowRight size={17} />
          </button>
        </form>

        {/* Demo Fast Fill */}
        <div className="admin-demo-helper-box mt-6">
          <div className="flex justify-between items-center">
            <span className="demo-tag">Default Credentials</span>
            <button
              type="button"
              className="quick-fill-link"
              onClick={handleFillDemo}
            >
              Auto Fill
            </button>
          </div>
          <div className="credentials-code">
            <span>Email: <b>admin@petmart.com</b></span>
            <span>Pass: <b>admin123</b></span>
          </div>
        </div>

        <div className="admin-return-strip mt-6 text-center">
          <Link to="/" className="return-store-link">
            <Store size={14} /> Return to PetMart Customer Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
