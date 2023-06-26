import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Navbar } from "../components/navs/Navbar.jsx";
import { BackButton } from "../components/buttons/BackButton";
import { NotificationButtonAlt2 } from '../components/buttons/NotificationButtonAlt2';
import { HelpButton } from "../components/buttons/HelpButton"
import { onSnapshot } from "firebase/firestore";


// Images
import iconLocation from './../assets/icons/icon_location_001_212427_32x32.svg';
import iconFinancial from './../assets/icons/icon_financial_001_FFFFFF_32x32.svg';
import iconStuff from './../assets/icons/icon_stuff_001_FFFFFF_32x32.svg';
import iconConsumption from './../assets/icons/icon_consumption_001_FFFFFF_32x32.svg';
import iconCharity from './../assets/icons/icon_charity_001_FFFFFF_32x32.svg';
import { LoadingScreen } from "../components/other/LoadingScreen";

export function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPhotoURL, setCurrentPhotoURL] = useState('');
  const [uploadedPhotoURL, setUploadedPhotoURL] = useState('');

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       const postDoc = await getDoc(doc(db, "posts", postId));
  //       if (postDoc.exists) {
  //         setPost(postDoc.data());
  //       } else {
  //         console.log("Post not found");
  //       }
  //     } catch (error) {
  //       console.log("Error fetching post:", error);
  //     }
  //   };

  //   fetchPost();
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

    return (
        <div className="">

            {/* Buttons */}
              <BackButton />
              <Navbar />
              <HelpButton postId={postId} />
              <NotificationButtonAlt2 />

            {/* Foto */}
            <div className="h-[40vh] w-full bg-cover bg-center" style={{ backgroundImage: `url(${imageURL})` }}>
            </div>

            {/* Informatie */}
            <div className="relative -mt-10 rounded-3xl bg-white min-h-screen p-10">

              {/* Icon */}
                <div className="flex justify-end me-5 -mt-14">
                      {/* Div Met icoontjes */}
                    <div className="rounded p-2.5 bg-primary drop-shadow z-10 w-10">
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
                </div>

               {/* Title */}
                <div className="text-2xl font-semibold pt-4">
                    <h1>{post.title}</h1>
                </div>

                <div className="flex items-center">
                        <img className="w-2 mr-1" src={iconLocation} alt="Location"></img>
                        <span className="text-dark text-xs truncate">{post.location}</span>
                    </div>

                {/* Profiel pic + name of author */}
                <div className="mt-2 ms-3 flex">
                  <img src={post.photoURL} alt="" className="w-8 h-8 rounded-full" />
                  <p className="text-xs font-medium mt-2 ms-3">{post.displayName}</p>
                </div>


                {/* Main + subcategory */}
                <div className="flex">
                <div className="flex overflow-y-auto pl-3 py-2 -ms-3">
                        <div className="mr-2"><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxs font-semibold">{post.category}</button></div>
                        <div><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxs font-semibold">{post.subCategories.join(', ')}</button></div>
                    </div>
                </div>

                {/* Description */}
                <div className="mt-2" style={{ borderBottom: '1px solid lightgray' }}></div>

                <div className="text-xs mt-10">
                  <p style={{ whiteSpace: "pre-wrap" }}>{post.description}</p>
                </div>

                {/* Slideshow */}
                {/* Slideshow */}
                <div className="mt-4 mb-36">
                  <img src={post.imageURLs[currentImageIndex]} alt="" />
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
    )
}