package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team04/entity"
)

// POST /cleaninformations
func CreateCleaninformation(c *gin.Context) {

	var cleaninformation entity.Cleaninformation
	var customer entity.Customer
	var cleanservicetype entity.Cleanservicetype
	var restroom entity.Restroom

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร cleaninformation
	if err := c.ShouldBindJSON(&cleaninformation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา customer ด้วย id
	if tx := entity.DB().Where("id = ?", cleaninformation.CustomerID).First(&customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "customer not found"})
		return
	}

	// 10: ค้นหา cleanservicetype ด้วย id
	if tx := entity.DB().Where("id = ?", cleaninformation.CleanservicetypeID).First(&cleanservicetype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cleanservicetype not found"})
		return
	}

	// 11: ค้นหา restroom ด้วย id
	if tx := entity.DB().Where("id = ?", cleaninformation.RestroomID).First(&restroom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "restroom not found"})
		return
	}
	// 12: สร้าง Cleaninformation
	Ci := entity.Cleaninformation{
		Hastelevel:       cleaninformation.Hastelevel,
		Note:             cleaninformation.Note,
		Cleandate:        cleaninformation.Cleandate,
		Customer:         customer,
		Restroom:         restroom,
		Cleanservicetype: cleanservicetype,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&Ci).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Ci})
}

// GET /cleaninformation/:id
func GetCleaninformation(c *gin.Context) {
	var cleaninformation entity.Cleaninformation
	id := c.Param("id")
	if err := entity.DB().Preload("Customer").Preload("Restroom").Preload("Cleanservicetype").Raw("SELECT * FROM cleaninformations WHERE id = ?", id).Find(&cleaninformation).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cleaninformation})
}

// GET /cleaninformations
func ListCleaninformations(c *gin.Context) {
	var cleaninformations []entity.Cleaninformation
	if err := entity.DB().Preload("Customer").Preload("Restroom").Preload("Cleanservicetype").Raw("SELECT * FROM cleaninformations").Find(&cleaninformations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cleaninformations})
}

// DELETE /cleaninformations/:id
func DeleteCleaninformation(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM cleaninformations WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cleaninformation not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /cleaninformations
func UpdateCleaninformation(c *gin.Context) {
	var cleaninformations entity.Cleaninformation
	if err := c.ShouldBindJSON(&cleaninformations); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", cleaninformations.ID).First(&cleaninformations); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cleaninformation not found"})
		return
	}

	if err := entity.DB().Save(&cleaninformations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cleaninformations})
}
