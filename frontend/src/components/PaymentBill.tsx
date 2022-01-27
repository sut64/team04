import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Theme,
  createStyles,
  alpha,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";

import MenuItem from '@material-ui/core/MenuItem';

import { RestroomInterface } from "../models/IRestroom";
import { CustomerInterface } from "../models/ICustomer";
import { PaymentmethodInterfece } from "../models/IPaymentmethod";
import { ReservationInterface } from "../models/IReservation";
import { RecieptInterface } from "../models/IReciept";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
//import Reservation from "./Reservation";
import { FormHelperText } from "@material-ui/core";
import Reservation from "./Reservation";
import { EmployeeInterface } from "../models/IEmployee";


const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
        marginTop: theme.spacing(5),
      marginLeft: theme.spacing(50),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);

function PaymentBill() {
  const classes = useStyles();
  const [selectedPayment_date, setSelectedPayment_date] = useState<Date | null>(new Date());
  const [restrooms, setRestrooms] = useState<RestroomInterface[]>([]);
  //const [customers, setCustomers] = useState<CustomerInterface>();
  const [customersmap, setCustomersmap] = useState<CustomerInterface[]>([]);
  const [paymentmethods, setPaymentmethods] = useState<PaymentmethodInterfece[]>([]);
  const [reservations, setReservations] = useState<ReservationInterface[]>([]);
  const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
  const [reciepts, setReciept] = useState<Partial<RecieptInterface>>(
    {}
  );
  const [recieptsmap, setRecieptsmap] = useState<RecieptInterface[]>([]);
  /*const [paymentmethods, setPaymentmethods] = useState<Partial<PaymentmethodInterfece>>(
    {}
  );*/

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [state, setState] = useState({
    Success: true,
  });

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof reciepts;
    setReciept({
      ...reciepts,
      [name]: event.target.value,
    });
  };

  const handlePayment_date = (date: Date | null) => {
    console.log(date);
    setSelectedPayment_date(date);
  };


  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }> ) => {
    const id = event.target.id as keyof typeof reciepts; 
    const { value } = event.target;
    setReciept({ ...reciepts, [id]: value });
    };
    
    /////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////

  const getRestrooms = async () => {
    fetch(`${apiUrl}/restrooms`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setRestrooms(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getCustomers = async () => {
    fetch(`${apiUrl}/customers`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setCustomersmap(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getPaymentmethods = async () => {
    fetch(`${apiUrl}/paymentmethods`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setPaymentmethods(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getReciepts = async () => {
    fetch(`${apiUrl}/reciepts`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setRecieptsmap(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getReservations = async () => {
    fetch(`${apiUrl}/reservations`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setReservations(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getEmployees = async () => {
    fetch(`${apiUrl}/employees`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setEmployees(res.data);
        } else {
          console.log("else");
        }
      });
  };

  /////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    getRestrooms();
    getCustomers();
    getPaymentmethods();
    getEmployees();
    getReciepts();
    getReservations();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  /////////////////////////////////////////////////////////////////////////////////////
  function submit() {
    let data = {


    CustomerID: convertType(reciepts.CustomerID),

    Customer_name: reciepts.Customer_name,
    Price: convertType(reciepts.Price),
    Payment_bill: reciepts.Payment_bill,
    ReservationID: convertType(reciepts.ReservationID),
    RestroomID: convertType(reciepts.RestroomID),
    EmployeeID: convertType(reciepts.EmployeeID),

    Payment_date: selectedPayment_date,

    PaymentmethodID: convertType(reciepts.PaymentmethodID),
    Payment_status: reciepts.Payment_status,
    };
    /////////////////////////////////////////////////////////////////////////////////////



    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/reciepts`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้")
          setSuccess(true);
        } else {
          console.log("บันทึกไม่ได้")
          setError(true);
        }
      });
  }


  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
            ชำระเงินสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
            ชำระเงินไม่สำเร็จ
        </Alert>
      </Snackbar>


      <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
              <p>เลขที่ลูกค้า</p>
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
              <Select
                native
                value={reciepts.CustomerID}
                onChange={handleChange}
                inputProps={{
                  name: "CustomerID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเลขที่ลูกค้า
                </option>
                {customersmap.map((item: CustomerInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          </Grid>
        
        <Grid container spacing={3} className={classes.root}> 
            <Grid item xs={2}>
              <h3>ชื่อลูกค้า</h3> 
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
              <TextField
                id="Customer_name"
                variant="outlined"
                type="string"
                size="medium"
                label="กรุณากรอกชื่อลูกค้า"
                value={ reciepts.Customer_name || ""}
                onChange={handleInputChange}

              />
              </FormControl>
          </Grid>
          </Grid>

          <Grid container spacing={3} className={classes.root}> 
            <Grid item xs={2}>
              <h3>จำนวนเงินที่รับมา</h3> 
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
              <TextField
                id="Price"
                variant="outlined"
                type="number"
                size="medium"
                label="กรุณากรอกจำนวนเงินที่รับมา"
                value={ reciepts.Price || ""}
                onChange={handleInputChange}

              />
              </FormControl>
          </Grid>
          </Grid>


          <Grid container spacing={3} className={classes.root}> 
            <Grid item xs={2}>
              <h3>หลักฐานการชำระเงิน</h3> 
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
              <TextField
                id="Payment_bill"
                variant="outlined"
                type="string"
                size="medium"
                label="กรุณากรอกUrlหลักฐานการชำระเงิน"
                value={ reciepts.Payment_bill || ""}
                onChange={handleInputChange}

              />
              </FormControl>
          </Grid>
          </Grid>

          <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
              <p>เลขที่การจอง</p>
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
              <Select
                native
                value={reciepts.ReservationID}
                onChange={handleChange}
                inputProps={{
                  name: "ReservationID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเลขที่การจอง
                </option>
                {reservations.map((item: ReservationInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          </Grid>

          <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
              <p>เลขที่ห้องพัก</p>
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
              <Select
                native
                value={reciepts.RestroomID}
                onChange={handleChange}
                inputProps={{
                  name: "RestroomID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเลขที่ห้องพัก
                </option>
                {restrooms.map((item: RestroomInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Room_number}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          </Grid>

          <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
              <p>ไอดีผู้รับผิดชอบการชำระเงิน</p>
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
              <Select
                native
                value={reciepts.EmployeeID}
                onChange={handleChange}
                inputProps={{
                  name: "EmployeeID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกไอดีผู้รับผิดชอบการชำระเงิน
                </option>
                {employees.map((item: EmployeeInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          </Grid>


          {/*<Grid container spacing={3} className={classes.root}> 
            <Grid item xs={2}>
              <h3>เลขที่การจอง</h3> 
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
              <TextField
                id="ReservationID"
                variant="outlined"
                type="string"
                size="medium"
                label="กรุณากรอกเลขที่การจอง"
                value={ reciepts.ReservationID || ""}
                onChange={handleInputChange}

              />
              </FormControl>
          </Grid>
          </Grid>

          <Grid container spacing={3} className={classes.root}> 
            <Grid item xs={2}>
              <h3>เลขที่ห้องพัก</h3> 
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
              <TextField
                id="RestroomID"
                variant="outlined"
                type="string"
                size="medium"
                label="กรุณากรอกเลขที่ห้องพัก"
                value={ reciepts.RestroomID || ""}
                onChange={handleInputChange}

              />
              </FormControl>
          </Grid>
          </Grid>

          <Grid container spacing={3} className={classes.root}> 
            <Grid item xs={2}>
              <h3>ไอดีผู้รับผิดชอบการชำระเงิน</h3> 
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
              <TextField
                id="EmployeeID"
                variant="outlined"
                type="string"
                size="medium"
                label="กรุณากรอกไอดีผู้รับผิดชอบการชำระเงิน"
                value={ reciepts.EmployeeID || ""}
                onChange={handleInputChange}

              />
              </FormControl>
          </Grid>
          </Grid>
  */}

          <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
              <p>วันที่ชำระเงิน</p>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth variant="outlined">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  name="Payment_date"
                  value={selectedPayment_date}
                  onChange={handlePayment_date}
                  label="วันที่ชำระเงิน"
                  minDate={new Date("2018-01-01")}
                  format="yyyy/MM/dd"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          </Grid>


          <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
              <p>ช่องทางการชำระเงิน</p>
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
              <Select
                native
                value={reciepts.PaymentmethodID}
                onChange={handleChange}
                inputProps={{
                  name: "PaymentmethodID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกช่องทางการชำระเงิน
                </option>
                {paymentmethods.map((item: PaymentmethodInterfece) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Payment_type}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          </Grid>

          <Grid container spacing={3} className={classes.root}> 
            <Grid item xs={2}>
              <h3>สถานะการชำระเงิน</h3> 
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
              <TextField
                id="Payment_status"
                variant="outlined"
                type="string"
                size="medium"
                label="กรุณากรอกสถานะการชำระเงิน"
                value={ reciepts.Payment_status || ""}
                onChange={handleInputChange}

              />
              </FormControl>
          </Grid>
          </Grid>

          {/*
          <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
              <p>สถานะการชำระเงิน</p>
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
              <Select
                native
                value={reciepts.Payment_status}
                onChange={handleChange}
                inputProps={{
                  name: "Payment_status",
                }}

              >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>

                <option aria-label="None" value="">
                  กรุณาเลือกสถานะการชำระเงิน
                </option>
                {recieptsmap.map((item: RecieptInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Payment_status}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          </Grid>
                */}

          <Grid container spacing={4} className={classes.root}>
          <Grid item xs={9}>
            <Button
              component={RouterLink}
              to="/PaymentResult"
              variant="contained"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              variant="contained"
              onClick={submit}
              color="primary"
            >
              บันทึกข้อมูล
            </Button>
          </Grid> 
          </Grid>
    
    </Container>
  );
}

export default PaymentBill;


/*
                  ลำดับใบเสร็จ
                  //
                  ชื่อลูกค้า
                  เงินที่รับมา
                  หลักฐานการชำระเงิน
                  วันที่ชำระเงิน
                  เลขที่การจอง
                  เลขที่ห้องพัก
                  ไอดีผู้รับผิดชอบการชำระเงิน

                  ลำดับช่องทางการชำระเงินที่เลือก
                  สถานะการชำระเงิน
*/ 