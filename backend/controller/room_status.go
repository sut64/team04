package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team04/entity"
)

func CreateRoomStatus(c *gin.Context) {
	var room_status entity.Room_status
	if err := c.ShouldBindJSON(&room_status); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&room_status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room_status})
}

func GetRoomStatus(c *gin.Context) {
	var room_status entity.Room_status
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM room_statuses WHERE id = ?", id).Scan(&room_status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": room_status})

}

func ListRoomStatus(c *gin.Context) {
	var room_status []entity.Room_status
	if err := entity.DB().Raw("SELECT * FROM room_statuses").Scan(&room_status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room_status})
}

func DeleteRoomStatus(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM room_statuses WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room_status not found"})
		return

	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

func UpdateRoomStatus(c *gin.Context) {
	var room_status entity.Room_status
	if err := c.ShouldBindJSON(&room_status); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", room_status.ID).First(&room_status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room_status not found"})
		return
	}
	if err := entity.DB().Save(&room_status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room_status})
}
