// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { getFirestore } from "@firebase/firestore";
import 'firebase/firestore';
import { collection, updateDoc, query, where, getDocs } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCke_6wBLigt3n6BugUGsG5wIllNQIos4c",
  authDomain: "tle2-46736.firebaseapp.com",
  databaseURL: "https://tle2-46736-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tle2-46736",
  storageBucket: "tle2-46736.appspot.com",
  messagingSenderId: "721193953439",
  appId: "1:721193953439:web:679663c2301709b5481aaa",
  measurementId: "G-2Z421E3JXT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app)

export const firestore = getFirestore(app);

//storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png')

  setLoading(true)
  const snapshot = await uploadBytes(fileRef, file)
  const photoURL = await getDownloadURL(fileRef)
  
  updateProfile(currentUser, {photoURL})

  setLoading(false)
  console.log("Uploaded file!")
}


export const updatePostAuthorInfo = async (userId, newDisplayName, newPhotoURL) => {
  try {
    const postsQuery = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(postsQuery);

    querySnapshot.forEach(async (doc) => {
      const postRef = doc.ref;
      await updateDoc(postRef, { displayName: newDisplayName, photoURL: newPhotoURL });
    });

    console.log("Post author info updated successfully");
  } catch (error) {
    console.log("Error updating post author info:", error);
  }
};


