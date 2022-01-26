package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team04/entity"
)

// POST /volunteer_documents
func CreateCheckins(c *gin.Context) {

	var checkins entity.Checkin
	var employees entity.Employee
	var reciepts entity.Reciept
	var customers entity.Customer
	var reservations entity.Reservation

	// ถูก bind เข้าตัวแปร Checkin
	if err := c.ShouldBindJSON(&checkins); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา applicant ด้วย id
	if tx := entity.DB().Where("id = ?", checkins.EmployeeID).First(&employees); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// ค้นหา activity ด้วย id
	if tx := entity.DB().Where("id = ?", checkins.RecieptID).First(&reciepts); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reciept not found"})
		return
	}

	// ค้นหา Certifier ด้วย id
	if tx := entity.DB().Where("id = ?", checkins.CustomerID).First(&customers); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "customer not found"})
		return
	}
	// ค้นหา Certifier ด้วย id
	if tx := entity.DB().Where("id = ?", checkins.ReservationID).First(&reservations); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reservation not found"})
		return
	}
	// สร้าง Checkin
	Ci := entity.Checkin{
		Employee:                employees,                 // โยงความสัมพันธ์กับ Entity Employee
		Reciept:                 reciepts,                  // โยงความสัมพันธ์กับ Entity Reciept
		Customer:                customers,                 // โยงความสัมพันธ์กับ Entity Customer
		Reservation:             reservations,              // โยงความสัมพันธ์กับ Entity Reservation
		Checkin_datetime:        checkins.Checkin_datetime, // ตั้งค่าฟิลด์ Checkin_datetime
		Checkin_equiptment:      checkins.Checkin_equiptment,
		Checkin_equiptment_cost: checkins.Checkin_equiptment_cost,
	}

	// บันทึก
	if err := entity.DB().Create(&Ci).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Ci})
}

// GET /Checkin/:id
func GetCheckins(c *gin.Context) {
	var checkins entity.Checkin
	id := c.Param("id")
	if err := entity.DB().Preload("Employee").Preload("Reciept").Preload("Customer").Preload("Reservation").Raw("SELECT * FROM checkins WHERE id = ?", id).Find(&checkins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": checkins})
}

// GET /Checkin
func ListCheckins(c *gin.Context) {
	var checkins []entity.Checkin
	if err := entity.DB().Preload("Employee").Preload("Reciept").Preload("Customer").Preload("Reservation").Raw("SELECT * FROM checkins").Find(&checkins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": checkins})
}

// DELETE /Checkin/:id
func DeleteCheckins(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM checkins WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "checkins not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /checkins
func UpdateCheckins(c *gin.Context) {
	var checkins entity.Checkin
	if err := c.ShouldBindJSON(&checkins); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", checkins.ID).First(&checkins); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "checkins not found"})
		return
	}

	if err := entity.DB().Save(&checkins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": checkins})
}
