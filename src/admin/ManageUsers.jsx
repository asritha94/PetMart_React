import React, { useState } from "react";
import { Search, Trash2, ShieldCheck, UserCheck, Calendar, Phone, Mail } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function ManageUsers() {
  const { users, deleteUser, orders } = useApp();
  const [query, setQuery] = useState("");

  const filteredUsers = users.filter((u) => {
    return (
      !query.trim() ||
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase()) ||
      u.phone?.toLowerCase().includes(query.toLowerCase())
    );
  });

  const handleDelete = (user) => {
    if (user.role === "admin") {
      alert("Administrator accounts cannot be deleted.");
      return;
    }
    if (window.confirm(`Delete user account "${user.name}" (${user.email})?`)) {
      deleteUser(user.id);
    }
  };

  return (
    <div className="admin-manage-view">
      <div className="admin-view-header">
        <div>
          <span className="admin-breadcrumb-tag">CUSTOMERS & ACCESS</span>
          <h1 className="admin-page-title">User Accounts</h1>
          <p className="admin-page-subtitle">
            Manage registered pet parents, verify administrator privileges, and audit customer profiles.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="admin-toolbar-card mt-6">
        <div className="admin-search-input-wrap">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search users by name, email, or mobile number..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="admin-table-container-card mt-6">
        <div className="admin-table-wrap">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>User Profile</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Orders Placed</th>
                <th>Member Since</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const userOrdersCount = orders.filter((o) => {
                    if (o.userId && user.id) {
                      return o.userId === user.id;
                    }
                    return Boolean(o.email && user.email && o.email.toLowerCase() === user.email.toLowerCase());
                  }).length;

                  return (
                    <tr key={user.id}>
                      <td>
                        <div className="table-user-cell">
                          <div className={`user-table-avatar ${user.role}`}>
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <b>{user.name}</b>
                            {user.role === "admin" && (
                              <small className="block text-primary font-bold">Admin</small>
                            )}
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="email-cell">{user.email}</span>
                      </td>

                      <td>
                        <span>{user.phone || "Not set"}</span>
                      </td>

                      <td>
                        <span className={`role-pill-badge ${user.role}`}>
                          {user.role === "admin" ? "Administrator" : "Customer"}
                        </span>
                      </td>

                      <td>
                        <span className="orders-count-tag">
                          {userOrdersCount} order{userOrdersCount !== 1 ? "s" : ""}
                        </span>
                      </td>

                      <td>
                        <span>{user.joined || "2024-01-01"}</span>
                      </td>

                      <td className="text-right">
                        {user.role !== "admin" && (
                          <button
                            className="table-action-btn delete"
                            onClick={() => handleDelete(user)}
                            title="Delete User"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-muted">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
