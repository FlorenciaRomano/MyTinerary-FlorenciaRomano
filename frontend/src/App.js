import * as React from "react";
import './styles/App.css'
import Cities from '../src/pages/Cities'
import Index from './pages/Index';
import Details from './pages/Details'
import { Route, Routes } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import citiesActions from "./Redux/action/citiesAction";
import SignUp from "./pages/SingUp";
import SingIn from "./pages/SingIn";
import userActions from './Redux/action/userAction';
import {useEffect }from 'react'



function App() {

  //ES PARA QUE CARGUE TODAS LAS IUDADES EN LA APP
const dispatch = useDispatch()
React.useEffect(()=>{//permite ejecutar codigo cada vez que nuestro un componente se renderice
  dispatch(citiesActions.getCities());//DISPATCH es un metodo que Despacha una o mas acciones al store
},[])

useEffect(() => {
  if(localStorage.getItem('token')!== null) { //Solo verifica si hay un token
      const token = localStorage.getItem("token") //Lo guarda con el localstorage
      //console.log(token)
      dispatch(userActions.verifyToken(token)) //Mandamos al verify token (action) con el dispatch
  }
},[])

  return (
    <>
     <Routes>
      <Route path='/' element={<Index/>}/>
      <Route path="/Cities" element={<Cities/>}/>
      <Route path= "/Details/:id" element={<Details/>}/> 
      <Route path="/SingUp" element={<SignUp/>}/>
      <Route path="/Users" element={<SingIn/>}/>
    </Routes>   
    </>
  );
}

export default App;
