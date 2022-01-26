import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Theme,
  createStyles,
  
} from "@material-ui/core/styles";

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";



import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";



import { CheckinInterface} from "../models/ICheckin";
import { ReservationInterface } from "../models/IReservation";
import { CustomerInterface } from "../models/ICustomer";
import { EmployeeInterface } from "../models/IEmployee";
import { RecieptInterface } from "../models/IReciept";
import { CheckoutInterface } from "../models/ICheckout";
//import { SliderValueLabel } from "@mui/material";
//import { id } from "date-fns/locale";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(3),
      fontSize: 17,
      color: theme.palette.text.secondary,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 435,
    },
  })
  
);


function CheckoutCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [checkins, setCheckin] = useState<CheckinInterface[]>([]);;
  const [reservations, setReservation] = useState<ReservationInterface[]>([]);
  const [customers, setCustomer] = useState<CustomerInterface[]>([]);
  const [employees, setEmployee] = useState<EmployeeInterface[]>([]);
  const [reciepts, setReciept] = useState<RecieptInterface[]>([]);
  const [checkout, setCheckout] = useState<Partial<CheckoutInterface>>(
    {}
  );
  
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

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

  //*

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof checkout;
    setCheckout({
      ...checkout,
      [name]: event.target.value,
    });
  };
  // จะใช้ Controller List ดึงข้อมูลทั้งหมดในตาราง
  const getCustomers = async () => {
    fetch(`${apiUrl}/customers`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCustomer(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getCheckins = async () => {
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/checkins`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        checkout.CustomerID = res.data.ID;
        if (res.data) {
          setCheckin(res.data);
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
          setReservation(res.data);
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
          setReciept(res.data);
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
          setEmployee(res.data);
        } else {
          console.log("else");
        }
      });
  };

  // ใช้งาน ฟังชั่น
  useEffect(() => {
    getCustomers();
    getCheckins();
    getReservations();
    getReciepts();
    getEmployees();
  }, []);

  // เปลี่ยน String เป็น number
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  //*

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof checkout;
    const { value } = event.target;
    setCheckout({ ...checkout, [id]: value });
  };

  let checkinshow = 1;

  //*
  function submit() {
    let data = {
      CustomerID: convertType(checkout.CustomerID),
      ReservationID: convertType(checkout.ReservationID),
      CheckinID: convertType(checkout.CheckinID),
      RecieptID: convertType(checkout.RecieptID),
      EmployeeID: convertType(checkout.EmployeeID),
      Checkout_datetime : selectedDate,
      Room_condition : checkout.Room_condition,
      Room_charge : convertType(checkout.Room_charge),

    };
    // เรียกใช้ Create ใน controller
    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    // นำข้อมูลไปเข้ากระบวนการ Create ของ Checkouts Create
    fetch(`${apiUrl}/checkouts`, requestOptionsPost)
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
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกข้อมูลการ Checkout
            </Typography>
          </Box>
        </Box>
        

        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
              <p>ชื่อลูกค้า</p>
              </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={checkout.CustomerID}
                onChange={handleChange}
                inputProps={{
                  name: "CustomerID",
                }}
              >
                <option aria-label="None" value="">
                  เลือกลูกค้า
                </option>
                {customers.map((item: CustomerInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Customer_name}
                  </option> 
                ))} 
              </Select>
            </FormControl>
          </Grid>
          </Grid>   


          <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
              <p>ห้องพัก</p>
              </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={checkout.ReservationID}
                onChange={handleChange}
                inputProps={{
                  name: "ReservationID",
                }}
              >
                <option aria-label="None" value="">
                  เลือกห้องที่ลูกค้าพักอยู่
                </option>
              
                 {reservations.map((item: ReservationInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Restroom.Room_number}
                  </option>
                ))}
                
                
              </Select>
            </FormControl>
          </Grid>
          </Grid>        

          <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
              <p>Check In</p>
              </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={checkout.CheckinID}
                onChange={handleChange}
                inputProps={{
                  name: "CheckinID",
                }}
              >
                <option aria-label="None" value="">
                  เวลา CheckIn เข้ามาของลูกค้า
                </option>

                {checkins.map((item: CheckinInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Checkin_equiptment_cost}
                  </option>
                 ))}
               
              </Select>
            </FormControl>
          </Grid>
          </Grid>   

          <Grid container spacing={3} className={classes.root}>        
          <Grid item xs={2}>
              <p>วันที่ Checkout</p>
              </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  name="Checkout_datetime"
                  value={selectedDate}
                  onChange={handleDateChange}
                  label="วันเวลาที่ Checkout"
                  format="yyyy/MM/dd hh:mm"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          </Grid>
          
          


          <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
            <p>สภาพห้อง</p>
            </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Room_condition"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="มีของอะไรเสียบ้างในห้อง"
                value={checkout.Room_condition || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          </Grid>        

          <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
            <p>ค่าปรับ</p>
            </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Room_charge"
                variant="outlined"
                type="number"
                size="medium"
                placeholder="กรณีมีของเสียหาย"
                value={checkout.Room_charge || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          </Grid>        


          <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
              <p>สถานะการชำระเงิน</p>
              </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={checkout.RecieptID}
                onChange={handleChange}
                inputProps={{
                  name: "RecieptID",
                }}
              >
                <option aria-label="None" value="">
                  เลือกสถานะการชำระเงิน
                </option>
                {reciepts.map((item: RecieptInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Payment_status}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          </Grid>       
          

      
          <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
              <p>ผู้ดำเนินการ</p>
              </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={checkout.EmployeeID}
                onChange={handleChange}
                inputProps={{
                  name: "EmployeeID",
                }}
              >
                <option aria-label="None" value="">
                  เลือกพนักงานที่รับผิดชอบ
                </option>
                {employees.map((item: EmployeeInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Employee_name}
                  </option> 
                ))} 
              </Select>
            </FormControl>
          </Grid>
          </Grid>       



          <Grid container spacing={4} className={classes.root}>
          <Grid item xs={9}>
            <Button
              component={RouterLink}
              to="/CheckOut"
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

export default CheckoutCreate;