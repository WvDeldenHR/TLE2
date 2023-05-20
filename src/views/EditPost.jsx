import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

export function EditPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, "posts", postId));
        if (postDoc.exists()) {
          const postData = postDoc.data();
          setTitle(postData.title);
          setDes(postData.description);
          setFiles([]);
          setExistingImages(postData.imageURLs);
          setLoading(false);
        } else {
          throw new Error("Post not found");
        }
      } catch (error) {
        console.log(error);
        // Handle error, e.g., display an error message or navigate to an error page
      }
    };

    fetchPost();
  }, [postId]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Update the state with the selected files
    setFiles(selectedFiles);

    // Generate previews for the selected files
    const previewURLs = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewURLs);
  };

  const handleFileDelete = async (fileURL) => {
    try {
      if (existingImages.length === 1) {
        throw new Error("You cannot delete the last file");
      }

      // Delete the file from storage
      const storageRef = ref(storage, fileURL);
      await deleteObject(storageRef);

      // Remove the file URL from the state
      setExistingImages((prevImages) => prevImages.filter((url) => url !== fileURL));

      console.log("File deleted");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message); // Set the error message
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload new files
    const newFileURLs = await Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const storageRef = ref(storage, Date.now() + "_" + file.name);
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // You can track upload progress here if needed
            },
            (error) => {
              console.log(error);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  resolve(downloadURL);
                  console.log(downloadURL);
                })
                .catch((error) => {
                  console.log(error);
                  reject(error);
                });
            }
          );
        });
      })
    );

    // Update the post data in Firebase
    try {
      const updatedFileURLs = [...existingImages, ...newFileURLs];
      await updateDoc(doc(db, "posts", postId), {
        title: title,
        description: des,
        imageURLs: updatedFileURLs,
      });

      console.log("Post updated");
      navigate("/post/list"); // Redirect to the post list after successful update
    } catch (error) {
      console.log(error);
      // Handle error, e.g., display an error message or navigate to an error page
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Edit Post</h1>
      {errorMessage && <p>{errorMessage}</p>} {/* Display the error message if it exists */}
      <form onSubmit={handleSubmit}>
        {/* Title field */}
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        {/* Description field */}
        <div>
          <label>Description</label>
          <input type="text" value={des} onChange={(e) => setDes(e.target.value)} />
        </div>

        {/* File input */}
        <div>
          <label>Files</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>

        {/* File previews */}
        <div>
          <label>Preview Images</label>
          {previewImages.map((previewURL, index) => (
            <div key={index}>
              <img src={previewURL} alt={`Preview ${index + 1}`} style={{ width: "100px", height: "auto" }} />
            </div>
          ))}
        </div>

        {/* Existing files */}
        <div>
          <label>Existing Files</label>
          <ul>
            {existingImages.map((fileURL, index) => (
              <li key={index}>
                <img src={fileURL} alt={`File ${index + 1}`} style={{ width: "100px", height: "auto" }} />
                <button type="button" onClick={() => handleFileDelete(fileURL)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
