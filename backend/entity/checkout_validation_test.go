package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestCheckoutPass(t *testing.T) {
	g := NewGomegaWithT(t)

	co := Checkout{
		Checkout_datetime: time.Now().Add(24 * time.Hour), // true
		Room_condition:    "dddddddddddddd",               // true
		Room_charge:       200,                            // true
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(co)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestCheckoutdatetimeNotBePast(t *testing.T) {
	g := NewGomegaWithT(t)

	co := Checkout{
		Checkout_datetime: time.Now().Add(24 - time.Hour), // อดีต, fail
		Room_condition:    "dddddddddddddd",               // true
		Room_charge:       200,                            // true
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(co)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("วันที่ Checkout ต้องไม่เป็นวันในอดีต"))
}

func TestRoomConditionLenofString(t *testing.T) {
	g := NewGomegaWithT(t)

	co := Checkout{
		Checkout_datetime: time.Now().Add(24 * time.Hour),                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        // true
		Room_condition:    "โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ เเย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์ โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์  โต๊ะ เก้าอี้ ตู้เย็น พัดลม แอร์", // fail ความยามเกิน 2000
		Room_charge:       200,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   // true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 // true
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(co)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("สภาพห้องความยาวต้องไม่เกิน 2000 ตัวอักษร"))
}

func TestRoomChargeNotbeNegative(t *testing.T) {
	g := NewGomegaWithT(t)

	co := Checkout{
		Checkout_datetime: time.Now().Add(24 * time.Hour), // true
		Room_condition:    "ddddddddddddddd",              // true
		Room_charge:       -200,                           // fail ค่าติดลบ
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(co)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ค่าปรับต้องไม่ติดลบ"))
}

//-----------
