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
import { RestroomInterface } from "../models/IRestroom";
import { CustomerInterface } from "../models/ICustomer";
import { CleanservicetypeInterface } from "../models/ICleanservicetype";
import { CleaninformationInterface } from "../models/ICleaninformation";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
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
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);

function CleaninformationCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [restroom, setRestroom] = useState<RestroomInterface[]>([]);
  const [customer, setCustomer] = useState<CustomerInterface[]>([]);
  const [cleanservicetype, setCleanservicetype] = useState<CleanservicetypeInterface[]>([]);
  const [cleaninformation, setCleaninformation] = useState<Partial<CleaninformationInterface>>(
    {}
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "cleaninformation/json",
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
    const name = event.target.name as keyof typeof cleaninformation;
    setCleaninformation({
      ...cleaninformation,
      [name]: event.target.value,
    });
  };


  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const getCleanservicetype = async () => {
    fetch(`${apiUrl}/cleanservicetypes`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCleanservicetype(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getCustomer = async () => {
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

  const getRestroom = async () => {
    fetch(`${apiUrl}/restrooms`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
           setRestroom(res.data);
        } else {
          console.log("else");
        }
      });
  };


  useEffect(() => {
    getRestroom();
    getCustomer();
    getCleanservicetype();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof cleaninformation;
    const { value } = event.target;
    setCleaninformation({ ...cleaninformation, [id]: value });
  };

  function submit() {
    let data = {
      CleanservicetypeID: convertType(cleaninformation.CleanservicetypeID),
      CustomerID:convertType(cleaninformation.CustomerID),
      RestroomID: convertType(cleaninformation.RestroomID),
      Cleandate: selectedDate,
      Note: cleaninformation.Note,
      Hastelevel: convertType(cleaninformation.Hastelevel),
    };

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "cleaninformation/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/cleaninformations`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้")
          setSuccess(true);
          setErrorMessage("")
        } else {
          console.log("บันทึกไม่ได้")
          setError(true);
          setErrorMessage(res.error)
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
        บันทึกข้อมูลไม่สำเร็จ : {errorMessage}
      </Alert>
    </Snackbar>
    <Paper className={classes.paper}>
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
          >
            บันทึกข้อมูลการแจ้งทำความสะอาดห้องพัก
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={3}>
            <p>ชื่อ-นามสกุล ลูกค้า</p>
        </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <Select
              native
              value={cleaninformation.CustomerID}
              onChange={handleChange}
              inputProps={{
                name: "CustomerID",
              }}
            >
              <option aria-label="None" value="">
                กรุณาเลือกชื่อลูกค้า
              </option>
              {customer.map((item: CustomerInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Customer_name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        </Grid>       
        <Grid container spacing={3} className={classes.root}>
        <Grid item xs={3}>
            <p>เลขที่ห้อง</p>
            </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <Select
              native
              value={cleaninformation.RestroomID}
              onChange={handleChange}
              inputProps={{
                name: "RestroomID",
              }}
            >
              <option aria-label="None" value="">
                  กรุณาเลือกเลขที่ห้อง
              </option>
              {restroom.map((item: RestroomInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Room_number}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        </Grid>    
        <Grid container spacing={3} className={classes.root}>
        <Grid item xs={3}>
            <p>ประเภทบริการทำความสะอาด</p>
        </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <Select
              native
              value={cleaninformation.CleanservicetypeID}
              onChange={handleChange}
              inputProps={{
                name: "CleanservicetypeID",
              }}
            >
              <option aria-label="None" value="">
                  กรุณาเลือกประเภทบริการทำความสะอาด
              </option>
              {cleanservicetype.map((item: CleanservicetypeInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Cleanservice_type}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        </Grid>     
        <Grid container spacing={3} className={classes.root}>        
        <Grid item xs={3}>
            <p>วันที่ต้องการทำความสะอาด</p>
            </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                name="Cleandate"
                value={selectedDate}
                onChange={handleDateChange}
                label="กรุณาเลือกวันที่ต้องการทำความสะอาด"
                minDate={new Date("2018-01-01T00:00")}
                format="yyyy/MM/dd"
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.root}>
        <Grid item xs={3}>
          <p>ความเร่งรีบใช้บริการ(น้อยสุด 0  มากสุด 5)</p>
        </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <TextField
              id="Hastelevel"
              variant="outlined"
              type="number"
              size="medium"
              placeholder="กรุณากรอกความเร่งรีบใช้บริการ"
              value={cleaninformation.Hastelevel || ""}
              onChange={handleInputChange}
            />
          </FormControl>
        </Grid>
        </Grid>

        <Grid container spacing={3} className={classes.root}>
        <Grid item xs={3}>
          <p>หมายเหตุ</p>
        </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <TextField
              id="Note"
              variant="outlined"
              type="string"
              size="medium"
              placeholder="กรุณากรอกหมายเหตุ"
              value={cleaninformation.Note || ""}
              onChange={handleInputChange}
            />
          </FormControl>
        </Grid>
        </Grid>
        
        <Grid container spacing={3} className={classes.root}>
        <Grid item xs={10}>
          <Button component={RouterLink} to="/cleaninformation" variant="contained">
            กลับ
          </Button>
          <Button              
            style={{ float: "right"}}
            onClick={submit}
            variant="contained"
            color="primary"
          >
            บันทึกข้อมูล
          </Button>
        </Grid>
        </Grid>
        </Paper>
  </Container>
);
}

export default CleaninformationCreate;