import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Link } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from './header.jsx';
import Login from './login.jsx';
import sendUser from './login.jsx';
import $ from 'jquery';

const Mypaper = styled(Paper)({
  margin: '50px',
  width : 510,
  height:500
})

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));


export default function NaveBar() {
  const classes = useStyles();
    return (
      <div className={classes.root}>

        <Header/>

        <Grid
          alignItems ='center'
          alignContent ='center'
          container
          direction="row"
          justify="center"
          alignItems="center"
          justify ='center'
        >
          <Mypaper>

          <Typography component="div" style={{ height: '50vh' , width :'50vh', color : '#0A194F',  fontStyle: 'italic', fontSize: 30, padding:'60px 60px 60px 60px' }} >
          <pre><b>CarSooq</b></pre><br></br>
          Welcome to CarSooq where you can easily pick your dream car!
          </Typography>

          <form>
            <Button
            variant="contained" color="primary"  fullWidth  onClick={handleLogoutClick}>
            Log Out
            </Button>
          </form>

          </Mypaper>
        </Grid>

        <Typography  align='center' variant='subtitle1' color = 'primary'>&copy;{new Date().getFullYear()} CarSooq | All right reserved | Terms Of Service | Privacy</Typography>
      </div>);
}

function handleLogoutClick(e) {
  e.preventDefault();
  console.log('The link was clicked.');
  localStorage.clear();
  window.location = "http://localhost:3000/";

  // $.ajax({
  //   url: '/logout',
  //   method: 'POST',
  //   data: {},
  //   contentType: "application/json",
  //   success: function(data){
  //       console.log(data, "post logout sent successfully!");
  //   },
  //   error: function(err){
  //       console.log(err, "post logout failed!");
  //   }
  // })

}