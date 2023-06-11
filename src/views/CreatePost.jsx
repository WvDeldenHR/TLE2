import { useState } from "react";
import { db, storage, auth } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

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
            createdAt: new Date(createdAtString), // Convert the createdAt string to a Date object
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
                {/* <input type="hidden" value={user.userId} /> */}



            </form>
        </div>
    );
}
