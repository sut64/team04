package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("se-64.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&Customer{},
		&Employee{},
		&Paymentmethod{},
		&Reservation{},
		&Building{},
		&Room_type{},
		&Room_status{},
		&Restroom{},
		&Cleaninformation{},
		&Cleanservicetype{},
		&Reciept{},
		&Checkin{},
		&Checkout{},
	)
	db = database

	//ระบบห้องพัก
	// RoomType

	Type01 := Room_type{
		Room_type:  "Standard",
		Room_price: 500,
	}
	db.Model(&Room_type{}).Create(&Type01)

	Type02 := Room_type{
		Room_type:  "Duo-Standard",
		Room_price: 500,
	}
	db.Model(&Room_type{}).Create(&Type02)

	Type03 := Room_type{
		Room_type:  "Deluxe",
		Room_price: 1000,
	}
	db.Model(&Room_type{}).Create(&Type03)

	Type04 := Room_type{
		Room_type:  "Suite",
		Room_price: 2000,
	}
	db.Model(&Room_type{}).Create(&Type04)

	//RoomStatus
	Status01 := Room_status{
		Room_status: "ready to use",
	}
	db.Model(&Room_status{}).Create(&Status01)

	Status02 := Room_status{
		Room_status: "repairing",
	}
	db.Model(&Room_status{}).Create(&Status02)

	Status03 := Room_status{
		Room_status: "Reserve",
	}
	db.Model(&Room_status{}).Create(&Status03)

	//Building
	Building01 := Building{
		Building_name: "ตึก A",
		Floor:         3,
	}
	db.Model(&Building{}).Create(&Building01)

	Building02 := Building{
		Building_name: "ตึก B",
		Floor:         2,
	}
	db.Model(&Building{}).Create(&Building02)

	Building03 := Building{
		Building_name: "ตึก C",
		Floor:         4,
	}
	db.Model(&Building{}).Create(&Building03)

	//Restroom
	Restroom01 := Restroom{
		Room_number:          1,
		Building:             Building01,
		Room_type:            Type01,
		Room_status:          Status01,
		Restroom_description: "ready",
	}
	db.Model(&Restroom{}).Create(&Restroom01)
}
