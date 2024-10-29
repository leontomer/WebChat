import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

type Props = {
  children: React.ReactNode;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const context = useContext(AppContext);
  const isLoggedIn = context?.user || localStorage.getItem("token");

  return isLoggedIn ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
