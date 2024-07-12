/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
