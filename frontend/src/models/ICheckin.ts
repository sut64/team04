import { CustomerInterface } from "./ICustomer";
import { EmployeeInterface } from "./IEmployee";
import { RecieptInterface } from "./IReciept";
import { ReservationInterface } from "./IReservation";

export interface CheckinInterface {
  ID: number,

  CustomerID: number,
  Customer: CustomerInterface,
 
  RecieptID: number,
  Reciept: RecieptInterface,

  ReservationID: number,
  Reservation: ReservationInterface,

	Checkin_equiptment:      string,
	Checkin_equiptment_cost: number,
  Checkin_datetime:   Date,
  
  EmployeeID: number,
  Employee: EmployeeInterface,
  
  
}
 