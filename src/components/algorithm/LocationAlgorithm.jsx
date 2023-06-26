import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../config/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
// Images
import iconCharity from './../../assets/icons/icon_charity_001_FFFFFF_32x32.svg';
import iconConsumption from './../../assets/icons/icon_consumption_001_FFFFFF_32x32.svg';
import iconFinancial from './../../assets/icons/icon_financial_001_FFFFFF_32x32.svg';
import iconLocation from './../../assets/icons/icon_location_001_212427_32x32.svg';
import iconStuff from './../../assets/icons/icon_stuff_001_FFFFFF_32x32.svg';


export function LocationAlgorithm() {
    const [userId, setUserId] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [nearestPosts, setNearestPosts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserId = async () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                setUserId(currentUser.uid);
            }
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchUserLocation = async () => {
            if (userId) {
                // Retrieve the user's location from Firestore
                const userLocationDocRef = doc(db, 'user-locations', userId);
                const userLocationDoc = await getDoc(userLocationDocRef);

                if (userLocationDoc.exists()) {
                    const userData = userLocationDoc.data();
                    const { latitude, longitude } = userData;

                    // Set the user's location state
                    const userLocationData = { latitude, longitude };
                    setUserLocation(userLocationData);

                    // Save the user's location in local storage
                    localStorage.setItem('userLocation', JSON.stringify(userLocationData));

                    // Log the user's location
                    console.log('User Location:', userLocationData);

                    // Fetch recommendations based on the user's location
                    await fetchRecommendations(userLocationData);
                }
            }
        };
        fetchUserLocation();
    }, [userId, setUserLocation]);

    useEffect(() => {
        const fetchStoredRecommendations = () => {
            const storedNearestPosts = localStorage.getItem('nearestPosts');
            if (storedNearestPosts) {
                const parsedNearestPosts = JSON.parse(storedNearestPosts);
                setNearestPosts(parsedNearestPosts);
            }
        };
        fetchStoredRecommendations();
    }, []);

    useEffect(() => {
        if (userLocation) {
            // Fetch recommendations based on the user's location whenever it changes
            fetchRecommendations(userLocation);
        }
    }, [userLocation]);

    const fetchRecommendations = async (userLocationData) => {
        // Fetch all posts from Firestore
        const postsCollectionRef = collection(db, 'posts');
        const postsSnapshot = await getDocs(postsCollectionRef);
        const allPosts = postsSnapshot.docs.map((doc) => {
            const postData = doc.data();
            const { latitude, longitude } = postData;
            return { id: doc.id, latitude, longitude }; // Include the document ID
        });

        // Calculate distances between the user's location and each post's location
        if (userLocationData.latitude !== undefined && userLocationData.longitude !== undefined) {
            const distances = allPosts.map((post, index) => {
                const postLatitude = post.latitude;
                const postLongitude = post.longitude;

                // Check if the post has valid latitude and longitude values
                if (postLatitude !== undefined && postLongitude !== undefined) {
                    const latDiff = userLocationData.latitude - postLatitude;
                    const lngDiff = userLocationData.longitude - postLongitude;
                    const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
                    return { id: postsSnapshot.docs[index].id, distance }; // Use the document ID instead of postId
                } else {
                    // Return a large distance value for posts without valid latitude and longitude
                    return { id: postsSnapshot.docs[index].id, distance: Infinity }; // Use the document ID instead of postId
                }
            });

            // Sort the distances in ascending order
            distances.sort((a, b) => a.distance - b.distance);

            // Get the k closest posts
            const k = 5; // Change this value as per your requirements
            const nearestNeighbors = distances.slice(0, k);

            // Fetch the recommendations and update the nearest posts state
            const nearestPostsData = await Promise.all(
                nearestNeighbors.map(async (neighbor) => {
                    const postRef = doc(db, 'posts', neighbor.id);
                    const postDoc = await getDoc(postRef);
                    if (postDoc.exists()) {
                        const postData = postDoc.data();
                        return { id: neighbor.id, ...postData };
                    }
                    return null;
                })
            );

            // Save the recommendations in local storage
            localStorage.setItem('nearestPosts', JSON.stringify(nearestPostsData));

            // Set the nearest posts state
            setNearestPosts(nearestPostsData);
        }
    };

    const handleDetail = (postId) => { 
        navigate(`/post/${postId}`);
    }

    // Content
    return (
        <div className="flex flex-row mr-6">
            {nearestPosts.map((post) => (
                <div key={post.id}>
                    <button onClick={() => handleDetail(post.id)} className="w-full">
                        <div className="relative mb-8 mr-4 rounded-lg h-40"
                            key={post.id}
                            style={{
                            backgroundImage: `url(${post.imageURLs[0]})`,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}>
                            <div className="absolute rounded p-2.5 -top-4 right-4 bg-primary drop-shadow z-10">
                                { post.category === "Financieel" && (
                                    <img className="w-5" src={ iconFinancial } alt="Financieel" />
                                )}
                                { post.category === "Acties" && (
                                    <img className="w-5" src={ iconCharity } alt="Acties" />
                                )}
                                { post.category === "Eten" && (
                                    <img className="w-5" src={ iconConsumption } alt="Eten & Drinken" />
                                )}
                                { post.category === "Spullen" && (
                                    <img className="w-5" src={ iconStuff } alt="Spullen" />
                                )}
                        </div>
                            <div className="flex w-64 h-full drop-shadow">
                                <div className="flex items-end w-7/12">
                                    <div className="flex gap-2 pl-3 py-3 overflow-y-auto ">
                                        <div><button className="rounded px-2 py-1 w-max text-xxs text-white font-semibold bg-primary">{ post.category }</button></div>
                                        { post.subCategories.map((subCategory, index) => ( 
                                            <div><button key={index} className="rounded px-2 py-1 w-max text-xxs text-white font-semibold bg-primary">{ subCategory }</button></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center rounded-r-lg pl-4 pr-3 pt-8 pb-6 w-5/12 bg-white">
                                    <h3 className="text-sm text-dark font-semibold truncate">{ post.title }</h3>
                                    <div className="flex items-center pb-2">
                                        <img className="mr-1 w-2" src= {iconLocation } alt="Locatie" />
                                        <span className="text-xxs text-dark font-normal truncate">{ post.location }</span>
                                    </div>
                                    <p className="paragraph | text-xs text-dark font-normal">{ post.description }</p>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            ))}
        </div>
    );
}