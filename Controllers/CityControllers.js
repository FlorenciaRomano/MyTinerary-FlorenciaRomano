const City = require('../models/city');

const CityControllers = {
     getCities: async (req, res) => {
        let cities 
        let error = null
        try {cities=await City.find()}
        catch (err){error = err} 
        res.json({
            response: error ? 'ERROR' : {cities},
            success: error ? false : true,
            error : error 
            
        })
     },
     getOneCity: async (req,res) =>{
        const id = req.params.id
        let city
        let error = null
        try {city=await City.findOne({_id : id})}
        catch (err){error = err} 
        res.json({
            response: error ? 'ERROR' : city,
            success: error ? false : true,
            error : error 
     })
},
    addCity: async (req,res) => {
        const {city, country, image} = req.body.data 
        let newCity
        let error = null
        try {newCity=await new City 
            ({city:city, country:country, image:image}).save()
        }
     catch (err){error = err} 
            res.json({
             response: error ? 'ERROR' : newCity,
            success: error ? false : true, 
            error : error 
            

})},
   modifyCity: async(req,res) => {
    const id= req.params.id
    const city=req.body.data
    let citydb 
    let error = null
    try {citydb= await Cities.findOneAndUpdate({_id:id},city,{new:true})}
    catch (err){error = err} 
    res.json({
     response: error ? 'ERROR' : citydb,
    success: error ? false : true,
    error : error 
    
   })},


   removeCities: async(req,res) =>{
    const id = req.prams.id
    let city 
    let error = null
    try {city= await Cities.findOneAndDelete({_id:id})}
    catch (err){error = err} 
    res.json({
     response: error ? 'ERROR' : city,
    success: error ? false : true,
    error : error 
   })},


    addMultipleCities: async(req,res) =>{
        const data = req.body.data
        let cities
        let error = null
        try {
            data.map(async(city)=>{
                await new Cities({
                    name: data.name, country:data.country, image:data.image
                }).save()
            })
        }
        catch (err){error = err} 
    res.json({
     response: error ? 'ERROR' : cities,
    success: error ? false : true,
    error : error
    })


}}

module.exports = CityControllers