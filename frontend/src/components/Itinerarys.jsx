import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import itineraryAction from '../Redux/action/itineraryAction';
import {useParams} from "react-redux"
import {useDispatch, useSelector} from 'react-redux'
import {useState} from 'react'
import Swal from "sweetalert2"; 
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { ClassNames } from '@emotion/react';
import Comments from './comments'
 
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardItinerario({data, handleReload, setChangeReload}) {
  const [expanded, setExpanded] = React.useState(false);  //// setExpanded DISPATCH Despacha una o mas acciones al store
 console.log(data)
  // const itineraryDetails=(props) =>{
  //   const {id} = useParams() 
  //   const [itinerary, setItinerary] = useState()
  //   const [inputText, setInputText] = useState()
  //   const [modify, setModify]  = useState()
  //   const [reload, setReload] = useState(false)
  // }
const dispatch = useDispatch()
 const [reload, setReload] = React.useState(false)

const user = useSelector(store => store.userReducer.user) 

 
  const handleExpandClick = () => { 
    setExpanded(!expanded); 
  };
 
  React.useEffect(()=>{
    dispatch(itineraryAction.findTinFromCity(data.city._id));
  }, [reload]); 
  // async function cargarComentario(event){
  //   const commentData = {
  //     itinerary: itinerary._id,
  //     comment: inputText,
  //   }
  //   await props.addComment(commentData)
  //   .then(response => setItinerary(response.data.response.nuevoComment), setInputText(''))
  // document.querySelector("#NewComment").textContent=""
  // }

  // async function modificarComentario(event){
  //   const commentData ={
  //     commentID: event.target.id,
  //     comment: modify
  //   }
  //   console.log(modify)
  //   await props.modificarComentario(commentData)
  //   setReload(!reload)
  // };

  // async function eliminarComentario(event){
  //   await props.deleteComment(event.target.id)
  //   setReload(!reaload)
  // }

  async function likesOrDislikes(){
    const res = await dispatch(itineraryAction.likeDislike(data._id))
    console.log(res)
    setReload(res)
    setChangeReload()
  }

  async function noUser(){
    Swal.fire({
      icon:"error",
      title:"You must be logged in to comment or like an itinerary"
    })
  };
  
  //  useEffect(()=>{
  //    props.getOneItinerary(id)
  //    .then(response => setItinerary(response.data.response.itinerary)) 
  // }, [reload])

 console.log(data)
  return (
    <Card sx={{ width: 345 ,
      boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.6), 0 0 9px 3px rgb(0, 0, 0)"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.userName}
        subheader="September 14, 2016"
      />
      <CardMedia
        
        component="img"
        height="150"
        image={data.avatar}
        alt={data.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {data.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

        
      
        
        {user ?
                            <IconButton onClick={likesOrDislikes} aria-label="add to favorites">
                            {data?.likes.includes(user.id) ?
                                <FavoriteIcon style={{color:'red'}}/>
                                :
                                <FavoriteBorderIcon/>}
                                <Typography>{data.likes.length} likes</Typography>
                            </IconButton>
                            :
                            <IconButton onClick={noUser} aria-label="add to favorites">
                                <FavoriteBorderIcon/>
                                <Typography>{data.likes.length} likes</Typography>
                            </IconButton>
                        }
                        
        <IconButton aria-label="share">
            <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{data.duration}</Typography>
          <Typography paragraph> $
           {data.price}
          </Typography>
          <Typography paragraph>
           {data.hashtag}

          </Typography>
          <div className='contenedorComentarios'>
          <Comments comentarios={data.comments}
          handleReload={handleReload} 
          itineraryId={data._id} />
</div>
        </CardContent>
      </Collapse>
    </Card>
  );
}