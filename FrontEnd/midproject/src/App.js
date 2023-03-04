import React from 'react'
import './App.css';
import Cards from './components/Cards';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import {Routes, Route} from 'react-router-dom';
import PostForm from './components/PostForm';
import UpdateForm from './components/updateForm';


const App = () => {
  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cards' element={<Cards />} />
        <Route path='/postcards' element={<PostForm />} />
        <Route path='/cardsdata/:id' element={<UpdateForm />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App