package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team04/entity"
)

func CreateRoomType(c *gin.Context) {
	var room_type entity.Room_type
	if err := c.ShouldBindJSON(&room_type); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&room_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room_type})
}

func GetRoomType(c *gin.Context) {
	var room_type entity.Room_type
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM room_types WHERE id = ?", id).Scan(&room_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": room_type})

}

func ListRoomType(c *gin.Context) {
	var room_type []entity.Room_type
	if err := entity.DB().Raw("SELECT * FROM room_types").Scan(&room_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room_type})
}

func DeleteRoomType(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM room_statuses WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room_types not found"})
		return

	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

func UpdateRoomType(c *gin.Context) {
	var room_type entity.Room_type
	if err := c.ShouldBindJSON(&room_type); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", room_type.ID).First(&room_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room_types not found"})
		return
	}
	if err := entity.DB().Save(&room_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room_type})
}
