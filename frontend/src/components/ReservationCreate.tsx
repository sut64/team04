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

import { RestroomInterface } from "../models/IRestroom";
import { CustomerInterface } from "../models/ICustomer";
import { PaymentmethodInterfece } from "../models/IPaymentmethod";
import { ReservationInterface } from "../models/IReservation";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Reservation from "./Reservation";
import { FormHelperText } from "@material-ui/core";


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

function ReservationCreate() {
  const classes = useStyles();
  const [selectedCheckinDate, setSelectedCheckinDate] = useState<Date | null>(new Date());
  const [selectedCheckoutDate, setSelectedCheckoutDate] = useState<Date | null>(new Date());
  const [restrooms, setRestrooms] = useState<RestroomInterface[]>([]);
  const [customers, setCustomers] = useState<CustomerInterface>();
  const [paymentmethods, setPaymentmethods] = useState<PaymentmethodInterfece[]>([]);
  const [reservations, setReservation] = useState<Partial<ReservationInterface>>(
    {}
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMassage] = useState("");

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
    const name = event.target.name as keyof typeof reservations;
    setReservation({
      ...reservations,
      [name]: event.target.value,
    });
  };

  const handleCheckinDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedCheckinDate(date);
  };

  const handleCheckoutDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedCheckoutDate(date);
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }> ) => {
    const id = event.target.id as keyof typeof reservations; 
    const { value } = event.target;
    setReservation({ ...reservations, [id]: value });
    };

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
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/customer/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        reservations.CustomerID = res.data.ID
        if (res.data) {
            setCustomers(res.data);
            console.log(res.data);
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

  useEffect(() => {
    getRestrooms();
    getCustomers();
    getPaymentmethods();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
    CustomerID: convertType(reservations.CustomerID),
    Checkin_date: selectedCheckinDate,
    Checkout_date: selectedCheckoutDate,
    RestroomID: convertType(reservations.RestroomID),
    Number_customer: convertType(reservations.Number_customer),
    PaymentmethodID: convertType(reservations.PaymentmethodID),
    Customer_tel: reservations.Customer_tel,
    };

    console.log(data)

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/reservations`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้")
          setSuccess(true);
          setErrorMassage("")
        } else {
          console.log("บันทึกไม่ได้")
          setError(true);
          setErrorMassage(res.error)
        }
      });

  }
  //เอาไว้ดูน้า ว่าตารางมึงจะบันทึกอะไรลงไป โถ้
  console.log(reservations);

  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
            จองห้องพักสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
            จองห้องพักไม่สำเร็จ: {errorMessage}
        </Alert>
      </Snackbar>

        
        <Grid container spacing={3} className={classes.root}>

          <Grid item xs={2}>
              <p>ชื่อสมาชิกผู้ใช้งานระบบ</p>
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
              <Select
                native
                value={reservations.CustomerID}
                
                inputProps={{
                  name: "CustomerID", 
                }}
              >

                <option value={customers?.ID} key={customers?.ID}>
                  {customers?.Customer_name}
                </option>
                
              </Select>
              <FormHelperText> * disabled </FormHelperText>
            </FormControl>
          </Grid>
          </Grid>

          <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
              <p>วันที่ต้องการ Check-in</p>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth variant="outlined">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  name="Checkin_date"
                  value={selectedCheckinDate}
                  onChange={handleCheckinDateChange}
                  label="กรุณาเลือกวันที่ต้องการ Check-in"
                  minDate={new Date("2018-01-01")}
                  format="yyyy/MM/dd"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          </Grid>

          <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
              <p>วันที่ต้องการ Check-out</p>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth variant="outlined">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  name="Checkout_date"
                  value={selectedCheckoutDate}
                  onChange={handleCheckoutDateChange}
                  label="กรุณาเลือกวันที่ต้องการ Check-out"
                  minDate={new Date("2018-01-01")}
                  format="yyyy/MM/dd"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          </Grid>

          <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
              <p>หมายเลขห้องพัก</p>
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
              <Select
                native
                value={reservations.RestroomID}
                onChange={handleChange}
                inputProps={{
                  name: "RestroomID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกหมายเลขห้องพัก
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
            <p>จำนวนคนที่ต้องการเข้าพัก</p> 
            </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
            <TextField
               id="Number_customer"
               variant="outlined"
               type="number"
               size="medium"
               label="กรุณากรอกจำนวนคนที่ต้องการเข้าพัก"
               value={ reservations.Number_customer || ""}
               onChange={handleInputChange}

             />
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
                value={reservations.PaymentmethodID}
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
            <p>เบอร์โทรศัพท์</p> 
            </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
            <TextField
               id="Customer_tel"
               variant="outlined"
               type="string"
               size="medium"
               label="กรุณากรอกเบอร์โทรศัพท์"
               value={ reservations.Customer_tel || ""}
               onChange={handleInputChange}

             />
            </FormControl>
        </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Button
              style={{ float: "right" }}
              variant="contained"
              onClick={submit}
              color="primary"
            >
              บันทึกการจองห้องพัก
            </Button>
            <Button
              style={{ float: "left" }}
              component={RouterLink}
              to="/reservation"
              variant="contained"
              color="primary"
            >
              ข้อมูลการจอง
            </Button>
          </Grid>
          </Grid>
    </Container>
  );
}

export default ReservationCreate;