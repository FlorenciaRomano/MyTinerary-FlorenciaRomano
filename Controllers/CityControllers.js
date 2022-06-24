const City = require('../models/city');

const CityControllers = {
     getCities: async (req, res) => {//FUNCION ASINCRONA
        let cities 
        let error = null //declaramos un error con valor nulo
        try {cities=await City.find()} //Una funcion try (un pedido) va igualar con un await para buscarme todo el contenio de Cities
        //Find funciona como filtro, si no enviamos ningun parametro nos devuelve todos los datos del modelo declarado.
        catch (err){error = err} //Catch es lo que devuelve si no se cumple lo de arriba
        res.json({
            response: error ? 'ERROR' : {cities},
            success: error ? false : true,
            error : error 
            
        })
     },
     //BUSCA POR ID CADA CIUDAD
     getOneCity: async (req,res) =>{//FUNCION ASINCRONA
        const id = req.params.id //indicamos que busque un ObjectId de la colección el cual se igual al id enviado por parámetro al controlador
        let city //declaro variable
        let error = null //Error con valor nulo
        try {city=await City.findOne({_id : id})}//Try, un pedido donde me va a igualar con un await para buscarme el contenido
         //Find funciona como filtro, si no enviamos ningun parametro nos devuelve todos los datos del modelo declarado.
        //adentro del p() establezco la conexion, id object que me crea postman va a ser = a ID
        catch (err){error = err} //Catch es lo que devuelve si no se cumple lo de arriba
        res.json({
            response: error ? 'ERROR' : city,
            success: error ? false : true,
            error : error 
     })
},

//CREA LAS CIUDADES
    addCity: async (req,res) => { //FUNCION ASINCRONA//definimos que este recibirá un req.body el cual estará en una variable llamada Data
        const {city, country, image} = req.body.data //Desestructuro el modelo para usarlo por separado. contendrá un objeto con 3 propiedades
//que coincide con el modelo declarado.
        let newCity //declaro variable
        let error = null //Declaro error
        try {newCity=await new City //Try, un pedido donde me va a igualar con un await para buscarme el contenido
            ({city:city, country:country, image:image}).save()
        }
     catch (err){error = err} //Catch es lo que devuelve si no se cumple lo de arriba
            res.json({
             response: error ? 'ERROR' : newCity,
            success: error ? false : true, 
            error : error 
            

})},

//MODIFICA LOS DATOS (CIUDAD)
   modifyCity: async(req,res) => {//FUNCION ASINCRONA
    const id= req.params.id //elemento a modificar, id de use params////elemento a identificar cada objeto
    const city=req.body.data //Requiere la estructura de donde va a mosdificar. (body,data)
    let citydb  //Definomos la variable que va a esperar la respuesta a ese modelo
    let error = null // Definimos el error
    try {citydb= await Cities.findOneAndUpdate({_id:id},city,{new:true})}//el id viene de la peticion que hicimos a modificar (desde city). Se compara con la base de datos.(Routes)
    //Try, un pedido donde me va a igualar con un await para buscarme el contenido
     //Find funciona como filtro, si no enviamos ningun parametro nos devuelve todos los datos del modelo declarado.
    catch (err){error = err}  //Await porque es una funcion asincrona y tiene que esperar que le de una respuesta
    res.json({ //Catch es lo que devuelve si no se cumple lo de arriba
     response: error ? 'ERROR' : citydb,
    success: error ? false : true,
    error : error 
    
   })},

//ELIMINA LOS DATOS (CIUDAD)
   removeCities: async(req,res) =>{//FUNCION ASINCRONA
    const id = req.prams.id //Requiere la estructura de donde va a eliminar.
    let city //Declaramos variable
    let error = null //Declaramos error con valor nulo
    try {city= await Cities.findOneAndDelete({_id:id})} //Try, un pedido donde me va a igualar con un await para buscarme el contenido
               //Try, un pedido donde me va a igualar con un await para buscarme el contenido
     //Find funciona como filtro, si no enviamos ningun parametro nos devuelve todos los datos del modelo declarado.
       catch (err){error = err} //Catch es lo que devuelve si no se cumple lo de arriba
    res.json({
     response: error ? 'ERROR' : city,
    success: error ? false : true,
    error : error 
   })},


    addMultipleCities: async(req,res) =>{//FUNCION ASINCRONA
        const data = req.body.data //Requiere la estructura de donde va a multiplicar.(body.data)
        let cities //Declaro Variable
        let error = null //Declaro Error con valor nulo
        try {//Try, un pedido donde me va a igualar con un await para buscarme el contenido
            data.map(async(city)=>{
                await new Cities({ //AWAIT va a buscar
                    name: data.name, country:data.country, image:data.image //parametros que vamos a buscar
                }).save() //Guardar
            })
        }
        catch (err){error = err} //Catch es lo que devuelve si no se cumple lo de arriba
    res.json({
     response: error ? 'ERROR' : cities,
    success: error ? false : true,
    error : error
    })


}}

module.exports = CityControllers //EXPORTO EL MODULO