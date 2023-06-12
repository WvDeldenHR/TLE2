import { useState, useEffect } from 'react'
import { auth } from "../../config/firebase"
import { Navbar } from "../../components/navs/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";


export function Profile() {

    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState("");
    

    // useEffect(() => {
    //   // Fetch the user's display name from Firebase
    //   const user = auth.currentUser;
    //   if (user !== null) {
    //     const { displayName, photoURL } = user;
    //     setDisplayName(displayName || ''); // Set the display name or an empty string
    //     setPhotoURL(photoURL || ""); // Set the photoURL or an empty string
    //     console.log(displayName)
    //   } else {
    //     console.log('Geen user gevonden')
    //   }
    // }, [displayName]);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          const { displayName, photoURL } = user;
          setDisplayName(displayName || '');
          setPhotoURL(photoURL || '');
        } else {
          // User is not logged in, handle the case accordingly
          navigate("/login");
        }
      });
  
      return () => {
        unsubscribe();
      };
    }, []);

    function navTo() {
      navigate("/update-profile")
    }


    return (
    <div>

      <Navbar />

      <div className='flex justify-center pt-3 px-3 bg-primary shadow-inner'>

      <a href="/logout">
      <div className='text-white flex justify-end text-l items-start fixed top-0 right-0 pe-10 pt-8'>
        <p className='text-xs pe-2 font-medium'>Log uit</p>
      <i class="fa-solid fa-arrow-right-from-bracket"></i>
      </div>
      </a>

      <div className='mx-auto mt-16'>
        <h1 className="text-2xl text-white font-semibold">{displayName}</h1>
        <p className='text-gray-200 text-xs'> Account Instellingen </p>
        <button 
        onClick={navTo}
        className='rounded-full py-2 px-4 bg-gray-200 font-medium text-black text-xs my-5'
        >Profiel Bewerken</button>
      </div>

      <div className='mx-auto my-10 mt-16'>
        <img
        src={photoURL}
        alt=""
        className="w-28 h-28 rounded-full object-cover"
        />
      </div>

      </div>

      <a href="/login-again">
      <button className="flex w-80 m-auto mt-10 shadow rounded bg-gray-100 px-5 py-3 text-xs font-semibold leading-6 text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800">
        <div className='text-black me-5'>
        <i class="fa-solid fa-user-lock"></i>
        </div>
        Wachtwoord wijzigen
        <div className='text-black ms-24'>
        <i class="fa-solid fa-chevron-right"></i>
        </div>
      </button>
      </a>

      <a href="/update-location">
      <button className="flex w-80 m-auto mt-5 shadow rounded bg-gray-100 ps-5 py-3 text-xs font-semibold leading-6 text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800">
        <div className='text-black me-5'>
        <i class="fa-regular fa-location-dot"></i>
        </div>
        Mijn Locatie
        <div className='text-black ms-40'>
        <i class="fa-solid fa-chevron-right"></i>
        </div>
      </button>
      </a>

      <a href="/user-pref">
      <button className="flex w-80 m-auto mt-5 shadow rounded bg-gray-100 px-5 py-3 text-xs font-semibold leading-6 text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800">
        <div className='text-black me-5'>
        <i class="fa-solid fa-heart"></i>
        </div>
        Mijn Interesses
        <div className='text-black ms-36'>
        <i class="fa-solid fa-chevron-right"></i>
        </div>
      </button>
      </a>

      <button className="flex w-80 m-auto mt-5 shadow rounded bg-gray-100 px-5 py-3 text-xs font-semibold leading-6 text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800">
        <div className='text-black me-5'>
        <i class="fa-regular fa-calendar"></i>
        </div>
        Mijn afspraken 
        <div className='text-black ms-36'>
        <i class="fa-solid fa-chevron-right"></i>
        </div>
      </button>
    
    </div>
    )

  }
