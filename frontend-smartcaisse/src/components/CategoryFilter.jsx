import React from "react";

export default function CategoryFilter({
  categories,
  active,
  onChange,
  searchNom,
  searchReference,
  onSearchNom,
  onSearchReference,
}) {
  return (
    <div className="mb-3">
   
      <div className="d-flex gap-2 flex-wrap mb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn ${
              active === cat ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => onChange(cat)}
          >
            {cat === "all" ? "All categories" : cat}
          </button>
        ))}
      </div>

     
      <div className="d-flex flex-wrap gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Rechercher par nom"
          style={{ maxWidth: "250px" }}
          value={searchNom}
          onChange={(e) => onSearchNom(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Rechercher par référence"
          style={{ maxWidth: "250px" }}
          value={searchReference}
          onChange={(e) => onSearchReference(e.target.value)}
        />
      </div>
    </div>
  );
}
