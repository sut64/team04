package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team04/entity"
)

// POST /paymentMethods
func CreatePaymentMethod(c *gin.Context) {
	var paymentMethods entity.Paymentmethod
	if err := c.ShouldBindJSON(&paymentMethods); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&paymentMethods).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": paymentMethods})
}

// GET /paymentMethods
func ListPaymentMethods(c *gin.Context) {
	var paymentMethod []entity.Paymentmethod
	if err := entity.DB().Raw("SELECT * FROM paymentMethods").Scan(&paymentMethod).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": paymentMethod})
}

// GET /paymentMethod/:id
func GetPaymentMethod(c *gin.Context) {
	var paymentMethod entity.Paymentmethod
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM paymentMethods WHERE id = ?", id).Find(&paymentMethod).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": paymentMethod})
}

// GET /paymentMethods
func ListPaymentMethod(c *gin.Context) {
	var paymentMethods []entity.Paymentmethod
	if err := entity.DB().Raw("SELECT * FROM paymentMethods").Find(&paymentMethods).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": paymentMethods})
}

// DELETE /paymentMethods/:id
func DeletePaymentMethod(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM paymentMethods WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "paymentMethod not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /paymentMethods
func UpdatePaymentMethod(c *gin.Context) {
	var paymentMethod entity.Paymentmethod
	if err := c.ShouldBindJSON(&paymentMethod); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", paymentMethod.ID).First(&paymentMethod); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "paymentMethods not found"})
		return
	}

	if err := entity.DB().Save(&paymentMethod).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": paymentMethod})
}
