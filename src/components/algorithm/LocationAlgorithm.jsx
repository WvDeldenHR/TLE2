import { useEffect, useState } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

import iconLocation from './../../assets/icons/icon_location_001_212427_32x32.svg';
import iconFinancial from './../../assets/icons/icon_financial_001_FFFFFF_32x32.svg';
import iconStuff from './../../assets/icons/icon_stuff_001_FFFFFF_32x32.svg';
import iconConsumption from './../../assets/icons/icon_consumption_001_FFFFFF_32x32.svg';
import iconCharity from './../../assets/icons/icon_charity_001_FFFFFF_32x32.svg';

export function LocationAlgorithm() {
  const [userId, setUserId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [nearestPosts, setNearestPosts] = useState([]);

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
        // Check if the user's location is already in local storage
        const storedUserLocation = localStorage.getItem('userLocation');
        if (storedUserLocation) {
          const parsedUserLocation = JSON.parse(storedUserLocation);
          setUserLocation(parsedUserLocation);

          // Fetch recommendations based on the stored user location
          await fetchRecommendations(parsedUserLocation);
        } else {
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
      const k = 2; // Change this value as per your requirements
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

  return (
    <div className='flex flex-row mr-6 '>
      {nearestPosts.map((post) => (
        <div key={post.id} >
         <div className="content-box relative mb-8 mr-4 rounded-lg h-40"
         key={post.id}
         style={{
           backgroundImage: `url(${post.imageURLs[0]})`,
           backgroundSize: '120%',
           backgroundPosition: 'left',
           backgroundRepeat: 'no-repeat',
         }}>
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
            <div className="flex w-64 h-full drop-shadow">
                <div className="flex items-end w-7/12">
                    <div className="flex overflow-y-auto pl-3 py-3">
                        <div className="mr-2"><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxs font-semibold">{post.category}</button></div>
                        <div><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxs font-semibold">{post.subCategories.join(', ')}</button></div>
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
        
        </div>
      ))}
    </div>
  );
}
