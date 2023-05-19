import { useState, useEffect } from "react";
import './../css/App.css';
import { db, storage } from "./../firebase-config";
import { collection, addDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function Create() {
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    const [data, setData] = useState({});
    const [file, setFile] = useState("");
    const [per, setPerc] = useState(null);

    const postsCollectionRef = collection(db, "posts");

    useEffect(() => {
        const uploadFile = () => {
          const name = new Date().getTime() + file.name;
    
          console.log(name);  
          const storageRef = ref(storage, file.name);
          const uploadTask = uploadBytesResumable(storageRef, file);
    
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              setPerc(progress);
            },
            (error) => {
              console.log(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setData((prev) => ({ ...prev, img: downloadURL }));
              });
            }
          );
        };
        file && uploadFile();
      }, [file]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(postsCollectionRef, { name: title, description: des });
        console.log("uploaded")
    };



    return (

        <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Username"
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }} />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        onChange={(event) => {
                            setDes(event.target.value);
                        }}
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black" for="user_avatar">Upload file</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    aria-describedby="user_avatar_help" 
                    id="user_avatar" 
                    type="file" 
                    onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline items-center" 
                    type="submit"
                    disabled={per !== null && per < 100}
                    >
                        Publish
                    </button>
                </div>
            </form>
        </div>
    );
}