import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';

import iconLocation from './../../assets/icons/icon_location_001_212427_32x32.svg';
import iconCharity from './../../assets/icons/icon_charity_001_FFFFFF_32x32.svg';

import '../../index.css';

export function PostCardActies() {

    const [posts, setPosts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const navigate = useNavigate();

    useEffect(() => { 
        const fetchPosts = async () => {
        const q = query(collection(db, 'posts'), where('category', '==', 'Acties'));
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setPosts(fetchedPosts);
        setCategoryName('Acties'); // Set the category name
        };

        fetchPosts();
    }, []);

    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div>
            {posts.map((post) => (
                <div
                className="content-box relative mb-8 rounded-lg h-40"
                key={post.id}
                style={{
                    backgroundImage: `url(${post.imageURLs[0]})`,
                    backgroundSize: '120%',
                    backgroundPosition: 'left',
                    backgroundRepeat: 'no-repeat',
                }}
                >
                    <div className="absolute rounded p-2.5 -top-4 right-4 bg-primary drop-shadow z-10"> 
                        <img className="w-5" src={iconCharity} alt="Financieel"></img>
                    </div>
                    <div className="flex w-64 h-full drop-shadow">
                        <div className="flex items-end w-7/12">
                            <div className="flex overflow-y-auto pl-3 py-3">
                                <div className="mr-2"><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxs font-semibold">{post.category}</button></div>
                                {/* <div><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxs font-semibold">Buurthuis-activiteiten</button></div> */}
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
}