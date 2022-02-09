package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut64/team04/entity"
)

func CreateRestroom(c *gin.Context) {
	var restroom entity.Restroom
	var building entity.Building
	var roomtype entity.Room_type
	var roomstatus entity.Room_status
	var employee entity.Employee

	if err := c.ShouldBindJSON(&restroom); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", restroom.BuildingID).First(&building); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "building not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", restroom.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", restroom.Room_typeID).First(&roomtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "roomtype not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", restroom.Room_statusID).First(&roomstatus); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "roomstatus not found"})
		return
	}

	ap := entity.Restroom{
		Room_number:          restroom.Room_number,
		Building:             building,
		Room_type:            roomtype,
		Room_status:          roomstatus,
		Employee:             employee,
		Restroom_description: restroom.Restroom_description,
		Update_date:          restroom.Update_date,
	}

	if _, err := govalidator.ValidateStruct(ap); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&ap).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ap})
}

func ListRestroom(c *gin.Context) {
	var restroom []entity.Restroom
	if err := entity.DB().Preload("Building").Preload("Room_type").Preload("Room_status").Preload("Employee").Raw("SELECT * FROM restrooms").Find(&restroom).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": restroom})
}

func GetRestroom(c *gin.Context) {
	var restroom entity.Restroom
	id := c.Param("id")
	if err := entity.DB().Preload("Building").Preload("Room_type").Preload("Room_status").Preload("Employee").Raw("SELECT * FROM restrooms WHERE id = ?", id).Find(&restroom).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": restroom})

}

func DeleteRestroom(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM restrooms WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "restroom not found"})
		return

	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

func UpdateRestroom(c *gin.Context) {
	var restroom entity.Restroom
	if err := c.ShouldBindJSON(&restroom); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", restroom.ID).First(&restroom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "restroom not found"})
		return
	}
	if err := entity.DB().Save(&restroom).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": restroom})
}
