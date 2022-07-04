import React from "react";
import '../styles/index.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
    return(
    <div className="footer">
        <a href="#"> <FacebookIcon /></a>
        <a href="#"> <TwitterIcon /></a>
         <a href="#"> <InstagramIcon /></a>

         <div className="footerNav">
            <a href="../">Home</a>
            <a href="../Cities">Cities</a>
         </div>

         <div>
             <p> Ⓒ Florencia Romano Cohort 28</p>
         </div>
       
    </div>
    
)}

export default Footer