import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials = {
      username,
      password,
    };

    try {
      const response = await fetch('http://localhost:8080/auth/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token); // Call login to set token and state, and navigate to dashboard
      } else {
        alert('Login failed. Please check your credentials.');
        console.log('Unsuccessful:', data.message);
      }
    } catch (error) {
      console.error('Error in logging in:', error);
    }
  };

  return (
    <div className='login-main'>
    <div className="container-fluid">
      <div className="container">
        <div className='row login-header'>
          <span><img src="src/assets/Logo.svg" alt="Logo" /></span>
          <p>Online Project Management</p>
        </div>
        <div className="row">
          <div className="col-lg-10 col-md-12 login-box">
            <div className="log-det">
              <p className="sub-text">Login to Get Started</p>
              <div className="text-box-cont">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-3">
                    <p>Email</p>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Enter your email"
                      aria-label="Email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <p>Password</p>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                      aria-label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="row">
                    <p className="forget-p">
                      <a href="">Forgot Password?</a>
                    </p>
                  </div>
                  <div className="input-group center">
                    <button type="submit" className="btn btn-round btn-primary">
                      SIGN IN
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Login;
