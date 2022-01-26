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
import { CheckoutInterface } from "../models/ICheckout";
import { format } from 'date-fns'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 1400,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function Checkouts() {
  const classes = useStyles();
  const [checkouts, setCheckout] = useState<CheckoutInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getCheckout = async () => {
    fetch(`${apiUrl}/checkouts`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setCheckout(res.data);
        } else {
          console.log("else");
        }
      });
  };



  useEffect(() => {
    getCheckout();
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
              รายการ Checkout
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/CheckOutCreate"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="8%">
                  ลูกค้า
                </TableCell>
                <TableCell align="center" width="12%">
                  ห้องพัก
                </TableCell>
                <TableCell align="center" width="12%">
                  วันทึ่ Checkin
                </TableCell>
                <TableCell align="center" width="12%">
                  วันที่ Checkout
                </TableCell>
                <TableCell align="center" width="15%">
                  สภาพห้อง
                </TableCell>
                <TableCell align="center" width="10%">
                  ค่าปรับ
                </TableCell>
                <TableCell align="center" width="10%">
                  สถานะการชำระเงิน
                </TableCell>
                <TableCell align="center" width="10%">
                  พนักงาน
                </TableCell>
                

              </TableRow>
            </TableHead>
            <TableBody>
              {checkouts.map((item: CheckoutInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.Customer.Customer_name}</TableCell>
                  <TableCell align="center">{item.Reservation.RestroomID}</TableCell>
                  <TableCell align="center">{format((new Date(item.Checkin.Checkin_datetime)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                  <TableCell align="center">{format((new Date(item.Checkout_datetime)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                  <TableCell align="center">{item.Room_condition}</TableCell>
                  <TableCell align="center">{item.Room_charge}</TableCell>
                  <TableCell align="center">{item.Reciept.Payment_status}</TableCell>
                  <TableCell align="center">{item.Employee.Employee_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Checkouts;
