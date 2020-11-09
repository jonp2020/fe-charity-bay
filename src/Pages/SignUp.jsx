import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, navigate } from '@reach/router';
import axios from 'axios';

export default function SignUp() {
  const { signup } = useAuth();
  const [error, setError] = useState('');
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
      return setError('Passwords do not match');
    }

    if (!passwordRegex.test(passwordRef.current.value)) {
      return setError(
        'Password must be at least 8 characters and contain at least one; lowercase letter, uppercase letter, number and special character'
      );
    }

    if (!checkboxRef.current.checked) {
      return setError('You must be at least 18 years old to create an account');
    }

    if (!termsRef.current.checked) {
      return setError(
        'Please confirm that you have read the "How It Works" section in the About page'
      );
    }

    try {
      setError('');
      setLoading(true);

      const {
        data: { user },
      } = await axios.get(
        `https://charity-bay-be.herokuapp.com/api/users/${usernameRef.current.value}`
      );
      if (user.username) throw new Error('Username already exists');

      await signup(emailRef.current.value, passwordRef.current.value);
      await axios.post('https://charity-bay-be.herokuapp.com/api/users', {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        location: locationRef.current.value,
      });

      navigate('/dashboard');
    } catch (err) {
      if (err.response) {
        const error = err.response.data.msg;
        setError(error);
      } else {
        const error = err.message || 'Failed to create an account';
        setError(error);
      }
    }
    setLoading(false);
  }

  return (
    <>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" ref={usernameRef} required></input>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" ref={passwordRef} required></input>
        <label htmlFor="passwordConf">Repeat Password:</label>
        <input
          id="passwordConf"
          type="password"
          ref={passwordConfRef}
          required
        ></input>
        <label htmlFor="email">Email:</label>
        <input id="email" type="text" ref={emailRef} required></input>
        <label htmlFor="first-name">First Name:</label>
        <input id="first-name" type="text" ref={firstNameRef} required></input>
        <label htmlFor="last-name">Last Name:</label>
        <input id="last-name" type="text" ref={lastNameRef} required></input>
        <label htmlFor="location">City/Town:</label>
        <input id="location" type="text" ref={locationRef} required></input>
        <label htmlFor="age-verification">I am at least 18 years old:</label>
        <input type="checkbox" ref={checkboxRef}></input>
        <label htmlFor="age-verification">
          I confirm that I have read the <Link to="/about">'How It Works'</Link>{' '}
          section on the About page and understand my role as a user on
          CharityBay:
        </label>
        <input type="checkbox" ref={termsRef}></input>
        <button disabled={loading} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
