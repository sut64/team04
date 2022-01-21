package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sut64/team04/controller"
	"github.com/sut64/team04/entity"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	// Restroom Routes
	r.GET("/restrooms", controller.ListRestrooms)
	r.GET("/restroom/:id", controller.GetRestroom)
	r.POST("/restrooms", controller.CreateRestroom)
	r.PATCH("/restrooms", controller.UpdateRestroom)
	r.DELETE("/restrooms/:id", controller.DeleteRestroom)

	// Restroom Routes
	r.GET("/buildings", controller.ListBuilding)
	r.GET("/building/:id", controller.GetBuilding)
	r.POST("/buildings", controller.CreateBuilding)
	r.PATCH("/buildings", controller.UpdateBuilding)
	r.DELETE("/buildings/:id", controller.DeleteBuilding)

	// Restroom Routes
	r.GET("/room_types", controller.ListRoomType)
	r.GET("/room_type/:id", controller.GetRoomType)
	r.POST("/room_types", controller.CreateRoomType)
	r.PATCH("/room_types", controller.UpdateRoomType)
	r.DELETE("/room_types/:id", controller.DeleteRoomType)

	// Restroom Routes
	r.GET("/room_statuses", controller.ListRoomStatus)
	r.GET("/room_status/:id", controller.GetRoomStatus)
	r.POST("/room_statuses", controller.CreateRoomStatus)
	r.PATCH("/room_statuses", controller.UpdateRoomStatus)
	r.DELETE("/room_statuses/:id", controller.DeleteRoomStatus)
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
