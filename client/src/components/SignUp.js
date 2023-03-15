import React,{useState} from "react";
import {useNavigate } from "react-router-dom";//it is hook used to redirect
const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const collectDate =async () => {
      // console.warn(name, email, password);
      let result = await fetch("/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type':'application/json'
        }
      });
      result = await result.json();
      console.warn(result);
      if (result) {
        navigate('/');
      }
    }
    return (
      <div className="register">
        <h1>Register user !</h1>
        <input
          className="inputBox"
          type="text"
            value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter Name"
        />
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
        <button onClick={collectDate} className="Appbutton" type="button">
          Sign Up
        </button>
      </div>
    );
}

export default SignUp;