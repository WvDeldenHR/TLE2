import { useState } from "react";
import { db, storage, auth } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

import IconCharity from './../assets/icons/icon_charity_001_FFFFFF_32x32.svg';
import IconConsumption from './../assets/icons/icon_consumption_001_FFFFFF_32x32.svg';
import IconFinancial from './../assets/icons/icon_financial_001_FFFFFF_32x32.svg';
import IconStuff from './../assets/icons/icon_stuff_001_FFFFFF_32x32.svg';

export function CreatePost() {

    const mainCategories = ['Financieel', 'Eten', 'Spullen', 'Acties'];

    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [selectedCategory, setSelectedCategory] = useState('');
    const [location, setLocation] = useState("");
    const [locationError, setLocationError] = useState('');
    const [subCategories, setSubCategories] = useState([]);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');


    // const [user]= useState("")

    const navigate = useNavigate();

    const postsCollectionRef = collection(db, "posts");

    const postcodePattern = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/;

    const handleLocationChange = (event) => {
        const inputValue = event.target.value;
        setLocation(inputValue);

        if (!inputValue.match(postcodePattern)) {
        setLocationError('Please enter a valid Dutch postcode.');
        } else {
        setLocationError('');
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

    const handleSubcategoryToggle = (subcategory) => {
        if (subCategories.includes(subcategory)) {
          setSubCategories(subCategories.filter((sc) => sc !== subcategory));
        } else {
          setSubCategories([...subCategories, subcategory]);
        }
      }          


    const handleFileChange = (e) => {
        e.preventDefault();
        setFiles(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;
        const { displayName, email, photoURL } = user;


        if (!title || title.length < 6) {
            setErrorMessage("Please fill in a title with at least 6 characters.");
            return;
        }

        if (!des || des.length < 10) {
            setErrorMessage("Please fill in a description of the product with at least 10 characters.");
            return;
        }

        if (files.length === 0) {
            setErrorMessage("Please select at least one file.");
            return;
        }

        setErrorMessage("");
        setUploading(true);

        // Upload each file
        const fileURLs = await Promise.all(
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
                                    console.log(downloadURL)
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

        // Get the current user's ID
        const userId = auth.currentUser.uid;

        // Get the current date
        const currentDate = new Date();

        // Convert the current date to a localized date string
        const createdAtString = currentDate.toLocaleDateString();

        // Geocode the location
        const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location
      )}&key=AIzaSyCke_6wBLigt3n6BugUGsG5wIllNQIos4c`;  

      try {
        const response = await fetch(geocodeURL);
        const data = await response.json();
  
        if (data.status === "OK") {
          const { lat, lng } = data.results[0].geometry.location;
  
          // Save the post data to Firebase
          await addDoc(postsCollectionRef, {
            title: title,
            description: des,
            imageURLs: fileURLs,
            userId: userId, // Associate the post with the user
            category: selectedCategory, // Include the selected category
            createdAt: new Date(), // Convert the createdAt string to a Date object
            displayName: displayName, // Save the user's displayName
            email: email, // Save the user's email
            photoURL: photoURL, // Save the user's photoURL
            location: location, // Include the location
            subCategories: subCategories, // Include the subcategories as an array
            phoneNumber: phoneNumber,
            latitude: lat, // Include the latitude
            longitude: lng, // Include the longitude
          });
  
          setUploading(false);
          console.log("Uploaded");
  
          navigate("/overview");
        } else {
          setErrorMessage("Failed to geocode the location.");
        }
      } catch (error) {
        console.log(error);
        setErrorMessage("An error occurred while geocoding the location.");
      }
    };
          

        // // Save the post data to Firebase
        // await addDoc(postsCollectionRef, {
        //     title: title,
        //     description: des,
        //     imageURLs: fileURLs,
        //     userId: userId, // Associate the post with the user
        //     category: selectedCategory, // Include the selected categor
        //     createdAt: new Date(createdAtString), // Convert the createdAt string to a Date object
        //     displayName: displayName, // Save the user's displayName
        //     email: email, // Save the user's email
        //     photoURL: photoURL, // Save the user's photoURL
        //     location: location, // Include the location
        //     subCategory: subCategory, // Include the subcategory
        //     phoneNumber: phoneNumber,
            
        // });

        // setUploading(false);
        // console.log("Uploaded");

        // navigate("/overview")
    

    return (
        <div className="flex flex-col items-center justify-center py-8 mx-auto md:h-screen lg:py-0">
            <h1 className="text-3xl">Citiesa</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                {/* Title field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Titel
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder=""
                        value={title}
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    />
                </div>

                {/* Description field */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Vertel Jouw Probleem
                    </label>
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
        <div className="pt-10 px-10 text-xs">
            
            
            <div className="subcategory-container">

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
                {/* <input type="hidden" value={user.userId} /> */}



            </form>
        </div>
    );
}
