import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, navigate } from "@reach/router";
import axios from "axios";
export default function SignUp() {
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const locationRef = useRef();
  const checkboxRef = useRef();
  const termsRef = useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (passwordRef.current.value !== passwordConfRef.current.value) {
      return setError("Passwords do not match");
    }
    if (!passwordRegex.test(passwordRef.current.value)) {
      return setError(
        "Password must be at least 8 characters and contain at least one; lowercase letter, uppercase letter, number and special character"
      );
    }
    if (!checkboxRef.current.checked) {
      return setError("You must be at least 18 years old to create an account");
    }
    if (!termsRef.current.checked) {
      return setError(
        'Please confirm that you have read the "How It Works" section in the About page'
      );
    }
    try {
      setError("");
      setLoading(true);
      const {
        data: { user },
      } = await axios.get(
        `https://charity-bay-be.herokuapp.com/api/users/${usernameRef.current.value}`
      );
      if (user.username) throw new Error("Username already exists");
      await signup(emailRef.current.value, passwordRef.current.value);
      await axios.post("https://charity-bay-be.herokuapp.com/api/users", {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        location: locationRef.current.value,
      });
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        const error = err.response.data.msg;
        setError(error);
      } else {
        const error = err.message || "Failed to create an account";
        setError(error);
      }
    }
    setLoading(false);
  }
  return (
    <>
      <h1 className="signup-login-header">Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-25">
            <label htmlFor="username">Username:</label>
          </div>
          <div className="col-75">
            <input id="username" type="text" ref={usernameRef} required></input>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="password">Password:</label>
          </div>
          <div className="col-75">
            <input
              id="password"
              type="password"
              ref={passwordRef}
              required
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="passwordConf">Repeat Password:</label>
          </div>
          <div className="col-75">
            <input
              id="passwordConf"
              type="password"
              ref={passwordConfRef}
              required
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="email">Email:</label>
          </div>
          <div className="col-75">
            <input id="email" type="text" ref={emailRef} required></input>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="first-name">First Name:</label>
          </div>
          <div className="col-75">
            <input
              id="first-name"
              type="text"
              ref={firstNameRef}
              required
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="last-name">Last Name:</label>
          </div>
          <div className="col-75">
            <input
              id="last-name"
              type="text"
              ref={lastNameRef}
              required
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="location">City/Town:</label>
          </div>
          <div className="col-75">
            <input id="location" type="text" ref={locationRef} required></input>
          </div>
        </div>
        {/* <div className="sign-up-verfiy-checkbox-container"> */}
        <div className="sign-up-age-verify-container">
          <div className="sign-up-age-verify">
            <label htmlFor="age-verification">
              I am at least 18 years old:
            </label>
            <input type="checkbox" ref={checkboxRef}></input>
          </div>
          {/* <div className="sign-up-age-checkbox">
            
          </div> */}
        </div>
        <div className="sign-up-verify-role-container">
          <div className="sign-up-role-verify">
            <label htmlFor="age-verification">
              I confirm that I have read the{" "}
              <Link to="/about">'How It Works'</Link> section on the About page
              and understand my role as a user on CharityBay:
            </label>
            <input type="checkbox" ref={termsRef}></input>
          </div>
          {/* <div className="sign-up-role-checkbox">
          </div> */}
        </div>
        {/* </div> */}
        <button className="sign-up-login-btn" disabled={loading} type="submit">
          Submit
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </>
  );
}
