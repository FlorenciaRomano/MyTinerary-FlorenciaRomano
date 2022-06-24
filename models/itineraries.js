const mongoose = require('mongoose');
const itinerarySchema = new mongoose.Schema({
    name:{type:String, required:true},
    userName:{type:String, required:true},
    avatar:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    duration:{type:String, required:true},
    hashtag:{type:Array, required:true},
    likes:{type:String, required:true},
    activities:{type:Array, required:true},
    city: {type: mongoose.Types.ObjectId,ref: 'cities'}//con esta propiedad relaciono el itinerario con la ciudad//
})
const Itineraries = mongoose.model('itineraries', itinerarySchema)
module.exports=Itineraries

 