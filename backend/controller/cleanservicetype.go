package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team04/entity"
)

// POST /cleanservicetypes
func CreateCleanservicetype(c *gin.Context) {
	var cleanservicetype entity.Cleanservicetype
	if err := c.ShouldBindJSON(&cleanservicetype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&cleanservicetype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cleanservicetype})
}

// GET /cleanservicetype/:id
func GetCleanservicetype(c *gin.Context) {
	var cleanservicetype entity.Cleanservicetype
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM cleanservicetypes WHERE id = ?", id).Find(&cleanservicetype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cleanservicetype})
}

// GET /cleanservicetypes
func ListCleanservicetypes(c *gin.Context) {
	var cleanservicetypes []entity.Cleanservicetype
	if err := entity.DB().Raw("SELECT * FROM cleanservicetypes").Find(&cleanservicetypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cleanservicetypes})
}

// DELETE /cleanservicetypes/:id
func DeleteCleanservicetype(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM cleanservicetypes WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cleanservicetype not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /cleanservicetypes
func UpdateCleanservicetype(c *gin.Context) {
	var cleanservicetype entity.Cleanservicetype
	if err := c.ShouldBindJSON(&cleanservicetype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", cleanservicetype.ID).First(&cleanservicetype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cleanservicetype not found"})
		return
	}

	if err := entity.DB().Save(&cleanservicetype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cleanservicetype})
}
