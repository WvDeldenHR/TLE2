import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { db } from './../config/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
// Components
import { FilterButtonAlt } from '../components/buttons/FilterButtonAlt';
import { LocationAlgorithm } from '../components/algorithm/LocationAlgorithm';
import { Navbar } from "../components/navs/Navbar";
import { NotificationButtonAlt } from '../components/buttons/NotificationButtonAlt';
import { PostCardActies } from '../components/content/PostCardActies';
import RecommendationAlgorithmAlt from '../components/algorithm/RecommendationAlgorithmAlt';
import Searchbar from '../components/search/Searchbar';
import { TagButtonsSliderPrimary } from '../components/buttons/TagButtonsSliderPrimary';
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
                <div className={`transition-3 | flex items-center pb-5 ${search ? "-transformY-20 | opacity-0" : "transformY-0 | opacity-100"}`}>
                    <div className="w-full">
                        <h2 className="text-lg text-dark font-bold">Ontdekken</h2>
                    </div>
                    <NotificationButtonAlt />
                </div>
                <div className={`transition-3 | flex items-center ${search ? "-transformY-17 | pb-2" : "-transformY-0"}`}>
                    <div onClick={() => searchToggle(1) } className="flex mr-3 rounded-lg w-full h-10 drop-shadow bg-gray-200">
                        <Searchbar onSearch={ handleSearch } />
                    </div>
                    <div className={`transition-3 ${search ? "hidden" : "flex"}`}>
                        <FilterButtonAlt />
                    </div>
                    <div onClick={() => searchToggle(0) } className={`transition-3 ${search ? "transformX-0 | w-20" : "transformX-24 | w-0"}`}>
                        <span className="text-sm text-dark font-semibold">Annuleren</span>
                    </div>
                </div>
                <div className={`-mr-5 ${search ? "opacity-0" : "opacity-100"}`}>
                    <TagButtonsSliderPrimary />
                </div>
            </div>

            <div className={`fixed w-full top-16 left-0 right-0 bg-white overflow-x-hidden z-30 ${search ? "h-full" : "h-0"} `}>
                <div className={`transition-3 | px-6 py-10 w-full h-full bg-white ${search ? "opacity-100" : "opacity-0"}`}>
                    <div className="pb-6">
                        {/* <h2 className="text-normal text-dark font-semibold">Recente Zoekopdrachten</h2> */}
                    </div>
                    {noResults ? (
                        <p className="text-base text-dark font-medium">Geen resultaten gevonden</p>
                    ) : (filteredPosts.map((post) => (
                        <div key={post.id} className="flex items-center mb-3 h-20">
                           <div className="rounded-lg w-3/12 h-4/5"
                                key={post.id}
                                style={{
                                    backgroundColor: '#E6E6E6',
                                    backgroundImage: `url(${post.imageURLs[0]})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                }}>
                            </div>
                            <div className="ml-4 border-b-1 border-gray-500 pl-2 w-3/4">
                                <div className="flex">
                                    <h3 className="w-52 text-sm text-dark font-bold truncate">{ post.title }</h3>
                                    <span className="flex justify-end w-full text-xxs text-gray-500 font-normal">30-5-2023</span>
                                </div>
                                <div className="flex items-center py-0.5">
                                    <img className="w-3" src={ iconLocation } alt="Locatie"></img>
                                    <span className="ml-1 text-xxs text-dark font-medium">{ post.location }</span>
                                </div>
                                <div className="flex gap-2 pb-2 overflow-y-auto">
                                    <div><button className="rounded px-2 py-1 w-max text-xxxs text-white font-semibold bg-primary">{ post.category }</button></div>
                                    { post.subCategories.map((subCategory, index) => ( 
                                        <div><button key={index} className="rounded px-2 py-1 w-max text-xxs text-white font-semibold bg-primary">{ subCategory }</button></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )))}
                </div>
            </div>

            <div className="mt-55 px-6">
                <div className="mb-6">
                    <h2 className="text-lg text-dark font-bold">Aanbevolen Voor Jou</h2>
                    <div className="flex -mt-1 -mr-6 pt-5 overflow-y-auto">
                        <RecommendationAlgorithmAlt />
                    </div>
                </div>
                <div className="">
                    <h2 className="text-lg text-dark font-bold">In Jou Buurt</h2>
                    <div className="flex flex-row -mt-1 -mr-6 pt-4 overflow-y-auto">
                        { <LocationAlgorithm />}
                    </div>
                </div>
                <div className="">
                    <h2 className="text-lg text-dark font-bold">Acties</h2>
                    <div className="flex flex-row -mt-1 -mr-6 pt-4 overflow-y-auto">
                        { <PostCardActies /> }
                    </div>
                </div>
            </div>
        </div>
    );
}