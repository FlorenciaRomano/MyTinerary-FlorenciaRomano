const initialState = {
    itineraries: [],
    getOneItinerary: {},
    getItinerariesFromCity: [],
    findTinFromCity: []
}

const itineraryReducer = (state = initialState, action) => {

    switch (action.type) {
        case "GET_ITINERARIES":
            return {
                ...state,
                itineraries: action.payload
            }
        case "GET_ONE_ITINERARY":
            return {
                ...state,
                getOneItinerary: action.payload
            }
        case "FIND_ITINERARIES_FROM_CITY":
            return {
                ...state,
                findTinFromCity: action.payload
            }
        default:
            return state
    }
}

export default itineraryReducer