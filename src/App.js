//import logo from './logo.svg';
import {ListPosts} from "./views/ListPosts";
import {CreatePost} from "./views/CreatePost";
import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { EditPost } from './views/EditPost';
import { auth } from "./config/firebase";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import './App.css';

import  AuthChecker from "./AuthChecker"
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
import { LoginAgain } from "./components/userprofile/LoginAgain"
import { SearchingPosts } from "./components/search/SearchingPosts"

// Components
// import { Navbar } from "./navs/Navbar.jsx";
// Views
import { Home } from "./views/Home";
import { Discover } from './views/Discover';
import { PostCreate } from './views/PostCreate';
import { Overview } from './views/Overview';
import { PostDetail } from './views/PostDetail';
import FinancialCategory from "./components/category/FinancialCategory";
import StuffCategory from "./components/category/StuffCategory";
import ConsumptionCategory from "./components/category/ConsumptionCategory";
import CharityCategory from "./components/category/CharityCategory";
// import { Settings } from './views/Settings';


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
     
        {/* Sign-up & Register */}
        <Route path='/' element={<Start />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/signup/picture' element={<ProfilePicture />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>

        {/* Home & Discover */}
        <Route path="/home" element={<AuthChecker><Home /></AuthChecker>} />
        <Route path="/discover" element={<AuthChecker><Discover /></AuthChecker>} />

        {/* Profile, Updates, Log Out */}
        <Route path="/profile" element={<AuthChecker><Profile /></AuthChecker>} />
        <Route path="/login-again" element={<AuthChecker><LoginAgain /></AuthChecker>} />
        <Route path="/update-profile" element={<AuthChecker><UpdateUser /></AuthChecker>} />
        <Route path="/update-password" element={<AuthChecker><UpdatePassword /></AuthChecker>} />
        <Route path="/logout" element={<AuthChecker><LogOut /></AuthChecker>} />

        {/* CRUD Post */}
        <Route path="/post/create" element={<AuthChecker><CreatePost /></AuthChecker>} />
        <Route path="/post/list" element={<AuthChecker><ListPosts /></AuthChecker>} />
        <Route path="/post/edit/:postId" element={<AuthChecker><EditPost /></AuthChecker>} />

        <Route path="/overview" element={ <Overview />} />
        <Route path="/post/:postId" element={ <PostDetail />} />

        <Route path="post-create" element={ <PostCreate />} />
        <Route path="/search" element={ <SearchingPosts />} />
      
        <Route path="/financieel" element={<FinancialCategory />} />
        <Route exact path="/spullen" element={<StuffCategory />} />
        <Route exact path="/eten" element={<ConsumptionCategory />} />
        <Route exact path="/acties" element={<CharityCategory />} />   


      </Routes>
      {/* <Navbar /> */}
    </BrowserRouter>
  )
}

export default App;

