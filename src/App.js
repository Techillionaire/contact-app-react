import './App.css';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';


import React from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';

const App = () => {
  return (
  <div>
    <ToastContainer />
    <Nav />
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path="/add" element={<AddContact />}/>
      <Route path="/edit/:id" element={<EditContact />}/>
    </Routes>
  </div>
  )
};

export default App;
