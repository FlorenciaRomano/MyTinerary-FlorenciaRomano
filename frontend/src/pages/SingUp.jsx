import React from "react";
import LoginUp from "../components/LoginUp";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function SignUp (){
    

    return(
        <div>
                 <div>
        <NavBar/>
        </div>
            <LoginUp/>

            <div  className="FoooterSign">
        <Footer/>
        </div>
        </div>
    )
}