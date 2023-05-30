// import React, { useState } from 'react';

// const Searching = ({ onSearch }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const handleSearch = () => {
//     onSearch(searchQuery);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   return (
// <>
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         onKeyPress={handleKeyPress}
//         placeholder="Naar wat wilt u zoeken?"
//         className="searchbar-alt | w-full text-dark outline-none"
//       />
//       {/* <button
//         onClick={handleSearch}
//         className="border rounded bg-primary text-white py-2 px-5 ml-2"
//       >
//         Zoek
//       </button> */}
//       </>
//   );
// };

// export default Searching;

import React, { useState } from 'react';

const Searching = ({ onSearch }) => {
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
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Naar wat wilt u zoeken?"
        className="searchbar-alt | w-full text-sm text-dark outline-none"
      />
      {/* <button
        onClick={handleSearch}
        className="border rounded bg-primary text-white py-2 px-5 ml-2"
      >
        Zoek
      </button> */}
    </>
  );
};

export default Searching;
