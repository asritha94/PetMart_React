import React from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight, Heart } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageTitle, Empty } from "../components/Common";

export default function Wishlist() {
  const { wishlist, removeWish, moveWishToCart, clearWishlist } = useApp();

  return (
    <div className="wishlist-page-view">
      <PageTitle
        title="My Wishlist ♡"
        subtitle={
          wishlist.length > 0
            ? `You have ${wishlist.length} item${wishlist.length > 1 ? "s" : ""} saved in your wishlist.`
            : "Your wishlist is currently waiting for your favorite pet items."
        }
        breadcrumbs={[{ label: "Wishlist" }]}
      />

      <div className="container py-8">
        {wishlist.length === 0 ? (
          <Empty
            icon="♡"
            title="Your Wishlist is Empty"
            description="Explore our adorable pets or browse premium pet supplies and tap the heart icon to save your favorites."
            actionText="Browse Pets"
            actionLink="/pets"
            secondaryText="Explore Shop"
            secondaryLink="/categories"
          />
        ) : (
          <div className="wishlist-content-wrapper">
            <div className="wishlist-toolbar">
              <span className="wishlist-count-badge">
                <Heart size={16} fill="#e11d48" stroke="#e11d48" /> {wishlist.length} Saved Item{wishlist.length > 1 ? "s" : ""}
              </span>
              <button className="clear-wishlist-btn" onClick={clearWishlist}>
                <Trash2 size={15} /> Clear All
              </button>
            </div>

            <div className="wishlist-table-card">
              <div className="wishlist-items-grid">
                {wishlist.map((item) => (
                  <div className="wishlist-item-card" key={item.id}>
                    <div className="wishlist-item-media">
                      <img src={item.image} alt={item.name} />
                      <button
                        className="wishlist-remove-icon-btn"
                        onClick={() => removeWish(item.id)}
                        title="Remove from Wishlist"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="wishlist-item-body">
                      <span className="item-type-chip">
                        {item.breed ? `Pet • ${item.species}` : `Product • ${item.category}`}
                      </span>

                      <h4 className="wishlist-item-name">
                        <Link
                          to={item.breed ? `/pets/${item.id}` : `/products/${item.id}`}
                        >
                          {item.name}
                        </Link>
                      </h4>

                      <div className="wishlist-item-price">
                        ₹{item.price.toLocaleString("en-IN")}
                        {item.oldPrice && item.oldPrice > item.price && (
                          <del>₹{item.oldPrice.toLocaleString("en-IN")}</del>
                        )}
                      </div>

                      <div className="wishlist-item-actions">
                        <button
                          className="btn btn-sm btn-primary full-width"
                          onClick={() => moveWishToCart(item)}
                        >
                          <ShoppingBag size={14} /> Move to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
