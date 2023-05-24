//import logo from './logo.svg';
import {ListPosts} from "./views/ListPosts";
import {CreatePost} from "./views/CreatePost";
import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { EditPost } from './views/EditPost';
import { auth } from "./config/firebase";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import './App.css';
// import { Auth } from "./components/auth"

import { Start } from "./components/Start" 
import { SignUp } from "./components/SignUp"
import { Login } from "./components/Login"
import { UpdateUser } from "./components/userprofile/UpdateUser"
import { Profile } from "./components/userprofile/Profile"
import { ProfilePicture } from "./components/userprofile/ProfilePicture"
import { UpdatePassword } from "./components/userprofile/UpdatePassword"
import { LogOut } from "./components/userprofile/LogOut"
import { ForgotPassword } from "./components/userprofile/ForgotPassword"


// Components
// import { Navbar } from "./navs/Navbar.jsx";
// Views
import { Home } from "./views/Home.jsx";
import { Discover } from './views/Discover.jsx';
// import { Post } from './views/Post.jsx';
// import { Overview } from './views/Overview.jsx';
// import { Settings } from './views/Settings.jsx';


function App() {

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Gebruiker is ingelogd, voer de gewenste acties uit
        console.log("Gebruiker is ingelogd:", user.uid);
      } else {
        // Gebruiker is uitgelogd, voer de gewenste acties uit
        console.log("Gebruiker is uitgelogd");
        // Je kunt hier bijvoorbeeld de gebruiker doorverwijzen naar de inlogpagina
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <BrowserRouter> 
      <Routes>
     
        <Route path='/' element={<Start />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/signup/picture' element={<ProfilePicture />}></Route>
        <Route path='/login' element={<Login />}></Route>

        <Route path="/discover" element={ <Discover />} />
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/update-profile' element={<UpdateUser />}></Route>
        <Route path='/update-password' element={<UpdatePassword />}></Route>
        <Route path='/logout' element={<LogOut />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>

        <Route path='/post/create' element={<CreatePost/>} ></Route>
        <Route path='/post/list' element={<ListPosts/>}></Route>
        <Route path="/post/edit/:postId" element={<EditPost />} />

  
      </Routes>
      {/* <Navbar /> */}
    </BrowserRouter>
  )
}

export default App;

