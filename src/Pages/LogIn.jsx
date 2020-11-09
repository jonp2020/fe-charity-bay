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
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input id="email" type="text" ref={emailRef} required></input>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" ref={passwordRef} required></input>
        <button disabled={loading} type="submit">
          Log In
        </button>
      </form>
      <Link to="/reset-password">Forgotten password?</Link>
    </>
  );
}
