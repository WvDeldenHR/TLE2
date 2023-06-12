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
      // ... your code ...
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
      <Navbar />
      <div className="px-6 bg-white">
        <div className="flex items-center mt-3 mb-6 py-4">
          <div>
            <button  onClick={handleGoBack} className="rounded-full p-3 bg-gray-200 drop-shadow">
              <img className="w-5" src={iconArrow} alt=""></img>
            </button>
          </div>
          <div className="flex justify-center -ml-8 w-full">
            <h1 className="text-lg text-dark font-bold">Mijn Locatie</h1>
          </div>
        </div>
        
        <div className={`transition-3 -mx-6 px-6 py-4 ${!isActive ? "bg-transparent opacity-60" : "bg-gray-200"}`}>
          <h2 className="text-base text-dark font-bold">Opgeslagen Locatie</h2>
          <div className="flex items-center py-1 h-12">
            <img className="w-5" src={iconLocation} alt=""></img>
            {!editing || !isActive ? (
              <span className="mx-4 w-full text-sm text-gray-600 font-medium">
                {userLocation ? userLocation.location : ""}
              </span>
            ) : (
              <form className="mx-4" onSubmit={handleSubmit}>
                <input className="border-b-1 border-black p-1 text-sm text-dark font-medium bg-transparent"
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

        <div className={`transition-3 | -mx-6 px-6 py-4 ${!isActive ? "bg-gray-200" : "bg-transparent"}`}>
          <h2 className={`transition-3 | text-base text-dark font-bold ${!isActive ? "" : "opacity-60"}`}>Huidige Locatie</h2>
          <div className="flex items-center py-2">
            <div className={`transition-3 | flex ${!isActive ? "" : "opacity-60"}`}>
              <img className="w-5" src={iconNavigation} alt=""></img>
              <span className="px-4 text-sm text-gray-600 font-medium">{userLocation ? userLocation.location : ""}</span>
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


   
      <div>
        {userLocation ? (
          <div>
            <p>Location: {userLocation.location}</p>
            <p>Latitude: {userLocation.latitude}</p>
            <p>Longitude: {userLocation.longitude}</p>
          </div>
        ) : (
          <p>No location found.</p>
        )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="location">Postal Code:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={handleLocationChange}
          required
          disabled={!isActive}
        />
        {locationError && <p>{locationError}</p>}
        <button type="submit" disabled={!isActive}>Update</button>
      </form>
    </div>
    </>
  );
}
