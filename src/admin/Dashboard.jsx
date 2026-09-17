import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  PawPrint,
  Package,
  ShoppingBag,
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Clock
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid
} from "recharts";
import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { users, pets, products, orders } = useApp();

  // Calculate live metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== "Cancelled" ? o.total : 0), 0);
  const activeOrdersCount = orders.filter((o) => o.status !== "Delivered" && o.status !== "Cancelled").length;
  const lowStockProducts = products.filter((p) => p.stock <= 15).slice(0, 5);
  const recentOrders = orders.slice(0, 5);

  // Sample historical sales data
  const salesTrendData = [
    { month: "Jan", revenue: 48000, orders: 18 },
    { month: "Feb", revenue: 62000, orders: 24 },
    { month: "Mar", revenue: 59000, orders: 21 },
    { month: "Apr", revenue: 84000, orders: 32 },
    { month: "May", revenue: 78000, orders: 29 },
    { month: "Jun", revenue: 96000, orders: 38 },
    { month: "Jul", revenue: 112000, orders: 45 },
    { month: "Aug", revenue: 135000, orders: 54 }
  ];

  // Category breakdown
  const categoryCounts = Object.entries(
    products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([category, count]) => ({
      name: category,
      count
    }));

  return (
    <div className="admin-dashboard-view">
      {/* Top Banner */}
      <div className="admin-view-header">
        <div>
          <span className="admin-breadcrumb-tag">OVERVIEW & ANALYTICS</span>
          <h1 className="admin-page-title">Executive Dashboard</h1>
          <p className="admin-page-subtitle">
            Live business performance metrics, order fulfillments, and catalog health.
          </p>
        </div>
      </div>

      {/* Metric Cards (5 Cards) */}
      <div className="admin-metrics-grid mt-6">
        <div className="metric-stat-card">
          <div className="metric-icon-wrap emerald">
            <IndianRupee size={22} />
          </div>
          <div className="metric-data">
            <span className="metric-label">Total Revenue</span>
            <strong className="metric-value">₹{totalRevenue.toLocaleString("en-IN")}</strong>
            <small className="metric-growth positive">
              <TrendingUp size={13} /> +24.8% this month
            </small>
          </div>
        </div>

        <div className="metric-stat-card">
          <div className="metric-icon-wrap blue">
            <ShoppingBag size={22} />
          </div>
          <div className="metric-data">
            <span className="metric-label">Total Orders</span>
            <strong className="metric-value">{orders.length}</strong>
            <small className="metric-growth positive">
              <Clock size={13} /> {activeOrdersCount} in progress
            </small>
          </div>
        </div>

        <div className="metric-stat-card">
          <div className="metric-icon-wrap amber">
            <PawPrint size={22} />
          </div>
          <div className="metric-data">
            <span className="metric-label">Total Pets Listed</span>
            <strong className="metric-value">{pets.length}</strong>
            <small className="metric-subtext">All health verified</small>
          </div>
        </div>

        <div className="metric-stat-card">
          <div className="metric-icon-wrap purple">
            <Package size={22} />
          </div>
          <div className="metric-data">
            <span className="metric-label">Total Products</span>
            <strong className="metric-value">{products.length}</strong>
            <small className="metric-subtext">Across 8 categories</small>
          </div>
        </div>

        <div className="metric-stat-card">
          <div className="metric-icon-wrap cyan">
            <Users size={22} />
          </div>
          <div className="metric-data">
            <span className="metric-label">Registered Users</span>
            <strong className="metric-value">{users.length}</strong>
            <small className="metric-growth positive">
              <TrendingUp size={13} /> Active customer base
            </small>
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="admin-charts-grid mt-8">
        {/* Revenue Area Chart */}
        <div className="admin-chart-card">
          <div className="chart-card-header">
            <div>
              <h3>Revenue Performance (INR)</h3>
              <p>Monthly gross sales trajectory</p>
            </div>
            <span className="chart-badge">FY 2026</span>
          </div>

          <div className="chart-wrapper" style={{ height: 280, width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesTrendData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1f7a58" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#1f7a58" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `₹${val / 1000}k`}
                />
                <Tooltip
                  formatter={(val) => [`₹${Number(val).toLocaleString("en-IN")}`, "Revenue"]}
                  contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1f7a58"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Catalog Mix Bar Chart */}
        <div className="admin-chart-card">
          <div className="chart-card-header">
            <div>
              <h3>Products per Category</h3>
              <p>Distribution of inventory across top collections</p>
            </div>
          </div>

          <div className="chart-wrapper" style={{ height: 280, width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryCounts} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                  fontSize={11}
                />
                <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip
                  formatter={(val) => [val, "Products"]}
                  contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb" }}
                />
                <Bar dataKey="count" fill="#d97706" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Two Columns: Recent Orders & Inventory Alerts */}
      <div className="admin-bottom-grid mt-8">
        {/* Recent Orders */}
        <div className="admin-table-card">
          <div className="table-card-header">
            <div>
              <h3>Recent Customer Orders</h3>
              <p>Latest purchases awaiting fulfillment</p>
            </div>
            <Link to="/admin/orders" className="btn btn-outline btn-sm">
              View All Orders <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <b className="order-id-link">#{order.id}</b>
                    </td>
                    <td>
                      <div>
                        <b>{order.customer}</b>
                        <small className="block text-muted">{order.email}</small>
                      </div>
                    </td>
                    <td>
                      <b>₹{order.total.toLocaleString("en-IN")}</b>
                    </td>
                    <td>
                      <span className={`order-status-pill status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="admin-table-card">
          <div className="table-card-header">
            <div>
              <h3>
                <AlertTriangle size={17} className="text-warning inline mr-1" /> Inventory Alerts
              </h3>
              <p>Products requiring restock soon</p>
            </div>
            <Link to="/admin/products" className="btn btn-outline btn-sm">
              Manage Stock
            </Link>
          </div>

          <div className="inventory-alerts-list">
            {lowStockProducts.map((p) => (
              <div className="inventory-alert-item" key={p.id}>
                <img src={p.image} alt={p.name} className="alert-item-img" />
                <div className="alert-item-info">
                  <b>{p.name}</b>
                  <small>{p.category} • Brand: {p.brand}</small>
                </div>
                <div className="stock-pill-badge warning">
                  Only {p.stock} left
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
