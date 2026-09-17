import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, ChevronRight, PawPrint, Package, ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext";

export function GlobalSearchModal() {
  const { searchModalOpen, setSearchModalOpen, pets, products, categories } = useApp();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [searchModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && searchModalOpen) {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchModalOpen, setSearchModalOpen]);

  if (!searchModalOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingPets = trimmed
    ? pets.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.breed.toLowerCase().includes(trimmed) ||
          p.species.toLowerCase().includes(trimmed) ||
          p.location.toLowerCase().includes(trimmed)
      ).slice(0, 4)
    : [];

  const matchingProducts = trimmed
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.brand.toLowerCase().includes(trimmed)
      ).slice(0, 6)
    : [];

  const matchingCategories = trimmed
    ? categories.filter(
        (c) =>
          c.name.toLowerCase().includes(trimmed) ||
          c.description?.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  const totalResults = matchingPets.length + matchingProducts.length + matchingCategories.length;

  const handleSelect = (url) => {
    setSearchModalOpen(false);
    navigate(url);
  };

  return (
    <div className="search-modal-overlay" onClick={() => setSearchModalOpen(false)}>
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="search-modal-header">
          <Search className="search-input-icon" size={22} />
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder="Search lovable pets, food brands, toys, or categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="search-clear-btn" onClick={() => setQuery("")}>
              <X size={16} />
            </button>
          )}
          <button className="search-modal-close" onClick={() => setSearchModalOpen(false)}>
            Esc
          </button>
        </div>

        {/* Quick Tag Recommendations when empty */}
        {!trimmed && (
          <div className="search-suggestions">
            <span className="suggestion-label">Popular Searches:</span>
            <div className="suggestion-chips">
              {["Golden Retriever", "Royal Canin", "Cat Food", "Orthopedic Bed", "Parrot", "Grooming Kit"].map(
                (term) => (
                  <button
                    key={term}
                    className="suggestion-chip"
                    onClick={() => setQuery(term)}
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Results Body */}
        {trimmed && (
          <div className="search-modal-body">
            {totalResults === 0 ? (
              <div className="search-empty-result">
                <p>No results found for "<b>{query}</b>"</p>
                <small>Try searching for species like "Dog", "Cat", "Bird", or brands like "Pedigree".</small>
              </div>
            ) : (
              <div className="search-results-wrapper">
                {/* Categories */}
                {matchingCategories.length > 0 && (
                  <div className="search-section">
                    <h4>Categories</h4>
                    <div className="search-categories-grid">
                      {matchingCategories.map((c) => (
                        <div
                          key={c.id}
                          className="search-cat-chip"
                          onClick={() => handleSelect(`/categories/${c.slug}`)}
                        >
                          <span>{c.icon}</span>
                          <span>{c.name}</span>
                          <ChevronRight size={14} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pets Results */}
                {matchingPets.length > 0 && (
                  <div className="search-section">
                    <div className="search-section-header">
                      <h4>
                        <PawPrint size={16} /> Pets ({matchingPets.length})
                      </h4>
                      <button onClick={() => handleSelect(`/categories`)}>
                        View all <ArrowRight size={13} />
                      </button>
                    </div>
                    <div className="search-items-list">
                      {matchingPets.map((p) => (
                        <div
                          key={p.id}
                          className="search-item-card"
                          onClick={() => handleSelect(`/pets/${p.id}`)}
                        >
                          <img src={p.image} alt={p.name} className="search-item-thumb" />
                          <div className="search-item-info">
                            <span className="search-item-title">{p.name} • {p.breed}</span>
                            <span className="search-item-subtitle">{p.species} · {p.age} · {p.location}</span>
                          </div>
                          <span className="search-item-price">₹{p.price.toLocaleString("en-IN")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products Results */}
                {matchingProducts.length > 0 && (
                  <div className="search-section">
                    <div className="search-section-header">
                      <h4>
                        <Package size={16} /> Products ({matchingProducts.length})
                      </h4>
                      <button onClick={() => handleSelect(`/categories`)}>
                        View all <ArrowRight size={13} />
                      </button>
                    </div>
                    <div className="search-items-list">
                      {matchingProducts.map((prod) => (
                        <div
                          key={prod.id}
                          className="search-item-card"
                          onClick={() => handleSelect(`/products/${prod.id}`)}
                        >
                          <img src={prod.image} alt={prod.name} className="search-item-thumb" />
                          <div className="search-item-info">
                            <span className="search-item-title">{prod.name}</span>
                            <span className="search-item-subtitle">{prod.brand} · {prod.category}</span>
                          </div>
                          <div className="search-item-price-wrap">
                            <span className="search-item-price">₹{prod.price.toLocaleString("en-IN")}</span>
                            {prod.oldPrice && prod.oldPrice > prod.price && (
                              <del>₹{prod.oldPrice.toLocaleString("en-IN")}</del>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="search-modal-footer">
          <span>Tip: Press <b>Esc</b> to close</span>
          {trimmed && (
            <button
              className="search-view-all-btn"
              onClick={() => handleSelect(`/categories`)}
            >
              Search all products for "{query}" <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default GlobalSearchModal;
