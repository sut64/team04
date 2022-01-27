import { EmployeeInterface } from "./IEmployee";
import { PaymentmethodInterfece } from "./IPaymentmethod";
import { ReservationInterface } from "./IReservation";
import { RestroomInterface } from "./IRestroom";
import { CustomerInterface } from "./ICustomer";

export interface RecieptInterface {

    //Recieept
	//PaymentResult
    ID: number,

    Payment_status: string;
	Price:          number;
	Payment_date:   Date;
	Payment_bill:   string;

	////
	Customer_name: string; ////เพิ่มมา
	////

	PaymentmethodID: number;
	Paymentmethod:	PaymentmethodInterfece;

	ReservationID: number;
	Reservation: ReservationInterface;

	RestroomID: number;
	Restroom:	RestroomInterface;

	EmployeeID: number;
	Employee: EmployeeInterface;

	CustomerID: number;
	Customer: CustomerInterface;
   }