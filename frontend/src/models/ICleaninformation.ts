import { CleanservicetypeInterface  } from "./ICleanservicetype";
import { RestroomInterface  } from "./IRestroom";
import { CustomerInterface  } from "./ICustomer";

export interface CleaninformationInterface {
    ID: number,

	CustomerID: number,
	Customer:   CustomerInterface,

	CleanservicetypeID:number,
	Cleanservicetype:  CleanservicetypeInterface,

	RestroomID: number,
	Restroom:   RestroomInterface,

    Customer_name :  string,
    Room_number: number,
    Cleanservice_type: string,
    Hastelevel: number,
	Cleandate:  Date,
	Note: string,

   
   }
   
   