import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
//import Data from "../data";//
import  Typography  from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import axios from 'axios';
import { useState } from "react";
import { Link  as LinkRouter} from "react-router-dom";
import  {Button}  from "@mui/material";



function Details() {
    const { id } = useParams()
    
   


    const [city, setCity]= useState([])
    React.useEffect(()=>{
      axios.get(`http://localhost:4000/api/Cities/${id}`)
      .then(res =>{
        setCity(res.data.response)

      })
     },[])
    console.log(id)
console.log(city)
    return ( 
        <>
         <div className="NavDetails">
        <NavBar/>
        </div>
      

        <body className="BodyDetails">
        <div className="CardDetails">
        <Card key="index" sx={{ width: 450 }}>
        <CardActionArea>      
          <CardMedia
            component="img"  
            height="300"
            width="400"
            image={city.image}
            alt={city.city}
          />
          <CardContent> 
            <Typography gutterBottom variant="h5" component="div">
              {city.city}
            </Typography>
            <Typography variant="body2" color="text.secondary">
             {city.country}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
        </div>
        </body>


        <div className="FooterDetails">
        <Footer/>
        </div>
        </>
    ) 
}

export default Details