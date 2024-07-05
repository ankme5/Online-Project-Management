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
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-md-12 login-box">
            <div className="row">
              <div className="log-det col-lg-6 col-md-6">
                <span className="small-logo">Welcome Back</span>
                <p className="sub-text">Online Project Management</p>
                <div className="text-box-cont">
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-group center">
                      <button type="submit" className="btn btn-round btn-primary">
                        SIGN IN
                      </button>
                    </div>
                    <div className="row">
                      <p className="forget-p">
                        Don't have an account?{' '}
                        <span>
                          <a href="">Sign Up Now</a>
                        </span>
                      </p>
                    </div>
                    <div className="row">
                      <p className="small-info">Connect With Social Media</p>
                    </div>
                  </form>
                </div>
                <div className="row">
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faFacebookF} />
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faTwitter} />
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faLinkedin} />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 box-de"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
