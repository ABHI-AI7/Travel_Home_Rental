import React, { useState } from 'react'
import "../styles/Login.scss"
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom" 


const LoginPage = () => {

  const [email, setEmail] = useState("")
  const [passWord, setPassword] = useState("")

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch ("http://localhost:3005/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, passWord })
      })

      /* Get data after fetching */
      const loggedIn = await response.json()

      if (loggedIn) {
        dispatch (
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        navigate("/")
      }

    } catch (err) {
      console.log("Login failed", err.message)
    }
  }
  return (
    <div className='login'>
        <div  className='login_content'>
          <form className='login_content_form' onSubmit={handleSubmit}>

          <input placeholder='Email' name="email" type="email" value={email} onChange = {(e) => setEmail(e.target.value)} required />

          <input placeholder='Password' name="passWord" type="password" value={passWord}  onChange = {(e) => setPassword(e.target.value)} required />
          
          <button type="submit">LOG IN</button>

          </form>
          <a href="/register">Don't have an account? Sign In Here</a>
        </div>
     
    </div>
  )
}

export default LoginPage
