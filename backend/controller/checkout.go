package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut64/team04/entity"
)

// POST /scholarships
func CreateCheckout(c *gin.Context) {

	var checkout entity.Checkout
	var customer entity.Customer
	var reservation entity.Reservation
	var checkin entity.Checkin
	var receipt entity.Reciept
	var employee entity.Employee

	if err := c.ShouldBindJSON(&checkout); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา Customer ด้วย id
	if tx := entity.DB().Where("id = ?", checkout.CustomerID).First(&customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "customer not found"})
		return
	}

	// ค้นหา reservation ด้วย id
	if tx := entity.DB().Where("id = ?", checkout.ReservationID).First(&reservation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reservation not found"})
		return
	}

	//  ค้นหา checkin ด้วย id
	if tx := entity.DB().Where("id = ?", checkout.CheckinID).First(&checkin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "checkin not found"})
		return
	}

	//  ค้นหา receipt ด้วย id
	if tx := entity.DB().Where("id = ?", checkout.RecieptID).First(&receipt); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "receipt not found"})
		return
	}

	//  ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", checkout.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	//  สร้าง Checkout
	co := entity.Checkout{

		Customer:    customer,    // โยงความสัมพันธ์กับ Entity customer
		Reservation: reservation, // โยงความสัมพันธ์กับ Entity reservation
		Checkin:     checkin,     // โยงความสัมพันธ์กับ Entity checkin
		Reciept:     receipt,     // โยงความสัมพันธ์กับ Entity receipt
		Employee:    employee,    // โยงความสัมพันธ์กับ Entity employee

		Checkout_datetime: checkout.Checkout_datetime,
		Room_condition:    checkout.Room_condition,
		Room_charge:       checkout.Room_charge,
	}
	if _, err := govalidator.ValidateStruct(co); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//  บันทึก
	if err := entity.DB().Create(&co).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": co})
}

// GET /checkout/:id
func GetCheckout(c *gin.Context) {
	var checkout entity.Checkout
	id := c.Param("id")
	if err := entity.DB().Preload("Customer").Preload("Reservation").Preload("Checkin").Preload("Reciept").Preload("Employee").Raw("SELECT * FROM checkouts WHERE id = ?", id).Find(&checkout).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": checkout})
}

// GET /checkouts
func ListCheckout(c *gin.Context) {
	var checkouts []entity.Checkout
	if err := entity.DB().Preload("Customer").Preload("Reservation").Preload("Checkin").Preload("Reciept").Preload("Employee").Raw("SELECT * FROM checkouts").Find(&checkouts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": checkouts})
}

// DELETE /checkouts/:id
func DeleteCheckout(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM checkouts WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "checkout not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /checkouts
func UpdateCheckout(c *gin.Context) {
	var checkout entity.Checkout
	if err := c.ShouldBindJSON(&checkout); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", checkout.ID).First(&checkout); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "checkout not found"})
		return
	}

	if err := entity.DB().Save(&checkout).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": checkout})
}
