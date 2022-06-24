import axios from 'axios';

const itinerariesActions = {
    getItinerariesByCity: () => {
        return async (dispatch, getState) => {
            const res = await axios.get(`http://localhost:4000/api/itineraries%27`)
            console.log(res)
            dispatch ({type: 'GET_ITINERARIES', payload: res.data.response.itineraries})
        }
    },
    getOneItinerary: (id) => {
        return async(dispatch,getState) => {
            const res = await axios.get(`http://localhost:4000/api/itineraries/${id}`)
            console.log(res)
            dispatch ({type: 'GET_ONE_ITINERARY', payload: res.data.response})
        }
    },
    findTinFromCity: (id) => {
        return async(dispatch,getState) => {
            const res = await axios.get(`http://localhost:4000/api/itinerary/cities/${id}`)
            console.log(res.data.response.tineraries)
            dispatch ({type: 'FIND_ITINERARIES_FROM_CITY', payload: res.data.response.tineraries})
        }
}
}

export default itinerariesActions