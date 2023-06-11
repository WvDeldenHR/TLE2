import { useState } from "react";
import { db, auth } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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
        const userRef = doc(db, "users", userId);

        // Update the user document with latitude and longitude
        await updateDoc(userRef, {
          latitude: lat,
          longitude: lng,
          userId: auth.currentUser.uid,
        });

        navigate("/"); // Redirect to the desired location after saving the location
      } else {
        setErrorMessage("Invalid postal code. Please enter a valid postal code.");
      }
    } catch (error) {
      console.log("Geocoding API request error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 mx-auto md:h-screen lg:py-0">
      <h1 className="text-3xl">User Location</h1>
      <form
        onSubmit={handleSaveLocation}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Postal Code
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="postalCode"
            type="text"
            placeholder="Enter your postal code"
            value={location}
            onChange={handleLocationChange}
          />
        </div>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save Location
          </button>
        </div>
      </form>
    </div>
  );
}
