import React from "react";
import Login from "../components/Login";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function SignIn (){
    

    return(
        <div>
             <div>
        <NavBar/>
        </div>
          
            <Login/>
            

            <div className="FoooterSign">
        <Footer/>
        </div>
        </div>
    )
}