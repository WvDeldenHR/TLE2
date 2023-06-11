import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

export function EditPost() {

  const mainCategories = ['Financieel', 'Eten', 'Spullen', 'Acties'];

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
  const [uploading, setUploading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState('');

  const [subCategories, setSubCategories] = useState([]);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, "posts", postId));
        if (postDoc.exists()) {
          const postData = postDoc.data();
          setTitle(postData.title);
          setDes(postData.description);
          setSelectedCategory(postData.category); // Stel de geselecteerde categorie in
          setFiles([]);
          setExistingImages(postData.imageURLs);
          setLatitude(postData.latitude); // Stel de huidige latitude in
          setLongitude(postData.longitude); // Stel de huidige longitude in
          if (postData.subCategories) {
            setSubCategories(postData.subCategories);
          }
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

  const postcodePattern = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/;

  const handleLocationChange = (event) => {
    const inputValue = event.target.value;
    setLocation(inputValue);
  
    if (!inputValue.match(postcodePattern)) {
      setLocationError('Please enter a valid Dutch postcode.');
    } else {
      setLocationError('');
      // Geocode de nieuwe locatie om de latitude en longitude op te halen
      const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(inputValue)}&key=AIzaSyCke_6wBLigt3n6BugUGsG5wIllNQIos4c`;
      
      fetch(geocodeURL)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "OK") {
            const { lat, lng } = data.results[0].geometry.location;
            setLatitude(lat);
            setLongitude(lng);
          } else {
            throw new Error("Geocoding failed");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  

    const phoneNumberPattern = /^(06|\+31)[1-9]\d{8}$/;

    const handlePhoneNumberChange = (event) => {
        const inputValue = event.target.value;
        setPhoneNumber(inputValue);
    
        if (!inputValue.match(phoneNumberPattern)) {
          setPhoneNumberError('Please enter a valid Dutch phone number starting with 06 or +31.');
        } else {
          setPhoneNumberError('');
        }
    };

    // New handleSubcategoryToggle function
    const handleSubcategoryToggle = (subcategory) => {
      if (subCategories.includes(subcategory)) {
        setSubCategories(subCategories.filter((sc) => sc !== subcategory));
      } else {
        setSubCategories([...subCategories, subcategory]);
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

    setUploading(true);

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
        category: selectedCategory,
        location: location, // Include the location
        subCategories: subCategories, // Include the subcategories as an array
        phoneNumber: phoneNumber,
        latitude: latitude, // Bijgewerkte latitude opslaan
        longitude: longitude, // Bijgewerkte longitude opslaan
      });

      // Delete files marked for deletion
      await Promise.all(
        filesToDelete.map(async (fileURL) => {
          const fileRef = ref(storage, fileURL);
          await deleteObject(fileRef);
        })
      );

      console.log("Post updated");
      navigate("/overview"); // Redirect to the post list after successful update
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
    <div className="flex flex-col items-center justify-center py-8 mx-auto md:h-screen lg:py-0">
      <h1 className="text-3xl">Edit Post</h1>
      <form onSubmit={handleSubmit}>
        {/* Title field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        {/* Description field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            rows="8"
            id="name"
            type="text"
            value={des}
            onChange={(event) => {
              setDes(event.target.value);
            }}
          />
        </div>

        {/* File selection */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Upload files</label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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

        {/* Location field */}
        <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Location
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="location"
                    type="text"
                    placeholder="3011WN"
                    value={location}
                    onChange={handleLocationChange}
                />
                 {locationError && <span>{locationError}</span>}
                </div>

                {/* Location field */}
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Telefoon Nummer
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phoneNumber"
                    type="text"
                    placeholder="0624351839"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                />
                 {phoneNumberError && <div className="error">{phoneNumberError}</div>}
                </div>

        {/* Category selection */}
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Choose a main category</label>
        <div className="flex">
          {mainCategories.map((mainCategory) => (
            <button
              key={mainCategory}
              className={`border rounded py-2 px-4 mr-2 ${selectedCategory === mainCategory ? 'bg-blue-500 text-white' : 'bg-white'}`}
              type="button"
              onClick={() => setSelectedCategory(mainCategory)}
            >
              {mainCategory}
            </button>
          ))}
        </div>
      </div>

     {/* Subcategory selection */}
     <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Choose subcategories
                </label>
                <div className="flex flex-wrap">
                    {/* Add your subcategory buttons here */}
                    <div
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes("Onderwijs") && "bg-blue-700"
                    }`}
                    onClick={() => handleSubcategoryToggle("Onderwijs")}
                    >
                    Onderwijs
                    </div>
                    <div
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes("Dierenwelzijn") && "bg-blue-700"
                    }`}
                    onClick={() => handleSubcategoryToggle("Dierenwelzijn")}
                    >
                    Dierenwelzijn
                    </div>
                    <div
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes("Milieu") && "bg-blue-700"
                    }`}
                    onClick={() => handleSubcategoryToggle("Milieu")}
                    >
                    Milieu
                    </div>
                    <div
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes("Kunst & Cultuur") && "bg-blue-700"
                    }`}
                    onClick={() => handleSubcategoryToggle("Kunst & Cultuur")}
                    >
                    Kunst & Cultuur
                    </div>
                    <div
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes("Medisch Hulp") && "bg-blue-700"
                    }`}
                    onClick={() => handleSubcategoryToggle("Medisch Hulp")}
                    >
                    Medisch Hulp
                    </div>
                    <div
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes("Kleding") && "bg-blue-700"
                    }`}
                    onClick={() => handleSubcategoryToggle("Kleding")}
                    >
                    Kleding
                    </div>
                    <div
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes("Elektronica") && "bg-blue-700"
                    }`}
                    onClick={() => handleSubcategoryToggle("Elektronica")}
                    >
                    Elektronica
                    </div>
                    <div
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes("Boeken & Media") && "bg-blue-700"
                    }`}
                    onClick={() => handleSubcategoryToggle("Boeken & Media")}
                    >
                    Boeken & Media
                    </div>
                    <div
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes("Speelgoed & Spellen") && "bg-blue-700"
                    }`}
                    onClick={() => handleSubcategoryToggle("Speelgoed & Spellen")}
                    >
                    Speelgoed & Spellen
                    </div>
                    <div
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes("Voedselrecycling") && "bg-blue-700"
                    }`}
                    onClick={() => handleSubcategoryToggle("Voedselrecycling")}
                    >
                    Voedselrecycling
                    </div>
                    <div
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes("Boodschappen") && "bg-blue-700"
                    }`}
                    onClick={() => handleSubcategoryToggle("Boodschappen")}
                    >
                    Boodschappen
                    </div>
                    <div
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 ${
                        subCategories.includes("Sport") && "bg-blue-700"
                    }`}
                    onClick={() => handleSubcategoryToggle("Sport")}
                    >
                    Sport
                    </div>
                    {/* Add more subcategory buttons */}
                </div>
                </div>

        {/* Error message */}
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}

        {/* Submit button */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline items-center"
            type="submit"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Publish"}
          </button>

        </div>
      </form>
    </div>
  );
}
