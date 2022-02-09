package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestCheckinPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	CIT := Checkin{
		Checkin_datetime:        time.Now().Add(24 * time.Hour), //true
		Checkin_equiptment:      "ชุดเครื่องนอน",                //true
		Checkin_equiptment_cost: 300,                            //true
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(CIT)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).To(BeNil())

}

func TestCheckindatetimePass(t *testing.T) {
	g := NewGomegaWithT(t)

	CIT := Checkin{
		Checkin_datetime:        time.Now().Add(24 - time.Hour), // อดีต, fail
		Checkin_equiptment:      "ชุดเครื่องนอน",                //true
		Checkin_equiptment_cost: 300,                            //true
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(CIT)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("วันที่ Checkin ต้องไม่เป็นอดีต"))

}
func TestLenofString(t *testing.T) {
	g := NewGomegaWithT(t)

	CIE := Checkin{
		Checkin_datetime:        time.Now().Add(24 * time.Hour),                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     // อนาคต, true
		Checkin_equiptment:      "ชุดเครื่องนอน , เก้าอี้ , ที่นอนเสริม , ถ้วย , จาน , ช้อนส้อม, ชุดเครื่องนอน , เก้าอี้ , ที่นอนเสริม , ถ้วย , จาน , ช้อนส้อม, ชุดเครื่องนอน , เก้าอี้ , ที่นอนเสริม , ถ้วย , จาน , ช้อนส้อม, ชุดเครื่องนอน , เก้าอี้ , ที่นอนเสริม , ถ้วย , จาน , ช้อนส้อม, ชุดเครื่องนอน , เก้าอี้ , ที่นอนเสริม , ถ้วย , จาน , ช้อนส้อม, ชุดเครื่องนอน , เก้าอี้ , ที่นอนเสริม , ถ้วย , จาน , ช้อนส้อม, ชุดเครื่องนอน , เก้าอี้ , ที่นอนเสริม , ถ้วย , จาน , ช้อนส้อม, ชุดเครื่องนอน , เก้าอี้ , ที่นอนเสริม , ถ้วย , จาน , ช้อนส้อม, ชุดเครื่องนอน , เก้าอี้ , ที่นอนเสริม , ถ้วย , จาน , ช้อนส้อม, ชุดเครื่องนอน , เก้าอี้ , ที่นอนเสริม , ถ้วย , จาน , ช้อนส้อม, ชุดเครื่องนอน , เก้าอี้ , ที่นอนเสริม , ถ้วย , จาน , ช้อนส้อม, ชุดเครื่องนอน , เก้าอี้ , ที่นอนเสริม , ถ้วย , จาน , ช้อนส้อม, ชุดเครื่องนอน , เก้าอี้ , ที่นอนเสริม , ถ้วย , จาน , ช้อนส้อม, ชุดเครื่องนอน , เก้าอี้ , ที่นอนเสริม , ถ้วย , จาน , ช้อนส้อม", // false
		Checkin_equiptment_cost: 200,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                // true
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(CIE)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("อุปกรณ์เสริมความยาวไม่เกิน 800 ตัวอักษร"))

}
func TestCheckinequiptmentcostNegative(t *testing.T) {
	g := NewGomegaWithT(t)

	CIEC := Checkin{
		Checkin_datetime:        time.Now().Add(24 * time.Hour), // อนาคต, true
		Checkin_equiptment:      "ชุดเครื่องนอน",                // true
		Checkin_equiptment_cost: -300,                           // false
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(CIEC)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ค่าอุปกรณ์เสริมต้องไม่ติดลบ"))

}
