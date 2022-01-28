import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Grid } from "@material-ui/core";
 
const useStyles = makeStyles((theme) => ({
 root: {flexGrow: 1},
 menuButton: {marginRight: theme.spacing(2)},
 title: {flexGrow: 1},
 navlink: {color: "white",textDecoration: "none"},
}));

const signout = () => {
  localStorage.clear();
  window.location.href = "/";
};
 
function Navbar() {
 const classes = useStyles();
 return (
   <div className={classes.root}>
     <AppBar position="static">
       <Toolbar>
         <IconButton
           edge="start"
           className={classes.menuButton}
           color="inherit"
           aria-label="menu"
         >
           <MenuIcon />
         </IconButton>
         <Link className={classes.navlink} to="/">
           <Typography variant="h6" className={classes.title}>
             ระบบโรงแรม
           </Typography>
         </Link>
         <Grid xs={2}>
           <Button color="inherit" onClick={signout}>
            ออกจากระบบ
        </Button>
         </Grid>
         
       </Toolbar>
     </AppBar>
   </div>
 );
}
export default Navbar;