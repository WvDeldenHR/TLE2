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
  const [filesToDelete, setFilesToDelete] = useState([]); // New state for tracking files to delete

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

  const handleFileDelete = (fileURL) => {
    try {
      if (existingImages.length === 1) {
        throw new Error("You cannot delete the last file");
      }

      // Remove the file URL from the existingImages state
      setExistingImages((prevImages) => prevImages.filter((url) => url !== fileURL));

      // Add the file URL to the filesToDelete state
      setFilesToDelete((prevFiles) => [...prevFiles, fileURL]);


      console.log("File marked for deletion");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message); // Set the error message
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //some error catching
    if (!title || title.length < 6) {
      setErrorMessage("Please fill in a title with at least 6 characters.");
      return;
    }

    if (!des || des.length < 10) {
      setErrorMessage("Please fill in a description of the product with at least 10 characters.");
      return;
    }

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

      // Delete files marked for deletion
    await Promise.all(
      filesToDelete.map(async (fileURL) => {
        const fileRef = ref(storage, fileURL);
        await deleteObject(fileRef);
      })
    );

      console.log("Post updated");
      navigate("/post/list"); // Redirect to the post list after successful update
    } catch (error) {
      console.log(error);
      // Handle error, e.g., display an error message or navigate to an error page
    }
  };

  const handlePreviewDelete = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  // ...

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
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            multiple
            onChange={handleFileChange}
          />
        </div>

        {/* File previews */}
        <div>
          <label>Preview Images</label>
          <table className="border-2">
            <tbody className="border-2">
              <tr className="border-2">
                {previewImages.map((previewURL, index) => (
                  <td className="border-2" key={index}>
                    <img
                      src={previewURL}
                      alt={`Preview ${index + 1}`}
                      style={{ width: "100px", height: "auto" }}
                    />
                    <button type="button" onClick={() => handlePreviewDelete(index)}>
                      Delete
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Existing files */}
        <div>
          <label>Existing Files</label>
          <table className="border-2">
            <tbody className="border-2">
              {existingImages.map((fileURL, index) => (
                <tr key={index}>
                  <td className="border-2">
                    <img
                      src={fileURL}
                      alt={`File ${index + 1}`}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </td>
                  <td className="border-2">
                    <button type="button" onClick={() => handleFileDelete(fileURL)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Error message */}
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
