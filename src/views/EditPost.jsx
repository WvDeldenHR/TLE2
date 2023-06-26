import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { BackButton } from "../components/buttons/BackButton";

import IconCharity from './../assets/icons/icon_charity_001_FFFFFF_32x32.svg';
import IconConsumption from './../assets/icons/icon_consumption_001_FFFFFF_32x32.svg';
import IconFinancial from './../assets/icons/icon_financial_001_FFFFFF_32x32.svg';
import IconStuff from './../assets/icons/icon_stuff_001_FFFFFF_32x32.svg';

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
          setLocation(postData.location);
          setPhoneNumber(postData.phoneNumber);
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
    <div className="flex min-h-full w-full flex-1 flex-col justify-center items-center  lg:px-8 sm:w-full sm:h-full ">

    <BackButton/>

    <div className="sm:mx-auto sm:w-full sm:max-w-sm w-full bg-primary pt-16 pb-12 border border-gray-200 text-center">
      <h1 className="text-xl text-white font-semibold pb-1">Bericht bijwerken</h1>
      <p className="text-center text-xs text-white px-10">Bewerk de informatie van de velden waar nodig is.</p>
    </div>

      <form onSubmit={handleSubmit}
      className="bg-white px-8 pt-6 pb-8 mb-4">

        {/* Title field */}
        <div className="mb-4 px-4">
          <label className="text-base text-dark font-bold text-sm">Titel</label>
          <input  className="my-2 rounded px-3 py-2 w-full bg-gray-200" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        {/* Description field */}
        <div className="mb-4 px-4">
          <label className="text-base text-dark font-bold text-sm">Jouw Verhaal</label>
          <textarea
           className="resize-none my-2 rounded px-3 py-2 w-full h-32 bg-gray-200"
            rows="10"
            id="name"
            type="text"
            value={des}
            onChange={(event) => {
              setDes(event.target.value);
            }}
          />
        </div>

        {/* File selection */}
        <div className="mb-6 px-4">
          <label className="text-base text-dark font-bold text-sm">Foto's toevoegen</label>
          <input
           className="block w-full text-sm p-3 my-2 text-gray-900 border border-gray-200 rounded-lg cursor-pointer bg-gray-200"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            multiple
            onChange={handleFileChange}
          />

        </div>

        {/* File previews */}
        <div className="px-4 mb-3">
        {/* <label className="text-base text-dark font-medium text-sm">Voorbeeld van de gekozen foto's</label> */}
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
                    <button type="button" onClick={() => handlePreviewDelete(index)} className="text-xxs text-center">
                      Verwijder
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Existing files */}
        <div className="px-4 mb-6">
        <label className="text-base text-dark font-medium text-sm">Foto's die al zijn geupload</label>
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
                  <td className="border-2 text-xxs">
                    <button type="button" onClick={() => handleFileDelete(fileURL)}>
                     Verwijder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Category selection */}
        <div className="mb-4 px-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Hoofdcategorie</label>
        <div className="grid grid-cols-2 gap-3 my-4 px-6">
          {mainCategories.map((mainCategory) => (
            <button
              key={mainCategory}
              className={`border-2 rounded-lg py-2 w-32 text-xs ${selectedCategory === mainCategory ? 'border-primary text-white font-semibold bg-primary drop-shadow' : 'border-gray-400 text-gray-400 font-medium bg-white'}`}
              type="button"
              onClick={() => setSelectedCategory(mainCategory)}
            >
              {mainCategory}
            </button>
          ))}
        </div>
      </div>

            {/* Subcategory selection */}
              
            <div className="pt-5 px-4">
            
            <label className="block text-gray-700 text-sm font-bold mb-4">Subcategorieën</label>
                
                <div className="subcategory-container text-xs">
    
                    <div className="subcategory-group">
    
                    <div className="flex items-center">
    
    
                                <div className="mr-2 rounded p-2 bg-primary">
                                    <img className="w-3" src={ IconFinancial } alt="Financieel"></img>
                                </div>
                                <div>
                                 
                                    <h3 className="text-dark text-sm font-semibold">Financieel</h3>
                                 
                                </div>
                    </div>
    
                        <div className='subcategory-grid flex flex-wrap mt-3 mb-5 text-xs'>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes('Onderwijs') && 'bg-primary text-white '
                        }`}
                        onClick={() => handleSubcategoryToggle('Onderwijs')}
                        >
                        Onderwijs
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes('Milieu') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Milieu')}
                        >
                        Milieu
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes("Dierenwelzijn") && "bg-primary text-white"
                        }`}
                        onClick={() => handleSubcategoryToggle("Dierenwelzijn")}
                        >
                        Dierenwelzijn
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes("Medisch Hulp") && "bg-primary text-white"
                        }`}
                        onClick={() => handleSubcategoryToggle("Medisch Hulp")}
                        >
                        Medisch Hulp
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes('Ondersteuning') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Ondersteuning')}
                        >
                        Ondersteuning
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes('Moeilijke situaties') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Moeilijke situaties')}
                        >
                        Moeilijke situaties
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes('Zware dagen') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Zware dagen')}
                        >
                        Zware dagen
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes("Huisvesting") && "bg-primary text-white"
                        }`}
                        onClick={() => handleSubcategoryToggle("Huisvesting")}
                        >
                        Huisvesting
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes("Ouderen") && "bg-primary text-white"
                        }`}
                        onClick={() => handleSubcategoryToggle("Ouderen")}
                        >
                        Ouderen
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes("Jongeren") && "bg-primary text-white"
                        }`}
                        onClick={() => handleSubcategoryToggle("Jongeren")}
                        >
                        Jongeren
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes("Kinderen") && "bg-primary text-white"
                        }`}
                        onClick={() => handleSubcategoryToggle("Kinderen")}
                        >
                        Kinderen
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes("Studenten") && "bg-primary text-white"
                        }`}
                        onClick={() => handleSubcategoryToggle("Studenten")}
                        >
                        Studenten
                        </div>
    
                        </div>
                       
                    </div>
    
                    <div className="subcategory-grid">
                    
                    <div className="flex items-center mt-10">
    
    
                                <div className="mr-2 rounded p-2 bg-primary">
                                    <img className="w-3" src={ IconStuff} alt="Stuff"></img>
                                </div>
                                <div>
                                    
                                    <h3 className="text-dark text-sm font-semibold">Spullen</h3>
                                 
                                </div>
                    </div>
    
                        <div className='subcategory-grid flex flex-wrap mt-3 mb-5 text-xs'>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes('Kleding') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Kleding')}
                        >
                        Kleding
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes('Elektronica') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Elektronica')}
                        >
                        Elektronica
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes('Boeken & Media') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Boeken & Media')}
                        >
                        Boeken & Media
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes('Meubels & Huishoudelijke artikelen') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Meubels & Huishoudelijke artikelen')}
                        >
                        Meubels & Huishoudelijke artikelen
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes('Kunst & Ambachten') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Kunst & Ambachten')}
                        >
                        Kunst & Ambachten
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes('Speelgoed & Spellen') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Speelgoed & Spellen')}
                        >
                        Speelgoed & Spellen
                        </div>
    
                        </div>
                       
                    </div>
                    
                    <div className="subcategory-group">
                    
                    <div className="flex items-center mt-10">
    
    
                            <div className="mr-2 rounded p-2 bg-primary">
                                <img className="w-3" src={ IconConsumption } alt="Eten"></img>
                            </div>
                            <div>
                            
                                <h3 className="text-dark text-sm font-semibold">Eten</h3>
                            
                            </div>
                            </div>
    
                        <div className='subcategory-grid flex flex-wrap mt-3 mb-5 text-xs'>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes('Voedselreclycing') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Voedselreclycing')}
                        >
                        Voedselreclycing
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes('Voedselbanken') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Voedselbanken')}
                        >
                        Voedselbanken
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes('Voedselpakketten') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Voedselpakketten')}
                        >
                        Voedselpakketten
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes('Ongeopende etenswaren') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Ongeopende etenswaren')}
                        >
                        Ongeopende etenswaren
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes('Boodschappen') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Boodschappen')}
                        >
                        Boodschappen
                        </div>
    
                        </div>
                        
                    </div>
    
                    <div className="subcategory-group">
                        
                    <div className="flex items-center mt-10">
    
    
                        <div className="mr-2 rounded p-2 bg-primary">
                            <img className="w-3" src={ IconCharity } alt="Acties"></img>
                        </div>
                        <div>
                        
                            <h3 className="text-dark text-sm font-semibold">Acties</h3>
                        
                        </div>
                    </div>
    
                        <div className='subcategory-grid flex flex-wrap mt-3 mb-5 text-xs'>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes('Buurthuis-activiteiten') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Buurthuis-activiteiten')}
                        >
                        Buurthuis-activiteiten
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2  ${
                            subCategories.includes('Vrijwilligerswerk') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Vrijwilligerswerk')}
                        >
                        Vrijwilligerswerk
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2  ${
                            subCategories.includes('Buurtmarkten') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Buurtmarkten')}
                        >
                        Buurtmarkten
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2 ${
                            subCategories.includes('Buurt-collectieven') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Buurt-collectieven')}
                        >
                        Buurt-collectieven
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2  ${
                            subCategories.includes('Milieu') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Milieu')}
                        >
                        Milieu
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2  ${
                            subCategories.includes('Evenementen') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Evenementen')}
                        >
                        Evenementen
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2  ${
                            subCategories.includes('Sport') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Sport')}
                        >
                        Sport
                        </div>
    
                        <div
                        className={`bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded mr-2 mb-2  ${
                            subCategories.includes('Wijkhuis') && 'bg-primary text-white'
                        }`}
                        onClick={() => handleSubcategoryToggle('Wijkhuis')}
                        >
                        Wijkhuis
                        </div>
    
                        </div>
                       
                    </div>
    
                </div>
                </div>

                 {/* Location field */}
                <div className="mb-4 px-4">
                <label className="text-base text-dark font-bold text-sm">
                    Postcode
                </label>
                <input
                    className="my-2 rounded px-3 py-2 w-full bg-gray-200"
                    id="location"
                    type="text"
                    value={location}
                    onChange={(event) => {
                      handleLocationChange(event); // Call the handleLocationChange function
                      setLocation(event.target.value); // Update the location state
                    }}
                    
                />
                 {locationError && <span>{locationError}</span>}
                </div>

                {/* Telefoon field */}
                <div className="mb-4 px-4">
                <label className="text-base text-dark font-bold text-sm">
                    Telefoon
                </label>
                <input
                    className="my-2 rounded px-3 py-2 w-full bg-gray-200"
                    id="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={(event) => {
                      handlePhoneNumberChange(event); // Call the handlePhoneNumberChange function
                      setPhoneNumber(event.target.value); // Update the phoneNumber state
                    }}
                />
                 {phoneNumberError && <div className="error">{phoneNumberError}</div>}
                </div>

        {/* Error message */}
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}

        {/* Submit button */}
        <div className="flex items-center justify-center mt-10 mb-10">
          <button
              className="flex items-center justify-center rounded-xl px-6 py-2 w-52 text-sm text-white font-semibold bg-primary drop-shadow"
            type="submit"
            disabled={uploading}
          >
              {uploading ? "Aan het plaatsen..." : "Bewerk je bericht"}
          </button>

        </div>
      </form>
    </div>
  );
}
