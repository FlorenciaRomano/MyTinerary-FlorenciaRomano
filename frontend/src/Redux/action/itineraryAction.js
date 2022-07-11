import axios from 'axios';  //ACTION RECIVE LOS EVENTOS DEL FRONTEND
                            //Y SE LOS PASA A LOS REDUCERS A TRAVEZ DEL PAYLOAD
                             //Y SE LOS PASA A LOS REDUCERS A TRAVEZ DEL PAYLOAD

const itinerariesActions = {
    getItinerariesByCity: () => {
        return async (dispatch, getState) => {
            //DISPATCH es un metodo que Despacha una o mas acciones al store
            //Y LO GUARDA EN PAYLOAD
            const res = await axios.get(`http://localhost:4000/api/itineraries%27`)//trae la respesta de mi api
            console.log(res)
            dispatch ({type: 'GET_ITINERARIES', payload: res.data.response.itineraries})
        }
    },

    //BUSCA ITINERARIO CON ID DE ITINERARIO
    getOneItinerary: (id) => {
        return async(dispatch,getState) => {
            const res = await axios.get(`http://localhost:4000/api/itineraries/${id}`)//trae la respesta de mi api
            console.log(res)
            dispatch ({type: 'GET_ONE_ITINERARY', payload: res.data.response})
        }//DISPATCH es un metodo que Despacha una o mas acciones al store
    },   //Y LO GUARDA EN PAYLOAD

    //BUSCA ITINERARIO CON ID DE CIUDAD
    findTinFromCity: (id) => {  
        return async(dispatch,getState) => {
            const res = await axios.get(`http://localhost:4000/api/itinerary/cities/${id}`)//trae la respesta de mi api
            console.log(res.data.response.tineraries)
            dispatch ({type: 'FIND_ITINERARIES_FROM_CITY', payload: res.data.response.tineraries},{}
            )
            return res 
        }//DISPATCH es un metodo que Despacha una o mas acciones al store
},//Y LO GUARDA EN PAYLOAD


likeDislike: (id) => {
    const token = localStorage.getItem('token') 
    return async () =>{
        try{
            let response = await axios.put(`http://localhost:4000/api/itineraries/likes/${id}`, {},
            {headers: {
                Authorization: "Bearer " + token
            }
        })
      
        return response
    }catch (error){
        console.log(error)
    }
}

}
} 
export default itinerariesActions