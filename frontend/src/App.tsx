import React from 'react'
import './App.css'
import Signup from './pages/Signup'
import BlogWrite from './pages/BlogWrite'
import Signin from './pages/Signin'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Blogs from './pages/Blogs'
import Appbar from './components/Appbar'


function App() {
  return (
    <>
   
     <BrowserRouter>
     <Appbar/>
     
     <Routes>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/signin' element={<Signin/>} ></Route>
      <Route path='/blog' element={<BlogWrite/>} ></Route>
      <Route path='/blogs' element={<Blogs/>} ></Route>
     </Routes>
     </BrowserRouter>

    </>
  )
}

export default App
