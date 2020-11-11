import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, navigate } from '@reach/router';

export default function LogIn() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/dashboard');
    } catch {
      setError('Failed to log in');
    }
    setLoading(false);
  }

  return (
    <>
      <h1 className="signup-login-header">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-25">
            <label htmlFor="email">Email:</label>{' '}
          </div>
          <div className="col-75">
            <input id="email" type="text" ref={emailRef} required></input>
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label htmlFor="password">Password:</label>{' '}
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

        <button className="sign-up-login-btn" disabled={loading} type="submit">
          Submit
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}

      <p className="forgotten-passwork-link">
        <Link className="forgotten-passwork-link" to="/reset-password">
          Forgotten password?
        </Link>
      </p>
    </>
  );
}
