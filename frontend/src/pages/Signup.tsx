import React, {  useState } from 'react'
import '../App.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {
const [username,setUsername]=useState<string|undefined>(String)
const [email,setEmail]=useState<string>()
const [password,setPassword]=useState<string>()
const url:string="https://my-app.namansoni8874.workers.dev"

const navigate=useNavigate();
 
async function requestHandler(){
 try{const response =await axios.post(url+"/api/v1/signup",{
  name:username,
  email:email,
  password:password
 }) 
 const jwt=await response.data.jwt
 localStorage.setItem("token",jwt)
 navigate('/blog')
}catch(e){}
}

  return (
    <div className='signup-main-div'>
        <div className='signup-div'>
         <h1>Create Account</h1>
         <label >Username</label>
         <input onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{setUsername(event.target.value)}} type='text' placeholder='Enter Your Name'></input>
         <label >Email</label>
         <input onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{setEmail(event.target.value)}} type='text' placeholder='abcd@gmail.com'></input>
         <label >Passwword</label>
         <input onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{setPassword(event.target.value)}} type='password' placeholder='Password'></input>
         <button onClick={requestHandler}>Sign Up</button>
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

export default Signup
