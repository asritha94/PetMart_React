import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  PawPrint,
  MapPin,
  CheckCircle2,
  Filter
} from "lucide-react";
import { useApp } from "../context/AppContext";

const emptyPetForm = {
  name: "",
  species: "Dog",
  breed: "",
  age: "1 year",
  gender: "Male",
  color: "",
  location: "Hyderabad",
  price: "",
  image: "",
  description: "",
  vaccination: "Fully Vaccinated & Dewormed",
  availability: "Available"
};

export default function ManagePets() {
  const { pets, addPet, editPet, deletePet } = useApp();
  const [query, setQuery] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("All");
  const [editModalPet, setEditModalPet] = useState(null); // pet object or emptyPetForm for new

  // Filter pets
  const filteredPets = pets.filter((p) => {
    const matchSearch =
      !query.trim() ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.breed.toLowerCase().includes(query.toLowerCase()) ||
      p.location.toLowerCase().includes(query.toLowerCase());
    const matchSpecies = speciesFilter === "All" || p.species === speciesFilter;
    return matchSearch && matchSpecies;
  });

  const speciesOptions = ["Dog", "Cat", "Bird", "Rabbit", "Small Pets", "Fish"];

  const handleSavePet = (e) => {
    e.preventDefault();
    if (editModalPet.id) {
      editPet(editModalPet);
    } else {
      addPet(editModalPet);
    }
    setEditModalPet(null);
  };

  const handleDelete = (pet) => {
    if (window.confirm(`Are you sure you want to delete ${pet.name} (${pet.breed}) from listings?`)) {
      deletePet(pet.id);
    }
  };

  return (
    <div className="admin-manage-view">
      {/* Top Header with Add Button */}
      <div className="admin-view-header">
        <div>
          <span className="admin-breadcrumb-tag">INVENTORY & ADOPTIONS</span>
          <h1 className="admin-page-title">Pet Management</h1>
          <p className="admin-page-subtitle">
            Manage pet listings, adoption availability, health records, and profile details.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setEditModalPet({ ...emptyPetForm })}
        >
          <Plus size={16} /> Add New Pet
        </button>
      </div>

      {/* Toolbar (Search & Filter) */}
      <div className="admin-toolbar-card mt-6">
        <div className="admin-search-input-wrap">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by pet name, breed, or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="admin-filter-select-wrap">
          <label>Filter Species:</label>
          <select
            value={speciesFilter}
            onChange={(e) => setSpeciesFilter(e.target.value)}
          >
            <option value="All">All Species ({pets.length})</option>
            {speciesOptions.map((sp) => (
              <option key={sp} value={sp}>
                {sp} ({pets.filter((p) => p.species === sp).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pets Data Table */}
      <div className="admin-table-container-card mt-6">
        <div className="admin-table-wrap">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Pet</th>
                <th>Species & Breed</th>
                <th>Age / Gender</th>
                <th>Location</th>
                <th>Adoption Price</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPets.length > 0 ? (
                filteredPets.map((pet) => (
                  <tr key={pet.id}>
                    <td>
                      <div className="table-item-cell">
                        <img
                          src={pet.image}
                          alt={pet.name}
                          className="table-item-avatar"
                        />
                        <div>
                          <b>{pet.name}</b>
                          <small className="block text-muted">{pet.color || "Healthy coat"}</small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span>{pet.species}</span>
                      <small className="block text-muted">{pet.breed}</small>
                    </td>

                    <td>
                      <span>{pet.age}</span>
                      <small className="block text-muted">{pet.gender}</small>
                    </td>

                    <td>
                      <span className="location-cell">
                        <MapPin size={13} /> {pet.location}
                      </span>
                    </td>

                    <td>
                      <b>₹{Number(pet.price).toLocaleString("en-IN")}</b>
                    </td>

                    <td>
                      <span className={`status-pill ${pet.availability === "Available" ? "status-confirmed" : "status-cancelled"}`}>
                        {pet.availability}
                      </span>
                    </td>

                    <td className="text-right">
                      <div className="table-row-actions">
                        <button
                          className="table-action-btn edit"
                          onClick={() => setEditModalPet({ ...pet })}
                          title="Edit Pet"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          className="table-action-btn delete"
                          onClick={() => handleDelete(pet)}
                          title="Delete Pet"
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
                    No pets found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Pet Modal */}
      {editModalPet && (
        <div className="modal-backdrop-overlay" onClick={() => setEditModalPet(null)}>
          <div className="modal-dialog-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3>{editModalPet.id ? `Edit Pet: ${editModalPet.name}` : "Add New Pet"}</h3>
              <button className="modal-close-btn" onClick={() => setEditModalPet(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSavePet} className="modal-body-form mt-4">
              <div className="form-grid-2">
                <div className="form-group mb-3">
                  <label>Pet Name *</label>
                  <input
                    type="text"
                    value={editModalPet.name}
                    onChange={(e) => setEditModalPet({ ...editModalPet, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Species *</label>
                  <select
                    value={editModalPet.species}
                    onChange={(e) => setEditModalPet({ ...editModalPet, species: e.target.value })}
                  >
                    {speciesOptions.map((sp) => (
                      <option key={sp} value={sp}>{sp}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label>Breed *</label>
                  <input
                    type="text"
                    value={editModalPet.breed}
                    onChange={(e) => setEditModalPet({ ...editModalPet, breed: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Age (e.g. 8 months, 2 years) *</label>
                  <input
                    type="text"
                    value={editModalPet.age}
                    onChange={(e) => setEditModalPet({ ...editModalPet, age: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Gender *</label>
                  <select
                    value={editModalPet.gender}
                    onChange={(e) => setEditModalPet({ ...editModalPet, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label>Coat Color</label>
                  <input
                    type="text"
                    value={editModalPet.color}
                    onChange={(e) => setEditModalPet({ ...editModalPet, color: e.target.value })}
                    placeholder="e.g. Golden Cream, Pure White"
                  />
                </div>

                <div className="form-group mb-3">
                  <label>City Location *</label>
                  <input
                    type="text"
                    value={editModalPet.location}
                    onChange={(e) => setEditModalPet({ ...editModalPet, location: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Adoption Price (₹) *</label>
                  <input
                    type="number"
                    value={editModalPet.price}
                    onChange={(e) => setEditModalPet({ ...editModalPet, price: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group mb-3 col-span-2">
                  <label>Image URL</label>
                  <input
                    type="url"
                    value={editModalPet.image}
                    onChange={(e) => setEditModalPet({ ...editModalPet, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Vaccination & Health Status</label>
                  <input
                    type="text"
                    value={editModalPet.vaccination}
                    onChange={(e) => setEditModalPet({ ...editModalPet, vaccination: e.target.value })}
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Availability</label>
                  <select
                    value={editModalPet.availability}
                    onChange={(e) => setEditModalPet({ ...editModalPet, availability: e.target.value })}
                  >
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Adopted">Adopted</option>
                  </select>
                </div>

                <div className="form-group mb-3 col-span-2">
                  <label>Description</label>
                  <textarea
                    rows={3}
                    value={editModalPet.description}
                    onChange={(e) => setEditModalPet({ ...editModalPet, description: e.target.value })}
                    placeholder="Describe pet personality, behavior with children, training background..."
                  />
                </div>
              </div>

              <div className="modal-actions-footer mt-6">
                <button type="submit" className="btn btn-primary">
                  {editModalPet.id ? "Save Changes" : "Create Pet Listing"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setEditModalPet(null)}
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
