import React, { useState } from 'react'
import '../styles/register.scss'

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
    
  return (
    <div className='register'>
      <div className='register_content'>
        <form className='register_content_form'>
            <input placeholder='First Name' name="firstName"  onChange = {handleChange} required />

            <input placeholder='Last Name' name="lastName" required />

            <input placeholder='Email' name="email" type="email" value={formData.email} onChange = {handleChange} required />

            <input placeholder='Password' name="passWord" type="password" value={formData.passWord}  onChange = {handleChange} required />

            <input placeholder='Confirm Password' name="confirmPassword" type="password" value={formData.confirmPassword} onChange = {handleChange} required />

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

            <button type="submit">Register</button>
        </form>
        <a href='/login'>Already have an account? Log In Here.</a>
      </div>
    </div>
  )
}

export default RegisterPage
