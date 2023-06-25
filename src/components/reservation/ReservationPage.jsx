import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { BackButton } from "../buttons/BackButton";
import { PopupModal } from "./PopupModal";


const ReservationPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "posts", postId), (postDoc) => {
      if (postDoc.exists()) {
        setPost(postDoc.data());
      } else {
        console.log("Post not found");
      }
    });

    return () => unsubscribe();
  }, [postId]);

//   console.log('Post ID:', postId);

const handleReservationSubmit = async (event) => {
    event.preventDefault();

     // Get the current user
    const currentUser = auth.currentUser;

    if (!currentUser) {
        // User is not logged in
        console.log("User is not logged in");
        return;
    }
    
    // Create a new reservation object
    const reservation = {
      postId: postId, // Assuming postId is the ID of the post being reserved
      place: place,
      time: time,
      date: date,
      additionalInfo: additionalInfo,
      user: currentUser.uid,  // Current user's ID
      postUser: post.userId,  // User ID of the post creator
      postTitle: post.title,
      postLocation: post.location,
    };
  
    try {
      // Save the reservation to the 'reservations' collection
      const docRef = await addDoc(collection(db, "reservations"), reservation);
      console.log("Reservation added with ID: ", docRef.id);
  
      // Reset the form fields
      setPlace("");
      setTime("");
      setDate("");
      setAdditionalInfo("");
    } catch (error) {
      console.error("Error adding reservation: ", error);
    }

    setShowPopup(true);
  };

  const handlePopupClose = () => {
    navigate('/mijn-afspraken')
  };
  

  return (
    <div className="bg-primary w-full min-h-screen flex flex-col items-center justify-center">

        <BackButton />

        <div className="text-center">
            <h1 className="text-xl font-bold mb-4 text-white">Afspraak Maken</h1>
            
            {/* Post details */}
            <h2 className="text-sm font-medium mb-2 text-white px-10">Dankjewel dat je wilt helpen! <br></br>Om een afspraak te maken, voer de onderstaande gegevens in.</h2>
            {/* ... Render other post details ... */}
        </div>

        <div className="bg-white m-8 border rounded-xl p-10">
        
                {/* Reservation form */}
                <form onSubmit={handleReservationSubmit}>
                
                
                {/* Place input */}
                <label className="text-xs font-medium mb-5">
                <i class="fa-solid fa-location-pin"></i>  {'\u00A0'}  Plaats</label>
                <select
                value={place}
                onChange={(event) => setPlace(event.target.value)}
                required
                className="w-full px-4 py-2 mb-4  mt-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 text-xs"
                >
                <option value="">Selecteer een plaats</option>
                <option value="Buurthuis DOCK Schiebroek">Buurthuis DOCK Schiebroek</option>
                <option value="Buurthuis Huiskamer vd Wijk Wilgenstaete">Buurthuis Huiskamer vd Wijk Wilgenstaete</option>
                <option value="Option 3">Option 3</option>
                </select>

                 {/* Date input */}
                <label className="text-xs font-medium mb-5"><i class="fa-solid fa-calendar-days"></i> {'\u00A0'}  Datum</label>
                <input
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    placeholder="Date"
                    required
                    className="w-full px-4 py-2 mb-4 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 text-xs"
                />

                {/* Time input */}
                <label className="text-xs font-medium mb-5"><i class="fa-regular fa-clock"></i> {'\u00A0'} Tijd</label>
                <input
                    type="time"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    placeholder=""
                    required
                    className="w-full px-4 py-2 mb-4 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 text-xs"
                />
            
                {/* Additional Info input */}
                <label className="text-xs font-medium mb-5"><i class="fa-regular fa-note-sticky"></i> {'\u00A0'} Opmerkingen</label>
                <textarea
                    value={additionalInfo}
                    onChange={(event) => setAdditionalInfo(event.target.value)}
                    placeholder=""
                    className="w-full px-4 py-2 mb-4 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 text-xs"
                ></textarea>
            
                {/* Submit button */}
                <div className="flex justify-center">
                <button
                    type="submit"
                    className="flex w-60 mb-0 mt-5 justify-center m-auto rounded-full bg-gray-700 py-3 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"                                     
                >
                    Maak een afspraak
                </button>
                </div>
                </form>
    </div>

    {/* Popup modal */}
    <PopupModal isOpen={showPopup} onClose={handlePopupClose} />
  </div>
  
  );
};

export default ReservationPage;
