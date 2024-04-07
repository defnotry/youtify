import { Link, Navigate } from "react-router-dom";
import logo from "../assets/images/YOUTIFY.png";
import "../assets/styles/login.css";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser, setToken } = useStateContext();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (user && user.user_type) {
      if (user.user_type === "admin") {
        // Redirect to admin dashboard
        return <Navigate to="/admin/dashboard" />;
      } else if (user.user_type === "artist") {
        return <Navigate to="/artist/profile" />;
      } else if (user.user_type === 'listener') {
        // Redirect to home page
        return <Navigate to="/home" />;
      }
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            Object.keys(response.data.errors).forEach((key) => {
              toast.error(response.data.errors[key][0]);
            });
          } else {
            toast.error(response.data.message);
          }
        }
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100 text-white login-container">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <header className="w-100 p-3 header-container">
        <div>
          <Link to="/welcome">
            <img src={logo} alt="YOUTIFY" />
          </Link>
        </div>
      </header>
      <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <div className="d-flex flex-column justify-content center align-items-center w-50">
          <h1 className="mb-3">Log in to Youtify</h1>
          <form onSubmit={handleSubmit} className="d-flex flex-column mb-3">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              autoComplete="on"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="● ● ● ● ● ● ● ● ● "
              onChange={(e) => setPassword(e.target.value)}
              required
              value={password}
            />
            <button className="btn btn-danger rounded-pill mt-3">Login</button>
          </form>
          <p>
            Do not have an account yet?{" "}
            <span>
              <Link to="/register" className="signup-button">
                Sign up now
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
