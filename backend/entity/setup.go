package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
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

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	// ------------------------------------------------------------------------------------------------------------
	// Customer
	Customer01 := Customer{
		Customer_name:   "สมชาย ยิ่งยง",
		Customer_gender: "ชาย",
		Email:           "somchai@gmail.com",
		Password:        string(password),
	}
	db.Model(&Customer{}).Create(&Customer01)
	Customer02 := Customer{
		Customer_name:   "ชัชชาติ คงกระพันธ์",
		Customer_gender: "ชาย",
		Email:           "chutchat@gmail.com",
		Password:        string(password),
	}
	db.Model(&Customer{}).Create(&Customer02)
	Customer03 := Customer{
		Customer_name:   "สมหญิง สวยงาม",
		Customer_gender: "หญิง",
		Email:           "somying@gmail.com",
		Password:        string(password),
	}
	db.Model(&Customer{}).Create(&Customer03)
	Customer04 := Customer{
		Customer_name:   "ประยง ดำรงอยู่",
		Customer_gender: "ชาย",
		Email:           "prayyy@gmail.com",
		Password:        string(password),
	}
	db.Model(&Customer{}).Create(&Customer04)
	Customer05 := Customer{
		Customer_name:   "กำพง ดงยง",
		Customer_gender: "ชาย",
		Email:           "gumponk@gmail.com",
		Password:        string(password),
	}
	db.Model(&Customer{}).Create(&Customer05)
	Customer06 := Customer{
		Customer_name:   "สมศรี ปรีดี",
		Customer_gender: "ชาย",
		Email:           "somsee@g.sut.ac.th",
		Password:        string(password),
	}
	db.Model(&Customer{}).Create(&Customer06)
	var somchai Customer
	var chutchat Customer
	var somying Customer
	var prayyy Customer
	var gumponk Customer
	var somsee Customer
	db.Raw("SELECT * FROM customers WHERE email = ?", "somchai@gmail.com").Scan(&somchai)
	db.Raw("SELECT * FROM customers WHERE email = ?", "chutchat@gmail.com").Scan(&chutchat)
	db.Raw("SELECT * FROM customers WHERE email = ?", "somying@gmail.com").Scan(&somying)
	db.Raw("SELECT * FROM customers WHERE email = ?", "prayyy@gmail.com").Scan(&prayyy)
	db.Raw("SELECT * FROM customers WHERE email = ?", "gumponk@gmail.com").Scan(&gumponk)
	db.Raw("SELECT * FROM customers WHERE email = ?", "somsee@g.sut.ac.th").Scan(&somsee)
	// ------------------------------------------------------------------------------------------------------------
	// Employee
	Employee01 := Employee{
		Employee_name: "อัมรินทร์ เกษมพงษ์",
		Employee_tel:  "0935847689",
		Email:         "b6215293@g.sut.ac.th",
		Password:      string(password),
	}
	db.Model(&Employee{}).Create(&Employee01)

	Employee02 := Employee{
		Employee_name: "ธนากร เจนชัย",
		Employee_tel:  "0817258664",
		Email:         "Thanakon2604@gmail.com",
		Password:      string(password),
	}
	db.Model(&Employee{}).Create(&Employee02)

	Employee03 := Employee{
		Employee_name: "สิริวัณณ์ พันธ์โคกกรวด",
		Employee_tel:  "092-2544462",
		Email:         "b6119041@gmail.com",
		Password:      string(password),
	}
	db.Model(&Employee{}).Create(&Employee03)

	Employee04 := Employee{
		Employee_name: "ชินวัฒน์ ชื่นมณี",
		Employee_tel:  "085-5211622",
		Email:         "chinnawat@gmail.com",
		Password:      string(password),
	}
	db.Model(&Employee{}).Create(&Employee04)

	Employee05 := Employee{
		Employee_name: "อภิสิทธิ์ พาณิชชำนาญกุล",
		Employee_tel:  "083-3801234",
		Email:         "aphisit@gmail.com",
		Password:      string(password),
	}
	db.Model(&Employee{}).Create(&Employee05)

	Employee06 := Employee{
		Employee_name: "พิชญา สิริโภคาสาธุกิจ",
		Employee_tel:  "062-8802701",
		Email:         "pichya@g.sut.ac.th",
		Password:      string(password),
	}
	db.Model(&Employee{}).Create(&Employee06)

	// ------------------------------------------------------------------------------------------------------------

	// ระบบห้องพัก -- ฝุ่น
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

	Restroom02 := Restroom{
		Room_number:          2,
		Building:             Building02,
		Room_type:            Type02,
		Room_status:          Status01,
		Restroom_description: "ready",
	}
	db.Model(&Restroom{}).Create(&Restroom02)

	Restroom03 := Restroom{
		Room_number:          3,
		Building:             Building02,
		Room_type:            Type04,
		Room_status:          Status01,
		Restroom_description: "ready",
	}
	db.Model(&Restroom{}).Create(&Restroom03)
	// ------------------------------------------------------------------------------------------------------------
	//Paymentmethod
	Paymentmethod01 := Paymentmethod{
		Payment_type:        "โอนเงิน",
		Payment_description: "string01",
	}
	db.Model(&Paymentmethod{}).Create(&Paymentmethod01)

	Paymentmethod02 := Paymentmethod{
		Payment_type:        "เงินสด",
		Payment_description: "string02",
	}

	db.Model(&Paymentmethod{}).Create(&Paymentmethod02)

	Paymentmethod03 := Paymentmethod{
		Payment_type:        "QR Code",
		Payment_description: "string03",
	}
	db.Model(&Paymentmethod{}).Create(&Paymentmethod03)

	// ------------------------------------------------------------------------------------------------------------

	// ระบบจองห้องพัก -- มิ้ว
	// Reservation
	Reservation01 := Reservation{
		Checkin_date:    time.Now(),
		Checkout_date:   time.Now(),
		Number_customer: 2,
		Customer_tel:    "0981614221",
		Customer:        Customer02,
		Paymentmethod:   Paymentmethod01,
		Restroom:        Restroom01,
	}
	db.Model(&Reservation{}).Create(&Reservation01)

	Reservation02 := Reservation{
		Checkin_date:    time.Now(),
		Checkout_date:   time.Now(),
		Number_customer: 1,
		Customer_tel:    "0981614221",
		Customer:        Customer01,
		Paymentmethod:   Paymentmethod02,
		Restroom:        Restroom02,
	}
	db.Model(&Reservation{}).Create(&Reservation02)
	// ----------------------------------------------------------------------------------------------------------

	// Reciepts -- เจได

	Reciept01 := Reciept{
		Payment_status: "ยังไม่จ่าย",
		Price:          500,
		Payment_date:   time.Now().AddDate(2022, 1, 15),
		Payment_bill:   "url1",
		Paymentmethod:  Paymentmethod01,
		Customer_name:  "fasfahr",
		CustomerID:     &Customer02.ID,
		ReservationID:  &Reservation01.ID,
		RestroomID:     &Restroom01.ID,
		EmployeeID:     &Employee01.ID,
	}
	db.Model(&Reciept{}).Create(&Reciept01)

	Reciept02 := Reciept{
		Payment_status: "จ่ายแล้ว",
		Price:          2500,
		Payment_date:   time.Now().AddDate(2021, 12, 25),
		Payment_bill:   "url2",
		Paymentmethod:  Paymentmethod02,
		Customer_name:  "hjowirhjow",
		CustomerID:     &Customer01.ID,
		ReservationID:  &Reservation02.ID,
		RestroomID:     &Restroom02.ID,
		EmployeeID:     &Employee02.ID,
	}
	db.Model(&Reciept{}).Create(&Reciept02)

	// ----------------------------------------------------------------------------------------------------------
	// ระบบ Check-in -- เปตอง
	// Checkin
	Checkin01 := Checkin{
		Customer:                Customer02,
		Reservation:             Reservation01,
		Reciept:                 Reciept01,
		Checkin_equiptment:      "ชุดเครื่องนอนเสริม, หมอน , เก้าอี้",
		Checkin_equiptment_cost: 600,
		Checkin_datetime:        time.Now(),
		Employee:                Employee02,
	}
	db.Model(&Checkin{}).Create(&Checkin01)

	Checkin02 := Checkin{
		Customer:                Customer01,
		Reservation:             Reservation02,
		Reciept:                 Reciept02,
		Checkin_equiptment:      "ชุดเครื่องนอนเสริม, หมอน , เก้าอี้",
		Checkin_equiptment_cost: 600,
		Checkin_datetime:        time.Now(),
		Employee:                Employee04,
	}
	db.Model(&Checkin{}).Create(&Checkin02)

	// ----------------------------------------------------------------------------------------------------------
	// ระบบ Check-out -- แฮ้ม
	// Checkout
	Checkout1 := Checkout{
		Checkin:           Checkin01,
		Reservation:       Reservation01,
		Reciept:           Reciept01,
		Customer:          Customer02,
		Employee:          Employee01,
		Room_condition:    "โต๊ะ , เก้าอี้ , ตู้เย็น",
		Room_charge:       500,
		Checkout_datetime: time.Now(),
	}
	db.Model(&Checkout{}).Create(&Checkout1)

	// Check out ข้อมูล
	Checkout2 := Checkout{
		Checkin:           Checkin02,
		Reservation:       Reservation02,
		Reciept:           Reciept02,
		Customer:          Customer01,
		Employee:          Employee02,
		Room_condition:    "ฟักบัว , เตียง , แอร์",
		Room_charge:       600,
		Checkout_datetime: time.Now(),
	}
	db.Model(&Checkout{}).Create(&Checkout2)

	// ----------------------------------------------------------------------------------------------------------
	// ระบบแจ้งทำความสะอาด -- พี่เต้
	// cleanservice
	Cleanservice1 := Cleanservicetype{
		Cleanservice_type: "ทำความสะอาดทั้งห้อง",
	}
	db.Model(&Cleanservicetype{}).Create(&Cleanservice1)

	Cleanservice2 := Cleanservicetype{
		Cleanservice_type: "ทำความสะอาดห้องครัว",
	}
	db.Model(&Cleanservicetype{}).Create(&Cleanservice2)

	Cleanservice3 := Cleanservicetype{
		Cleanservice_type: "ทำความสะอาดห้องนอน",
	}
	db.Model(&Cleanservicetype{}).Create(&Cleanservice3)

	Cleanservice4 := Cleanservicetype{
		Cleanservice_type: "ทำความสะอาดห้องน้ำ",
	}
	db.Model(&Cleanservicetype{}).Create(&Cleanservice4)

	// cleaninfomation
	db.Model(&Cleaninformation{}).Create(&Cleaninformation{
		Hastelevel:       1,
		Note:             "ส้วมตันจ้า",
		Cleandate:        time.Now(),
		Customer:         Customer02,
		Restroom:         Restroom01,
		Cleanservicetype: Cleanservice4,
	})
	// Cleaninformation 2
	db.Model(&Cleaninformation{}).Create(&Cleaninformation{
		Hastelevel:       5,
		Note:             "ที่นอนมีคราบสกปรกงับ",
		Cleandate:        time.Now(),
		Customer:         Customer01,
		Restroom:         Restroom02,
		Cleanservicetype: Cleanservice3,
	})

}
