import React, { useState } from "react";
import { TextField, Grid, Button, Alert, AlertTitle } from "@mui/material";
import regimg from "../assets/regimg.png";
import Headingfor_reg_log from "../components/Headingfor_reg_log";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { Link } from "react-router-dom";

let initialValues = {
  email: "",
  fullName: "",
  password: "",
  loading: false,
  error: "",
  eye: false,
};

const Registration = () => {
  let [values, setValues] = useState(initialValues);

  const auth = getAuth();

  let navigate = useNavigate();

  let handleValues = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  let handleSubmit = () => {
    let { email, fullName, password } = values;

    if (!email) {
      setValues({
        ...values,
        error: "Enter an email",
      });
      return;
    }
    if (!fullName) {
      setValues({
        ...values,
        error: "Enter your name",
      });
      return;
    }
    if (!password) {
      setValues({
        ...values,
        error: "Enter password",
      });
      return;
    }

    setValues({
      ...values,
      loading: true,
    });
    createUserWithEmailAndPassword(auth, email, password).then((user) => {
      sendEmailVerification(auth.currentUser).then(() => {
        console.log("email sent");
      });
      setValues({
        email: "",
        fullName: "",
        password: "",
        loading: false,
      });
      navigate("/login");
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className="regcontainer">
          <Headingfor_reg_log
            className="heading"
            title="Get started with easily register"
          />
          <p>Free register and you can enjoy it</p>
          <div className="reginput">
            <TextField
              value={values.email}
              onChange={handleValues}
              name="email"
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
            />
            {values.error.includes("email") && (
              <Alert severity="error">{values.error}</Alert>
            )}
          </div>
          <div className="reginput">
            <TextField
              value={values.fullName}
              onChange={handleValues}
              name="fullName"
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
            />
            {values.error.includes("name") && (
              <Alert severity="error">{values.error}</Alert>
            )}
          </div>
          <div className="reginput">
            <TextField
              value={values.password}
              onChange={handleValues}
              name="password"
              type={values.eye ? "text" : "password"}
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
            {values.error.includes("password") && (
              <Alert severity="error">{values.error}</Alert>
            )}
            <div onClick={() => setValues({ ...values, eye: !values.eye })}>
              {values.eye ? <RiEyeFill /> : <RiEyeCloseFill />}
            </div>
          </div>
          {values.loading ? (
            <LoadingButton loading variant="outlined">
              Submit
            </LoadingButton>
          ) : (
            <Button onClick={handleSubmit} variant="contained">
              Sign Up
            </Button>
          )}
          <div className="loginTitle">
            <Alert severity="info">
              <AlertTitle>Already have an account?</AlertTitle>
              <strong>
                <Link to="/login">Log in</Link>
              </strong>
            </Alert>
          </div>
        </div>
      </Grid>
      <Grid item xs={6}>
        <img className="regimg" src={regimg} />
      </Grid>
    </Grid>
  );
  //   <TextField id="outlined-basic" label="Outlined" variant="outlined" />;
};

export default Registration;

//Password regex baki
