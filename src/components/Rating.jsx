import React from "react";
import { Star } from "lucide-react";

export function Rating({ value = 5, reviews, size = 15, showText = true }) {
  const rounded = Math.round(Number(value) * 2) / 2; // round to nearest 0.5
  
  return (
    <div className="rating-badge" title={`${value} out of 5 stars`}>
      <div className="stars-row">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.floor(rounded);
          const half = !filled && star - 0.5 === rounded;
          return (
            <Star
              key={star}
              size={size}
              className={`star-icon ${filled ? "filled" : half ? "half-filled" : "empty"}`}
              fill={filled ? "currentColor" : "none"}
            />
          );
        })}
      </div>
      {showText && (
        <span className="rating-score">
          <b>{Number(value).toFixed(1)}</b>
          {reviews !== undefined && <small>({reviews})</small>}
        </span>
      )}
    </div>
  );
}

export default Rating;
