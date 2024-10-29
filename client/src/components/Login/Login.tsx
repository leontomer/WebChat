import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
import { login } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const handleLogin = async (event: any) => {
    event.preventDefault();
    const response = await login(username, password);
    if (response?.token) {
      context?.setUser(username);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", username);
      navigate("/dashboard");
    } else {
      alert("error logging in");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          id="text"
          aria-describedby="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
        <Form.Control
          type="password"
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleLogin(e)}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button variant="primary" onClick={(e) => handleLogin(e)}>
          Login
        </Button>
        <div>
          <NavLink to="/register">Register</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
