import React from 'react';

function SearchBar({ searchQuery, onSearchChange, onSearchSubmit }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Character Name"
      />
      <button onClick={onSearchSubmit}>Search</button>
    </div>
  )
}

export default SearchBar;
