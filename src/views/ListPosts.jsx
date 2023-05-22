import React, { useState, useEffect } from "react";
import { collection, deleteDoc, onSnapshot, doc, getDocs } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { ref, deleteObject } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export function ListPosts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postData = [];
      snapshot.forEach((doc) => {
        postData.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postData);
    });

    // Clean up the listener when the component unmounts
    return () => data();
  }, []);

  const goBackHandler = () => {
    navigate("/post/create")
  }

  const handleEdit = (postId) => {
    navigate(`/post/edit/${postId}`);
  };

  const handleDelete = async (postId, imageURLs) => {
    try {
      // Delete the post document from Firestore
      await deleteDoc(doc(db, "posts", postId));
  
      // Check if imageURLs exist before attempting to delete files
      if (imageURLs && imageURLs.length > 0) {
        // Delete the associated files from Firebase Storage
        await Promise.all(
          imageURLs.map(async (url) => {
            const storageRef = ref(storage, url);
            await deleteObject(storageRef);
          })
        );
      }
  
      console.log("Post and associated files deleted");
  
      // Fetch the updated list of posts from Firestore after deletion
      const updatedPostsSnapshot = await getDocs(collection(db, "posts"));
      const updatedPosts = updatedPostsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(updatedPosts);
    } catch (error) {
      console.log(error);
      // Handle error, e.g., display an error message or navigate to an error page
    }
  };

  return (
    <div>
      <button className="border-3" onClick={goBackHandler}>Go back to making a post</button>
      <h1>Posts</h1>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id}>
              <td className="border-2">{index + 1}</td>
              <td className="border-2">{post.title}</td>
              <td className="border-2">{post.description}</td>
              <td className="border-2">
                {post.imageURLs.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="Post"
                    style={{ width: "100px", height: "auto" }}
                  />
                ))}
              </td>
              <td className="border-2">
                <button classname="border-2" onClick={() => handleEdit(post.id)}>Edit</button>
              </td>
              <td className="border-2">
                <button classname="border-2" onClick={() => handleDelete(post.id, post.imageURLs)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}