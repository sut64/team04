import { CustomerInterface } from "./ICustomer";
import { EmployeeInterface } from "./IEmployee";
import { RecieptInterface } from "./IReciept";
import { ReservationInterface } from "./IReservation";
import { CheckinInterface } from "./ICheckin";

export interface CheckoutInterface {
  ID: number,

  CustomerID: number,
  Customer: CustomerInterface,

  EmployeeID: number,
  Employee: EmployeeInterface,
  
  RecieptID: number,
  Reciept: RecieptInterface,

  ReservationID: number,
  Reservation: ReservationInterface,

  CheckinID: number,
  Checkin: CheckinInterface,

  Checkout_datetime:   Date,
  Room_condition:      string,
  Room_charge: number,
  
}
 