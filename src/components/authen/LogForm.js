

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function LogForm() {
  const [form, setForm] = useState("loginForm");
  console.log(form);
  
  return (
    <div>
      {form === 'loginForm' && 
      <>
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f8f9fa',
          }}
        >
          <div
            className="card shadow"
            style={{
              width: '400px',
              padding: '20px',
              borderRadius: '10px',
            }}
          >
            <h3 className="text-center mb-4">Login</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  style={{ padding: '10px', fontSize: '16px' }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  style={{ padding: '10px', fontSize: '16px' }}
                />
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: '#007bff',
                    padding: '10px',
                    fontSize: '18px',
                    borderRadius: '5px',
                  }}
                >
                  Login
                </button>
              </div>
            </form>
            <p className="text-center mt-3">
              Don't have an account? <a href="#" onClick={(e)=>{
                setForm("registerForm")
              }}>Sign up</a>
            </p>
          </div>
        </div>
      </>}
      {form === "registerForm" && <>
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f8f9fa',
          }}
        >
          <div
            className="card shadow"
            style={{
              width: '400px',
              padding: '20px',
              borderRadius: '10px',
            }}
          >
            <h3 className="text-center mb-4">Register</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  style={{ padding: '10px', fontSize: '16px' }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  placeholder="Enter your full name"
                  style={{ padding: '10px', fontSize: '16px' }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phoneNumber"
                  placeholder="Enter your phone number"
                  style={{ padding: '10px', fontSize: '16px' }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dateOfBirth" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateOfBirth"
                  style={{ padding: '10px', fontSize: '16px' }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  className="form-control"
                  id="gender"
                  style={{ padding: '10px', fontSize: '16px' }}
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter your username"
                  style={{ padding: '10px', fontSize: '16px' }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  style={{ padding: '10px', fontSize: '16px' }}
                />
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: '#007bff',
                    padding: '10px',
                    fontSize: '18px',
                    borderRadius: '5px',
                  }}
                >
                  Register
                </button>
              </div>
            </form>
            <p className="text-center mt-3">
              Already have an account?{' '}
              <a href="#" onClick={() => {
                setForm('loginForm')
              }}>
                Login
              </a>
            </p>
          </div>
        </div>
      </>}
    </div>

  );
}

export default LogForm;
