import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const emptyProductForm = {
  name: "",
  primaryCategory: "pet-food",
  category: "Dog Food",
  brand: "PetMart",
  price: "",
  oldPrice: "",
  discount: "0",
  stock: "15",
  rating: "4.7",
  reviews: "10",
  image: "",
  description: ""
};

export default function ManageProducts() {
  const {
    products,
    addProduct,
    editProduct,
    deleteProduct
  } = useApp();

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [editModalProduct, setEditModalProduct] = useState(null);

  // Categories list
  const categoryOptions = [
    "Dog Food",
    "Cat Food",
    "Bird Food",
    "Fish Food",
    "Treats",
    "Toys",
    "Beds",
    "Collars",
    "Leashes",
    "Bowls",
    "Grooming",
    "Healthcare",
    "Accessories",
    "Small Pets"
  ];

  const primaryCategoryOptions = [
    ["dogs", "Dogs"],
    ["cats", "Cats"],
    ["birds", "Birds"],
    ["fish", "Fish"],
    ["rabbits", "Rabbits"],
    ["small-pets", "Small Pets"],
    ["pet-food", "Pet Food"],
    ["accessories", "Accessories"],
    ["grooming", "Grooming"],
    ["toys", "Toys"],
    ["pets", "Pets"]
  ];

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchSearch =
      !query.trim() ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase());
    const matchCategory =
      categoryFilter === "All" || p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editModalProduct.id) {
      editProduct(editModalProduct);
    } else {
      addProduct(editModalProduct);
    }
    setEditModalProduct(null);
  };

  const handleDelete = (prod) => {
    if (window.confirm(`Are you sure you want to delete "${prod.name}"?`)) {
      deleteProduct(prod.id);
    }
  };

  return (
    <div className="admin-manage-view">
      {/* Top Header */}
      <div className="admin-view-header">
        <div>
          <span className="admin-breadcrumb-tag">CATALOG & INVENTORY</span>
          <h1 className="admin-page-title">Product Management</h1>
          <p className="admin-page-subtitle">
            Manage pet supplies, adjust pricing, manage warehouse stock levels, and add new inventory.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setEditModalProduct({ ...emptyProductForm })}
        >
          <Plus size={16} /> Add New Product
        </button>
      </div>

      {/* Toolbar (Search & Filter) */}
      <div className="admin-toolbar-card mt-6">
        <div className="admin-search-input-wrap">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by product title, brand, or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="admin-filter-select-wrap">
          <label>Filter Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories ({products.length})</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat} ({products.filter((p) => p.category === cat).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Data Table */}
      <div className="admin-table-container-card mt-6">
        <div className="admin-table-wrap">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price (₹)</th>
                <th>Stock Units</th>
                <th>Rating</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="table-item-cell">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="table-item-avatar"
                        />
                        <div>
                          <b className="table-item-name-clamp" title={p.name}>
                            {p.name}
                          </b>
                          {p.discount > 0 && (
                            <span className="badge badge-discount text-xs">
                              {p.discount}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="category-tag-chip">{p.category}</span>
                    </td>

                    <td>
                      <b>{p.brand}</b>
                    </td>

                    <td>
                      <div className="editable-price-cell">
                        <b>₹{Number(p.price).toLocaleString("en-IN")}</b>
                        {p.oldPrice && p.oldPrice > p.price && (
                          <del className="text-muted text-xs block">
                            ₹{Number(p.oldPrice).toLocaleString("en-IN")}
                          </del>
                        )}
                      </div>
                    </td>

                    <td>
                      <div className="stock-counter-cell">
                        <span className={`stock-indicator ${p.stock <= 5 ? "critical" : p.stock <= 15 ? "low" : "good"}`} />
                        <span>{p.stock} in stock</span>
                      </div>
                    </td>

                    <td>
                      <span>⭐ {p.rating} ({p.reviews})</span>
                    </td>

                    <td className="text-right">
                      <div className="table-row-actions">
                        <button
                          className="table-action-btn edit"
                          onClick={() => setEditModalProduct({ ...p })}
                          title="Edit Product"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          className="table-action-btn delete"
                          onClick={() => handleDelete(p)}
                          title="Delete Product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-muted">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {editModalProduct && (
        <div className="modal-backdrop-overlay" onClick={() => setEditModalProduct(null)}>
          <div className="modal-dialog-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3>{editModalProduct.id ? `Edit: ${editModalProduct.name}` : "Add New Product"}</h3>
              <button className="modal-close-btn" onClick={() => setEditModalProduct(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="modal-body-form mt-4">
              <div className="form-grid-2">
                <div className="form-group mb-3 col-span-2">
                  <label>Product Title *</label>
                  <input
                    type="text"
                    value={editModalProduct.name}
                    onChange={(e) => setEditModalProduct({ ...editModalProduct, name: e.target.value })}
                    placeholder="e.g. Royal Canin Maxi Adult Dog Food (4 kg)"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Store Category *</label>
                  <select
                    value={editModalProduct.primaryCategory || "pet-food"}
                    onChange={(e) => setEditModalProduct({ ...editModalProduct, primaryCategory: e.target.value })}
                    required
                  >
                    {primaryCategoryOptions.map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label>Product Subcategory *</label>
                  <select
                    value={editModalProduct.category}
                    onChange={(e) => setEditModalProduct({ ...editModalProduct, category: e.target.value })}
                  >
                    {categoryOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label>Brand *</label>
                  <input
                    type="text"
                    value={editModalProduct.brand}
                    onChange={(e) => setEditModalProduct({ ...editModalProduct, brand: e.target.value })}
                    placeholder="e.g. Royal Canin, Pedigree"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Selling Price (₹) *</label>
                  <input
                    type="number"
                    value={editModalProduct.price}
                    onChange={(e) => setEditModalProduct({ ...editModalProduct, price: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label>MRP / Old Price (₹)</label>
                  <input
                    type="number"
                    value={editModalProduct.oldPrice}
                    onChange={(e) => setEditModalProduct({ ...editModalProduct, oldPrice: e.target.value })}
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Discount %</label>
                  <input
                    type="number"
                    value={editModalProduct.discount}
                    onChange={(e) => setEditModalProduct({ ...editModalProduct, discount: e.target.value })}
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Stock Available (Units) *</label>
                  <input
                    type="number"
                    value={editModalProduct.stock}
                    onChange={(e) => setEditModalProduct({ ...editModalProduct, stock: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group mb-3 col-span-2">
                  <label>Image URL</label>
                  <input
                    type="url"
                    value={editModalProduct.image}
                    onChange={(e) => setEditModalProduct({ ...editModalProduct, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div className="form-group mb-3 col-span-2">
                  <label>Product Description</label>
                  <textarea
                    rows={3}
                    value={editModalProduct.description}
                    onChange={(e) => setEditModalProduct({ ...editModalProduct, description: e.target.value })}
                    placeholder="Describe nutrition facts, materials, usage guidelines..."
                  />
                </div>
              </div>

              <div className="modal-actions-footer mt-6">
                <button type="submit" className="btn btn-primary">
                  {editModalProduct.id ? "Save Product Changes" : "Create Product"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setEditModalProduct(null)}
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
