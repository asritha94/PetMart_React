import React, { useState } from "react";
import {
  Search,
  ShoppingBag,
  Eye,
  Calendar,
  MapPin,
  X,
  Phone,
  Mail,
  CheckCircle2,
  Clock
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function ManageOrders() {
  const { orders, updateOrderStatus } = useApp();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeModalOrder, setActiveModalOrder] = useState(null);

  const statuses = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      !query.trim() ||
      o.id.toLowerCase().includes(query.toLowerCase()) ||
      o.customer.toLowerCase().includes(query.toLowerCase()) ||
      o.email.toLowerCase().includes(query.toLowerCase());
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="admin-manage-view">
      <div className="admin-view-header">
        <div>
          <span className="admin-breadcrumb-tag">FULFILLMENT & LOGISTICS</span>
          <h1 className="admin-page-title">Order Management</h1>
          <p className="admin-page-subtitle">
            Update order statuses, review delivery destinations, and supervise customer payments.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="admin-toolbar-card mt-6">
        <div className="admin-search-input-wrap">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by Order ID, customer name, or email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="admin-filter-select-wrap">
          <label>Order Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses ({orders.length})</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s} ({orders.filter((o) => o.status === s).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-table-container-card mt-6">
        <div className="admin-table-wrap">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Order Date</th>
                <th>Items</th>
                <th>Total Amount</th>
                <th>Payment Mode</th>
                <th>Status (Change)</th>
                <th className="text-right">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <b className="order-id-cell">#{order.id}</b>
                    </td>

                    <td>
                      <div>
                        <b>{order.customer}</b>
                        <small className="block text-muted">{order.email}</small>
                      </div>
                    </td>

                    <td>
                      <span>
                        {new Date(order.date).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                    </td>

                    <td>
                      <span className="items-count-pill">
                        {order.items?.length || 0} item{order.items?.length > 1 ? "s" : ""}
                      </span>
                    </td>

                    <td>
                      <b>₹{order.total.toLocaleString("en-IN")}</b>
                    </td>

                    <td>
                      <span className="payment-mode-pill">{order.payment}</span>
                    </td>

                    <td>
                      <select
                        className={`status-select-input status-${order.status.toLowerCase()}`}
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>

                    <td className="text-right">
                      <button
                        className="table-action-btn view"
                        onClick={() => setActiveModalOrder(order)}
                        title="View Full Order Details"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-muted">
                    No orders found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full Order Details Modal */}
      {activeModalOrder && (
        <div className="modal-backdrop-overlay" onClick={() => setActiveModalOrder(null)}>
          <div className="modal-dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3>Order Details: #{activeModalOrder.id}</h3>
              <button className="modal-close-btn" onClick={() => setActiveModalOrder(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="order-modal-body mt-4">
              <div className="order-modal-meta-grid">
                <div>
                  <small>Customer Name</small>
                  <b>{activeModalOrder.customer}</b>
                </div>
                <div>
                  <small>Email Address</small>
                  <b>{activeModalOrder.email}</b>
                </div>
                <div>
                  <small>Contact Phone</small>
                  <b>{activeModalOrder.phone || "Not provided"}</b>
                </div>
                <div>
                  <small>Current Status</small>
                  <b className={`text-status-${activeModalOrder.status.toLowerCase()}`}>
                    {activeModalOrder.status}
                  </b>
                </div>
              </div>

              <div className="order-modal-address mt-4">
                <small>Delivery Address:</small>
                <p>{activeModalOrder.address}</p>
              </div>

              <h4 className="mt-6 mb-2">Purchased Items:</h4>
              <div className="order-modal-items-list">
                {activeModalOrder.items.map((i) => (
                  <div className="order-modal-item-row" key={i.id}>
                    <img src={i.image} alt={i.name} />
                    <div className="item-name-wrap">
                      <b>{i.name}</b>
                      <span>Qty: {i.qty} × ₹{i.price.toLocaleString("en-IN")}</span>
                    </div>
                    <b>₹{(i.price * i.qty).toLocaleString("en-IN")}</b>
                  </div>
                ))}
              </div>

              <div className="order-modal-totals mt-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <b>₹{activeModalOrder.subtotal?.toLocaleString("en-IN")}</b>
                </div>
                {activeModalOrder.discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount:</span>
                    <span>−₹{activeModalOrder.discount?.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span>{activeModalOrder.delivery === 0 ? "FREE" : `₹${activeModalOrder.delivery}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST Tax:</span>
                  <span>₹{activeModalOrder.tax?.toLocaleString("en-IN")}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between grand-total">
                  <span>Total Paid:</span>
                  <strong>₹{activeModalOrder.total?.toLocaleString("en-IN")}</strong>
                </div>
              </div>
            </div>

            <div className="modal-actions-footer mt-6">
              <button
                className="btn btn-outline"
                onClick={() => setActiveModalOrder(null)}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
