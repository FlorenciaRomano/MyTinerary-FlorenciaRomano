import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ScrollToTop from "react-scroll-to-top";
//import Data from "../data";
import Card from "../components/CardsCities";
import NotResults from "../components/NotResults";
//import axios from 'axios';
import {useSelector, useDispatch} from "react-redux";
import { useState, useEffect} from "react";
import citiesActions from "../Redux/action/citiesAction";





function Cities(){
  const [inputValue, setInputValue]=useState("")
  const dispatch = useDispatch()
   //useEffect(funcion,parametroquevaria) 
   useEffect(()=>{
    dispatch(citiesActions.filterCities(inputValue))
   },[inputValue])
  //const [city, setCity]= useState([]) 
  
const city = useSelector ((store)=> store.citiesReducer.filter);


    //React.useEffect(()=>{
    //axios.get('http://localhost:4000/api/Cities')
    //.then(res=>{
      //setCity(res.data.response.cities)
    //})
   //},[inputValue])
    //console.log(city)
  //let city = cities?.filter((cities) => cities.city.toLowerCase().startsWith(inputValue.toLowerCase().trim()));
  
  

  return(
    <>
    
   <NavBar/>
   <div className="inputText">
  <input onKeyUp={(event)=>{setInputValue(event.target.value)}} type="text" title="Search" placeholder="search"></input>
  
  <ScrollToTop smooth 
     color="violet"/>
            
  </div> 

  <div className="ContainerCards">
    {city.length > 0 ? (<Card cardFilter={city}/>) : (<NotResults/>)}  
  </div>
  <Footer/>
  </>
  );
}

export default  Cities

//export default function Cities (){
  //El estado lo inicieamos desde 0
//}