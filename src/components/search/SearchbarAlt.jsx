import React, { useState } from 'react';

// Searchbar
const Searchbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    onSearch(newQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <input className="searchbar-alt | w-full text-sm text-dark outline-none"
              type="text"
              placeholder="Naar wat wilt u zoeken?"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress} />
    </>
  );
};

export default Searchbar;