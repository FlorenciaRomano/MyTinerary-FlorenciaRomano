import { combineReducers } from "redux"; 
import citiesReducer from './citiesReducer'
import itineraryReducer from "./itineraryReducer";
import userReducer from "../reducer/userReducer";

const mainReducer = combineReducers({ //alias?
    citiesReducer, //propiedad que traigo desde el CitiesReducer
    itineraryReducer,
    userReducer, //propiedad que traigo desde el itineraryReducer
})

export default mainReducer //exporto la constante