import React from 'react';

/**
 * CategoryFilter Component
 * Renders a dropdown menu that allows users to filter tasks by category
 * 
 * @param {Object} props
 * @param {Array} props.categories - Array of category strings to populate the dropdown
 * @param {Function} props.onFilter - Callback function that handles category selection changes
 */
const CategoryFilter = ({ categories, onFilter }) => {
  return (
    <div>

      <label htmlFor="category-filter">Filter by Category:</label>
      
      {/* Select dropdown menu */}
      <select
        id="category-filter" // Matches the htmlFor in the label for accessibility
        onChange={(e) => onFilter(e.target.value)} // Calls the parent's filter function with selected value
      >
        {/* Default option to show all categories */}
        <option value="All">All</option>
        
        {/* Map through categories array to create option elements */}
        {categories.map((category) => (
          <option 
            key={category} // React requires unique key for mapped elements
            value={category} // Value that will be passed to onFilter
          >
            {category} {/* Display text for the option */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;


//testing sth
