import { useState, useEffect } from "react";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
// Components
import { LoadingScreen } from "../other/LoadingScreen";
import { Navbar } from "../navs/Navbar";
// Images
import iconArrow from './../../assets/icons/icon_arrow_001_212427_32x32.svg';
import iconLocation from './../../assets/icons/icon_location_001_212427_32x32.svg';
import iconEdit from './../../assets/icons/icon_edit_002_212427_32x32.svg';
import iconNavigation from './../../assets/icons/icon_navigation_001_212427_32x32.svg';
import iconCross from './../../assets/icons/icon_cross_001_212427_32x32.svg';
import { BackButton } from "../buttons/BackButton";


export function UpdateUserLocation() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // Edit Location Button
  const [editing, setEditing] = useState(false);

  // Edit Location
  const currentUser = auth.currentUser;
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const locationDocRef = doc(db, "user-locations", user.uid);
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
    });

    return () => {
      unsubscribe(); // Unsubscribe from the onAuthStateChanged listener on component unmount
    };
  }, []);

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
    return <LoadingScreen />;
  }

  if (!currentUser) {
    return <div>Please log in to view this page.</div>;
  }


  return (
    <>
     <div className="flex min-h-full w-full flex-1 flex-col  lg:px-8 sm:w-full sm:h-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm w-full bg-primary pt-8 pb-14 border border-gray-200">

        <BackButton/>
          <h1 className="mt-6 text-center text-xl font-bold leading-9 tracking-tight text-white">Uw Locatie</h1>
          <h2 className="mt-2 text-center text-xs tracking-tight text-white px-16">
              Voeg uw locatie toe. Dit is volledig prive en delen wij met niemand.<br></br> 
          </h2>

        </div>
        
        <div className={`transition-3 -mx-6 px-20 py-4 pt-7 pb-7 ${!isActive ? "bg-transparent opacity-60" : "bg-gray-200"}`}>
          <h2 className="text-base text-xs text-dark font-bold">Opgeslagen Locatie</h2>
          <div className="flex items-center py-1 h-12">
            <img className="w-5" src={iconLocation} alt=""></img>
            {!editing || !isActive ? (
              <span className="mx-4 w-full text-xs text-gray-600 font-medium">
                {userLocation ? userLocation.location : ""}
              </span>
            ) : (
              <form className="mx-4" onSubmit={handleSubmit}>
                <input className="border-b-1 border-black p-1 text-xs text-dark font-medium bg-transparent"
                        id="location"
                        type="text"
                        value={location}
                        onChange={handleLocationChange}
                        required
                        disabled={!isActive} />
              </form>
            )}
            <div className="flex justify-end">
              {!editing || !isActive ? (
                <button onClick={() => setEditing(!editing)} className="rounded-full p-3 bg-white drop-shadow" disabled={!isActive}>
                  <img className="w-8" src={iconEdit} alt=""></img>
                </button>
              ) : (
                <div className="flex pl-2 gap-2">
                <button type="submit" className="rounded-full p-3 bg-white drop-shadow">
                  <img className="w-8" src={iconEdit} alt=""></img>
                </button>
                <button className="rounded-full p-3 bg-white drop-shadow" onClick={() => setEditing(!editing)}>
                  <img className="w-8" src={iconCross} alt=""></img>
                </button>
                </div>
              )}
            </div>
          </div>
          {locationError && <span className="text-xs text-error font-semibold">{locationError}</span>}
        </div>

        <div className={`transition-3 | -mx-6 px-20 py-4 pt-7 pb-7 ${!isActive ? "bg-gray-200" : "bg-transparent"}`}>
          <h2 className={`transition-3 | text-base text-xs text-dark font-bold ${!isActive ? "" : "opacity-60"}`}>Huidige Locatie</h2>
          <div className="flex items-center py-2">
            <div className={`transition-3 | flex ${!isActive ? "" : "opacity-60"}`}>
              <img className="w-5" src={iconNavigation} alt=""></img>
              <span className="px-4 text-xs text-gray-600 font-medium">{userLocation ? userLocation.location : ""}</span>
            </div>
            <div className="flex justify-end w-full">
              <label className="relative inline-block w-12 h-6">
                <input
                  className="switch-input | w-0 h-0 opacity-0"
                  type="checkbox"
                  checked={!isActive}
                  onChange={() => setIsActive(!isActive)}
                />
                <span className="toggle | absolute border-2 border-dark rounded-xl inset-0 bg-white"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
