import { BuildingInterface } from "./IBuilding";
import { RoomTypeInterface } from "./IRoomType";
import { RoomStatusInterface } from "./IRoomStatus";
import { EmployeeInterface } from "./IEmployee";

export interface RestroomInterface {
    ID: number,
    Room_number          : number;
	BuildingID           : number;
	Building             : BuildingInterface;
	Room_typeID          : number;
	Room_type            : RoomTypeInterface;
	Room_statusID        : number;
	Room_status          : RoomStatusInterface;
	Restroom_description : string;
	EmployeeID           : number;
	Employee             : EmployeeInterface;
	Update_date          : Date;
   }