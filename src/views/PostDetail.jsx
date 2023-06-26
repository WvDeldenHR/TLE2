import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
// Components
import { BackButton } from "../components/buttons/BackButton";
import { HelpButton } from "../components/buttons/HelpButton"
import { LoadingScreen } from "../components/other/LoadingScreen";
import { Navbar } from "../components/navs/Navbar.jsx";
import { NotificationButtonAlt2 } from '../components/buttons/NotificationButtonAlt2';
import { NotificationButton } from "../components/buttons/NotificationButton";
// Images
import iconArrow from './../assets/icons/icon_arrow_001_212427_32x32.svg';
import iconCharity from './../assets/icons/icon_charity_001_FFFFFF_32x32.svg';
import iconConsumption from './../assets/icons/icon_consumption_001_FFFFFF_32x32.svg';
import iconFinancial from './../assets/icons/icon_financial_001_FFFFFF_32x32.svg';
import iconLocation from './../assets/icons/icon_location_001_212427_32x32.svg';
import iconStuff from './../assets/icons/icon_stuff_001_FFFFFF_32x32.svg';


export function PostDetail() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentPhotoURL, setCurrentPhotoURL] = useState('');
    const [uploadedPhotoURL, setUploadedPhotoURL] = useState('');

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };

    // useEffect(() => {
    //     const fetchPost = async () => {
    //         try {
    //             const postDoc = await getDoc(doc(db, "posts", postId));
    //             if (postDoc.exists) {
    //                 setPost(postDoc.data());
    //             } else {
    //                 console.log("Post not found");
    //             }
    //         } catch (error) {
    //             console.log("Error fetching post:", error);
    //         }
    //     };
    //     fetchPost();
    // }, [postId]);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "posts", postId), (postDoc) => {
            if (postDoc.exists()) {
                setPost(postDoc.data());
            } else {
                console.log("Post not found");
            }
        });
        return () => unsubscribe();
    }, [postId]);

    useEffect(() => {
        if (post) {
            setCurrentPhotoURL(post.photoURL);
        }
    }, [post]);

    if (!post) {
        return <LoadingScreen />;
    }

    function updatePhotoURL(url) {
        setUploadedPhotoURL(url);
        const cacheBuster = Date.now(); // Generate a unique value (timestamp)
        const updatedURL = `${url}?cache=${cacheBuster}`; // Append the cache buster to the photo URL
        setCurrentPhotoURL(updatedURL); // Update the state with the updated URL
    }

    const imageURL = post.imageURLs && post.imageURLs[0]; // Check if imageURLs exist

    const nextImage = () => {
        const nextIndex = currentImageIndex + 1;
        setCurrentImageIndex(nextIndex >= post.imageURLs.length ? 0 : nextIndex);
    };

    const previousImage = () => {
        const previousIndex = currentImageIndex - 1;
        setCurrentImageIndex(previousIndex < 0 ? post.imageURLs.length - 1 : previousIndex);
    };

    // Content
    return (
        <>
            <Navbar />
            <HelpButton postId={postId} />

            <div className="w-full h-80 bg-cover bg-center" style={{ backgroundImage: `url(${imageURL})` }}>
                <div className="flex pt-5 px-6">
                    <div className="flex w-full">
                        <button onClick={handleGoBack} className="flex items-center justify-center mr-4 rounded-full p-3 w-12 h-12 bg-white drop-shadow">
                            <img className="w-5" src={ iconArrow } alt="Terug"></img>
                        </button>
                    </div>
                    <div className="flex justify-end">
                        <NotificationButton />
                    </div>
                </div>
            </div>

            <div className="relative -mt-10 rounded-3xl px-10 py-10 min-h-screen bg-white">
                <div className="flex justify-end mr-2 -mt-16">
                    <div className="flex items-center justify-center rounded p-2.5 w-12 h-12 bg-primary drop-shadow z-10">
                        { post.category === "Financieel" && (
                            <img className="w-5" src={ iconFinancial } alt="Financieel" />
                        )}
                        { post.category === 'Acties' && (
                            <img className="w-5" src={ iconCharity } alt="Acties" />
                        )}
                        { post.category === 'Eten' && (
                            <img className="w-5" src={ iconConsumption } alt="Eten & Drinken" />
                        )}
                        { post.category === 'Spullen' && (
                            <img className="w-5" src={ iconStuff } alt="Spullen" />
                        )}
                    </div>
                </div>

                <div className="border-b-1 border-gray-400 pt-4 pb-3">
                    <h1 className="text-2xl text-dark font-semibold truncate">{ post.title }</h1>
                    <div className="flex items-center pt-1 pb-2">
                        <img className="mr-1 w-2" src={ iconLocation } alt="Locatie" />
                        <span className="text-xs text-dark font-normal truncate">{ post.location }</span>
                    </div>
                    <div className="flex gap-3 ml-2">
                        <img className="rounded-full w-8 h-8" src={ post.photoURL } alt="" />
                        <span className="mt-2 text-xs text-dark font-medium">{ post.displayName }</span>
                    </div>
                    <div className="flex gap-2 -ml-3 pl-3 py-2 overflow-y-auto">
                        <div><button className="rounded px-2 py-1 w-max text-xxs text-white font-semibold bg-primary">{post.category}</button></div>
                        { post.subCategories.map((subCategory, index) => ( 
                            <div><button key={index} className="rounded px-2 py-1 w-max text-xxs text-white font-semibold bg-primary">{ subCategory }</button></div>
                        ))}
                    </div>
                </div>

                <div className="mt-7">
                    <p className="text-xs text-dark font-normal whitespace-pre-wrap">{ post.description }</p>

                    <div className="pt-4 pb-36">
                        <div className="rounded-md w-full h-60"
                            style={{
                                backgroundColor: '#E6E6E6',
                                backgroundImage: `url(${post.imageURLs[currentImageIndex]})`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}>
                        </div>
                        {post.imageURLs.length > 1 && (
                            <div className="flex justify-center">
                                <button onClick={previousImage} className="mr-10 mt-4 rounded-2xl bg-gray-300 text-black py-1 px-3"><i class="fa-solid fa-angle-left"></i></button>
                                <p className="mt-5"><i class="fa-regular fa-image fa-lg"></i></p>
                                <button onClick={nextImage} className="ml-10 mt-4 rounded-2xl bg-gray-300 text-black py-1 px-3"><i class="fa-solid fa-angle-right"></i></button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}