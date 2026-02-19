import {BrowserRouter} from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import "./style.scss"


export default function RouteApp(){
   return (
    <>
    <BrowserRouter>
       <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<h1 className='white'>Welcome to app</h1>}/>
          <Route path="/register" element={<Register/>}/>
       </Routes>
    </BrowserRouter>
    </>
   )
}