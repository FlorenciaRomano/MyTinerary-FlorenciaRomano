//importo de librerias externas
import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'

//importo los estilos
//import './styles.css'

//se llama en display
//llega como props: tinId (id del itinerario)
export default function Activity ({activities}) {
    
        
    return (  
        
<Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'space-between'}}>
            {activities?.map(data =>
                <div key={data._id}>
                    <Box className='absoluteactivities' sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgb(255 129 0 / 40%);',
                        marginLeft: '16px',
                        marginRight: '16px'}}>
                        <Typography variant="h5" fontFamily="Rajdhani,sans-serif" sx={{color: 'black',fontWeight: 600}}>{data.title}</Typography>
                    </Box>
                    <Box className='relativeactivities' sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: '16px',
                        marginRight: '16px'}}>
                        <img src={`${data.image}`} alt={data.name} className='fitImg' />
                        <p>{data.name}</p>
                        {console.log(activities)}
                    </Box>
                </div>
            )}
        </Box>
        )
        }

            