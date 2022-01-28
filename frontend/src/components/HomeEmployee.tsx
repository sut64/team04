import React from "react";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function HomeEmployee() {
    return(
        <div>
            <h1>This is Home Page for Employee</h1>
            <Button component={RouterLink} to="/Restroom" variant="contained">Restroom</Button>
            <Button component={RouterLink} to="/CheckIn" variant="contained">CheckIn</Button>
            <Button component={RouterLink} to="/CheckOut" variant="contained">CheckOut</Button>
            <Button component={RouterLink} to="/Reservation" variant="contained">Reservation</Button>
            <Button component={RouterLink} to="/PaymentBill" variant="contained">PaymentBill</Button>
            <Button component={RouterLink} to="/CleanInformation" variant="contained">CleanInformation</Button>
        </div>
    );
}
export default HomeEmployee;