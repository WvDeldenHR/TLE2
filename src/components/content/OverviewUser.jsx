// Components
import React, { useState, useEffect } from "react";
import { collection, deleteDoc, onSnapshot, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { ref, deleteObject } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase"

import '../../index.css';
// Images
import iconLocation from './../../assets/icons/icon_location_001_212427_32x32.svg';
import iconFinancial from './../../assets/icons/icon_financial_001_FFFFFF_32x32.svg';
import iconStuff from './../../assets/icons/icon_stuff_001_FFFFFF_32x32.svg';
import iconConsumption from './../../assets/icons/icon_consumption_001_FFFFFF_32x32.svg';
import iconCharity from './../../assets/icons/icon_charity_001_FFFFFF_32x32.svg';

export function OverviewUser() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const userId = auth.currentUser?.uid; // Haal de huidige gebruikers-ID op

      const unsubscribe = onSnapshot(
        query(collection(db, "posts"), orderBy("createdAt", "desc")), // Add orderBy("createdAt", "desc") to the query
        (snapshot) => {
          const postData = [];
          snapshot.forEach((doc) => {
            const post = { id: doc.id, ...doc.data() };
            if (post.userId === userId) {
              postData.push(post);
            }
          });
          setPosts(postData);
        }
      );
  
      return () => unsubscribe(); // Opruimen van de luisteraar bij het ontmounten van de component
    }, []);
  
    const goBackHandler = () => {
      navigate("/post/create");
    };

    const handleEdit = (postId) => {
        navigate(`/post/edit/${postId}`);
      };

      const handleDetail = (postId) => {
        navigate(`/post/${postId}`);
      }
    
      const handleDelete = async (postId) => {
        try {
          // Verwijder de postdocument uit Firestore
          await deleteDoc(doc(db, "posts", postId));
    
          // Haal de bijgewerkte lijst met posts op uit Firestore na verwijdering
          const updatedPostsSnapshot = await getDocs(collection(db, "posts"));
          const updatedPosts = updatedPostsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPosts(updatedPosts);
    
          console.log("Post deleted successfully");
        } catch (error) {
          console.log(error);
          // Behandel de fout, bijvoorbeeld door een foutmelding weer te geven of naar een foutpagina te navigeren
        }
      };
  
    return (
      <div className="">
        {posts.map((post) => {
          const createdAtDate = post.createdAt.toDate(); // Convert Firestore timestamp to JavaScript Date object

          return (
            <div key={post.id}>
              
                <div className="flex w-full mb-2 items-center">

                <div className="">
                  {/* Div Met icoontjes */}
                <div className=" rounded p-2.5 -top-4 left-4 bg-primary drop-shadow z-10 w-10">
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


                <div className="px-2 overflow-hidden">
                <h3 className="text-dark text-sm font-semibold truncate">{post.title}</h3>
                </div>


                  {/* Div buttons  */}

                <div className="flex justify-end">
                <button 
                    className="text-black flex flex-1 items-center gap-2 py-1 px-4 me-2 ms-2 border rounded text-xxs border-1 border-black w-full font-semibold"
                    onClick={() => handleEdit(post.id)}
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                    Bewerken
                </button>
                <button 
                    className="text-error flex flex-1 items-center gap-2 py-1 px-4 border rounded text-xxs border-1 border-error w-full font-semibold"
                    onClick={() => handleDelete(post.id)}
                >
                  <i class="fa-solid fa-trash"></i>
                    Verwijderen
                </button>
                </div>

                </div>
              
              <button onClick={() => handleDetail(post.id)}>
                <div
                  className="content-box relative mb-12 rounded-lg h-40 drop-shadow"
                  style={{
                    backgroundImage: `url(${post.imageURLs[0]})`,
                    backgroundSize: '80%',
                    backgroundPosition: 'left',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                 {/* Div Tekst */}
            <div className="flex h-full drop-shadow">
               <div className="flex items-end w-7/12">
                   <div className="flex overflow-y-auto pl-3 py-3">
                       <div className="mr-2"><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxs font-semibold">{post.category}</button></div>
                       <div><button className="rounded px-2 py-1 bg-primary w-max text-white text-xxs font-semibold">Buurthuis-activiteiten</button></div>
                     </div>
                </div>
                 <div className="flex flex-col justify-center rounded-r-lg pl-4 pr-3 pt-8 pb-6 w-5/12 bg-white">
                    {/* <h3 className="text-dark text-sm font-semibold truncate">{post.title}</h3> */}
                    <div className="flex items-center pb-2">
                        <img className="w-2 mr-1" src={iconLocation} alt="Location"></img>
                        <span className="text-dark text-xxs truncate">{post.location}</span>
                  </div>
                   <p className="paragraph | text-dark text-xs">
                         {post.description}
                   </p>
                </div>
                
            </div>
                  <div className="absolute right-2 mt-2">
                    <p className="text-xxs text-gray-600">{createdAtDate.toLocaleDateString()}</p>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    );
  }
  