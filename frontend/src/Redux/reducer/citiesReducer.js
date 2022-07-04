
const initialState = { //reductores- NOS DAN UN ESTADO INICIAL
            //REDUCER ES UNA FUNCION QUE PROCESA LAS ACCIONAS Y GENERA
          //UN NUEVO ESTADO HACIA LA ESTORE
        // Los reducers especifican cómo 
       //cambia el estado de la aplicación en respuesta a las acciones enviadas al store. 
    cities:[],
    auxiliar:[],
    oneCity:{},
    filter:[]
}

const citiesReducer = (state = initialState, action) =>{
    switch(action.type){ //Establece la condición para cada case
        case "GETCITIES": //nombre del caso
            return{
                 ...state,                   //toma el estado inicial y guarda
                 cities: action.payload,    //Payload escucha el evento
                 auxiliar: action.payload,   //Payload escucha el evento
                filter: action.payload //cargo todas las ciudades en filter
                }
            case "GET_ONE_CITY"://nombre del caso
                return{
                     ...state,
                     oneCity: action.payload,    //Payload escucha el evento
                     auxiliar: action.payload,   //Payload escucha el evento
                     filter: action.payload 
                    }
                case "FILTERCITIES": //nombre del caso
                    let cityFilter = state.cities.filter(city => city.city.toLowerCase().startsWith(action.payload.trim().toLowerCase()))
                return{
                    ...state,
                    filter:cityFilter
                }//VAR con un parametro (state), propiedad(cities). filter(metodo)
                //le pido que me devuelva ciudades y la ruta de donde estan.

            default:
            return state
    } 
}
export default citiesReducer