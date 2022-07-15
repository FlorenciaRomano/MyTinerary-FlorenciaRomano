const Router = require ("express").Router(); // le pido a express que me traiga router para definir las rutas

const citiesControllers = require('../controllers/CityControllers');//importo mi controlador
const itineraryControllers = require ('../Controllers/itineraryControllers');
const validator = require('../validator');
const { signUpUsers, signInUser, verificationMail, verifyToken} = require('../Controllers/SingUpControllers');
const passport = require('../passport');
const activitiesControllers = require("../Controllers/ActivitiesControllers");
//const itineraryControllers = require("../Controllers/itineraryControllers");

const {getCities, getOneCity, addCity, modifyCity,  removeCities,  addMultipleCities} = citiesControllers;
const { getItinerary, getItinerariesByCity, getOneItinerary, addItinerary,  modifyItinerary, removeItinerary, findTinFromCity, likeDislike} = itineraryControllers; 
const {
	getActivities,
	addActivity,
	modifyActivity,
	removeActivity,
	findActivityFromItinerary,
} = activitiesControllers;



//const validator = require('../validator');
//const { default: SignUp } = require("../frontend/src/components/LoginUp");
//RUTAS CITIES

Router.route('/cities') //creo el endpoint de la ruta //PEDIDOS HTTP
.get(getCities)
.post(addCity)

Router.route('/cities/:id')
.delete(removeCities)
.put(modifyCity)
.get(getOneCity) 

Router.route("/multiplesCities")
.post(addMultipleCities)


//RUTAS ITINERARIES
//reciben el llamado de la api a traves de la url

 Router.route('/itineraries') //PEDIDOS HTTP
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

 //Routes sign

Router.route('/auth/signUp')
.post(validator, signUpUsers)

Router.route('/auth/signIn')
.post(signInUser)

Router.route('/verify/:string')
.get(verificationMail)

Router.route('/auth/verifyToken')
.get(passport.authenticate('jwt',{ session: false }),verifyToken)
module.exports = Router

//LIKES ROUTES

Router.route('/itineraries/likes/:id') 
.put(passport.authenticate('jwt',{session:false}), likeDislike) 

//COMENTS ROUTES
const CommentsControllers = require('../Controllers/CommentsControllers')
const {addComment,modifyComment, deleteComment} = CommentsControllers
Router.route('/itinerary/comment')
.post(passport.authenticate('jwt',{ session: false }),addComment)

Router.route('/itinerary/comment/:id')
.post(passport.authenticate('jwt',{ session: false }),deleteComment)
.put(passport.authenticate('jwt',{ session: false }),modifyComment)

//ACTIVITIES ROUTES
Router.route("/activities").get(getActivities).post(addActivity);

Router.route("/activities/:id").put(modifyActivity).delete(removeActivity);

Router.route("/activities/itineraries/:id").get(findActivityFromItinerary);