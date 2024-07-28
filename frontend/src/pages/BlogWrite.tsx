import React, { useState } from 'react'
import '../App.css'
import { FaBookReader } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import axios from 'axios';

function BlogWrite() {
  const [title,setTitle]=useState<string>()
  const [content,setContent]=useState<string>()

  const url="https://my-app.namansoni8874.workers.dev"
  async function publishHandler(){
  const response=await axios.post(url+"/api/v1/blog",{
    title:title,
    content:content
  },
    {
  headers:{
    authorization:localStorage.getItem("token")
  }
  })
  }
  
  return (
    <div className='blog-main-div'>
      <nav className='blog-nav-div'>
        <div className='blog-icon-side'><FaBookReader className='Book-icon' />
          <div className='blog-text-div'>Write your Thoughts</div>
        </div>
        <div className='blog-publish-side'>
          <button onClick={publishHandler}>Publish</button>
          <BsThreeDots />

        </div>
      </nav>
      <div className='blog-input-div'>
        <input className='blog-input1-div' onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{setTitle(event.target.value)}} type='text' placeholder='Title'></input>
        <input className='blog-input2-div' onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{setContent(event.target.value)}} type='text' placeholder='Tell your story....'></input>
      </div>

    </div>
  )
}

export default BlogWrite;
