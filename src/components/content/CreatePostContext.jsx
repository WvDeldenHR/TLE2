import React, { useState } from 'react';
import { db, storage } from "./../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './../../css/index.css';
//Components
import { CreatePostContextText } from './CreatePostContextText';
import { CreatePostContextPhoto } from './CreatePostContextPhoto';
import { CreatePostContextLink } from './CreatePostContextLink';
import { CreatePostContextOther } from './CreatePostContextOther';


export function CreatePostContext() {
    // const [active, setActive] = useState(switchOptions[0]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [title, setTitle] = useState('');
    const [des, setDes] = useState("");
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const postsCollectionRef = collection(db, "posts");
    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };
    const switchOptions = [
        <CreatePostContextText title={title} setTitle={setTitle} des={des} setDes={setDes}/>,
        <CreatePostContextPhoto handleFileChange={handleFileChange}/>,
        <CreatePostContextLink />,
        <CreatePostContextOther />
    ];

    
    

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    const handleSubmit = async (e) => {
        console.log("titel: " + title)
        console.log("des: " + des)

        const fileURLs = await Promise.all(
            files.map((file) => {
                return new Promise((resolve, reject) => {
                    const storageRef = ref(storage, Date.now() + "_" + file.name);
                    const uploadTask = uploadBytesResumable(storageRef, file);

                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            // You can track upload progress here if needed
                        },
                        (error) => {
                            console.log(error);
                            reject(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref)
                                .then((downloadURL) => {
                                    resolve(downloadURL);
                                    console.log(downloadURL)
                                })
                                .catch((error) => {
                                    console.log(error);
                                    reject(error);
                                });
                        }
                    );
                });
            })
        );
        await addDoc(postsCollectionRef, {
            title: title,
            description: des,
            imageURLs: fileURLs,
        });

        setUploading(false);
        console.log("Uploaded");
    }

    return (
        <div className="px-8">
            <div className="flex justify-center gap-4 border-b-2 border-gray-300 pt-10 pb-6">
                <button
                    className={`rounded-lg w-30 h-8 text-white text-xs font-semibold border-2 border-gray-400 text-gray-400 bg-primary`}
                >
                    Hulp Nodig
                </button>
                <button
                    className={`rounded-lg w-30 h-8 text-white text-xs font-semibold bg-primary border-2 border-gray-400 text-gray-400`}
                >
                    Hulp Aanbieden
                </button>
            </div>

            <div className="flex justify-center gap-4 py-6">
                <div className="flex flex-col items-center">
                    <button
                        className={`rounded-full p-3 drop-shadow ${activeIndex === 0 ? "bg-primary" : "bg-black"
                            }`}
                        onClick={() => handleClick(0)}
                    >
                    </button>
                    <span className="pt-1 text-primary text-xs font-semibold">Text</span>
                </div>

                <div className="flex flex-col items-center">
                    <button
                        className={`rounded-full p-3 drop-shadow ${activeIndex === 1 ? "bg-primary" : "bg-black"
                            }`}
                        onClick={() => handleClick(1)}
                    >
                    </button>
                    <span className="pt-1 text-gray-400 text-xs">Foto's</span>
                </div>
                <div className="flex flex-col items-center">
                    <button
                        className={`rounded-full p-3 drop-shadow ${activeIndex === 2 ? "bg-primary" : "bg-black"
                            }`}
                        onClick={() => handleClick(2)}
                    >
                    </button>
                    <span className="pt-1 text-gray-400 text-xs">Links</span>
                </div>
                <div className="flex flex-col items-center">
                    <button
                        className={`rounded-full p-3 drop-shadow ${activeIndex === 3 ? "bg-primary" : "bg-black"
                            }`}
                        onClick={() => handleClick(3)}
                    >
                    </button>
                    <span className="pt-1 text-gray-400 text-xs">Other</span>
                </div>
            </div>
            

            {switchOptions[activeIndex]}
            <button onClick={handleSubmit}>Submit</button>
        </div>
        
    );
}