// import logo from './logo.svg';
import './css/App.css';

import { Start } from "./Start" 
import { UpdateUser } from "./UpdateUser"
import { Login } from "./Login"
import { Register } from "./Register"
import { Home } from "./Home"

import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Start />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/update-user' element={<UpdateUser />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
