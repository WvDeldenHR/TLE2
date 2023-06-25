import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../../config/firebase';
import { ProfileButton } from '../buttons/ProfileButton';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [userId, setUserId] = useState(null);
   
   useEffect(() => {
    const fetchReservations = async () => {
      // Fetch the reservations for the current user
      const reservationsQuery = query(
        collection(db, 'reservations'),
        where('user', '==', userId)
      );

      try {
        const querySnapshot = await getDocs(reservationsQuery);
        const reservationData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReservations(reservationData);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    if (userId) {
      fetchReservations();
    }
  }, [userId]);

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set the user ID when the user is authenticated
      } else {
        setUserId(null); // Reset the user ID when the user is logged out
      }
    });

    return () => unsubscribe(); // Clean up the subscription when the component unmounts
  }, []);

  const handleDelete = async (reservationId) => {
    try {
      // Delete the reservation document from Firestore
      await deleteDoc(doc(db, 'reservations', reservationId));

      // Fetch the updated reservations list from Firestore after deletion
      const updatedReservationsQuery = query(
        collection(db, 'reservations'),
        where('user', '==', userId)
      );
      const updatedReservationsSnapshot = await getDocs(updatedReservationsQuery);
      const updatedReservations = updatedReservationsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReservations(updatedReservations);

      console.log('Reservation deleted successfully');
    } catch (error) {
      console.log(error);
      // Handle the error, such as displaying an error message or navigating to an error page
    }
  };

  const confirmDeleteReservation = () => {
    if (selectedReservation) {
      handleDelete(selectedReservation.id);
      setSelectedReservation(null);
      setShowConfirmation(false);
    }
  };

  const cancelDeleteReservation = () => {
    setSelectedReservation(null);
    setShowConfirmation(false);
  };

  return (
    <div className="flex min-h-full w-full flex-1 flex-col justify-center items-center  lg:px-8 sm:w-full sm:h-full ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm w-full bg-primary pt-8 pb-14 border border-gray-200">
        <ProfileButton />

        <h1 className="mt-6 text-center text-xl font-bold leading-9 tracking-tight text-white">
          Mijn Afspraken
        </h1>
        <h2 className="mt-2 text-center text-xs tracking-tight text-white">
          Bekijk de overzicht van uw afspraken. 
          <br />
        </h2>
      </div>

      {showConfirmation && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="fixed inset-0 bg-black opacity-70"></div>
    <div className="bg-white rounded-lg p-8 relative">
      <h2 className="text-xs font-semibold mb-4">
        Weet u zeker dat u deze afspraak wilt verwijderen?
      </h2>
      <div className="flex justify-center"> {/* Updated: justify-center */}
        <button
          onClick={cancelDeleteReservation}
          className="bg-gray-300 text-xs hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md mr-2"
        >
          Annuleren
        </button>
        <button
          onClick={confirmDeleteReservation}
          className="bg-red-500 text-xs hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Verwijderen
        </button>
      </div>
    </div>
  </div>
)}

{reservations.length === 0 ? (
  <p className='text-xs text-center w-80 mt-10'>U heeft nog geen afspraken. <br></br> Om een afspraak te maken kunt u op de 'help' knop klikken van berichten waarbij u wilt helpen.</p>
) : (
  reservations.map((reservation) => (
        <div
          key={reservation.id}
          className="bg-white mx-10 mt-5 rounded-md shadow-md relative"
        >
          <button
           onClick={() => {
            setSelectedReservation(reservation);
            setShowConfirmation(true);
          }}
            className="absolute top-5 right-5 bg-transparent border-none"
          >
            <i className="fa-solid fa-trash text-red-700 hover:text-red-500"></i>
          </button>

          <h2 className="text-sm font-semibold mb-2 bg-gray-300 text-black p-4 rounded-t-md">
            {reservation.postTitle}
          </h2>

          <div className="py-3 px-5 text-xs">
            <div className="flex pb-1">
              <p className="font-semibold pr-1">Plaats:</p>
              <p>{reservation.place}</p>
            </div>
            <div className="flex pb-1">
              <p className="font-semibold pr-1">Datum:</p>
              <p>{reservation.date}</p>
            </div>
            <div className="flex pb-1">
              <p className="font-semibold pr-1">Tijd:</p>
              <p>{reservation.time}</p>
            </div>
            <div className="flex pb-3">
              <p className="font-semibold pr-1">Opmerkingen:</p>
              <p>{reservation.additionalInfo}</p>
            </div>
          </div>
        </div>
      ))
      )}
    </div>
  );
};

export default MyReservations;

