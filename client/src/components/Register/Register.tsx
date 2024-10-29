import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { register } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const context = useContext(AppContext);

  const validateForm = () => {
    if (!username) {
      alert("Username is required");
      return false;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleRegister = async (event: any) => {
    event.preventDefault();
    if (validateForm()) {
      const response = await register(username, password, confirmPassword);
      if (response?.token) {
        context?.setUser(username);
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", username);
        navigate("/dashboard");
      } else {
        alert("error registering");
      }
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
          onKeyPress={(e) => e.key === "Enter" && handleRegister(e)}
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
          onKeyPress={(e) => e.key === "Enter" && handleRegister(e)}
        />
      </div>
      <div>
        <Form.Label htmlFor="inputPassword5">Repeat Password</Form.Label>
        <Form.Control
          type="password"
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleRegister(e)}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button variant="primary" onClick={(e) => handleRegister(e)}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default Register;
