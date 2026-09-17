import React from "react";
import { Link } from "react-router-dom";

export function EmptyState({
  icon = "🐾",
  title = "No items found",
  description = "We couldn't find what you were looking for. Explore our catalog for other amazing options.",
  actionText = "Continue Shopping",
  actionLink = "/categories",
  secondaryText,
  secondaryLink
}) {
  return (
    <div className="empty-state-box">
      <div className="empty-icon-wrapper">{icon}</div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-desc">{description}</p>
      <div className="empty-actions">
        {actionLink && (
          <Link to={actionLink} className="btn btn-primary">
            {actionText}
          </Link>
        )}
        {secondaryLink && (
          <Link to={secondaryLink} className="btn btn-outline">
            {secondaryText}
          </Link>
        )}
      </div>
    </div>
  );
}

export default EmptyState;
