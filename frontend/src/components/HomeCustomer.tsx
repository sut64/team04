import React from "react";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function HomeCustomer() {

    const loginstat = localStorage.getItem("loginstat");
    
        if (loginstat === "2"){
            return(
                <div>
            
            <Button component={RouterLink} to="/CleanInformation" variant="contained">CleanInformation</Button>
           <Button component={RouterLink} to="/Reservation" variant="contained">Reservation</Button>
           </div>)
         }
        if (loginstat === "1"){
            return(
            <div>
           <Button component={RouterLink} to="/Restroom" variant="contained">Restroom</Button> 
            <Button component={RouterLink} to="/CheckIn" variant="contained">CheckIn</Button>
            <Button component={RouterLink} to="/CheckOut" variant="contained">CheckOut</Button>  
            <Button component={RouterLink} to="/PaymentBill" variant="contained">PaymentBill</Button>
        
           </div>)}
    return(
        <div>
        </div>
    );
}
export default HomeCustomer;