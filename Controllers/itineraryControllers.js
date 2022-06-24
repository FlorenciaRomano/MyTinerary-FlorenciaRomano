const Itinerary = require('../models/itineraries'); 

const itineraryControllers = {
   getItinerary: async (req, res) =>{ //ESTA BIEN ASI?
    let itineraries
    let error = null
    try{
        itineraries = await Itinerary.find().populate("city")
    } catch(err){
        error = err
    }
    res.json({
        response: error ? "ERROR" : itineraries,
        success: error ? false : true,
        error : true
    })
   },


    getItinerariesByCity: async (req, res) => {
        const id = req.params.id;
        let itineraries;
        try {
          itineraries = await Itinerary.find({ city: id });
        } catch (err) {
          console.error(err);
        }
        res.json({
            response: error ? "ERROR" : itineraries,
            success: error ? false : true,
            error : true
        });
      },

       // llamas uno con el id 
    getOneItinerary:async(req,res)=>{
      const id = req.params.id
      let itinerary
      let error = null 
      try{
          itinerary = await  Itinerary.findOne({_id:id}).populate("city",{city:1})
      }catch(err){
          error = err
      }
      res.json({
          response: error ? "ERROR" : itinerary,
          success: error ? false : true,
          error : true
      })
  },

   // agregas una 
   addItinerary:async(req,res) =>{
    const {name, userName,avatar, price, duration, hashtag, likes, activities, description, city}= req.body.data
    let itinerary
    let error = null
    try{
        itinerary = await new Itinerary({
            name:name,
            userName:userName,
            avatar:avatar, 
            description:description,
            price:price,
            duration:duration,
            hashtag:hashtag,
            likes:likes,
            activities:activities,
            description:description,
            city:city, 
        }).save()
    }catch(err){error = err}
    res.json({
        console:console.log(error),
        response: error ? `ERROR` : itinerary,
        success: error ? false : true,
        error: error
    })
},

  // modificar una propiedad de una city
  modifyItinerary: async(req, res) =>{
    const id = req.params.id
    let itinerary = req.body 
    let itinerarydb
    let error = null 
    try{
        itinerarydb = await Itinerary.findOneAndUpdate({_id: id}, itinerary,{new: true})
    } catch(err) {error = err}
    res.json({
        console:console.log(error),
        response: error ? "ERROR" : itinerarydb,
        success: error ? false : true,
        error: error
    })
},

 // borrar una 
 removeItinerary: async(req,res) =>{
  const id = req.params.id
  let itinerary
  let error = null
  try{
     itinerary = await Itinerary.findOneAndDelete({_id: id })
  }catch (err) { error = err}
  res.json({
      response: error ? "ERROR" : itinerary,
      success: error ? false : true,
      error: error
  })
},
    
    
      findTinFromCity: async (req,res) => { 
        let cityId = req.params.id
        //console.log(cityId)
        let tineraries 
        let error = null 
        try { 
            tineraries = await Itinerary.find({city:cityId}) 
            .populate("city")
            //console.log(tineraries)
        } catch (err) {
            error = err
            console.log(error)
        } 
        res.json({ 
            response: error ? 'ERROR' : {tineraries}, 
            success: error ? false:true, 
            error: error 
        })
    },
    }
    module.exports = itineraryControllers