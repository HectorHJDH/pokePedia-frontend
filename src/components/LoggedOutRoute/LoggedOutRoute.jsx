import { Navigate } from "react-router-dom";

export default function LoggedOutRoute({ isLoggedIn, children }) {
  return !isLoggedIn ? children : <Navigate to="/" replace />;
}
