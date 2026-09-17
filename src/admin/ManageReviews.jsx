import React from "react";
import { Trash2, CheckCircle2 } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function ManageReviews() {
  const { reviews, deleteReview } = useApp();

  const handleDelete = (review) => {
    if (window.confirm("Delete this review from storefront?")) {
      deleteReview(review.id);
    }
  };

  return (
    <div className="admin-manage-view">
      <div className="admin-view-header">
        <div>
          <span className="admin-breadcrumb-tag">MODERATION & SOCIAL PROOF</span>
          <h1 className="admin-page-title">Reviews & Testimonials</h1>
          <p className="admin-page-subtitle">
            Moderate pet parent testimonials, monitor customer satisfaction scores, and feature reviews.
          </p>
        </div>
      </div>

      <div className="admin-table-container-card mt-6">
        <div className="admin-table-wrap">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Rating</th>
                <th>Review Comment</th>
                <th>Pet / Product Reference</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((rev) => (
                <tr key={rev.id}>
                  <td>
                    <div className="table-item-cell">
                        <div className="table-item-avatar review-avatar-fallback" aria-hidden="true">
                          {rev.author?.charAt(0) || "R"}
                        </div>
                      <div>
                        <b>{rev.author}</b>
                        <small className="block text-muted">Customer review</small>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      ⭐ {rev.rating} / 5
                    </span>
                  </td>

                  <td style={{ maxWidth: 360 }}>
                    <p className="text-sm line-clamp-2">"{rev.comment}"</p>
                  </td>

                  <td>
                    <span className="text-muted text-xs">
                      {rev.productId || "General Purchase"}
                    </span>
                  </td>

                  <td>
                    <span className="status-pill status-confirmed">
                      <CheckCircle2 size={12} className="inline mr-1" /> Approved
                    </span>
                  </td>

                  <td className="text-right">
                    <button
                      className="table-action-btn delete"
                      onClick={() => handleDelete(rev)}
                      title="Delete Review"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
