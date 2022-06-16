const Router = require('express').Router(); ///Requiero el metodo router de Express
const cityControllers = require('../Controllers/CityControllers'); //forma en dos lineas
const {getCities, getOneCity, addCity,modifyCity,  removeCities, addMultipleCities} = cityControllers;

Router.route('/Cities') //al Router le configuro una ruta
.get(getCities) //A la ruta le aplico el metodo get para asignarle el controlador de lectura de metodos
.post(addCity)
   
Router.route('/Cities/:id')
.get(getOneCity)
.put(modifyCity)
.delete(removeCities)

Router.route('/addMultipleCities')
.post(addMultipleCities)

module.exports = Router;
