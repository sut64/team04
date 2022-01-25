package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team04/entity"
)

// POST /Reservation
func CreateReservation(c *gin.Context) {

	var reservation entity.Reservation
	var restroom entity.Restroom
	var paymentmethod entity.Paymentmethod
	var customer entity.Customer

	if err := c.ShouldBindJSON(&reservation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา Restroom ด้วย id
	if tx := entity.DB().Where("id = ?", reservation.RestroomID).First(&restroom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Restroom not found"})
		return
	}

	// ค้นหา Customer ด้วย id
	if tx := entity.DB().Where("id = ?", reservation.CustomerID).First(&customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Customer not found"})
		return
	}

	// ค้นหา Paymentmethod ด้วย id
	if tx := entity.DB().Where("id = ?", reservation.PaymentmethodID).First(&paymentmethod); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PaymentMethod not found"})
		return
	}

	//  สร้าง Reservation
	reserve := entity.Reservation{
		Customer:        customer,
		Checkin_date:    reservation.Checkin_date,
		Checkout_date:   reservation.Checkout_date,
		Restroom:        restroom,
		Number_customer: reservation.Number_customer,
		Paymentmethod:   paymentmethod,
		Customer_tel:    reservation.Customer_tel,
	}

	//  บันทึก
	if err := entity.DB().Create(&reserve).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": reserve})
}

// GET /Reservation/:id
func GetReservation(c *gin.Context) {
	var reservation entity.Reservation
	id := c.Param("id")
	if err := entity.DB().Preload("Customer").Preload("Restroom").Preload("Paymentmethod").Raw("SELECT * FROM reservations WHERE id = ?", id).Find(&reservation).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": reservation})
}

// List /Reservations
func ListReservations(c *gin.Context) {
	var reservations []entity.Reservation
	if err := entity.DB().Preload("Customer").Preload("Restroom").Preload("Paymentmethod").Raw("SELECT * FROM reservations").Find(&reservations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": reservations})
}

// DELETE /Reservation/:id
func DeleteReservation(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM reservations WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Reservation not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Reservation
func UpdateReservation(c *gin.Context) {
	var reservation entity.Reservation
	if err := c.ShouldBindJSON(&reservation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", reservation.ID).First(&reservation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Reservation not found"})
		return
	}

	if err := entity.DB().Save(&reservation).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": reservation})
}
