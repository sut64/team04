package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team04/entity"
)

// POST /reciepts
func CreateReciept(c *gin.Context) {

	var reciept entity.Reciept

	var payment_method entity.Paymentmethod
	var reservation entity.Reservation
	var restroom entity.Restroom
	var employee entity.Employee
	var customer entity.Customer

	//
	if err := c.ShouldBindJSON(&reciept); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//  ค้นหา Reservation ด้วย id
	if tx := entity.DB().Where("id = ?", reciept.ReservationID).First(&reservation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Reservation not found"})
		return
	}

	//  ค้นหา Restroom ด้วย id
	if tx := entity.DB().Where("id = ?", reciept.RestroomID).First(&restroom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Restroom not found"})
		return
	}

	//  ค้นหา Employee ด้วย id
	if tx := entity.DB().Where("id = ?", reciept.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
		return
	}

	//  ค้นหา Paymentmethod ด้วย id
	if tx := entity.DB().Where("id = ?", reciept.PaymentmethodID).First(&payment_method); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Paymentmethod not found"})
		return
	}

	//  ค้นหา Customer ด้วย id
	if tx := entity.DB().Where("id = ?", reciept.CustomerID).First(&customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Customer not found"})
		return
	}

	//  สร้าง Reciept
	se := entity.Reciept{

		Paymentmethod: payment_method, // โยงความสัมพันธ์กับ Entity Paymentmethod
		Reservation:   reservation,    // โยงความสัมพันธ์กับ Entity Reservation
		Restroom:      restroom,       // โยงความสัมพันธ์กับ Entity Restroom
		Employee:      employee,       // โยงความสัมพันธ์กับ Entity Employee
		Customer:      customer,       // โยงความสัมพันธ์กับ Entity Customer
		//Customer_name:  customer.Customer_name,

		Payment_status: reciept.Payment_status,
		Price:          reciept.Price,
		Payment_date:   reciept.Payment_date,
		Payment_bill:   reciept.Payment_bill,
		Customer_name:  reciept.Customer_name,
	}

	//  บันทึก
	if err := entity.DB().Create(&se).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": se})
}

// GET /Reciept/:id
func GetReciept(c *gin.Context) {
	var reciept entity.Reciept
	id := c.Param("id")
	if err := entity.DB().Preload("Reservation").Preload("Restroom").Preload("Employee").Preload("Customer").Preload("Paymentmethod").Raw("SELECT * FROM reciepts WHERE id = ?", id).Find(&reciept).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": reciept})
}

// GET /Reciepts
func ListReciepts(c *gin.Context) {
	var reciepts []entity.Reciept
	if err := entity.DB().Preload("Reservation").Preload("Restroom").Preload("Employee").Preload("Customer").Preload("Paymentmethod").Raw("SELECT * FROM reciepts").Find(&reciepts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": reciepts})
}

// DELETE /Reciepts/:id
func DeleteReciept(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM reciepts WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reciept not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Reciepts
func UpdateReciept(c *gin.Context) {
	var reciept entity.Reciept
	if err := c.ShouldBindJSON(&reciept); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", reciept.ID).First(&reciept); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reciept not found"})
		return
	}

	if err := entity.DB().Save(&reciept).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": reciept})
}
