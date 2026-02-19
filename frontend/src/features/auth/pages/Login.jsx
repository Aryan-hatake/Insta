import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/form.scss'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
           
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   
   const {handleLogin,loading} = useAuth()

   const navigate = useNavigate()

    if(loading){
            console.log("loading")
            return (
               <h1 className='white'>Loading...</h1>
            )
          }
   
     const loginUser = async (e) => {
          e.preventDefault();
           
          const response =   await handleLogin(username,password);
          
          navigate("/")
          
      
         
          
      }
  return (
    <main>
        <div className="form-container">

            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <input type="text" onInput={(e)=>{setUsername(e.target.value)}} value={username} name='username' placeholder='Enter Username' />
                <input type="text" onInput={(e)=>{setPassword(e.target.value)}} value={password} name='password' placeholder='Enter Password' />
                <button>Login</button>
            </form>
                <p>Don't have an Account? <Link className='authLinks' to='/register'>Register</Link></p>
        </div>
    </main>
  )
}

export default Login
