import { Link } from "react-router-dom";
import logo from "../assets/images/YOUTIFY.png";
import "../assets/styles/login.css";
import "../assets/styles/register.css";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../contexts/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NAME_REGEX = /^[\p{L}\d\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{3,30}$/u;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export default function Register() {
  const nameRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [cPassword, setCPassword] = useState("");
  const [validCPassword, setValidCPassword] = useState(false);
  const [cPasswordFocus, setCPasswordFocus] = useState(false);

  const [user_type, setUserType] = useState("listener");

  const [errorMessage, setErrorMessage] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    const matchpwd = password === cPassword;
    setValidCPassword(matchpwd);
  }, [password, cPassword]);

  useEffect(() => {
    setErrorMessage("");
  }, [name, email, password, cPassword]);

  const { setUser, setToken } = useStateContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      password,
      user_type,
    };

    setIsProcessing(true);

    axiosClient
      .post("/register", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })

      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          Object.keys(response.data.errors).forEach((key) => {
            toast.error(response.data.errors[key][0]);
          });
        }
      })

      .finally(() => {
        setIsProcessing(false);
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
          <p ref={errRef} className={errorMessage ? "errmsg" : "offscreen"}>
            {errorMessage}
          </p>
          <h1 className="mb-3">Sign up to your music journey</h1>

          <form onSubmit={handleSubmit} className="d-flex flex-column mb-3 w-50">
            <label htmlFor="name">
              Name{" "}
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !name ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="name"
              ref={nameRef}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              placeholder="ex. Jonel Nabanilla"
              aria-describedby="uidnote"
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
              className="rounded-3 p-2 mb-3"
            />
            <p
              id="uidnote"
              className={
                nameFocus && name && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must at least be 3 characters.
            </p>
            <label htmlFor="email">
              Email Address{" "}
              <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="ueanote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              placeholder="someone@example.com"
              className="rounded-3 p-2 mb-3"
            />
            <p
              id="ueanote"
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} /> Must be a valid email
              address!
            </p>

            <label htmlFor="password">
              Password{" "}
              <span className={validPassword ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPassword || !password ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="●●●●●●●●"
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              className="rounded-3 p-2 mb-3"
            />
            <p
              id="pwdnote"
              className={
                passwordFocus && !validPassword ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8-24 characters.
              <br />
              Must include uppercase and lowercase letters, and a number.
            </p>
            <label htmlFor="cpassword">
              Confirm Password
              <span className={validCPassword && cPassword ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={validCPassword || !cPassword ? "hide" : "invalid"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="cpassword"
              placeholder="●●●●●●●●"
              onChange={(e) => setCPassword(e.target.value)}
              required
              aria-invalid={validCPassword ? "false" : "true"}
              aria-describedby="cpnote"
              onFocus={() => setCPasswordFocus(true)}
              onBlur={() => setCPasswordFocus(false)}
              className="rounded-3 p-2 mb-3 form-control"
            />
            <p
              id="cpnote"
              className={
                cPasswordFocus && !validCPassword ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} /> Passwords must match.
            </p>

            <label htmlFor="userType">
              Sign up as:
            </label>
            <select
              id="userType"
              value={user_type}
              onChange={(e) => setUserType(e.target.value)}
              className="form-control"
            >
              <option value="listener">Listener</option>
              <option value="artist">Artist</option>
            </select>
            <button
              disabled={
                !validName ||
                !validEmail ||
                !validPassword ||
                !validCPassword ||
                isProcessing // Disable button when signup is in progress
              }
              className="btn btn-danger rounded-pill mt-3 w-50 align-self-center"
            >
              {isProcessing ? ( // Conditional rendering of button content based on processing state
                <>
                  <FontAwesomeIcon icon={faSpinner} spin /> Signing up...
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login" className="signup-button">
                Log in now
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
