import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
//import Data from "../data";//
import  Typography  from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material"
import { Link  as LinkRouter} from "react-router-dom"
import {useDispatch} from 'react-redux'
import citiesActions from "../Redux/action/citiesAction";
import { useSelector } from "react-redux";
import CardItinerario from "../components/Itinerarys"
import itineraryActions  from "../Redux/action/itineraryAction";




function Details() {
    const { id } = useParams()

    //declaramos const con un string que es igual al que 
    //le permiten acceder a los parámetros de la ruta actual
    //o de lo que yo le indico

    
   


    //const [city, setCity]= useState([])
     
    const dispatch= useDispatch(); //igualamos constante

 
//PONEMOS EL DISPATCH Y EL USE EFFECT ANTES DEL USE SELECTORE
//PORQUE TENEMOS QUE CARGAR EL ESTADO DE LAS ACTION

    React.useEffect(()=>{ //permite ejecutar codigo cada vez que nuestro un componente se renderice
      dispatch(citiesActions.getOneCity(id))
         //DISPATCH es un metodo que Despacha una o mas acciones al store (reducer) y se guarda 
      //axios.get(`http://localhost:4000/api/Cities/${id}`)
      //.then(res =>{
        //setCity(res.data.response)
     dispatch(itineraryActions.findTinFromCity(id))
       //DISPATCH es un metodo que Despacha una o mas acciones al store (reducer) y se guarda 
    
      
     },[]);
    const city = useSelector(store => store.citiesReducer.oneCity)//permite extraer los datos del store
    //Declaramos consta, determina qué operación definida se invoca.
    //parametro con una funcion con la Ruta
    //HOOK QUE INGRESA AL STORE Y DEVUELVE EL ESTADO DE LO QUE LE INDICO HACIA EL FRONT
    const itinerary = useSelector (store => store.itineraryReducer.findTinFromCity)
    //permite extraer los datos del store

   //Declaramos consta, determina qué operación definida se invoca.
    //parametro con una funcion con la Ruta
    //HOOK QUE INGRESA AL STORE Y DEVUELVE EL ESTADO DE LO QUE LE INDICO HACIA EL FRONT
    console.log(itinerary)
console.log(city)
    return ( 
        <>
         <div className="NavDetails">
        <NavBar/>
        </div>
      

        <body className="BodyDetails">
        {/* <div className="CardDetails">
        <Card key="index" sx={{ width: 450,
         color: "black",
         boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.6), 0 0 9px 3px rgb(0, 0, 0)" }}>
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
       */} 
       <div className="contenedorTinerary">
       <div className="BotonDetails">
  <LinkRouter to ='/Cities'> <Button  className="buttonHeader" sx={{
                fontSize: '25px',
                width:'100%',
                height:'3.5rem',
                color: 'black',
                background: '#FBCA1F',
                backgroundSize: '100%',
                display: 'flex',
                justifyContent: 'flexStart',
                marginTop:'1rem',
                alignItems: 'center'}}>
                COME BACK
                </Button>
                </LinkRouter>
                </div>

      <div className="CardItinerario">
      {itinerary.length > 0 ? itinerary.map((data)=>
        <CardItinerario data = {data}/>
      ): <>
      
      <img src="https://vmanagecrm.in/property/img/404-error.jpg" />
      </>}
     
        </div>
        </div>
        </body>
         


        <div className="FooterDetails">
        <Footer/>
        </div>
        </>
    ) 
}

export default Details