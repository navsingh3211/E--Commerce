import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; //it is hook used to redirect
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  const handleLogin = async () => {
    //useing async as function bsc fetch return a promise
    let result = await fetch("http://localhost:5000/login", {
      //using await bcs fetch api return a promise
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json(); //result.json() return a promise that why using await
    // console.warn("login successful", email);
    // console.warn("login successful", password);
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("Please Enter a Valid credentials !");
    }
  };
  return (
    <div className="login">
      <h1>Login now !</h1>

      <input
        className="inputBox"
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Enter Email"
      />
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter Password"
      />
      <button onClick={handleLogin} className="Appbutton" type="button">
        Login
      </button>
    </div>
  );
};

export default Login;
