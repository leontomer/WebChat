import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
const App: React.FC = () => {
  return (
    <Router>
      <header className="header">
        <h1 className="header-title">Web Chat</h1>
      </header>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* Add a default route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
