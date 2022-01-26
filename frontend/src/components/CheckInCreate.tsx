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
import TextField from "@material-ui/core/TextField";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { CheckinInterface } from "../models/ICheckin";
import { CustomerInterface } from "../models/ICustomer";
import { EmployeeInterface } from "../models/IEmployee";
import { RecieptInterface } from "../models/IReciept";
import { ReservationInterface } from "../models/IReservation";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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
  })
);

function CheckinCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [customers, setCustomers] = useState<CustomerInterface[]>([]);
  const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
  const [reciepts, setReciepts] = useState<RecieptInterface[]>([]);
  const [reservations, setReservations] = useState<ReservationInterface[]>([]);
  const [checkins, setCheckins] = useState<Partial<CheckinInterface>>(
    {}
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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
    const name = event.target.name as keyof typeof checkins;
    setCheckins({
      ...checkins,
      [name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  // จะใช้ Controller List ดึงข้อมูลทั้งหมดในตาราง
  const getCustomers = async () => {
    fetch(`${apiUrl}/customers`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCustomers(res.data);
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

  const getReciepts = async () => {
    fetch(`${apiUrl}/reciepts`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setReciepts(res.data);
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

  // ใช้งาน ฟังชั่น
  useEffect(() => {
    getCustomers();
    getEmployees();
    getReciepts();
    getReservations();
  }, []);
  // เปลี่ยน String เป็น number
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof checkins;
    const { value } = event.target;
    setCheckins({ ...checkins, [id]: value });
  };

  function submit() {
    let data = {
      CustomerID: convertType(checkins.CustomerID),
      EmployeeID: convertType(checkins.EmployeeID),
      RecieptID: convertType(checkins.RecieptID),
      ReservationID: convertType(checkins.ReservationID),
      Checkin_equiptment : checkins.Checkin_equiptment,
	    Checkin_equiptment_cost : convertType(checkins.Checkin_equiptment_cost),
      Checkin_datetime : selectedDate,

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
    // นำข้อมูลไปเข้ากระบวนการ Create ของ checkins Create
    fetch(`${apiUrl}/checkins`, requestOptionsPost)
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
              บันทึกข้อมูลการCheckIn
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
                value={checkins.CustomerID}
                onChange={handleChange}
                inputProps={{
                  name: "CustomerID",
                }}
              >
                <option aria-label="None" value="">
                  ชื่อ-นามสกุล
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
              <p>สถานะการชำระเงิน</p>
              </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={checkins.RecieptID}
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
              <p>ห้องพัก</p>
              </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={checkins.ReservationID}
                onChange={handleChange}
                inputProps={{
                  name: "ReservationID",
                }}
              >
                <option aria-label="None" value="">
                  เลือกห้องพัก
                </option>
              
                 {reservations.map((item: ReservationInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Number_customer}
                  </option>
                ))}
                
                
              </Select>
            </FormControl>
          </Grid>
          </Grid>               

          

          <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
            <p>อุปกรณ์เสริม</p>
            </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              
              <TextField
                id="Checkin_equiptment"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรอกชื่ออุปกรณ์เสริม"
                value={checkins.Checkin_equiptment || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          </Grid>        
          <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
            <p>ค่าอุปกรณ์เสริม</p>
            </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              
              <TextField
                id="Checkin_equiptment_cost"
                variant="outlined"
                type="number"
                size="medium"
                placeholder="กรอกค่าอุปกรณ์เสริม"
                value={checkins.Checkin_equiptment_cost || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          </Grid>  
          <Grid container spacing={3} className={classes.root}>        
          <Grid item xs={2}>
              <p>วันที่CheckIn</p>
              </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  name="Checkin_datetime"
                  value={selectedDate}
                  onChange={handleDateChange}
                  label="กรุณาเลือกวันที่ทำกิจกรรม"
                  minDate={new Date("วันเวลาที่ Checkout")}
                  format="yyyy/MM/dd hh:mm"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          </Grid>
          <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
              <p>พนักงาน</p>
              </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <Select
                native
                value={checkins.EmployeeID}
                onChange={handleChange}
                inputProps={{
                  name: "EmployeeID",
                }}
              >
                <option aria-label="None" value="">
                  ชื่อ-นามสกุล
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
              to="/CheckIn"
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

export default CheckinCreate;