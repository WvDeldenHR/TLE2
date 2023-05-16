import './App.css';
// import { Auth } from "./components/auth"

import { Start } from "./components/Start" 
import { SignUp } from "./components/SignUp"
import { Login } from "./components/Login"
import { Home } from "./components/Home"

import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Start />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route>
        {/* <Route path='/update-user' element={<UpdateUser />}></Route> */}
        <Route path='/home' element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

