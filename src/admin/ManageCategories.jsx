import React, { useState } from "react";
import { Plus, Trash2, X, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function ManageCategories() {
  const { categories, addCategory, editCategory, deleteCategory } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editModalCategory, setEditModalCategory] = useState(null);
  const [newCat, setNewCat] = useState({
    name: "",
    icon: "🐾",
    description: "",
    image: ""
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (!newCat.name.trim()) return;
    if (newCat.id) editCategory(newCat);
    else addCategory(newCat);
    setShowAddModal(false);
    setEditModalCategory(null);
    setNewCat({ name: "", icon: "🐾", description: "", image: "" });
  };

  const handleDelete = (cat) => {
    if (window.confirm(`Delete category "${cat.name}"?`)) {
      deleteCategory(cat.id);
    }
  };

  return (
    <div className="admin-manage-view">
      <div className="admin-view-header">
        <div>
          <span className="admin-breadcrumb-tag">STRUCTURE & TAXONOMY</span>
          <h1 className="admin-page-title">Category Management</h1>
          <p className="admin-page-subtitle">
            Organize pet classifications, accessories collections, and shopping hierarchies.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="pm-grid-3 mt-6">
        {categories.map((c) => (
          <div className="admin-category-card" key={c.id}>
            <div className="cat-card-img-wrap">
              <img src={c.image} alt={c.name} />
              <div className="cat-card-overlay" />
              <div className="cat-badge-emoji">{c.icon}</div>
              <button
                className="cat-delete-icon-btn"
                onClick={() => handleDelete(c)}
                title="Delete Category"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="cat-card-content">
              <div className="flex justify-between items-center">
                <h4>{c.name}</h4>
                <Link
                  to={`/categories/${c.slug}`}
                  target="_blank"
                  className="cat-view-link"
                  title="View Category on Storefront"
                >
                  <ArrowUpRight size={16} />
                </Link>
                <button
                  className="table-action-btn edit"
                  onClick={() => { setNewCat({ ...c }); setEditModalCategory(c); setShowAddModal(true); }}
                  title="Edit Category"
                >
                  Edit
                </button>
              </div>
              <p className="cat-desc-text">{c.description || "Collection of items and pets."}</p>
              <div className="cat-slug-info">
                <span>Slug: <code>/categories/{c.slug}</code></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="modal-backdrop-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3>{editModalCategory ? "Edit Category" : "Create New Category"}</h3>
              <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="modal-body-form mt-4">
              <div className="form-group mb-3">
                <label>Category Name *</label>
                <input
                  type="text"
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  placeholder="e.g. Aquarium Care, Reptiles"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Emoji Icon</label>
                <input
                  type="text"
                  value={newCat.icon}
                  onChange={(e) => setNewCat({ ...newCat, icon: e.target.value })}
                  placeholder="e.g. 🐶, 🐱, 🐠, 🦴"
                />
              </div>

              <div className="form-group mb-3">
                <label>Image URL</label>
                <input
                  type="url"
                  value={newCat.image}
                  onChange={(e) => setNewCat({ ...newCat, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="form-group mb-3">
                <label>Short Description</label>
                <textarea
                  rows={2}
                  value={newCat.description}
                  onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                  placeholder="Brief summary of items in this category"
                />
              </div>

              <div className="modal-actions-footer mt-6">
                <button type="submit" className="btn btn-primary">
                  {editModalCategory ? "Save Category" : "Create Category"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
