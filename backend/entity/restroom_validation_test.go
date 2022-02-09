package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestRestroomPass(t *testing.T) {
	g := NewGomegaWithT(t)
	//ถูกทุกฟิล
	restroom01 := Restroom{
		Room_number:          111,
		Restroom_description: "Empty",
		Update_date:          time.Date(2021, 2, 1, 3, 0, 0, 0, time.UTC),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(restroom01)
	g.Expect(ok).To(BeTrue())
	g.Expect(err).To(BeNil())

}

func TestRoomNumberNotInRage(t *testing.T) {
	g := NewGomegaWithT(t)

	restroom01 := Restroom{
		Room_number:          1111, // Room_number เกิน 3 หลัก
		Restroom_description: "Empty",
		Update_date:          time.Date(2021, 2, 1, 3, 0, 0, 0, time.UTC),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(restroom01)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("หมายเลขห้องต้องไม่เกิน3หลัก"))
}

func TestDescriptionStringleng(t *testing.T) {
	g := NewGomegaWithT(t)

	restroom01 := Restroom{
		Room_number:          111,
		Restroom_description: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", // Description เกิน 20 ตัวอักษร
		Update_date:          time.Date(2021, 2, 1, 3, 0, 0, 0, time.UTC),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(restroom01)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("คำอธิบายต้องไม่เกิน 20 ตัวอักษร"))
}

func TestUpdateDateCannotbePast(t *testing.T) {
	g := NewGomegaWithT(t)

	restroom01 := Restroom{
		Room_number:          111,
		Restroom_description: "ABCDE",
		Update_date:          time.Date(2023, 2, 1, 3, 0, 0, 0, time.UTC), //เวลาเป็นอนาคต
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(restroom01)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("วันที่อัพเดทข้อมูลต้องไม่เป็นอนาคต"))
}
