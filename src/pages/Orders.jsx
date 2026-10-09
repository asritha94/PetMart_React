import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Calendar,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  XCircle,
  FileText,
  AlertCircle
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageTitle, Empty } from "../components/Common";

export default function Orders() {
  const { orders, userOrders: contextUserOrders, currentUser, cancelOrder } = useApp();
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  // Filter orders strictly belonging to the currently logged in customer
  const userOrders = contextUserOrders || orders.filter((o) => {
    if (o.userId && currentUser?.id) {
      return o.userId === currentUser.id;
    }
    return Boolean(o.email && currentUser?.email && o.email.toLowerCase() === currentUser.email.toLowerCase());
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "status-delivered";
      case "Shipped":
        return "status-shipped";
      case "Confirmed":
        return "status-confirmed";
      case "Cancelled":
        return "status-cancelled";
      default:
        return "status-pending";
    }
  };

  const getStepProgress = (status) => {
    switch (status) {
      case "Confirmed":
        return 2;
      case "Shipped":
        return 3;
      case "Delivered":
        return 4;
      case "Cancelled":
        return -1;
      default:
        return 1; // Pending
    }
  };

  return (
    <div className="orders-page-view">
      <PageTitle
        title="My Order History 📦"
        subtitle="Track delivery progress, review past invoices, and monitor companion shipments."
        breadcrumbs={[
          { label: "Profile", link: "/profile" },
          { label: "Orders" }
        ]}
      />

      <div className="container py-8">
        {userOrders.length === 0 ? (
          <Empty
            icon="📦"
            title="No Orders Found"
            description="You haven't placed any orders with PetMart yet. Discover our premium pet food and lovely companions!"
            actionText="Browse Pet Store"
            actionLink="/categories"
            secondaryText="Meet Pets"
            secondaryLink="/pets"
          />
        ) : (
          <div className="orders-list-wrapper">
            {userOrders.map((order) => {
              const progress = getStepProgress(order.status);
              const isCancellable = order.status === "Pending" || order.status === "Confirmed";

              return (
                <article className="pm-order-card" key={order.id}>
                  {/* Order Top Bar */}
                  <div className="order-card-header">
                    <div className="order-id-meta">
                      <span className="order-id-badge">#{order.id}</span>
                      <span className="order-date">
                        <Calendar size={14} />{" "}
                        {new Date(order.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>

                    <div className="order-header-right">
                      <span className={`order-status-pill ${getStatusColor(order.status)}`}>
                        ● {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Visual Tracking Bar if not cancelled */}
                  {order.status !== "Cancelled" && (
                    <div className="order-tracking-stepper">
                      <div className={`step-node ${progress >= 1 ? "completed" : ""}`}>
                        <div className="node-circle">1</div>
                        <span>Placed</span>
                      </div>
                      <div className={`step-line ${progress >= 2 ? "completed" : ""}`} />
                      <div className={`step-node ${progress >= 2 ? "completed" : ""}`}>
                        <div className="node-circle">2</div>
                        <span>Confirmed</span>
                      </div>
                      <div className={`step-line ${progress >= 3 ? "completed" : ""}`} />
                      <div className={`step-node ${progress >= 3 ? "completed" : ""}`}>
                        <div className="node-circle">3</div>
                        <span>Shipped</span>
                      </div>
                      <div className={`step-line ${progress >= 4 ? "completed" : ""}`} />
                      <div className={`step-node ${progress >= 4 ? "completed" : ""}`}>
                        <div className="node-circle">4</div>
                        <span>Delivered</span>
                      </div>
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="order-items-table">
                    {order.items.map((item) => (
                      <div className="order-item-row" key={item.id}>
                        <img src={item.image} alt={item.name} className="order-item-img" />
                        <div className="order-item-details">
                          <h4 className="order-item-name">{item.name}</h4>
                          <span className="order-item-meta">
                            Qty: <b>{item.qty}</b> × ₹{item.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="order-item-total">
                          ₹{(item.price * item.qty).toLocaleString("en-IN")}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer Breakdown & Actions */}
                  <div className="order-card-footer">
                    <div className="order-destination">
                      <MapPin size={15} />
                      <div>
                        <b>Delivering to:</b>
                        <p>{order.address}</p>
                        <small>Payment Mode: {order.payment}</small>
                      </div>
                    </div>

                    <div className="order-summary-and-actions">
                      <div className="order-amount-display">
                        <span>Total Paid</span>
                        <strong>₹{order.total.toLocaleString("en-IN")}</strong>
                      </div>

                      <div className="order-actions-buttons">
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => setSelectedInvoiceOrder(order)}
                        >
                          <FileText size={15} /> Invoice
                        </button>

                        {isCancellable && (
                          <button
                            className="btn btn-ghost btn-sm danger"
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to cancel order #${order.id}?`)) {
                                cancelOrder(order.id);
                              }
                            }}
                          >
                            <XCircle size={15} /> Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Invoice Modal Simulation */}
        {selectedInvoiceOrder && (
          <div
            className="modal-backdrop-overlay"
            onClick={() => setSelectedInvoiceOrder(null)}
          >
            <div className="invoice-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="invoice-header">
                <div>
                  <span className="logo">🐾 Pet<span>Mart</span></span>
                  <p>Tax Invoice & Delivery Receipt</p>
                </div>
                <div className="text-right">
                  <b>Invoice #{selectedInvoiceOrder.id}</b>
                  <span>{new Date(selectedInvoiceOrder.date).toLocaleDateString("en-IN")}</span>
                </div>
              </div>

              <hr className="invoice-divider" />

              <div className="invoice-bill-to">
                <div>
                  <b>Billed To:</b>
                  <p>{selectedInvoiceOrder.customer}</p>
                  <p>{selectedInvoiceOrder.email}</p>
                  <p>{selectedInvoiceOrder.address}</p>
                </div>
                <div className="text-right">
                  <b>Payment Status:</b>
                  <p className="text-success font-bold">PAID via {selectedInvoiceOrder.payment}</p>
                </div>
              </div>

              <table className="invoice-items-table mt-4">
                <thead>
                  <tr>
                    <th>Item Description</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoiceOrder.items.map((i) => (
                    <tr key={i.id}>
                      <td>{i.name}</td>
                      <td>{i.qty}</td>
                      <td>₹{i.price.toLocaleString("en-IN")}</td>
                      <td>₹{(i.price * i.qty).toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="invoice-summary-totals mt-4">
                <div><span>Subtotal:</span> <b>₹{selectedInvoiceOrder.subtotal?.toLocaleString("en-IN")}</b></div>
                {selectedInvoiceOrder.discount > 0 && (
                  <div><span>Discount:</span> <b>−₹{selectedInvoiceOrder.discount?.toLocaleString("en-IN")}</b></div>
                )}
                <div><span>Delivery:</span> <b>{selectedInvoiceOrder.delivery === 0 ? "FREE" : `₹${selectedInvoiceOrder.delivery}`}</b></div>
                <div><span>Tax (GST 5%):</span> <b>₹{selectedInvoiceOrder.tax?.toLocaleString("en-IN")}</b></div>
                <div className="grand-invoice-total">
                  <span>Grand Total:</span>
                  <strong>₹{selectedInvoiceOrder.total?.toLocaleString("en-IN")}</strong>
                </div>
              </div>

              <div className="invoice-footer-actions mt-6">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    window.print();
                  }}
                >
                  Print Invoice
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => setSelectedInvoiceOrder(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
