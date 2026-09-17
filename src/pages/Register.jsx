import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, Eye, EyeOff, ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { AuthLayout } from "./Login";

export default function Register() {
  const { register } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      setError("Phone number must be a valid 10-digit number.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setError("Please accept the PetMart Terms & Privacy Policy to register.");
      return;
    }

    const success = register({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    });

    if (success) {
      navigate("/profile");
    }
  };

  return (
    <AuthLayout
      title="Create an Account 🐾"
      subtitle="Join PetMart for exclusive member discounts, order tracking, and fast checkout."
    >
      <form className="auth-form-wrap" onSubmit={handleSubmit}>
        {error && (
          <div className="auth-error-alert">
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="form-group mb-3">
          <label>Full Name *</label>
          <div className="input-with-icon">
            <User size={17} className="input-icon" />
            <input
              type="text"
              name="fullName"
              placeholder="e.g. Ramesh Kumar"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group mb-3">
          <label>Email Address *</label>
          <div className="input-with-icon">
            <Mail size={17} className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group mb-3">
          <label>Mobile Number (10 digits)</label>
          <div className="input-with-icon">
            <Phone size={17} className="input-icon" />
            <input
              type="tel"
              name="phone"
              placeholder="9876543210"
              maxLength={10}
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group mb-3">
          <label>Password (min. 6 characters) *</label>
          <div className="input-with-icon">
            <Lock size={17} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
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

        <div className="form-group mb-4">
          <label>Confirm Password *</label>
          <div className="input-with-icon">
            <Lock size={17} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="auth-options-row mb-5">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <span>I agree to the Terms of Service and Privacy Policy</span>
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-lg full-width">
          Create PetMart Account <ArrowRight size={17} />
        </button>

        <div className="auth-switch-prompt mt-4">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary">
            Sign In here
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
