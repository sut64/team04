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
import { CleaninformationInterface } from "../models/ICleaninformation";
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

function Cleaninformations() {
  const classes = useStyles();
  const [cleaninformations, setCleaninformations] = useState<CleaninformationInterface[]>([]);

  const getCleaninformations = async () => {
    const apiUrl = "http://localhost:8080/cleaninformations";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "cleaninformation/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCleaninformations(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getCleaninformations();
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
              ข้อมูลการแจ้งทำความสะอาดห้องพัก
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/cleaninformation/create"
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
                <TableCell align="center" width="20%">
                  ชื่อ-นามสกุล ลูกค่า
                </TableCell>
                <TableCell align="center" width="10%">
                  หมายเลขห้อง
                </TableCell>
                <TableCell align="center" width="15%">
                  ประเภทบริการทำความสะอาด
                </TableCell>
                <TableCell align="center" width="15%">
                  วันที่ต้องการทำความสะอาด
                </TableCell>
                <TableCell align="center" width="10%">
                  ระดับความเร่งรีบใช้บริการ
                </TableCell>
                <TableCell align="center" width="20%">
                  หมายเหตุ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cleaninformations.map((item: CleaninformationInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.Customer.Customer_name}</TableCell>
                  <TableCell align="center">{item.Restroom.Room_number}</TableCell>
                  <TableCell align="center">{item.Cleanservicetype.Cleanservice_type}</TableCell>
                  <TableCell align="center">{format((new Date(item.Cleandate)), 'dd MMMM yyyy ')}</TableCell>
                  <TableCell align="center">{item.Hastelevel}</TableCell>
                  <TableCell align="center">{item.Note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Cleaninformations;
