package entity

import (
	"time"

	"gorm.io/gorm"
)

//-----------ระบบสมาชิก----------------//
type Customer struct {
	gorm.Model
	Customer_name   string
	Customer_gender string
	Employee_tel    string
	Email           string
	Password        string

	Reciepts          []Reciept          `gorm:"foreignKey:CustomerID"`
	Checkins          []Checkin          `gorm:"foreignKey:CustomerID"`
	Checkouts         []Checkout         `gorm:"foreignKey:CustomerID"`
	Reservations      []Reservation      `gorm:"foreignKey:CustomerID"`
	Cleaninformations []Cleaninformation `gorm:"foreignKey:CustomerID"`
}

type Employee struct {
	gorm.Model
	Employee_name   string
	Customer_gender string
	Employee_tel    string
	Email           string
	Password        string

	Restrooms []Restroom `gorm:"foreignKey:EmployeeID"`
	Checkins  []Checkin  `gorm:"foreignKey:EmployeeID"`
	Checkouts []Checkout `gorm:"foreignKey:EmployeeID"`
	Reciepts  []Reciept  `gorm:"foreignKey:EmployeeID"`
}

//------------ระบบห้องพัก---------------//

type Restroom struct {
	gorm.Model
	Room_number          uint `gorm:"uniqueIndex"`
	BuildingID           *uint
	Building             Building `gorm:"references:id"`
	Room_typeID          *uint
	Room_type            Room_type `gorm:"references:id"`
	Room_statusID        *uint
	Room_status          Room_status `gorm:"references:id"`
	Restroom_description string
	EmployeeID           *uint
	Employee             Employee
	Update_date          time.Time
	Reservations         []Reservation      `gorm:"foreignKey:RestroomID"`
	Reciepts             []Reciept          `gorm:"foreignKey:RestroomID"`
	Cleaninformations    []Cleaninformation `gorm:"foreignKey:RestroomID"`
}

type Building struct {
	gorm.Model
	Building_name string
	Floor         uint
	Restrooms     []Restroom `gorm:"foreignKey:BuildingID"`
}

type Room_type struct {
	gorm.Model
	Room_type string
	Restrooms []Restroom `gorm:"foreignKey:Room_typeID"`
}

type Room_status struct {
	gorm.Model
	Room_status string
	Restrooms   []Restroom `gorm:"foreignKey:Room_statusID"`
}

//------------ระบบจองห้องพัก---------------//

type Reservation struct {
	gorm.Model
	Checkin_date    time.Time
	Checkout_date   time.Time
	Number_customer uint
	Customer_tel    string

	CustomerID *uint
	Customer   Customer

	PaymentmethodID *uint
	Paymentmethod   Paymentmethod

	RestroomID *uint
	Restroom   Restroom

	Reciepts  []Reciept  `gorm:"foreignKey:ReservationID"`
	Checkins  []Checkin  `gorm:"foreignKey:ReservationID"`
	Checkouts []Checkout `gorm:"foreignKey:ReservationID"`
}

//------------ระบบชำระเงิน---------------//

type Reciept struct {
	gorm.Model
	Payment_status string
	Price          uint
	Payment_date   time.Time
	Payment_bill   string

	PaymentmethodID *uint
	Paymentmethod   Paymentmethod

	ReservationID *uint
	Reservation   Reservation

	RestroomID *uint
	Restroom   Restroom

	EmployeeID *uint
	Employee   Employee

	CustomerID *uint
	Customer   Customer

	Checkins  []Checkin  `gorm:"foreignKey:RecieptID"`
	Checkouts []Checkout `gorm:"foreignKey:RecieptID"`
}

type Paymentmethod struct {
	gorm.Model
	Payment_type        string
	Payment_description string
	Reciepts            []Reciept     `gorm:"foreignKey:PaymentmethodID"`
	Reservation         []Reservation `gorm:"foreignKey:PaymentmethodID"`
}

type Checkout struct {
	gorm.Model
	Checkout_datetime time.Time
	Room_condition    string
	Room_charge       uint

	//Customer_id ทำหน้าที่เป็น FK
	CustomerID *uint
	Customer   Customer

	//Employee_id ทำหน้าที่เป็น FK
	EmployeeID *uint
	Employee   Employee

	//Checkin_id ทำหน้าที่เป็น FK
	CheckinID *uint
	Checkin   Checkin

	//Reservation_id ทำหน้าที่เป็น FK
	ReservationID *uint
	Reservation   Reservation

	//Reciept_id ทำหน้าที่เป็น FK
	RecieptID *uint
	Reciept   Reciept
}
