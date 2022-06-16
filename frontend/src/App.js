import * as React from "react";
import './styles/App.css'
import Cities from '../src/pages/Cities'
import Index from './pages/Index';
import Details from './pages/Details'
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
     <Routes>
      <Route path='/Index' element={<Index/>}/>
      <Route path="/Cities" element={<Cities/>}/>
      <Route path= "/Details/:id" element={<Details/>}/> //pero esta impresa la card
    </Routes>   
    </>
  );
}

export default App;
