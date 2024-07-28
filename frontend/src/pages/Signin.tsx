import React, { useState } from 'react'
import '../App.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Signin() {
  const [email,setEmail]=useState<string>()
  const [password,setPassword]=useState<string>()
  const url:string="https://my-app.namansoni8874.workers.dev"
  const navigate=useNavigate();
  async function onClickHandle(){
    const response=await axios.post(url+"/api/v1/signin",{
    email:email,
    password:password
    })
    const jwt=await response.data.jwt
    localStorage.setItem("token",jwt)
    navigate('/blogs')
  }
  return (

    <div className='signup-main-div'>
      <div className='signup-div'>
        <h1>Login Account</h1>
        <label >Email</label>
        <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value) }} type='text' placeholder='abcd@gmail.com'></input>
        <label >Passwword</label>
        <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value) }} type='password' placeholder='Password'></input>
        <button onClick={onClickHandle}>Login</button>
      </div>
      <div className='signup-text-div'>
        <h1> "The customer service I recieved was exceptional.The support team went above and beyond to address my concerns"</h1>
        <div className='about-ceo-div'>
          Julles winfield
        </div>
      </div>

    </div>

  )
}

export default Signin
