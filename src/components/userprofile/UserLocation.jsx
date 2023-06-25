import { useState } from "react";
import { db, auth } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../buttons/BackButton";

export function UserLocation() {
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLocationChange = (event) => {
    const inputValue = event.target.value;
    setLocation(inputValue);
  };

  const handleSaveLocation = async (e) => {
    e.preventDefault();

    // Geocode the location
    const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      location
    )}&key=AIzaSyCke_6wBLigt3n6BugUGsG5wIllNQIos4c`;

    try {
      const response = await fetch(geocodeURL);
      const data = await response.json();

      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;

        // Get the current user's ID
        const userId = auth.currentUser.uid;

        // Get the user document reference
        const userRef = doc(db, "user-locations", userId);

         // Create a new user document with latitude and longitude
        await setDoc(userRef, {
          latitude: lat,
          longitude: lng,
          location: location,
          userId: auth.currentUser.uid,
        });

        navigate("/user-pref"); // Redirect to the desired location after saving the location
      } else {
        setErrorMessage("Ongeldige postcode");
      }
    } catch (error) {
      console.log("Geocoding API request error:", error);
    }
  };

  return (
    <div className="flex min-h-full w-full flex-1 flex-col justify-center items-center  lg:px-8 sm:w-full sm:h-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm w-full bg-primary pt-8 pb-14 border border-gray-200">

        <BackButton/>
          {/* <img
              className="mx-auto h-6 w-auto"
              src={logo}
              alt="Logo"
          /> */}
          <h1 className="mt-6 text-center text-xl font-bold leading-9 tracking-tight text-white">Uw Locatie</h1>
          <h2 className="mt-2 text-center text-xs tracking-tight text-white px-16">
          Om u relevante berichten te tonen, vragen we vriendelijk om uw postcode in te voeren. Uw locatie blijft volledig privé en wordt niet gedeeld.<br></br> 
          </h2>

      </div>

      <form
        onSubmit={handleSaveLocation}
        className="mt-10 mb-10 sm:mx-auto sm:w-full sm:max-w-sm"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Uw locatie
          </label>
          <input
            className="mb-10 w-80 block m-auto left-0 right-0 rounded-full bg-gray-100 px-3 py-2 text-black w-44 font-semibold items-center text-center text-xs border justify-center grid place-items-center"
            id="location"
            type="text"
            placeholder="2010AA"
            value={location}
            onChange={handleLocationChange}
          />
        </div>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <div className="flex items-center justify-between">
          <button
             className="block items-center text-xs font-medium mb-20 justify-center rounded-full py-3 px-10 bg-gray-600 text-white mx-auto"                      
            type="submit"
          >
            Volgende
          </button>
        </div>
      </form>
    </div>
  );
}
