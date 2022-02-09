import { Alert, Button, Container, FormControl, Grid, Snackbar, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { RestroomInterface } from "../models/IRestroom";
import { BuildingInterface } from "../models/IBuilding";
import { RoomTypeInterface } from "../models/IRoomType";
import { RoomStatusInterface } from "../models/IRoomStatus";
import { EmployeeInterface } from "../models/IEmployee";
import Select from "@material-ui/core/Select";

import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


function RestroomCreate() {
    const   [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const   [Restroom, setRestroom] =    useState<Partial<RestroomInterface>>({});
    const   [Building, setBuilding] =    useState<BuildingInterface[]>([]);
    const   [Room_type, setRoom_type] =    useState<RoomTypeInterface[]>([]);
    const   [Room_status, setRoom_status] =    useState<RoomStatusInterface[]>([]);
    const   [Employee, setEmployee] =    useState<EmployeeInterface>();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessge, setErrorMessege] = useState("");
    
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Restroom;
    const { value } = event.target;
    setRestroom({ ...Restroom, [id]: value });
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof Restroom;
    setRestroom({
      ...Restroom,
      [name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
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

  const getEmployee = async () => {
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/employee/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        Restroom.EmployeeID = res.data.ID
        if (res.data) {
            setEmployee(res.data);
            console.log(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getBuilding = async () => {
    fetch(`${apiUrl}/buildings`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setBuilding(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getRoom_type = async () => {
    fetch(`${apiUrl}/room_types`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setRoom_type(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getRoom_status = async () => {
    fetch(`${apiUrl}/room_statuses`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setRoom_status(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getRestroom();
    getBuilding();
    getRoom_type();
    getRoom_status();
    getEmployee();
    
    
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit(){
        let data ={
            Room_number : convertType(Restroom.Room_number ?? ""),
            BuildingID : convertType(Restroom.BuildingID),
            Room_typeID : convertType(Restroom.Room_typeID),
            Room_statusID : convertType(Restroom.Room_statusID),
            Restroom_description : Restroom.Restroom_description ?? "",
            EmployeeID: convertType(Restroom.EmployeeID),
            Update_date : selectedDate,
        };console.log(data)

        const requestOptionsPost = {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          };
        fetch(`${apiUrl}/restrooms`, requestOptionsPost)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
              console.log("บันทึกได้")
              setSuccess(true);
              setErrorMessege("");
            } else {
              console.log("บันทึกไม่ได้")
              setError(true);
              setErrorMessege(res.error);
            }
        });
  }
 

    return(
        <div>

            <Container sx={{Width:600}}>
                <Snackbar open={success} autoHideDuration={6000} >
                    <Alert onClose={handleClose} severity="success">
                        บันทึกข้อมูลสำเร็จ 
                    </Alert>
                    </Snackbar>
                <Snackbar open={error} autoHideDuration={6000} >
                    <Alert onClose={handleClose} severity="error">
                        บันทึกข้อมูลไม่สำเร็จ {errorMessge}
                    </Alert>
                 </Snackbar>
                        <Grid>
                          <p></p>
                        </Grid>
                <Grid container spacing={2}>
                  
                    <Grid item xs={6}>
                        <p>Room Number</p>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">                        
                        <TextField
                            id="Room_number"
                            variant="outlined"
                            type="number"
                            size="medium"
                            label="กรุณากรอกเลขห้อง"
                            value={Restroom.Room_number || ""}
                            onChange={handleInputChange}
                        />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <p>Building</p>
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">                        
                            <Select
                                native
                                value={Restroom.BuildingID}
                                onChange={handleChange}
                                inputProps={{
                                name: "BuildingID",
                                }}
                            >
                                <option aria-label="None" value="">
                                กรุณาเลือกอาคาร
                                </option>
                                {Building.map((item: BuildingInterface)=>(
                                <option value={item.ID} key={item.ID}>
                                    {item.Building_name}
                                </option>
                                ))}
                                
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <p>ประเภทของห้อง</p>
                    </Grid>
                    
                    <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">  
                    <Select
                                native
                                value={Restroom.Room_typeID}
                                onChange={handleChange}
                                inputProps={{
                                name: "Room_typeID",
                                }}
                            >
                                <option aria-label="None" value="">
                                กรุณาเลือก
                                </option>
                                {Room_type.map((item: RoomTypeInterface)=>(
                                <option value={item.ID} key={item.ID}>
                                    {item.Room_type}
                                </option>
                                ))}
                                
                            </Select>
                            </FormControl>
                    </Grid>
                    
                    <Grid item xs={6}>
                        <p>สถานะห้องพัก</p>
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">                        
                            <Select
                                native
                                value={Restroom.Room_statusID}
                                onChange={handleChange}
                                inputProps={{
                                name: "Room_statusID",
                                }}
                            >
                                <option aria-label="None" value="">
                                กรุณาเลือกอสถานะห้องพัก
                                </option>
                                {Room_status.map((item: RoomStatusInterface)=>(
                                <option value={item.ID} key={item.ID}>
                                    {item.Room_status}
                                </option>
                                ))}
                                
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <p>คำอธิบาย</p>
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">                        
                        <TextField
                            id="Restroom_description"
                            variant="outlined"
                            type="string"
                            size="medium"
                            label="ใส่คำอธิบาล"
                            value={Restroom.Restroom_description || ""}
                            onChange={handleInputChange}
                        />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <p>ผู้ใช้งาน</p>
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">                        
                            <Select
                                native
                                value={Restroom.EmployeeID}
                                onChange={handleChange}
                                inputProps={{
                                name: "EmployeeID",
                                }}
                            >
                              <option aria-label="None" value={""}>
                                ผู้อัพเดท
                                </option>
                                <option value={Employee?.ID} key={Employee?.ID}>
                                    {Employee?.Employee_name}
                                </option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <p>วันที่อัพเดต</p>
                    </Grid>
                    <Grid item xs={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDateTimePicker
                        
                        name="Update_date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        label="กรุณาเลือกวันที่"
                        minDate={new Date("1900-01-01")}
                        format="yyyy/MM/dd"
                      />
                    </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid>
                      <p></p>
                    </Grid>
                                 

                </Grid>
                <Grid item xs={12}>
                  <Button
                    component={RouterLink}
                    to="/Restroom"
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
                    บันทึก
                </Button>
              </Grid>
            </Container>
        </div>
    );
}
export default RestroomCreate;