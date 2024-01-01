import React, { useState } from 'react';

//DELETE?

const SearchButton = ({ onSearch }) => {
  const [selectedSubject, setSelectedSubject] = useState('');

  const handleSearch = () => {
    // Pass the selected subject to the parent component
    onSearch(selectedSubject);
  };

  return (
    <div>
      {/* Dropdown for selecting subjects */}
      <select onChange={(e) => setSelectedSubject(e.target.value)}>
        <option value="">Select Subject</option>
        {/* Add other options if needed */}
      </select>
      
      {/* Search button */}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchButton;

/*
const SearchButton = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Pass the search term to the parent component
    onSearch(searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for questions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchButton;
*/