import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function FilterSection({
  selectedCategory,
  setSelectedCategory,
  categories,
  maxBudget,
  setMaxBudget,
  minPossibleBudget,
  maxPossibleBudget,
  sortBy,
  setSortBy,
  resultCount,
  totalCount,
  onResetFilters,
  formatPrice
}) {
  const isFiltered =
    selectedCategory !== 'All' ||
    maxBudget < maxPossibleBudget ||
    sortBy !== 'featured';

  return (
    <div className="filter-controls-card">
      <div className="filter-header">
        <div className="filter-title">
          <SlidersHorizontal size={20} className="filter-icon" />
          <span>Filter & Customize Search</span>
        </div>
        <div className="filter-meta">
          <span className="results-badge">
            Showing {resultCount} of {totalCount} Packages
          </span>
          {isFiltered && (
            <button className="reset-btn" onClick={onResetFilters} title="Reset all filters">
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      <div className="filter-body">
        {/* Categories */}
        <div className="filter-group category-group">
          <label className="filter-label">Experience Style:</label>
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Range Slider */}
        <div className="filter-group budget-group">
          <div className="budget-label-row">
            <label htmlFor="budget-slider" className="filter-label">Max Budget (per person):</label>
            <span className="budget-value">{formatPrice(maxBudget)}</span>
          </div>
          <input
            id="budget-slider"
            type="range"
            min={minPossibleBudget}
            max={maxPossibleBudget}
            step={5000}
            value={maxBudget}
            onChange={(e) => setMaxBudget(Number(e.target.value))}
            className="budget-slider"
          />
          <div className="budget-min-max">
            <span>{formatPrice(minPossibleBudget)}</span>
            <span>{formatPrice(maxPossibleBudget)}</span>
          </div>
        </div>

        {/* Sort Select */}
        <div className="filter-group sort-group">
          <label htmlFor="sort-select" className="filter-label">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-dropdown"
          >
            <option value="featured">Featured Picks</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Customer Rating</option>
            <option value="duration-desc">Longest Duration</option>
          </select>
        </div>
      </div>
    </div>
  );
}
