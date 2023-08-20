import React from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import profile from "../assets/profile.png";
import { BiHome } from "react-icons/bi";
import { AiFillMessage } from "react-icons/ai";
import { RiNotification2Line } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { VscSignOut } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const RootLayout = () => {
  const auth = getAuth();
  let location = useLocation();
  let navigate = useNavigate();
  let handleLogOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <div className="navbar">
            <div className="navcontainer">
              <ul>
                <li>
                  <img src={profile} />
                </li>
                <li>
                  <Link
                    to="/bachal"
                    className={
                      location.pathname == "/bachal" ? "active" : "icon"
                    }
                  >
                    <BiHome />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bachal/message"
                    className={
                      location.pathname == "/bachal/message" ? "active" : "icon"
                    }
                  >
                    <AiFillMessage />
                  </Link>
                </li>
                <li>
                  <RiNotification2Line className="icon" />
                </li>
                <li>
                  <FiSettings className="icon" />
                </li>
                <li>
                  <VscSignOut onClick={handleLogOut} className="icon" />
                </li>
              </ul>
            </div>
          </div>
        </Grid>
        <Grid item xs={11}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default RootLayout;
