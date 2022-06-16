import React from "react";
import {useParams} from 'react-router-dom';
import { useState } from "react";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Button, CardActions } from '@mui/material';
import ScrollToTop from "react-scroll-to-top";
//import Data from "../data";
import Card from "../components/CardsCities";
import NotResults from "../components/NotResults";
import  useEffect  from "react";
import axios from 'axios';


function Cities(){
  const [inputValue, setInputValue]=useState("")
   //useEffect(funcion,parametroquevaria) 
  const [city, setCity]= useState([]) 
  
    React.useEffect(()=>{
    axios.get('http://localhost:4000/api/Cities')
    .then(res=>{
      setCity(res.data.response.cities)
    })
   },[inputValue])
    console.log(city)
  let filterImput = city.filter((cities) => cities.city.toLowerCase().startsWith(inputValue.toLowerCase().trim()));
  console.log(filterImput)
  

  return(
    <>
    
   <NavBar/>
   <div className="inputText">
  <input onKeyUp={(event)=>{setInputValue(event.target.value)}} type="text" title="Search" placeholder="search"></input>
  
  <ScrollToTop smooth 
     color="violet"/>
            
  </div> 

  <div className="ContainerCards">
    {filterImput.length > 0 ? (<Card cardFilter={filterImput}/>) : (<NotResults/>)}
  </div>
  <Footer/>
  </>
  );
}

export default  Cities

//export default function Cities (){
  //El estado lo inicieamos desde 0
//}