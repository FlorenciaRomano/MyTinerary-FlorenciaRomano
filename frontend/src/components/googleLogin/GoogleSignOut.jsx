import React ,{ useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import userAction from '../../Redux/action/userAction';


function GoogleSignUp() {
    const dispatch = useDispatch();
    async function handleCallbackResponse(response){

        console.log(response.credential);

    let  userObject = jwt_decode(response.credential); // guardamos en userObject-credencial son los datos especificos que vamos a requerir
    //descodificamos (respuesta y credencial)
    console.log(userObject)
    dispatch(userAction. signUp({
       fullName: userObject.given_name,
       email: userObject.email,
       country: "Argentina",
       password:userObject.sub,
       avatar:userObject.picture,
       from:'google'
    }))
}

useEffect(() => {
    /*global google*/ //certifica cloud id para cerificar en que cuenta estamos haciendo esto
    google.accounts.id.initialize({ //inicializamos con client id
        client_id : '556028616922-59ljqe7i7ug24kbcf3uji06mvpju3tl5.apps.googleusercontent.com',
        callback: handleCallbackResponse //me trae la info que necesito
    });
    google.accounts.id.renderButton(
        document.getElementById('buttonDiv'),
        { theme: "outline" , size:"medium"} 
    )
});

return(
    <div>
        <div id='buttonDiv'></div>
    </div>
)
}

export default GoogleSignUp