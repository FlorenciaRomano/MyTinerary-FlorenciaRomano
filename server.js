require('dotenv').config()//La librería dotenv nos permitirá cargar a traves del método config() y el objecto path, el archivo 
require('./database')// requiero la conexion con la base de datos
const cors = require('cors') //una constante que requiere el metodo CORS
//CORS SE USA PARA QUE ME DE PERMISO A CONECTARME CON UNA API EXTERNA
const Router = require('./Routes/routes') //Requiero el metodo Router de la libreria express
const express = require("express"); //una constante que requiere el metodo express
const app = express();

app.use(cors()); //LE PIDO A APP QUE ME PERMITA USAR CORS
app.use(express.json());// LE PIDO A APP QUE ME PERMITA USAR EXPRESS
app.use('/api',Router)// LE PIDO A APP QUE ME PERMITA USAR API Y ROUTERS

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