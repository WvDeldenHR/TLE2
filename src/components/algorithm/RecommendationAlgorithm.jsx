import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../config/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
// Components
import { LoadingScreen } from '../other/LoadingScreen';
// Images
import iconCharity from './../../assets/icons/icon_charity_001_FFFFFF_32x32.svg';
import iconConsumption from './../../assets/icons/icon_consumption_001_FFFFFF_32x32.svg';
import iconFinancial from './../../assets/icons/icon_financial_001_FFFFFF_32x32.svg';
import iconLocation from './../../assets/icons/icon_location_001_212427_32x32.svg';
import iconStuff from './../../assets/icons/icon_stuff_001_FFFFFF_32x32.svg';


const RecommendationAlgorithm = () => {
    const [recommendations, setRecommendations] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
        const fetchUserPreferences = async () => {
            try {
                if (!auth.currentUser) {
                    return;
                }

                // Fetch the user's preferences from Firestore
                const userId = auth.currentUser.uid;
                const userPreferencesRef = doc(db, 'user-pref', userId);
                const userPreferencesDoc = await getDoc(userPreferencesRef);
    
                if (userPreferencesDoc.exists()) {
                    // User preferences exist, you can access them here
                    const userPreferencesData = userPreferencesDoc.data();
                    console.log('User Preferences:', userPreferencesData);

                    // Fetch the posts and continue with the next steps of the algorithm
                    await fetchData(userPreferencesData);
                } else {
                    // User preferences not found, handle the case accordingly
                    console.log('User preferences not found.');
                }
            } catch (error) {
                console.error('Error fetching user preferences:', error);
            }
        };
        fetchUserPreferences();
    }, []);

    const fetchData = async (userPreferencesData) => {
        try {
            const postsCollectionRef = collection(db, 'posts');
            const postsSnapshot = await getDocs(postsCollectionRef);

            const posts = [];
            postsSnapshot.forEach((doc) => {
                posts.push({ ...doc.data(), id: doc.id });
            });

            console.log('Fetched posts:', posts);

            // Call the function to calculate similarity and perform further steps
            const recommendations = calculateSimilarityAndProcess(userPreferencesData, posts);

            // Set the recommendations
            setRecommendations(recommendations);

            // Store recommendations in local storage
            localStorage.setItem('recommendations', JSON.stringify(recommendations));
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
  
    useEffect(() => {
        // Retrieve recommendations from local storage on component mount
        const storedRecommendations = localStorage.getItem('recommendations');
  
        if (storedRecommendations) {
            setRecommendations(JSON.parse(storedRecommendations));
        }
    }, []);

    useEffect(() => {
        // Update recommendations if user preferences change
        const handleUserPreferencesChange = async () => {
            try {
                if (!auth.currentUser) {
                    return;
                }

                // Fetch the updated user preferences from Firestore
                const userId = auth.currentUser.uid;
                const userPreferencesRef = doc(db, 'user-pref', userId);
                const userPreferencesDoc = await getDoc(userPreferencesRef);

                if (userPreferencesDoc.exists()) {
                    // User preferences exist, you can access them here
                    const userPreferencesData = userPreferencesDoc.data();
                    console.log('Updated User Preferences:', userPreferencesData);
            
                    // Fetch the posts and continue with the next steps of the algorithm
                    await fetchData(userPreferencesData);
                } else {
                    // User preferences not found, handle the case accordingly
                    console.log('User preferences not found.');
                }
            } catch (error) {
                console.error('Error fetching updated user preferences:', error);
            }
        };

        // Subscribe to user preferences changes
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                handleUserPreferencesChange();
            }
        });

        // Clean up the subscription
        return () => {
            unsubscribe();
        };
    }, []);

    function calculateSimilarityAndProcess(userPreferences, posts) {
        // Select the number of nearest neighbors (k)
        const k = 5;

        // Calculate similarity scores for all posts
        const similarityScores = posts.map((post) => {
            const similarityScore = calculateSimilarity(userPreferences, post);
            return { post, similarityScore };
        });

        // Sort the posts based on similarity scores in descending order
        similarityScores.sort((a, b) => b.similarityScore - a.similarityScore);

        // Select the k nearest neighbors (top k posts)
        const nearestNeighbors = similarityScores.slice(0, k).map((item) => item.post);

        // Return the nearest neighbors as recommendations
        return nearestNeighbors;
    }

    function calculateSimilarity(userPreferences, post) {
        // Extract the main category and subcategories from user preferences and post
        const userMainCategory = userPreferences.mainCategory;
        const userSubCategories = userPreferences.subCategories;
        const postMainCategory = post.mainCategory;
        const postSubCategories = post.subCategories;

        // Calculate the intersection of subcategories between user preferences and post
        const commonSubCategories = userSubCategories.filter((subCategory) =>
            postSubCategories.includes(subCategory)
        );

        // Calculate the similarity score using cosine similarity
        const similarityScore =
        commonSubCategories.length /
        Math.sqrt(userSubCategories.length * postSubCategories.length);

        return similarityScore;
    }

    const handleDetail = (postId) => { 
        console.log('postId:', postId); // Check the value of postId
        navigate(`/post/${postId}`);
    }

    return (
        <div className="pb-16">
        {recommendations.length > 0 ? ( recommendations.map((post, index) => (
            <div key={index}>
                <button onClick={() => handleDetail(post.id)} className='w-full'>
                    <div className="content-box relative mb-8 rounded-lg h-40"
                        key={post.id}
                        style={{
                            backgroundImage: `url(${post.imageURLs[0]})`,
                            backgroundSize: '100%',
                            backgroundPosition: 'left',
                            backgroundRepeat: 'no-repeat',
                        }}>
                        <div className="absolute rounded p-2.5 -top-4 right-4 bg-primary drop-shadow z-10">
                            { post.category === 'Financieel' && (
                                <img className="w-5" src={ iconFinancial } alt="Financieel" />
                            )}
                            { post.category === 'Acties' && (
                                <img className="w-5" src={ iconCharity } alt="Acties" />
                            )}
                            { post.category === 'Eten' && (
                                <img className="w-5" src={ iconConsumption } alt="Financieel" />
                            )}
                            { post.category === 'Spullen' && (
                                <img className="w-5" src={ iconStuff } alt="Acties" />
                            )}
                        </div>
                        <div className="flex h-full drop-shadow">
                            <div className="flex items-end w-7/12">
                                <div className="flex gap-2 pl-3 py-3 overflow-y-auto">
                                    <div><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxs font-semibold">{ post.category }</button></div>
                                    { post.subCategories.map((subCategory, index) => ( 
                                        <div><button key={index} className="rounded px-2 py-1 bg-primary w-max text-white text-xxs font-semibold">{ subCategory }</button></div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center rounded-r-lg pl-4 pr-3 pt-8 pb-6 w-5/12 bg-white">
                                <h3 className="text-dark text-sm font-semibold truncate">{ post.title }</h3>
                                <div className="flex items-center pb-2">
                                    <img className="mr-1 w-2" src={ iconLocation } alt="Locatie"></img>
                                    <span className="text-dark text-xxs truncate">{ post.location }</span>
                                </div>
                                <p className="paragraph | tetx-dark text-xs">{ post.description }</p>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        ))) : (
            <LoadingScreen />
        )}
        </div>
    );
};

export default RecommendationAlgorithm;