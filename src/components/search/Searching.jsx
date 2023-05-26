import React, { useState } from 'react';
import '../../index.css';

const Searching = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex mb-20 rounded-lg bg-white-200 drop-shadow">
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Naar wat wilt u zoeken?"
      className="searchbar-alt flex-1 h-full p-2 text-dark outline-none mr-5"
    />
    <button
      onClick={handleSearch}
      className="border rounded bg-primary text-white py-2 px-5 ml-2"
    >
      Zoek
    </button>
  </div>
  

  );
};

export default Searching;