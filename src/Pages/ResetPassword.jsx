import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ResetPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check inbox for further instructions');
    } catch {
      setError('Failed to reset password');
    }
    setLoading(false);
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <h1 className="signup-login-header">Reset Password</h1>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-25">
            <label htmlFor="email">Email:</label>{' '}
          </div>
          <div className="col-75">
            <input id="email" type="text" ref={emailRef} required></input>
          </div>
        </div>
        <button className="sign-up-login-btn" disabled={loading} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
