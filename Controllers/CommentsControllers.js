const Itineraries = require('../models/itineraries') //requiero el modelo

const commentControllers={//defino un objeto con los controladores del modelo. Es un objeto con propiedades y cada propiedad es un metodo
        addComment: async (req, res)=> {
            const {itineraryId, comment } = req.body.comments
            const user = req.user._id
            try{
                const newComment = await Itineraries
                //un pedido donde me va a igualar con un await para buscarme el contenido
                .findOneAndUpdate({_id: itineraryId }, {$push : {comments:{comment : comment, userId :user}}},
                    {new:true})
                .populate("comments.userId", {fullName : 1, avatar : 1})
                console.log(newComment);
            res.json({
                success: true,
                response: newComment.comments,
                message: 'Thanks you for let us your comment!'
            })
            }catch(error){
                console.log(error);
                res.json({
                    success: false, 
                    message: "Something went wrong, try again in a few minutes!" 
                })
            }
            
        },
        modifyComment: async (req, res) => { 
            console.log(req.body);
            const { comment } = req.body.value
            const {id} = req.params
            console.log(comment, id)
            //const user = req.user._id 
            console.log("CONSOLECOMENTARICONTROLLERS",comment);
            try {
                //un pedido donde me va a igualar con un await para buscarme el contenido
                const modifyComment = await Itineraries.findOneAndUpdate({"comments._id":id},
                 {$set: {"comments.$.comment": comment}}, {new: true}) /* me devuelve el nuevo dato */
                console.log("looogDeModifyyy",modifyComment)
                res.json({ success: true, response:{modifyComment}, message:"Your comment has been modified" })
            }
            catch (error) {
                console.log("PASOPORELCATCH",error)
                res.json({ success: false, message: "Something went wrong, try again in a few minutes", console:console.log(error) })
            }
        }, 
        deleteComment: async (req, res) => {
            const id = req.params.id
            const user = req.user._id
            try {
                //un pedido donde me va a igualar con un await para buscarme el contenido
                const deleteComment = await Itineraries.findOneAndUpdate({"comments._id":id}, {$pull: {comments: {_id: id}}}, {new: true}) /* extraigo comment */
            console.log(deleteComment)
                res.json({ success: true, response:{deleteComment}, message: "You deleted the comment" })
            }
            catch (error) {
                console.log(error)
                res.json({ success: false, message: "Something went wrong, try again in a few minutes" })
            }
        },
} 
module.exports = commentControllers




//  const itineraryDetails=(props) =>{
//   const {id} = useParams() 
//   const [itinerary, setItinerary] = useState()
//   const [inputText, setInputText] = useState()
//     const [modify, setModify]  = useState()
//   const [reload, setReload] = useState(false)
//   }
 

//   async function cargarComentario(event){
//      const commentData = {
//        itinerary: itinerary._id,
//      comment: inputText,
//      }
//      await props.addComment(commentData)
//      .then(response => setItinerary(response.data.response.nuevoComment), setInputText(''))
//    document.querySelector("#NewComment").textContent=""
//    }

//  async function modificarComentario(event){
//    const commentData ={
//        commentID: event.target.id,
//      comment: modify
//    }
//     console.log(modify)
//     await props.modificarComentario(commentData)
//     setReload(!reload)
//    };

//    async function eliminarComentario(event){
//      await props.deleteComment(event.target.id)
//      setReload(!reaload)
//   }

//   useEffect(()=>{
//      props.getOneItinerary(id)
//      .then(response => setItinerary(response.data.response.itinerary)) 
//  }, [reload])

