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
        <div className="user-bar-loggedIn-text-wrapper">
          <p className="user-bar-loggedIn-text">Logged in as: </p>
          <p className="user-bar-loggedIn-text">
            <strong>{currentUser.email}</strong>
          </p>
        </div>
        <div className="user-bar-loggedIn-btn-wrapper">
          <button className="user-bar-loggedIn-btn" onClick={handleLogout}>
            Log Out
          </button>
          {error && <p>{error}</p>}
        </div>
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
