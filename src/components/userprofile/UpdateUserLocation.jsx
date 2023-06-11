import { useState, useEffect } from "react";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export function UpdateUserLocation() {
  const currentUser = auth.currentUser;
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchUserLocation = async () => {
      if (currentUser) {
        try {
          const locationDocRef = doc(db, "user-locations", currentUser.uid);
          const locationDocSnapshot = await getDoc(locationDocRef);

          if (locationDocSnapshot.exists()) {
            const userLocationData = locationDocSnapshot.data();
            setUserLocation(userLocationData);
          } else {
            setUserLocation(null);
          }
        } catch (error) {
          console.error("Error fetching user location:", error);
        }
      }

      setLoading(false);
    };

    fetchUserLocation();
  }, [currentUser]);

  const postcodePattern = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/;

  const handleLocationChange = (event) => {
    const inputValue = event.target.value.toUpperCase();
    setLocation(inputValue);

    if (!inputValue.match(postcodePattern)) {
      setLocationError("Please enter a valid Dutch postcode.");
    } else {
      setLocationError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (locationError) {
      return;
    }

    try {
      // Geocode the new location to get latitude and longitude
      const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location
      )}&key=AIzaSyCke_6wBLigt3n6BugUGsG5wIllNQIos4c`; // Replace with your Google Maps API key

      const response = await fetch(geocodeURL);
      const data = await response.json();

      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;

        // Update the location document in Firestore with new location, latitude, and longitude
        const locationDocRef = doc(db, "user-locations", currentUser.uid);
        await setDoc(locationDocRef, {
          location: location,
          latitude: lat,
          longitude: lng,
          userId: auth.currentUser.uid,
        });
        console.log("User location updated successfully!");
      } else {
        console.error("Geocoding error:", data.status);
      }
    } catch (error) {
      console.error("Error updating user location:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Location: {userLocation ? userLocation.location : ""}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">Postal Code:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={handleLocationChange}
          required
        />
        {locationError && <p>{locationError}</p>}
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
