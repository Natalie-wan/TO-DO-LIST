import React from 'react';

/**
 * CategoryFilter Component
 * Renders a minimalistic dropdown menu for filtering tasks by category.
 * 
 * @param {Object} props
 * @param {Array} props.categories - Array of category strings to populate the dropdown
 * @param {Function} props.onFilter - Callback function to handle category selection changes
 */
const CategoryFilter = ({ categories, onFilter }) => {
  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <label htmlFor="category-filter" style={{ marginRight: "10px", fontSize: "16px", color: "#333" }}>
        Filter by Category:
      </label>
      <select
        id="category-filter"
        onChange={(e) => onFilter(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
          fontSize: "14px",
          cursor: "pointer",
          outline: "none",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#007bff";
          e.target.style.boxShadow = "0 0 8px rgba(0, 123, 255, 0.5)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#ccc";
          e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
        }}
      >
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;

//testing sth
