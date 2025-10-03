import React from 'react';
import './SearchBar.css';

function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search notes by title or content..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      {searchQuery && (
        <button 
          className="clear-search"
          onClick={() => onSearchChange('')}
          title="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;