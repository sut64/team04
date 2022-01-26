package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sut64/team04/controller"
	"github.com/sut64/team04/entity"
	"github.com/sut64/team04/middlewares"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{

			// Employee Routes
			protected.GET("/employees", controller.ListEmployee)
			protected.GET("/employee/:id", controller.GetEmployee)
			protected.POST("/employees", controller.CreateEmployee)
			protected.PATCH("/employees", controller.UpdateEmployee)
			protected.DELETE("/employees/:id", controller.DeleteEmployee)
			// Customer Routes
			protected.GET("/customers", controller.ListCustomers)
			protected.GET("/customer/:id", controller.GetCustomer)
			protected.POST("/customers", controller.CreateCustomer)
			protected.PATCH("/customers", controller.UpdateCustomer)
			protected.DELETE("/customers/:id", controller.DeleteCustomer)

			// -------------------------------------------------------------------------------------------
			// ระบบห้องพัก -- ฝุ่น
			// Restroom Routes
			protected.GET("/restrooms", controller.ListRestroom)
			protected.GET("/restroom/:id", controller.GetRestroom)
			protected.POST("/restrooms", controller.CreateRestroom)
			protected.PATCH("/restrooms", controller.UpdateRestroom)
			protected.DELETE("/restrooms/:id", controller.DeleteRestroom)

			// buildings Routes
			protected.GET("/buildings", controller.ListBuilding)
			protected.GET("/building/:id", controller.GetBuilding)
			protected.POST("/buildings", controller.CreateBuilding)
			protected.PATCH("/buildings", controller.UpdateBuilding)
			protected.DELETE("/buildings/:id", controller.DeleteBuilding)

			// room_types Routes
			protected.GET("/room_types", controller.ListRoomType)
			protected.GET("/room_type/:id", controller.GetRoomType)
			protected.POST("/room_types", controller.CreateRoomType)
			protected.PATCH("/room_types", controller.UpdateRoomType)
			protected.DELETE("/room_types/:id", controller.DeleteRoomType)

			// room_statuses Routes
			protected.GET("/room_statuses", controller.ListRoomStatus)
			protected.GET("/room_status/:id", controller.GetRoomStatus)
			protected.POST("/room_statuses", controller.CreateRoomStatus)
			protected.PATCH("/room_statuses", controller.UpdateRoomStatus)
			protected.DELETE("/room_statuses/:id", controller.DeleteRoomStatus)

			// -------------------------------------------------------------------------------------------

			// PaymentMethod Routes
			protected.GET("/paymentmethods", controller.ListPaymentMethods)
			protected.GET("/paymentmethod/:id", controller.GetPaymentMethod)
			protected.POST("/paymentmethods", controller.CreatePaymentMethod)
			protected.PATCH("/paymentmethods", controller.UpdatePaymentMethod)
			protected.DELETE("/paymentmethods/:id", controller.DeletePaymentMethod)

			// -------------------------------------------------------------------------------------------
			// ระบบจองห้องพัก -- มิ้ว
			// Reservation Routes
			protected.GET("/reservations", controller.ListReservations)
			protected.GET("/reservation/:id", controller.GetReservation)
			protected.POST("/reservations", controller.CreateReservation)
			protected.PATCH("/reservations", controller.UpdateReservation)
			protected.DELETE("/reservations/:id", controller.DeleteReservation)

			// -------------------------------------------------------------------------------------------
			// ระบบชำระเงิน -- เจได
			//	Reciepts
			protected.GET("/reciepts", controller.ListReciepts)
			protected.GET("/reciept/:id", controller.GetReciept)
			protected.POST("/reciepts", controller.CreateReciept)
			protected.PATCH("/reciepts", controller.UpdateReciept)
			protected.DELETE("/reciepts/:id", controller.DeleteReciept)

			// -------------------------------------------------------------------------------------------
			// ระบบ Check-in -- เปตอง
			// Checkin
			protected.GET("/checkins", controller.ListCheckins)
			protected.GET("/checkin/:id", controller.GetCheckins)
			protected.POST("/checkins", controller.CreateCheckins)
			protected.PATCH("/checkins", controller.UpdateCheckins)
			protected.DELETE("/checkins/:id", controller.DeleteCheckins)

			// -------------------------------------------------------------------------------------------
			// ระบบ Check-out -- แฮ้ม
			// Checkout
			protected.GET("/checkouts", controller.ListCheckout)
			protected.GET("/checkout/:id", controller.GetCheckout)
			protected.POST("/checkouts", controller.CreateCheckout)
			protected.PATCH("/checkouts", controller.UpdateCheckout)
			protected.DELETE("/checkouts/:id", controller.DeleteCheckout)

			// -------------------------------------------------------------------------------------------
			// ระบบแจ้งทำความสะอาด
			// Cleanservicetype Routes
			protected.POST("/cleanservicetypes", controller.CreateCleanservicetype)
			protected.GET("/cleanservicetype/:id", controller.GetCleanservicetype)
			protected.GET("/cleanservicetypes", controller.ListCleanservicetypes)
			protected.PATCH("/cleanservicetypes", controller.UpdateCleanservicetype)
			protected.DELETE("/cleanservicetypes/:id", controller.DeleteCleanservicetype)

			// Cleaninformation Routes
			protected.GET("/cleaninformations", controller.ListCleaninformations)
			protected.GET("/cleaninformation/:id", controller.GetCleaninformation)
			protected.POST("/cleaninformations", controller.CreateCleaninformation)
			protected.PATCH("/cleaninformations", controller.UpdateCleaninformation)
			protected.DELETE("/cleaninformations/:id", controller.DeleteCleaninformation)

			// -------------------------------------------------------------------------------------------
		}
	}

	// Authentication Routes
	r.POST("/login", controller.LoginReservation)

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}

}
