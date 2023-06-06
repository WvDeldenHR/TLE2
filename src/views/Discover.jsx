import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from './../config/firebase';
import { useNavigate } from "react-router-dom";

// Components
import { FilterButtonAlt } from '../components/buttons/FilterButtonAlt';
import { Navbar } from "../components/navs/Navbar";
import { NotificationButtonAlt } from '../components/buttons/NotificationButtonAlt';
import { PostCard } from '../components/content/PostCard';
import { PostCardActies } from '../components/content/PostCardActies';
import { PostCardSmall } from '../components/content/PostCardSmall';
import { TagButtonsSliderPrimary } from '../components/buttons/TagButtonsSliderPrimary';
import Searchbar from '../components/search/Searchbar';
// Images
import iconLocation from './../assets/icons/icon_location_001_212427_32x32.svg';


export function Discover() {
    const navigate = useNavigate();

    // Scroll
    const [shadow, setShadow] = useState(false)
    const scrollShadow = () => {
        if (window.scrollY >= 15) {
            setShadow(true)
        } else {
            setShadow(false)
        }
    }
    window.addEventListener('scroll', scrollShadow)

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



    
    // Content
    return (
        <div className="bg-white">
            <Navbar />

            <div className={`transition-3 | fixed my-1 px-6 py-4 top-0 left-0 right-0 bg-white z-40 ${shadow ? "drop-shadow-lg" : ""} 
                            ${search ? "mx-0 border-b-1 border-gray-300 rounded-none h-18" : "mx-1 rounded"}`}>
                <div className={`transition-3 | flex items-center pb-5 ${search ? "opacity-0 -transformY-20" : "opacity-100 transformY-0"}`}>
                    <div className="w-full">
                        <h2 className="text-lg text-dark font-bold">Ontdekken</h2>
                    </div>
                    { <NotificationButtonAlt /> }
                </div>
                <div className={`transition-3 | flex items-center ${search ? "pb-2 -transformY-17" : "-transformY-0"}`}>
                    <div onClick={() => searchToggle(1) } className="flex mr-3 rounded-lg w-full h-10 drop-shadow bg-gray-200">
                        <Searchbar onSearch={handleSearch} />
                    </div>
                    <div className={`transition-3 ${search ? "hidden" : "flex"}`}>
                        { <FilterButtonAlt />}
                    </div>
                    <div onClick={() => searchToggle(0) } className={`transition-3 ${search ? "w-20 transformX-0" : "w-0 transformX-24"}`}>
                        <span className="text-sm text-dark font-semibold">Annuleren</span>
                    </div>
                </div>
                <div className={`-mr-5 ${search ? "opacity-0" : "opacity-100"}`}>
                    { <TagButtonsSliderPrimary /> }
                </div>
            </div>

            <div className={`fixed w-full top-16 left-0 right-0 bg-white overflow-x-hidden z-30 ${search ? "h-full" : "h-0"} `}>
                <div className={`transition-3 | px-6 py-10 w-full h-full bg-white ${search ? "opacity-100" : "opacity-0"}`}>
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

            <div className="mt-56 px-6">
                <div className="mb-6">
                    <div className="">
                        <h2 className="text-lg text-dark font-bold">Aanbevolen Voor Jou</h2>
                    </div>
                    <div className="flex -mt-1 -mr-6 pt-5 overflow-y-auto">
                        <RecommendedPosts />
                    </div>
                </div>

                <div className="">
                    <div className="">
                        <h2 className="text-lg text-dark font-bold">In Jou Buurt</h2>
                    </div>
                    <div className="flex -mt-1 -mr-6 pt-5 overflow-y-auto">
                        { <PostCard /> }
                        { <PostCard /> }
                        { <PostCard /> }
                        { <PostCard /> }
                        { <PostCard /> }
                    </div>
                </div>

                <div className="">
                    <div className="">
                        <h2 className="text-lg text-dark font-bold">Acties</h2>
                    </div>
                    <div className="flex -mt-1 -mr-6 pt-5 overflow-y-auto">
                        { <PostCardActies /> }
                    </div>
                </div>
            </div>
        </div>
    );
}