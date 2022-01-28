import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
import Navbar from "./components/Navbar";
import HomeCustomer from "./components/HomeCustomer";
import Restroom from "./components/Restroom";
import RestroomCreate from "./components/RestroomCreate";
import CheckIn from "./components/CheckIn";
import CheckInCreate from "./components/CheckInCreate";
import CheckOut from "./components/CheckOut";
import CheckOutCreate from "./components/CheckOutCreate";
import PaymentResult from "./components/PaymentResult";
import PaymentBill from "./components/PaymentBill";
import Reservation from "./components/Reservation";
import ReservationCreate from "./components/ReservationCreate";
import CleanInformation from "./components/CleanInformation";
import HomeEmployee from "./components/HomeEmployee";
import CleanInformationCreate from "./components/CleanInformationCreate";
import SignIn from "./components/SignIn";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
 
export default function App() {
  const [token, setToken] = React.useState<String>("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      
    }
    
    
  }, []);
    
    if (!token) {
      return <SignIn />;
    }
   
  
  
  
 return (
   <Router>
      
     <div>
       
       <Navbar />
       
         

        <Routes>
            <Route path='/' element={<HomeCustomer/>} />
            <Route path='/Restroom' element={<Restroom/>} />
            <Route path='/RestroomCreate' element={<RestroomCreate/>} />
            <Route path='/CheckIn' element={<CheckIn/>} />
            <Route path='/CheckInCreate' element={<CheckInCreate/>} />
            <Route path='/CheckOut' element={<CheckOut/>} />
            <Route path='/CheckOutCreate' element={<CheckOutCreate/>} />
            <Route path='/Reservation' element={<Reservation/>} />
            <Route path='/ReservationCreate' element={<ReservationCreate/>} />
            <Route path='/CleanInformation' element={<CleanInformation/>} />
            <Route path='/CleanInformationCreate' element={<CleanInformationCreate/>} />
            <Route path='/PaymentResult' element={<PaymentResult/>} />
            <Route path='/PaymentBill' element={<PaymentBill/>} />
        </Routes>
     </div>
   </Router>
 );
}
