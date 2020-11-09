import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, navigate } from "@reach/router";

export default function UserBar({ location }) {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  if (currentUser) {
    return (
      <div className="user-bar">
        <p>Logged in as: {currentUser.email}</p>
        <button onClick={handleLogout}>Log Out</button>
        {error && <p>{error}</p>}
      </div>
    );
  }
  if (location.pathname === "/signup") {
    return (
      <div className="user-bar">
        <Link className="user-bar-login-out" to="/login">
          Log In
        </Link>
      </div>
    );
  }
  if (location.pathname === "/login") {
    return (
      <div className="user-bar">
        <Link className="user-bar-login-out" to="/signup">
          Sign Up
        </Link>
      </div>
    );
  }
  return (
    <div className="user-bar">
      <Link className="user-bar-login-out" to="/login">
        Log In
      </Link>{" "}
      <Link className="user-bar-login-out" to="/signup">
        Sign Up
      </Link>
    </div>
  );
}
