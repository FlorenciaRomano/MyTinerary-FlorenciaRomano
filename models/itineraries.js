//El modelo nos permite establecer la colección de nuestra DB a la cual nos conectaremos
const mongoose = require('mongoose'); //Constante que requiere de MONGOOSE
const itinerarySchema = new mongoose.Schema({ //schema es un constructor
    name:{type:String, required:true},
    userName:{type:String, required:true},  //Datos que esta contendra
    avatar:{type:String, required:true},    //tipo de dato de cada campo
    description:{type:String, required:true},
    price:{type:Number, required:true},
    duration:{type:String, required:true},
    hashtag:{type:Array, required:true},
    likes:{type:String, required:true},
    activities:{type:Array, required:true},
    city: {type: mongoose.Types.ObjectId,ref: 'cities'}//con esta propiedad relaciono el itinerario con la ciudad//
//La relación de este nuevo modelo requiere que definamos:
//type: mediante una propiedad de mongoose ObjectId
//ref: que “une” nuestro modelo con la colección correspondiente
//quiero que me muestre la ciudad o los requisitos que yo necesito
})

//y si estos campos serán  requeridos o no al momento de ser llamado el modelo por los controladores
//Si la colección no se encuentra creada en la DB, la misma será creada por el modelo cuando sea llamada por el controlador.

const Itineraries = mongoose.model('itineraries', itinerarySchema)
//pone el ITINERARYSCHEMA en la data de mongoose en el repocitorio city
module.exports=Itineraries

 