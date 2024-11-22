import React, { useState } from 'react'
import '../styles/register.scss'
import {useNavigate} from "react-router-dom"
import { useEffect } from 'react';

const RegisterPage = () => {
    const [formData, setformData] = useState({
        firstName: "",
        lastName: "",
        email:"",
        passWord: "",
        confirmPassword:"", 
        profileImage: null

});

    const handleChange = (e) => {
           const {name, value, files} = e.target
           setformData({...formData, 
            [name]: value,
            [name]: name === "profileImage" ? files[0]: value

           })

    }

    console.log(formData);
    
    const [passwordMatched, setPasswordMAtch] = useState(true) 

    useEffect(() => {
       setPasswordMAtch(formData.passWord === formData.confirmPassword || formData.confirmPassword === "")
    })

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
      e.preventDefault()

     

      try{
         const register_form = new FormData()

         for (var key in formData){
          register_form.append(key, formData[key])
         }

         const response = await fetch ("http://localhost:3005/auth/register",{
          method: "POST",
          body: register_form
      })
      console.log(await response.json());

      if (response.ok){
        navigate("/login")
      }
      }catch(err){
        console.log("Registration Failed!", err.message);
        
      }
    }
    
  return (
    <div className='register'>
      <div className='register_content'>
        <form className='register_content_form' onSubmit={handleSubmit}>
            <input placeholder='First Name' name="firstName"   value={formData.firstName} onChange = {handleChange} required />

            <input placeholder='Last Name' name="lastName"  value={formData.lastName}  onChange={handleChange} required />

            <input placeholder='Email' name="email" type="email" value={formData.email} onChange = {handleChange} required />

            <input placeholder='Password' name="passWord" type="password" value={formData.passWord}  onChange = {handleChange} required />

            <input placeholder='Confirm Password' name="confirmPassword" type="password" value={formData.confirmPassword} onChange = {handleChange} required />

             {!passwordMatched && (
             <p style={{colour: "red"}}>Password not matched!</p>
             )}


            <input id="image" type="file" name="profileImage" accept="image/*" style={{display: "none"}} onChange = {handleChange} required/>
            
            <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile picture" />
            <p>Upload Your Photo</p>
          </label>
          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{ maxWidth: "80px" }}
            />
          )}

            <button type="submit" disable="!passwordMatched">Register</button>
        </form>
        <a href='/login'>Already have an account? Log In Here.</a>
      </div>
    </div>
  )
}

export default RegisterPage
