import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Searchbar from './Searchbar';

// Images
import iconLocation from './../../assets/icons/icon_location_001_212427_32x32.svg';
import iconFinancial from './../../assets/icons/icon_financial_001_FFFFFF_32x32.svg';
import iconStuff from './../../assets/icons/icon_stuff_001_FFFFFF_32x32.svg';
import iconConsumption from './../../assets/icons/icon_consumption_001_FFFFFF_32x32.svg';
import iconCharity from './../../assets/icons/icon_charity_001_FFFFFF_32x32.svg';


export const SearchingPosts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'posts')),
      (snapshot) => {
        const fetchedPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSearch = (searchQuery) => {
    const lowercaseQuery = searchQuery.toLowerCase();
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredPosts(filtered);
  };

  return (
    <div className='p-8'>
      {/* Render the SearchBar component and pass the handleSearch function */}
      <Searchbar onSearch={handleSearch} />

      {/* Display the filtered posts */}
      {filteredPosts.map((post) => (
        // <div key={post.id}>
        //   <h2>{post.title}</h2>
        //   <p>{post.content}</p>
        // </div>

        <div
            className="content-box relative mb-8 rounded-lg h-40"
            key={post.id}
            style={{
              backgroundImage: `url(${post.imageURLs[0]})`,
              backgroundSize: '60%',
              backgroundPosition: 'left',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute rounded p-2.5 -top-4 right-4 bg-primary drop-shadow z-10">
            {post.category === 'Financieel' && (
              <img className="w-5" src={iconFinancial} alt="Financieel" />
            )}
            {post.category === 'Acties' && (
              <img className="w-5" src={iconCharity} alt="Acties" />
            )}
            {post.category === 'Eten' && (
              <img className="w-5" src={iconConsumption} alt="Financieel" />
            )}
            {post.category === 'Spullen' && (
              <img className="w-5" src={iconStuff} alt="Acties" />
            )}
          
            </div>
            <div className="flex h-full drop-shadow">
                <div className="flex items-end w-7/12">
                    <div className="flex overflow-y-auto pl-3 py-3">
                        <div className="mr-2"><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxs font-semibold">{post.category}</button></div>
                        <div><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxs font-semibold">Buurthuis-activiteiten</button></div>
                    </div>
                </div>
                <div className="flex flex-col justify-center rounded-r-lg pl-4 pr-3 pt-8 pb-6 w-5/12 bg-white">
                    <h3 className="text-dark text-sm font-semibold truncate">{post.title}</h3>
                    <div className="flex items-center pb-2">
                        <img className="w-2 mr-1" src={iconLocation} alt="Location"></img>
                        <span className="text-dark text-xxs truncate">Locatie</span>
                    </div>
                    <p className="paragraph | tetx-dark text-xs">
                        {post.description}
                    </p>
                </div>
            </div>
        </div>
      ))}
    </div>
  );
};


