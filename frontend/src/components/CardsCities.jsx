import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link  as LinkRouter} from "react-router-dom"




export default function Cards({cardFilter}) {
  return cardFilter.map((city)=> { //mapeo mi propiedad city// 
      return(
        <Card sx={{ width: 350,
          color: "black",
          boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.6), 0 0 9px 3px rgb(0, 0, 0)"}}
           key={city._id}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
         

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
      <CardActions>
        <LinkRouter to= {`/Details/${city._id}`}>
        <Button size="small" color="primary">
          See More
        </Button>
        </LinkRouter>
      </CardActions>
    </Card>
      );
    });
}
