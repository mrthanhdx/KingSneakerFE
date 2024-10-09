

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { callApi } from '../axios_helper';
import { toastError, toastSuccess } from '../toastMessage/ToastMessage';
import Container from '../Container';
import HomePage from '../../onlineSell/HomePage';
import Navbar from '../Navbar';
import { ContextProvider } from '../Context';

function LogForm({ setStateForm }) {
  const [form, setForm] = useState("loginForm");
  const [role, setRole] = useState(null);
  const [formLogin, setFormLogin] = useState({
    username: "",
    password: ""
  })
  // console.log(form);


  const onFormLoginChange = (e) => {
    let { name, value } = e.target;
    setFormLogin(prevForm => ({
      ...prevForm,
      [name]: value
    }))

  }

  const handleLogin = async () => {
    if (!formLogin.username) {
      toastError("username is invalid!");
    }
    else if (!formLogin.password) {
      toastError("password is invalid");
    } else {
      const form1 = new FormData();
      form1.append("username", formLogin.username);
      form1.append("password", formLogin.password);
      const response = await fetch("http://localhost:5050/api/v1/login", {
        method: "POST",
        body: form1
      })
      console.log(response.status);

      if (response.status == 200) {
        const data = await response.json();
        // console.log(data);
        console.log(data);
        toastSuccess("login success", "Hi " + data.fullName);
        localStorage.setItem("token", data.token);
        console.log(data);
        setRole(data.role);
      } else {
        toastError(response.status, "Unknown User !");
        setFormLogin({
          username: "",
          password: ""
        })
      }

    }
  }

  // console.log(localStorage.getItem("token"));

  return (
    <>
      {role == "ROLE_ADMIN" &&
        <ContextProvider>
          <Navbar />
          <Container />
        </ContextProvider>}
      {role == "CUSTOMER_ROLE" && <HomePage />}
      {role == null &&
        <div>
          <div id="toast-root"></div>
          <button style={{ left: "50px", top: "50px", position: "absolute" }}
            onClick={() => {
              setStateForm("logout");
              console.log("login");

            }} className='btn btn-primary'>Visit website without login</button>
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
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleLogin();
                    }}
                  >
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
                        value={formLogin.username}
                        name='username'
                        onChange={(e) => {
                          onFormLoginChange(e);
                        }}
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
                        name='password'
                        onChange={(e) => {
                          onFormLoginChange(e);
                        }}
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
                    Don't have an account? <a href="#" onClick={(e) => {
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
                backgroundColor: '#f8f9fa'
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
      }
    </>

  );
}

export default LogForm;
