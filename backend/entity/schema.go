package entity

import (
	"time"

	"gorm.io/gorm"
)

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
