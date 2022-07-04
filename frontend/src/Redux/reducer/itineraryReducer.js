const initialState = { ////reductores- NOS DAN UN ESTADO INICIAL
    //REDUCER ES UNA FUNCION QUE PROCESA LAS ACCIONAS Y GENERA
          //UN NUEVO ESTADO HACIA LA ESTORE
    itineraries: [], 
    getOneItinerary: {},
    getItinerariesFromCity: [],
    findTinFromCity: []
}

const itineraryReducer = (state = initialState, action) => { //CONSTANTE con un parametro, que es igual
                                        //al la constante que inicializa el estado, junto con la accion.

    switch (action.type) { //Establece la condición para cada case
        case "GET_ITINERARIES"://nombre del caso
            return {
                ...state, ////toma el estado inicial y guarda
                itineraries: action.payload //Payload escucha el evento
            }
        case "GET_ONE_ITINERARY"://nombre del caso
            return {
                ...state,////toma el estado inicial y guarda
                getOneItinerary: action.payload //Payload escucha el evento
            }
        case "FIND_ITINERARIES_FROM_CITY"://nombre del caso
            return {
                ...state, ////toma el estado inicial y guarda
                findTinFromCity: action.payload //Payload escucha el evento
            }
        default: //POR DEFECTO ME DEVUELVE EL ESTADO
            return state
    }
}

export default itineraryReducer //exporto