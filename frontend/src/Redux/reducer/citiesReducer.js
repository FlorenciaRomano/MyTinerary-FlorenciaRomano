
const initialState = {
    cities:[],
    auxiliar:[],
    oneCity:{},
    filter:[]
}

const citiesReducer = (state = initialState, action) =>{
    switch(action.type){ //Establece la condición para cada case
        case "GETCITIES":
            return{
                 ...state,
                 cities: action.payload,    //Payload escucha el evento
                 auxiliar: action.payload,   //Payload escucha el evento
                filter: action.payload //cargo todas las ciudades en filter
                }
            case "GET_ONE_CITY":
                return{
                     ...state,
                     oneCity: action.payload,    //Payload escucha el evento
                     auxiliar: action.payload,   //Payload escucha el evento
                     filter: action.payload 
                    }
                case "FILTERCITIES":
                    let cityFilter = state.cities.filter(city => city.city.toLowerCase().startsWith(action.payload.trim().toLowerCase()))
                return{
                    ...state,
                    filter:cityFilter
                }

            default:
            return state
    } 
}
export default citiesReducer