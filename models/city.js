const mongoose= require('mongoose');
const citySchema = new mongoose.Schema ({
     city:{type:String,require:true} , 
     country:{type:String,require:true},
     image:{type:String,require:true},

})
 const City = mongoose.model('Cities', citySchema);

 module.exports = City

 