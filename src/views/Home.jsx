import { useState, useEffect } from 'react'
import { auth } from "../config/firebase"
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from './../config/firebase';
import { orderBy, limit, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
// Components
import { NotificationButton } from '../components/buttons/NotificationButton';
import { FilterButton } from '../components/buttons/FilterButton';
import { TagButtonsSlider } from '../components/buttons/TagButtonsSlider';
import { PostCardLarge } from '../components/content/PostCardLarge';
import { Navbar } from "../components/navs/Navbar.jsx";
import Searchbar from '../components/search/Searchbar';
// Images
import iconLocation from './../assets/icons/icon_location_001_212427_32x32.svg';

import RecommendationAlgorithm from '../components/algorithm/RecommendationAlgorithm';


export function Home() {
    // const user = auth.currentUser;
    // const displayName = user.displayName;
    // console.log(displayName)

    // const [displayName, setDisplayName] = useState('');

    // useEffect(() => {
    //   // Fetch the user's display name from Firebase
    //   const user = auth.currentUser;
    //   if (user) {
    //     const { displayName } = user;
    //     setDisplayName(displayName || ''); // Set the display name or an empty string
    //     console.log(displayName)
    //   }
    // }, []);

    const [displayName, setDisplayName] = useState('');
    const [latestPost, setLatestPost] = useState(null);
    const navigate = useNavigate();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName } = user;
        setDisplayName(displayName || '');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);


    // Searchbar Toggle
    const [search, setSearch] = useState(0)
    const searchToggle = (index) => {
        setSearch(index);
    }

    // Search Function
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'posts')), (snapshot) => {
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
        setNoResults(filtered.length === 0);
    };

    useEffect(() => {
        const fetchLatestPost = async () => {
          const user = auth.currentUser;
          if (user) {
            const userId = user.uid;
            const postsCollectionRef = collection(db, "posts");
            const q = query(
              postsCollectionRef,
              where("userId", "==", userId),
              orderBy("createdAt", "desc"),
              limit(1)
            );
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              const latestPostData = querySnapshot.docs[0].data();
              setLatestPost(latestPostData);
            }
          }
        };
      
        fetchLatestPost();
      }, []);
      
      const handleDetail = (postId) => {
        navigate(`/overview`);
      }

    return (
        <div className="bg-white">
            <Navbar />

            <div className={`transition-3 | px-6 py-4 overflow-y-hidden 
                            ${search ? "fixed border-b-1 border-gray-300 rounded-none h-18 top-0 left-0 right-0 z-40 bg-white" : "relative m-1 rounded-xl h-80 bg-primary"}`}>
                <div className={`transition-3 ${search ? "opacity-0 -transformY-40" : "opacity-100 transformY-0"}`}>
                    { <NotificationButton /> }
                    <div className="pt-2 pb-6">
                        <h1 className="text-3xl text-white font-semibold">Hallo</h1>
                        <h1 className="text-3xl text-white font-semibold">{displayName}</h1>
                    </div>
                </div>
                <div className={`transition-3 | flex items-center ${search ? "-transformY-38" : "transformY-0"}`}>
                    <div onClick={() => searchToggle(1) } className={`flex mr-3 rounded-lg w-full h-10 ${search ? "bg-gray-200" : "bg-white bg-opacity-25"}`}>
                       { <Searchbar onSearch={handleSearch} /> }
                    </div>
                    <div className={`transition-3 ${search ? "hidden" : "flex"}`}>
                        { <FilterButton />}
                    </div>
                    <div onClick={() => searchToggle(0) } className={`transition-3 ${search ? "w-20 transformX-0" : "w-0 transformX-24"}`}>
                        <span className="text-sm text-dark font-semibold">Annuleren</span>
                    </div>
                </div>
                <div className="-mr-5">
                    { <TagButtonsSlider />}
                </div>
            </div>

            <div className={`fixed w-full top-16 left-0 right-0 bottom-0 bg-white overflow-x-hidden z-30 ${search ? "h-full" : "h-0"} `}>
                <div className={`transition-3 | p-6 w-full h-full bg-white ${search ? "opacity-100" : "opacity-0"}`}>            
                    <div className="pb-6">
                        {/* <h2 className="text-normal text-dark font-semibold">Recente Zoekopdrachten</h2> */}
                    </div>

                    {noResults ? (
                        <p className="text-dark">Geen resultaten gevonden</p>
                    ) : (filteredPosts.map((post) => (
                        <div key={post.id} className="flex items-center mb-3 h-20">
                           <div className="rounded-lg h-4/5 w-3/12"
                                key={post.id}
                                style={{
                                    backgroundColor: '#E6E6E6',
                                    backgroundImage: `url(${post.imageURLs[0]})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                }}>
                            </div>
                            <div className="ml-4 pl-2 border-b-1 border-gray-500 w-full">
                                <div className="flex">
                                    <h3 className="w-52 text-sm text-dark font-bold truncate">{post.title}</h3>
                                    <span className="flex justify-end w-full text-xxs text-gray-500 font-normal">30-5-2023</span>
                                </div>
                                <div className="flex items-center py-0.5">
                                    <img className="w-3" src={iconLocation} alt=""></img>
                                    <span className="ml-1 text-xxs text-dark font-medium">Locatie</span>
                                </div>
                                <div className="flex overflow-y-auto pb-2">
                                    <div className="mr-2"><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxxs font-semibold">Financieel</button></div>
                                    <div><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxxs font-semibold">Buurthuis-activiteiten</button></div>
                                </div>
                            </div>
                        </div>
                    )))}
                </div>
            </div>

            <div className="-mt-8 px-6">

                <div className="pb-5">
                {latestPost ? (
                    <div>
                        <button onClick={() => handleDetail()} className='w-full'>
                            <div className="flex rounded-lg w-full h-40 drop-shadow"
                            style={{
                                backgroundColor: '#E6E6E6',
                                backgroundImage: `url(${latestPost.imageURLs[0]})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}>
                                <div className="flex items-end w-full h-full">
                                    <span className="mx-4 my-3 px-3 py-1 rounded text-sm text-white w-full font-regular bg-dark bg-opacity-50">{latestPost.title}</span>
                                </div>
                                <div className="w-full">
                                    <div className="flex items-center justify-end px-5 py-4 w-full">
                                        <span className="pr-2 text-sm text-white font-medium">0</span>
                                        <svg className="fill-white" width="24" height="24" viewBox="0 0 32 32"><g>
                                            <path d="M0.1,7.2C0.1,7,0.2,6.7,0.3,6.4c3.2,3.3,6.4,6.5,9.5,9.7c-3.1,3.1-6.3,6.4-9.5,9.7c-0.1-0.3-0.2-0.6-0.3-0.9 C0.1,19,0.1,13.1,0.1,7.2z"/>
                                            <path d="M32.1,24.9c-0.1,0.3-0.2,0.5-0.3,0.9c-3.2-3.3-6.4-6.5-9.5-9.7c3.1-3.1,6.3-6.4,9.5-9.7 C31.9,6.7,32,7,32.1,7.2C32.1,13.1,32.1,19,32.1,24.9z"/>
                                            <path d="M1.7,5c0.5-0.1,0.9-0.2,1.4-0.2c6.8,0,13.7,0,20.5,0c1.8,0,3.7,0,5.5,0c0.4,0,0.9,0.1,1.3,0.2c0,0,0,0.1,0,0.1 c-0.1,0.1-0.1,0.2-0.2,0.2c-4,4-8,8-12,11.9c-0.9,0.9-1.9,1.2-3.1,0.8c-0.4-0.1-0.8-0.4-1.1-0.7c-4.1-4-8.1-8.1-12.2-12.1 c0,0-0.1-0.1-0.1-0.1C1.7,5.1,1.7,5,1.7,5z"/>
                                            <path d="M20.8,17.3c3.2,3.3,6.4,6.5,9.6,9.8c-0.3,0.1-0.6,0.1-0.9,0.2c-0.1,0-0.2,0-0.4,0c-8.7,0-17.3,0-26,0 c-0.5,0-0.9-0.1-1.4-0.2c3.2-3.3,6.4-6.5,9.6-9.8c0.1,0.1,0.2,0.2,0.3,0.3c0.5,0.5,1,1.1,1.6,1.5c1.9,1.5,4.5,1.3,6.2-0.4 C19.9,18.3,20.3,17.8,20.8,17.3z"/>
                                        </g></svg>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>

                    ) : (

                        <div className='my-10'></div>

                    )}
                </div>
                
                <div>
                    <div className="pb-3">
                        <h2 className="text text-dark font-semibold">Aanbevolen voor jou</h2>
                    </div>
                    <div className="mb-24">
                        {/* {<PostCardLarge />}
                        {<PostCardLarge />}
                        {<PostCardLarge />}
                        {<PostCardLarge />} */}

                        <RecommendationAlgorithm />
                    </div>
                </div>
            </div>
        </div>
    );
}