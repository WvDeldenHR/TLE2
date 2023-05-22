import './App.css';
// import { Auth } from "./components/auth"

import { Start } from "./components/Start" 
import { SignUp } from "./components/SignUp"
import { Login } from "./components/Login"
import { HomeTest } from "./components/Home"
import { UpdateUser } from "./components/userprofile/UpdateUser"
import { Profile } from "./components/userprofile/Profile"
import { ProfilePicture } from "./components/userprofile/ProfilePicture"
import { UpdatePassword } from "./components/userprofile/UpdatePassword"
import { LogOut } from "./components/userprofile/LogOut"
import { ForgotPassword } from "./components/userprofile/ForgotPassword"


import { BrowserRouter, Routes, Route} from "react-router-dom";


// Components
// import { Navbar } from "./navs/Navbar.jsx";
// Views
import { Home } from "./views/Home.jsx";
import { Discover } from './views/Discover.jsx';
// import { Post } from './views/Post.jsx';
// import { Overview } from './views/Overview.jsx';
// import { Settings } from './views/Settings.jsx';


function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Start />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/signup/picture' element={<ProfilePicture />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path="discover" element={ <Discover />} />
        <Route path='/hometest' element={<HomeTest />}></Route>
        <Route path='/home/settings' element={<Profile />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/home/settings/update' element={<UpdateUser />}></Route>
        <Route path='/home/settings/update/password' element={<UpdatePassword />}></Route>
        <Route path='/logout' element={<LogOut />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
      </Routes>
      {/* <Navbar /> */}
    </BrowserRouter>
  )
}

export default App;

