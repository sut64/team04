import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import { Button, Stack } from "@mui/material";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { SigninInterface } from "../models/ISignin";
import { Box, Grid, Modal } from "@mui/material";


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    alignItems: "center",
    width: 50,
    height: 50,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn() {
  const classes = useStyles();
  const [signin, setSignin] = useState<Partial<SigninInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [ModalLogin, setModalLogin] = React.useState(false);
  const [Buttom,setButtom] = useState(0);
  const ModalLoginOpen = () => {setModalLogin(true); setButtom(1);};
  const ModalLogin2Open = () => {setModalLogin(true); setButtom(2);};
  const ModalLoginClose = () => {setModalLogin(false); setButtom(0);}


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const loginEmployee = () => {
    const apiUrl = "http://localhost:8080/loginEmployee";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signin),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("uid", res.data.id);
          localStorage.setItem("loginstat", "1");
          window.location.reload()
        } else {
          setError(true);
        }
      });
  };
  
  const loginCustomer = () => {
    const apiUrl = "http://localhost:8080/loginCustomer";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signin),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("uid", res.data.id);
          localStorage.setItem("loginstat", "2");
          window.location.reload()
        } else {
          setError(true);
        }
      });
  };
 

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSignin({ ...signin, [id]: value });
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          เข้าสู่ระบบสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
        เข้าสู่ระบบไม่สำเร็จ
        </Alert>
      </Snackbar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          เข้าสู่ระบบในฐานะ
          
        </Typography>
          <p></p>
          <h6> Email : employee@gmail.com ,password : XXXXXXX </h6>
          <p></p>
      <Stack spacing={2}>
        <Button onClick={ModalLoginOpen} variant="contained">Employee</Button>
        <Button onClick={ModalLogin2Open} variant="outlined">Customer</Button>
      </Stack>
        
      
      
      
     
      </div>
      <Modal open={ModalLogin} onClose={ModalLoginClose}>
        
          <div className={classes.paper}>
            <Box sx={style}>

            {Buttom === 1 && (
              <Typography component="h1" variant="h5" align="center">
                Employee Sign in
              </Typography>
          )}
            {Buttom === 2 && (
              <Typography component="h1" variant="h5" align="center">
                Customer Sign in
              </Typography>
          )}
          
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Email"
              label="Email Address"
              name="Email"
              autoComplete="email"
              autoFocus
              value={signin.Email || ""}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Password"
              label="Password"
              type="password"
              id="Password"
              autoComplete="current-password"
              value={signin.Password || ""}
              onChange={handleInputChange}
            />
            {Buttom === 1 && (
              <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={loginEmployee}
            >
              Sign In
            </Button>
          )}
            {Buttom === 2 && (
               <Button
               fullWidth
               variant="contained"
               color="primary"
               className={classes.submit}
               onClick={loginCustomer}
             >
               Sign In
             </Button>
          )}
            
          </form></Box>
        </div>
        
      </Modal>
      
    </Container>

    
  );
}

export default SignIn;