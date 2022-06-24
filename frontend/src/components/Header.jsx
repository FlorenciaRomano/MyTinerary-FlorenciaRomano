import { Button, Typography } from "@mui/material"
import React from "react"
import '../styles/index.css'
import Box from '@mui/material/Box'
import { Link  as LinkRouter} from "react-router-dom"



function Body() {



    return (
        <div className="ContainerHeader">
        <Box className='Body' sx={{
            display: 'flex',
            alignItems: 'FlexStart',
            height:'60vh',
            width:'100%'
        }}>
            <Typography variant="h1" sx={{
                fontSize: '80px',
                width:'100%',
                color: '#231942',
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'flexStart',
                fontFamily: 'Abril Fatface',
                marginTop:'-15rem'

            }}> My Tinerary</Typography>

            <Typography variant='p' sx={{
                fontSize: '30px',
                color: '#231942',
                display: 'flex',
                justifyContent: 'flexStart',
                alignItems: 'center',

            }}>Find your perfect trip designed by inside
                who know and love their cities!
                



            </Typography> 

             
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
                Find you trip
                </Button>
                </LinkRouter>
        </Box>

         
        
   </div>
   
    )

    
}

export default Body