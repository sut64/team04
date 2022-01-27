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
//
import { RecieptInterface } from "../models/IReciept";
import { format } from 'date-fns'
//
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
//
function Reciept() {
  const classes = useStyles();
  const [Reciept, setReciepts] = useState<RecieptInterface[]>([]); // ใช้ Array []
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getReciepts = async () => {
    fetch(`${apiUrl}/reciepts`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setReciepts(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getReciepts();
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
              to="/paymentbill"
              variant="contained"
              color="primary"
            >
              ชำระเงิน
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="10%">
                  ลำดับใบเสร็จ
                </TableCell>
                <TableCell align="center" width="40%">
                  ชื่อลูกค้า
                </TableCell>
                <TableCell align="center" width="10%">
                  เลขที่การจอง
                </TableCell>
                <TableCell align="center" width="10%">
                  เลขที่ห้องพัก
                </TableCell>
                <TableCell align="center" width="10%">
                  เงินที่รับมา
                </TableCell>
                <TableCell align="center" width="10%">
                  ลำดับช่องทางการชำระเงินที่เลือก
                </TableCell>
                <TableCell align="center" width="20%">
                  สถานะการชำระเงิน
                </TableCell>
                <TableCell align="center" width="20%">
                  วันที่ชำระเงิน
                </TableCell>
                <TableCell align="center" width="20%">
                  หลักฐานการชำระเงิน
                </TableCell>
                <TableCell align="center" width="20%">
                  ไอดีผู้รับผิดชอบการชำระเงิน
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Reciept.map((item: RecieptInterface) => (
                // ลำดับ
                <TableRow key={item.ID}> 
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.Customer_name}</TableCell>
                  <TableCell align="center">{item.ReservationID}</TableCell>
                  <TableCell align="center">{item.RestroomID}</TableCell>
                  <TableCell align="center">{item.Price}</TableCell>
                  <TableCell align="center">{item.PaymentmethodID}</TableCell>
                  <TableCell align="center">{item.Payment_status}</TableCell>
                  <TableCell align="center">{format((new Date(item.Payment_date)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                  <TableCell align="center">{item.Payment_bill}</TableCell>
                  <TableCell align="center">{item.EmployeeID}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Reciept;