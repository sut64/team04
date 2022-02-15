package entity

import (
	"fmt"
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

//-----------ระบบสมาชิก----------------//

type Customer struct {
	gorm.Model
	Customer_name   string
	Customer_gender string
	Email           string `gorm:"uniqueIndex"`
	Password        string

	Reciepts          []Reciept          `gorm:"foreignKey:CustomerID"`
	Checkins          []Checkin          `gorm:"foreignKey:CustomerID"`
	Checkouts         []Checkout         `gorm:"foreignKey:CustomerID"`
	Reservations      []Reservation      `gorm:"foreignKey:CustomerID"`
	Cleaninformations []Cleaninformation `gorm:"foreignKey:CustomerID"`
}

type Employee struct {
	gorm.Model
	Employee_name string
	Employee_tel  string
	Email         string
	Password      string

	Restrooms []Restroom `gorm:"foreignKey:EmployeeID"`
	Checkins  []Checkin  `gorm:"foreignKey:EmployeeID"`
	Checkouts []Checkout `gorm:"foreignKey:EmployeeID"`
	Reciepts  []Reciept  `gorm:"foreignKey:EmployeeID"`
}

//------------ระบบห้องพัก---------------//

type Restroom struct {
	gorm.Model
	Room_number          uint `gorm:"uniqueIndex" valid:"int~หมายเลขห้องต้องเป็นตัวเลขเท่านั้น,required~หมายเลขห้องต้องไม่ว่าง,range(1|999)~หมายเลขห้องต้องไม่เกิน3หลัก"`
	BuildingID           *uint
	Building             Building `gorm:"references:id"`
	Room_typeID          *uint
	Room_type            Room_type `gorm:"references:id"`
	Room_statusID        *uint
	Room_status          Room_status `gorm:"references:id"`
	Restroom_description string      `valid:"stringlength(0|20)~คำอธิบายต้องไม่เกิน 20 ตัวอักษร "`
	EmployeeID           *uint
	Employee             Employee
	Update_date          time.Time `valid:"past~วันที่อัพเดทข้อมูลต้องไม่เป็นอนาคต"`

	Reservations      []Reservation      `gorm:"foreignKey:RestroomID"`
	Reciepts          []Reciept          `gorm:"foreignKey:RestroomID"`
	Cleaninformations []Cleaninformation `gorm:"foreignKey:RestroomID"`
}

type Building struct {
	gorm.Model
	Building_name string
	Floor         uint
	Restrooms     []Restroom `gorm:"foreignKey:BuildingID"`
}

type Room_type struct {
	gorm.Model
	Room_type  string
	Room_price uint
	Restrooms  []Restroom `gorm:"foreignKey:Room_typeID"`
}

type Room_status struct {
	gorm.Model
	Room_status string
	Restrooms   []Restroom `gorm:"foreignKey:Room_statusID"`
}

//------------ระบบจองห้องพัก---------------//

type Reservation struct {
	gorm.Model
	Checkin_date    time.Time `valid:"future~วันที่ต้องการ Check-in ต้องไม่เป็นวันในอดีต"`
	Checkout_date   time.Time `valid:"future~วันที่ต้องการ Check-out ต้องไม่เป็นวันในอดีต"`
	Number_customer uint
	Customer_tel    string `valid:"matches(^[0]\\d{9}$)~เบอร์โทรศัพท์ : %s ต้องมี 10 หลัก,numeric"`

	CustomerID *uint
	Customer   Customer `gorm:"references:id" valid:"-"`

	PaymentmethodID *uint
	Paymentmethod   Paymentmethod `gorm:"references:id" valid:"-"`

	RestroomID *uint
	Restroom   Restroom `gorm:"references:id" valid:"-"`

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

	Customer_name string ////เพิ่มมาทีหลัง

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
	Reservations        []Reservation `gorm:"foreignKey:PaymentmethodID"`
}

//------------ระบบCheck-in---------------//
type Checkin struct {
	gorm.Model
	CustomerID              *uint
	Customer                Customer `gorm:"references:id" valid:"-"`
	EmployeeID              *uint
	Employee                Employee `gorm:"references:id" valid:"-"`
	ReservationID           *uint
	Reservation             Reservation `gorm:"references:id" valid:"-"`
	RecieptID               *uint
	Reciept                 Reciept   `gorm:"references:id" valid:"-"`
	Checkin_datetime        time.Time `valid:"future~วันที่ Checkin ต้องไม่เป็นอดีต"`
	Checkin_equiptment      string    `valid:"stringlength(0|800)~อุปกรณ์เสริมความยาวไม่เกิน 800 ตัวอักษร"`
	Checkin_equiptment_cost int       `valid:"matches(^[1234567890])~ค่าอุปกรณ์เสริมต้องไม่ติดลบ"`

	Checkouts []Checkout `gorm:"foreignKey:CheckinID"`
}

//------------ระบบทำความสะอาด---------------//
type Cleaninformation struct {
	gorm.Model

	Hastelevel uint      `valid:"range(0|5)~ต้องอยู่ระหว่าง 0-5 เท่านั้น"`
	Cleandate  time.Time `valid:"future~วันที่ทำความสะอาดต้องไม่เป็นอดีต"`
	Note       string    `valid:"stringlength(0|2000)~Note ไม่สามารถเกิน 2000 ตัวอักษรได้"`

	CustomerID *uint
	Customer   Customer `gorm:"references:id" valid:"-"`

	CleanservicetypeID *uint
	Cleanservicetype   Cleanservicetype `gorm:"references:id" valid:"-"`

	RestroomID *uint
	Restroom   Restroom `gorm:"references:id" valid:"-"`
}
type Cleanservicetype struct {
	gorm.Model
	Cleanservice_type string
	Cleaninformations []Cleaninformation `gorm:"foreignKey:CleanservicetypeID"`
}

//------------ระบบ check-out---------------//
type Checkout struct {
	gorm.Model
	Checkout_datetime time.Time `valid:"future~วันที่ Checkout ต้องไม่เป็นวันในอดีต"`
	Room_condition    string    `valid:"stringlength(0|2000)~สภาพห้องความยาวต้องไม่เกิน 2000 ตัวอักษร"`
	Room_charge       int       `valid:"matches(^[1234567890])~ค่าปรับต้องไม่ติดลบ"`
	//Customer_id ทำหน้าที่เป็น FK
	CustomerID *uint
	Customer   Customer `gorm:"references:id" valid:"-"`

	//Employee_id ทำหน้าที่เป็น FK
	EmployeeID *uint
	Employee   Employee `gorm:"references:id" valid:"-"`

	//Checkin_id ทำหน้าที่เป็น FK
	CheckinID *uint
	Checkin   Checkin `gorm:"references:id" valid:"-"`

	//Reservation_id ทำหน้าที่เป็น FK
	ReservationID *uint
	Reservation   Reservation `gorm:"references:id" valid:"-"`

	//Reciept_id ทำหน้าที่เป็น FK
	RecieptID *uint
	Reciept   Reciept `gorm:"references:id" valid:"-"`
}

// -----------------------------------------------------------------------------
func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})
	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now())
	})
}

func CannotLessthanOne(t uint) (bool, error) {
	if t < 1 {
		return false, fmt.Errorf("จำนวนคนที่ต้องการเข้าพักต้องไม่ต่ำกว่า 1 คน")
	} else {
		return true, nil
	}
}
