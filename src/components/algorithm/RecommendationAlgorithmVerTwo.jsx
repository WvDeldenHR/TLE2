import { useEffect, useState } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

import iconLocation from './../../assets/icons/icon_location_001_212427_32x32.svg';
import iconFinancial from './../../assets/icons/icon_financial_001_FFFFFF_32x32.svg';
import iconStuff from './../../assets/icons/icon_stuff_001_FFFFFF_32x32.svg';
import iconConsumption from './../../assets/icons/icon_consumption_001_FFFFFF_32x32.svg';
import iconCharity from './../../assets/icons/icon_charity_001_FFFFFF_32x32.svg';

const RecommendationAlgorithmVerTwo = () => {
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

    // Content
    return (
    <div className='flex my-2'>
        {recommendations.length > 0 ? ( recommendations.map((post, index) => (
            <div key={index}>
                <button onClick={() => handleDetail(post.id)} className='w-full'>
                    <div className="relative mr-4 rounded-lg h-48"
                        key={post.id}
                        style={{
                            backgroundHeight: '100%',
                            backgroundImage: `url(${post.imageURLs[0]})`,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                    }}>
                    <div className="absolute rounded p-2.5 -top-4 right-4 bg-primary drop-shadow z-10">
                        {post.category === 'Financieel' && (
                            <img className="w-5" src={ iconFinancial } alt="Financieel" />
                        )}
                        {post.category === 'Acties' && (
                            <img className="w-5" src={ iconCharity } alt="Acties" />
                        )}
                        {post.category === 'Eten' && (
                            <img className="w-5" src={ iconConsumption } alt="Eten & Drinken" />
                        )}
                        {post.category === 'Spullen' && (
                            <img className="w-5" src={ iconStuff } alt="Spullen" />
                        )}
                    </div>
                    <div className="flex flex-col w-38 h-full drop-shadow">
                    <div className="flex items-end h-full">
                        <div className="flex overflow-y-auto pl-3 py-3">
                            <div className="mr-2"><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxs font-semibold">{post.category}</button></div>
                            {/* <div><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxs font-semibold">{post.subCategories.join(', ')}</button></div> */}
                        </div>
                    </div>
                    <div className="flex flex-col rounded-b-lg px-3 py-1 bg-white">
                        <h3 className="text-dark text-sm font-bold truncate">{post.title}</h3>
                        <div className="flex items-center">
                            <img className="w-2 mr-1" src={iconLocation} alt="Location"></img>
                            <span className="text-dark text-xxs truncate">{post.location}</span>
                        </div>
                    </div>
                </div>
         </div>
         </button>
          </div>
        ))
      ) : (
        <p>Loading recommendations...</p>
      )}
    </div>
  );
};

export default RecommendationAlgorithmVerTwo;
