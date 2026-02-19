import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/form.scss'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import '../styles/utility.scss'



const Register = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {handleRegister,loading} = useAuth();
  const navigate = useNavigate()

  
   if(loading){
      return(
        <h1>Loading...</h1>
      )
    }
  const registerUser = async (e) => {
    e.preventDefault();

    const response = await handleRegister(email,username,password)
    console.log(response);
   
    navigate("/")
  
  }


  return (
    <main>
      <div className="form-container">

        <h1>Register</h1>
        <form onSubmit={registerUser}>
          <input onInput={(e) => { setEmail(e.target.value) }} value={email} type="text" name='email' placeholder='Enter Email' />
          <input onInput={(e) => { setUsername(e.target.value) }} value={username} type="text" name='username' placeholder='Enter Username' />
          <input onInput={(e) => { setPassword(e.target.value) }} value={password} type="text" name='password' placeholder='Enter Password' />
          <button>Register</button>
        </form>
        <p>Already have an Account? <Link className='authLinks' to='/login'>Login</Link></p>
      </div>
    </main>
  )
}

export default Register
