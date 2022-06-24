const Router = require ("express").Router(); // le pido a express que me traiga router para definir las rutas

const citiesControllers = require('../controllers/CityControllers');//importo mi controlador
const itinerariesControllers = require ('../Controllers/itineraryControllers');

const {getCities, getOneCity, addCity, modifyCity,  removeCities,  addMultipleCities} = citiesControllers;
const { getItinerary, getItinerariesByCity, getOneItinerary, addItinerary,  modifyItinerary, removeItinerary, findTinFromCity} = itinerariesControllers; 


//RUTAS CITIES

Router.route('/cities') //creo el endpoint de la ruta
.get(getCities)
.post(addCity)

Router.route('/cities/:id')
.delete(removeCities)
.put(modifyCity)
.get(getOneCity) 

Router.route("/multiplesCities")
.post(addMultipleCities)


//RUTAS ITINERARIES

 Router.route('/itineraries')
 .get( getItinerary)
 .post(addItinerary)

 Router.route('/itineraries/:id')
 .delete(removeItinerary)
 .put(modifyItinerary)
 .get(getOneItinerary)

 Router.route("/itinerary/cities/:id")
 .get(findTinFromCity)

 Router.route("/itinerarybycity/:id")
 .get(getItinerariesByCity) 

 
module.exports = Router