import axios from "axios";  //importo AXIOS
                            //ACTION RECIVE LOS EVENTOS DEL FRONTEND
                            //Y SE LOS PASA A LOS REDUCERS A TRAVEZ DEL PAYLOAD

const citiesActions = { //declaro la constante

    getCities: ()=> {
        return async(dispatch, getState) =>{
            const res =await axios.get('http://localhost:4000/api/cities')//trae la respuesta de mi api
           dispatch({type: 'GETCITIES',payload:res.data.response.cities})
            //DISPATCH es un metodo que Despacha una o mas acciones al store
           //a traves de Payload 
        }
    },
    getOneCity: (id)=>{
        return async (dispatch, getState)=>{
            const res = await axios.get(`http://localhost:4000/api/cities/${id}`)//trae la respesta de mi api
            console.log(res)
            dispatch ({type: 'GET_ONE_CITY', payload:res.data.response})
        } //DISPATCH es un metodo que Despacha una o mas acciones al store
        //a trqaves de payload
    },

    filterCities: (input) => {
        
        return (dispatch, getState) =>{
            dispatch({type: "FILTERCITIES", payload:input})
        }//DISPATCH es un metodo que Despacha una o mas acciones al store
    }
}

export default citiesActions