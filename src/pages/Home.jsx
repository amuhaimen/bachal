import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
  let navigate = useNavigate();
  let loginUser = useSelector((state) => state.loggedUser.loginUser);

  useEffect(() => {
    if (loginUser == null) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
