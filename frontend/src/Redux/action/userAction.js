import axios from 'axios'


const userActions = {
    signUp: (userData)=>{
    return async (dispatch, getState) =>{
        console.log(userData);
        try{
        const res = await axios.post(`http://localhost:4000/api/auth/signUp`, {userData})
        console.log(res);
        console.log(res.data.response);
    if(res.data.success === true){dispatch({
        type: "MESSAGE",
        payload: {
            view: true,
            message: res.data.message,
            success: res.data.success,
            
        }
    })}
    else{
        console.log(res.data.message);
        dispatch({
            type: "MESSAGE",
            payload: {
                view: true,
                message: res.data.message,
                success: res.data.success,
                
            }
        })
    }

    return res;
    }catch (error){
        console.log(error);
    }
    }   
},
    
    logInUser: (logedUser)=>{
        return async (dispatch, getState) =>{
            try{
            const res = await axios.post(`http://localhost:4000/api/auth/signIn`, {logedUser})
            console.log(res);
            if(res.data.success){ //SI ES TRUE
                localStorage.setItem('token',res.data.response.token)// TOMA EL TOKEN Y LO MANDA AL LOCALSTORE
                    console.log(localStorage.getItem('token'))
                dispatch({
                    type: "USER",
                    payload: res.data.response
                });
                
            }else{
             dispatch({
                    type: "MESSAGE",
                    payload:{
                        view: true,
                        message: res.data.message,
                        success: res.data.success,
                    },
                });
            }
            return res
        } catch (error){
            console.log(error)
        }
        };
    },

    signOut:() => {
        return  (dispatch, getState) => {
    
          localStorage.removeItem('token')
          dispatch({type:'USER', payload:null}) 
        }
      },

    // signOut: (closeUser) => {
    //     return async (dispatch, getState) => {
    //         await axios.post('http://localhost:4000/api/signOut',{closeUser})
    //         localStorage.removeItem('token')
    //         dispatch({
    //             type: 'USER',
    //             payload: null
    //         })
    //     }
    // },

    verifyToken: (token) => {
        return async (dispatch, getState) => {
            //console.log(token)
            await axios.get("http://localhost:4000/api/auth/verifyToken", {headers: {'Authorization': 'Bearer '+token}} )
            //bearer es un metodo de autorizacion donde le pasamos el token
            .then(user =>{if
                (user.data.success) {
                    dispatch({
                        type: 'USER',
                        payload: user.data.response
                    })
                    dispatch({
                        type: 'MESSAGE',
                        payload: {
                            view: true,
                            message: user.data.message,
                            success: user.data.success
                        }
                });
                } else {
                    localStorage.removeItem('token')
                }
            }
            ).catch(error => {
                if(error.response.status === 401)
                    dispatch({
                        type: 'MESSAGE',
                        payload: {
                            view: true,
                            message: "Your token is expired, please sign in again",
                            success: false
                        }
                    })
            localStorage.removeItem('token')})
        }
    }


}
export default userActions


// import axios from 'axios';

// const userActions = {
//     signUp: (userData) => {
//         return async(dispatch, getState) => {
//             console.log(userData)
//             try{
//                 const res = await axios.post('http://localhost:4000/api/auth/signUp' , {userData}) //CREO QUE ACA ME FALTA EL AUTH
//                console.log(res)
//                 dispatch({type: 'MESSAGE', 
//             payload:{
//                 view: true,
//                 message: res.data.message,
//                 success: res.data.success
//             }
//         })  
//         return res
//     } catch(error){
//         console.log(' ERROR EN USERACTION')
//     }
//             }
//         }}

//     // const initialState = { 
//     //     user: null,
//     //     snackbar: {
//     //         view: false,
//     //         message: '',
//     //         success: false
//     //     }
//     // }
 
//     // const userReducer = (state = initialState, action) => { 
//     //     switch (action.type){
//     //         case 'USER':
//     //             return {
//     //                 ...state,
//     //                 user: action.payload,
//     //             }
            
//     //         case 'MESSAGE':
//     //             return{
//     //                 ...state,
//     //                 snackbar: action.payload,
//     //             }

//     //         default:
//     //             return state
//     //     }
//     // }

//     export default userActions
