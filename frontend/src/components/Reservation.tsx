import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { ReservationInterface } from "../models/IReservation";
import { format } from 'date-fns'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function Reservation() {
  const classes = useStyles();
  const [Reservation, setReservations] = useState<ReservationInterface[]>([]); // ใช้ Array []
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getReservations = async () => {
    fetch(`${apiUrl}/reservations`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setReservations(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลการจองห้องพัก
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/reservation/create"
              variant="contained"
              color="primary"
            >
              เริ่มต้น
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="10%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="40%">
                  ชื่อสมาชิกผู้ใช้งานระบบ
                </TableCell>
                <TableCell align="center" width="10%">
                  วันที่ต้องการ Check-in
                </TableCell>
                <TableCell align="center" width="10%">
                  วันที่ต้องการ Check-out
                </TableCell>
                <TableCell align="center" width="10%">
                  หมายเลขห้องพัก
                </TableCell>
                <TableCell align="center" width="10%">
                  จำนวนคนที่ต้องการเข้าพัก
                </TableCell>
                <TableCell align="center" width="20%">
                  ช่องทางการชำระเงิน
                </TableCell>
                <TableCell align="center" width="10%">
                  เบอร์โทรศัพท์
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Reservation.map((item: ReservationInterface) => (
                // ลำดับ
                <TableRow key={item.ID}> 
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.Customer.Customer_name}</TableCell>
                  <TableCell align="center">{format((new Date(item.Checkin_date)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                  <TableCell align="center">{format((new Date(item.Checkout_date)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                  <TableCell align="center">{item.Restroom.Room_number}</TableCell>
                  <TableCell align="center">{item.Number_customer}</TableCell>
                  <TableCell align="center">{item.Paymentmethod.Payment_type}</TableCell>
                  <TableCell align="center">{item.Customer_tel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Reservation;