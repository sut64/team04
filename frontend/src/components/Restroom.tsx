import { Container,Autocomplete, TableContainer, Table, TableCell, TableHead, TableRow, TableBody, Paper, Grid, TextField, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RestroomInterface } from "../models/IRestroom";
import { BuildingInterface } from "../models/IBuilding";
import moment from "moment";
import { Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { format } from "date-fns";



function Restroom() {
    const [Restroom,setRestroom] = useState<RestroomInterface[]>([]);
    const [Building, setBuilding] = useState<BuildingInterface[]>([]);

    const apiUrl = "http://localhost:8080";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
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
        getBuilding();
      }, []);
    

    return(
        
        <Container sx={{width:1200}}>
        <Grid sx={{height:50}}>
            
        </Grid>
        
        <Grid>
          <Button variant="contained" component={RouterLink} to="/RestroomCreate">
            เพิ่มห้องพัก
          </Button>
        </Grid>
            <TableContainer component={Paper} sx={{ width:1000 }}>
            <Table sx={{ minWidth: 1000 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell width='70'>Room No.</TableCell>
                    <TableCell align="right">Building</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">UpdateAt</TableCell>
                    <TableCell align="right">Employee</TableCell>
                    <TableCell align="right">Command</TableCell>
                </TableRow>
                </TableHead>
                  <TableBody>
                  {Restroom.map((item: RestroomInterface) => (
                    <TableRow key={item.ID}>
                      <TableCell align="center">{item.Room_number}</TableCell>
                      <TableCell align="center">{item.Building.Building_name}</TableCell>
                      <TableCell align="center">{item.Room_type.Room_type}</TableCell>
                      <TableCell align="center">{item.Room_status.Room_status}</TableCell>
                      <TableCell align="center">{item.Restroom_description}</TableCell>
                      <TableCell align="center">{format((new Date(item.Update_date)), 'dd MMMM yyyy ')}</TableCell>
                      <TableCell align="center">{item.Employee.Employee_name}</TableCell>
                      <TableCell align="center">Delete</TableCell>
                                  
                    </TableRow>
                    ))}
                  </TableBody>
               
            </Table>
            </TableContainer>
        </Container>
    );
}
export default Restroom;