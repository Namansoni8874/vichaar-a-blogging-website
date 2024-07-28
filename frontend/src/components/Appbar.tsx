import { useNavigate } from 'react-router-dom'
import '../App.css'
import React from 'react'

function Appbar() {
    const navigate=useNavigate()
    function homeclickHandle(){
        navigate('/blogs')
    }
    function writeBlogHandle(){
        navigate('/blog')
    }
  return (
    <div className='appbar-main-div'>
        <div className='appbar-vichaar-div'>
          <div className='appbar-vi-div'>
          वि
          </div>
          <div className='appbar-chaar-div'>
          chaar
          </div>
        </div>
        <div className='appbar-center-div'>
            <button onClick={homeclickHandle} className='appbar-center-home'>Home</button>
            <button onClick={writeBlogHandle} className='appbar-center-writeblog'>Write you thoughts</button>
        </div>
        <div className='appbar-user-div'>
            <div onClick={()=>{navigate('/signin')}} className='appbar-signin-div'>Signin</div>
            <div onClick={()=>{navigate('/signup')}} className='appbar-signup-div'>signup</div>

        </div>
    </div>
  )
}

export default Appbar
