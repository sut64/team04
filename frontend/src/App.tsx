import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import UserCreate from "./components/UserCreate";
import Home from "./components/Home";
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
import CleanInformationCreate from "./components/CleanInformationCreate";
 
export default function App() {
 return (
   <Router>
     <div>
       <Navbar />
        <Routes>
            <Route path='/' element={<Home/>} />
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