import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Navbar } from "../navs/Navbar.jsx";
import { BackButton } from "../components/buttons/BackButton";
import { NotificationButton } from '../components/buttons/NotificationButton';

export function PostDetail () {

    const { postId } = useParams();
    const [post, setPost] = useState(null);
  
    useEffect(() => {
      const fetchPost = async () => {
        try {
          const postDoc = await getDoc(doc(db, "posts", postId));
          if (postDoc.exists) {
            setPost(postDoc.data());
          } else {
            console.log("Post not found");
          }
        } catch (error) {
          console.log("Error fetching post:", error);
        }
      };
  
      fetchPost();
    }, [postId]);
  
    if (!post) {
      return <div>Loading...</div>;
    }

    const imageURL = post.imageURLs && post.imageURLs[0]; // Check if imageURLs exist

    return (
        <div>

            <BackButton />
            <Navbar />

            {/* Buttons */}
            <div>

            </div>

            {/* Foto's */}
            <div className="h-[40vh] w-full bg-cover bg-center" style={{ backgroundImage: `url(${imageURL})` }}>

            </div>

            {/* Help Button */}
            <div className="fixed bottom-4 right-4">
                <button>Help</button>
            </div>

            {/* Informatie */}
            <div className="relative -mt-10 rounded-3xl bg-white min-h-screen p-8">
                <div className="text-2xl font-semibold">
                    <h1>{post.title}</h1>
                </div>
                <div className="mt-6 ms-3 flex">
                    <img src={post.photoURL} alt="" className="w-8 h-8 rounded-full" />
                    <p className="text-xs mt-2 ms-3">{post.displayName}</p>
                </div>
                <div className="flex">
                <div className="flex overflow-y-auto pl-3 py-2 -ms-3">
                        <div className="mr-2"><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxs font-semibold">{post.category}</button></div>
                        <div><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxs font-semibold">Buurthuis-activiteiten</button></div>
                    </div>
                </div>

                <div className="mt-5" style={{ borderBottom: '1px solid lightgray' }}></div>

            </div>

        </div>
    )
}