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

			// room_statuses Routes
			protected.GET("/employees", controller.ListEmployee)
			protected.GET("/employee/:id", controller.GetEmployee)
			protected.POST("/employees", controller.CreateEmployee)
			protected.PATCH("/employees", controller.UpdateEmployee)
			protected.DELETE("/employees/:id", controller.DeleteEmployee)

			// Run the server
		}
	}
	r.POST("/login", controller.LoginEmployee)
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
