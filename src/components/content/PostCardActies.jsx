import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
// Images
import iconLocation from './../../assets/icons/icon_location_001_212427_32x32.svg';
import iconCharity from './../../assets/icons/icon_charity_001_FFFFFF_32x32.svg';

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

    const handleDetail = (postId) => { 
        navigate(`/post/${postId}`);
    }

    // Content
    return (
        <div className="flex flex-row mr-6">
            {posts.map((post) => (
                <button onClick={() => handleDetail(post.id)}>
                    <div className="relative mr-4 mb-8 rounded-lg h-40"
                        key={post.id}
                        style={{
                            backgroundImage: `url(${post.imageURLs[0]})`,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}>
                        <div className="absolute rounded p-2.5 -top-4 right-4 bg-primary drop-shadow z-10"> 
                            <img className="w-5" src={ iconCharity } alt="Acties" />
                        </div>
                        <div className="flex w-64 h-full drop-shadow">
                            <div className="flex items-end w-7/12">
                                <div className="flex gap-2 pl-3 py-3 overflow-y-auto">
                                    <div><button className="rounded px-2 py-1 w-max text-xxs text-white font-semibold bg-primary ">{ post.category }</button></div>
                                    { post.subCategories.map((subCategory, index) => ( 
                                        <div><button key={index} className="rounded px-2 py-1 w-max text-xxs text-white font-semibold bg-primary">{ subCategory }</button></div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center rounded-r-lg pl-4 pr-3 pt-8 pb-6 w-5/12 bg-white">
                                <h3 className="text-sm text-dark font-semibold truncate">{ post.title }</h3>
                                <div className="flex items-center pb-2">
                                    <img className="mr-1 w-2" src={ iconLocation } alt="Locatie" />
                                    <span className="text-xxs text-dark truncate">{ post.location }</span>
                                </div>
                                <p className="paragraph | text-xs tetx-dark font-normal">{ post.description }</p>
                            </div>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
}