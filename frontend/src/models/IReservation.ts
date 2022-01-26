import { RestroomInterface } from "./IRestroom";
import { CustomerInterface } from "./ICustomer";
import { PaymentmethodInterfece } from "./IPaymentmethod";

export interface ReservationInterface {
    ID: number,
    Checkin_date: Date;
    Checkout_date: Date;
    Number_customer: number;
    Customer_tel: string;

    RestroomID: number;
    Restroom: RestroomInterface;

    CustomerID: number;
    Customer: CustomerInterface;

    PaymentmethodID: number;
    Paymentmethod: PaymentmethodInterfece;

}