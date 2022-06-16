require('dotenv').config()
require('./database')// requiero la conexion con la base de datos
const cors = require('cors')
const Router = require('./Routes/routes') //Requiero el metodo Router 
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api',Router)

const PORT = 4000; //Defino el puerto
app.set("port", PORT) //seteo la propiedad de app

//GET obtener
//POST enviar //
//DELETE Eliminar
//PUT Actualizar



app.get("/", function(req, res){
    res.send("Server created!")
})

app.listen(PORT, function(){
    console.log("Server is running on: " + app.get('port'))
})