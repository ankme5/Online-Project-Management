import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const [usernameNullCheck, setUsernameNullCheck] = useState(false);
  const [passwordNullCheck, setPasswordNullCheck] = useState(false);
  const [validationCheck, setValidationCheck] = useState(false);

  const [showPassword, setShowPassword] = useState(false);


  // const checkServerStatus = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/actuator/health', {
  //       method: 'GET',
  //     });
  //     return response.ok;
  //   } catch (error) {
  //     return false;
  //   }
  // };

  // const serverStatus=checkServerStatus();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim() === "") {
      setUsernameNullCheck(true);
    } else {
      setUsernameNullCheck(false);
    }

    if (password.trim() === "") {
      setPasswordNullCheck(true);
    } else {
      setPasswordNullCheck(false);
    }

    if (username.trim() && password.trim()) {
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
          setValidationCheck(true);
          // alert('Login failed. Please check your credentials.');
          console.log('Unsuccessful:', data.message);
        }
      } catch (error) {
        console.error('Error in logging in:', error);
      }
    }


  };


  return (
    <div className='login-main'>
      <div className="container-fluid">
        <div className="container">
          <div className='login-header'>
            <span><img src="src/assets/Logo.svg" alt="Logo" /></span>
            <p>Online Project Management</p>
          </div>
          <div className="login-container">
            <div className="col-lg-10 col-md-12 login-box">
              <div className="log-det">
                <p className="sub-text">Login to Get Started</p>
                <div className="text-box-cont">
                  <form onSubmit={handleSubmit}>
                    <div className={`input-group ${usernameNullCheck ? 'warning-txt-color' : ''}`}>
                      <p>Email</p>
                      <input
                        type="text"
                        id="username"
                        className= {`form-control ${usernameNullCheck ? 'warning-box-color' : ''}`}
                        placeholder="Enter your email"
                        aria-label="Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <p id='email-warning' className={`warning ${usernameNullCheck ? 'show-warning' : ''}`}>Email is required</p>
                    </div>
                    <div className={`input-group ${passwordNullCheck ? 'warning-txt-color' : ''}`}>
                      <p>Password</p>
                      <input
                        type={showPassword? "text":"password"}
                        id="password"
                        className={`form-control ${passwordNullCheck ? 'warning-box-color' : ''}`}
                        placeholder="Enter your password"
                        aria-label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                      />
                      <button
                          type="button"
                          className="password-toggle-btn"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {/* <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} /> */}
                          <img src="src/assets/hide-password.svg" />
                        </button>
                      <p id='email-warning' className={`warning ${passwordNullCheck ? 'show-warning' : ''}`}>Password is required</p>
                    </div>
                    <div className="row">
                      <p className="forget-p">
                        <a href="">Forgot Password?</a>
                      </p>
                    </div>
                    <div className="login-btn center">
                      <button type="submit" className="btn btn-round btn-primary">
                        SIGN IN
                      </button>
                      <p className={`${validationCheck ? 'show-warning' : 'warning'}`}>Invalid Credentials</p>
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
