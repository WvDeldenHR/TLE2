import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";

export function ListPosts() {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
        const postData = [];
        snapshot.forEach((doc) => {
          postData.push({ id: doc.id, ...doc.data() });
        });
        setPosts(postData);
      });
  
      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    }, []);
  
    return (
      <div>
        <h1>Posts</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }