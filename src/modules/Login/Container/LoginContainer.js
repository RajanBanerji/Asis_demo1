import React from "react";
import "../View/style.css";
import LoginView from "../View/LoginView";

const LoginContainer = ({ setIsLoggedIn }) => {
  return (
    <div className="container">
      <div className="login-container">
        <LoginView setIsLoggedIn={setIsLoggedIn}></LoginView>
      </div>
    </div>
  );
};

export default LoginContainer;
