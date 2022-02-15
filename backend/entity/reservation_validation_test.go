package entity

import (
	"fmt"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบค่าข้อมูลที่ถูกต้องทั้งหมด
func TestReservationPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	reservation := Reservation{
		Checkin_date:    time.Now().Add(24 * time.Hour),
		Checkout_date:   time.Now().Add(24 * time.Hour),
		Number_customer: 2,
		Customer_tel:    "0987654321",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reservation)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestReservationCheckinMustbeFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	reservation := Reservation{
		Checkin_date:    time.Now(), // ผิด
		Checkout_date:   time.Now().Add(24 * time.Hour),
		Number_customer: 2,
		Customer_tel:    "0987654321",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reservation)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("วันที่ต้องการ Check-in ต้องไม่เป็นวันในอดีต"))
}

func TestReservationCheckoutMustbeFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	reservation := Reservation{
		Checkin_date:    time.Now().Add(24 * time.Hour),
		Checkout_date:   time.Now(), // ผิด
		Number_customer: 2,
		Customer_tel:    "0987654321",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(reservation)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("วันที่ต้องการ Check-out ต้องไม่เป็นวันในอดีต"))
}

func TestNumberofCutomerCannotLessthanOne(t *testing.T) {
	g := NewGomegaWithT(t)

	reservation := Reservation{
		Checkin_date:    time.Now().Add(24 * time.Hour),
		Checkout_date:   time.Now().Add(24 * time.Hour),
		Number_customer: 0, // ผิด
		Customer_tel:    "0987654321",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := CannotLessthanOne(reservation.Number_customer)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("จำนวนคนที่ต้องการเข้าพักต้องไม่ต่ำกว่า 1 คน"))
}

func TestCustomerTelMustBeInValidPattern(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []string{

		"1000000000",  // ขึ้นต้นด้วย 1
		"2000000000",  // ขึ้นต้นด้วย 2
		"3000000000",  // ขึ้นต้นด้วย 3
		"4000000000",  // ขึ้นต้นด้วย 4
		"5000000000",  // ขึ้นต้นด้วย 5
		"6000000000",  // ขึ้นต้นด้วย 6
		"7000000000",  // ขึ้นต้นด้วย 7
		"8086165221",  // ขึ้นต้นด้วย 8
		"9086165221",  // ขึ้นต้นด้วย 9
		"00000000000", // เกิน 1 ตัว
		"000000000",   // ขาด 1 ตัว

		"x086165221", // ขึ้นต้นด้วยตัวอักษร

	}

	for _, fixture := range fixtures {
		reservation := Reservation{
			Checkin_date:    time.Now().Add(24 * time.Hour),
			Checkout_date:   time.Now().Add(24 * time.Hour),
			Number_customer: 2,
			Customer_tel:    fixture, // ผิด
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(reservation)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal(fmt.Sprintf(`เบอร์โทรศัพท์ : %s ต้องมี 10 หลัก`, fixture)))
	}
}
