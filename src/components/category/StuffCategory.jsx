import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';

import iconLocation from './../../assets/icons/icon_location_001_212427_32x32.svg';
import iconFinancial from './../../assets/icons/icon_financial_001_FFFFFF_32x32.svg';
import iconStuff from './../../assets/icons/icon_stuff_001_FFFFFF_32x32.svg';
import iconConsumption from './../../assets/icons/icon_consumption_001_FFFFFF_32x32.svg';
import iconCharity from './../../assets/icons/icon_charity_001_FFFFFF_32x32.svg';

import IconArrow from './../../assets/icons/icon_arrow_001_212427_32x32.svg';
import { SearchbarAlt } from '../forms/SearchbarAlt';

const StuffCategory = () => {
  const [posts, setPosts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, 'posts'), where('category', '==', 'Spullen'));
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
      setCategoryName('Spullen'); // Set the category name
    };

    fetchPosts();
  }, []);

  const handleGoBack = () => { 
    navigate(-1); // Go back to the previous page
  };

  const handeDetail = (postId) => {
    navigate(`/post/${postId}`);
  }

  return (
    <div className='p-6'>
      <div className="flex pb-8">
                    <div>
                        <button className="mr-4 rounded p-3 w-10 h-10 bg-gray-200 drop-shadow" onClick={ handleGoBack }>
                            <img className="w-100" src={ IconArrow } alt="Terug"></img>
                        </button>
                    </div>
                    <div className="w-full">
                        { <SearchbarAlt /> }
                    </div>
                </div>

      <div className='mb-10 mt-5'>
      <h1 className='text-sm'>Zoekresultaten met de categorie</h1>
      <h2 className='text-primary text-xl font-bold'>{categoryName}</h2>
      </div>

      {posts.map((post) => (
         <button onClick={() => handeDetail(post.id)} className="w-full">
         <div
         className="content-box relative mb-8 rounded-lg h-40"
         key={post.id}
         style={{
           backgroundImage: `url(${post.imageURLs[0]})`,
           backgroundHeight: '100%',
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
                     <div><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxs font-semibold">{ post.subCategories.join(', ')}</button></div>
                 </div>
             </div>
             <div className="flex flex-col justify-center rounded-r-lg pl-4 pr-3 pt-8 pb-6 w-5/12 bg-white">
                 <h3 className="text-dark text-sm font-semibold truncate">{post.title}</h3>
                 <div className="flex items-center pb-2">
                     <img className="w-2 mr-1" src={iconLocation} alt="Location"></img>
                     <span className="text-dark text-xxs truncate">{post.location}</span>
                 </div>
                 <p className="paragraph | tetx-dark text-xs">
                     {post.description}
                 </p>
             </div>
         </div>
     </div>
     </button>
      ))}
    </div>
  );
};

export default StuffCategory;
