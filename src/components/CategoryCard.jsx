import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getImageFallback } from "../utils/imageFallbacks";

export function CategoryCard({ category }) {
  return (
    <Link to={`/categories/${category.slug}`} className="category-card-item">
      <div className="cat-img-wrapper">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="cat-bg-img"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = getImageFallback(category.slug);
          }}
        />
        <div className="cat-gradient-overlay" />
      </div>
      <div className="cat-card-body">
        <div className="cat-icon-badge">{category.icon}</div>
        <div className="cat-text-info">
          <h4 className="cat-name">{category.name}</h4>
          {category.count !== undefined && (
            <span className="cat-item-count">
              {category.count} {category.count === 1 ? "item" : "items"}
            </span>
          )}
        </div>
        <div className="cat-arrow-circle">
          <ArrowUpRight size={16} />
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
