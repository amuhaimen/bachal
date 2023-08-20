import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { TextField, Grid, Button, Alert, AlertTitle } from "@mui/material";
import loginimg from "../assets/loginimg.png";
import google from "../assets/google.png";
import Headingfor_reg_log from "../components/Headingfor_reg_log";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userdata } from "../slices/user/userSlice";

let initialValues = {
  email: "",
  password: "",
  loading: false,
};
const Login = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [values, setValues] = useState(initialValues);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  let handleValues = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  let handleSubmit = (e) => {
    let { email, password } = values;
    setValues({
      ...values,
      loading: true,
    });
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setValues({
          email: "",
          password: "",
          loading: false,
        });
        if (!user.user.emailVerified) {
          console.log("please varify your email first");
        }
        dispatch(userdata(user.user));
        localStorage.setItem("user", JSON.stringify(user.user));
        navigate("/bachal");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        // console.log(errorMessage);
        setValues({
          email: "",
          password: "",
          loading: false,
        });
      });
  };

  let handleGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log(result);
      //CONSOLE E RESULT ASHE NA!!!!!!!!!!!!!!!!
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className="regcontainer">
          <Headingfor_reg_log
            className="heading"
            title="Login to your account!"
          />

          <img onClick={handleGoogle} className="google" src={google} />

          <div className="reginput">
            <TextField
              value={values.email}
              onChange={handleValues}
              name="email"
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
            />
          </div>

          <div className="reginput">
            <TextField
              value={values.password}
              onChange={handleValues}
              type="password"
              name="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
          </div>
          {values.loading ? (
            <LoadingButton loading variant="outlined">
              Submit
            </LoadingButton>
          ) : (
            <Button onClick={handleSubmit} variant="contained">
              Login to Continue
            </Button>
          )}
          <div className="loginTitle">
            <Alert severity="info">
              <AlertTitle>Don't have an account?</AlertTitle>
              <strong>
                <Link to="/">Register</Link>
              </strong>
            </Alert>
          </div>

          <div className="loginTitle">
            <Alert severity="error">
              <AlertTitle>Forgot Password?</AlertTitle>
              <strong>
                <Link to="/forgotpassword">Click here</Link>
              </strong>
            </Alert>
          </div>
        </div>
      </Grid>
      <Grid item xs={6}>
        <img className="loginimg" src={loginimg} />
      </Grid>
    </Grid>
  );
  //   <TextField id="outlined-basic" label="Outlined" variant="outlined" />;
};

export default Login;

//Password and invalid email Error setup baki ache
