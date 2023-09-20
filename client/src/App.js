// import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom"
import Home from "./pages/home/home"
import Detail from './pages/detail/detail';
import Form from './pages/form/form';
import Landing from './pages/landing/landing';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/home/:id' element={<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;
