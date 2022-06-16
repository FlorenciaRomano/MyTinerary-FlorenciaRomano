import React from "react";
import {useParams} from 'react-router-dom'
import NavBar from "../components/NavBar";
import Header from "../components/Header"
import Body from "../components/Body"
import Footer from "../components/Footer";
import ScrollToTop from "react-scroll-to-top"

export default function Index (){
    

    return(
        <div className="body">
            <NavBar/>
            <Header/>
            <Body/>
            <ScrollToTop smooth />
            <Footer/>
        </div>
    )
}