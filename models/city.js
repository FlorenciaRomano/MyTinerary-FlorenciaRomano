//El modelo nos permite establecer la colección de nuestra DB a la cual nos conectaremos
const mongoose= require('mongoose'); //Constante que requiere de MONGOOSE
const citySchema = new mongoose.Schema ({ 
     city:{type:String,require:true} ,   //Campos que esta contendra
     country:{type:String,require:true},  //el tipo de dato de cada campo
     image:{type:String,require:true},

})
//y si estos campos serán  requeridos o no al momento de ser llamado el modelo por los controladores
//Si la colección no se encuentra creada en la DB, la misma será creada por el modelo cuando sea llamada por el controlador.
 
const City = mongoose.model('cities', citySchema);//pone el citysche en la data de mongoose en el repocitorio city

 module.exports = City //EXPORTO EL MODULO

 