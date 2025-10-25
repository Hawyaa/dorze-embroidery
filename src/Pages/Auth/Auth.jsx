import React, { useState, useContext, useEffect } from "react";
import classes from "./Auth.module.css"; // Changed CSS module
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope } from "react-icons/fa";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const context = useContext(DataContext);
  const [{ user }, dispatch] = context || [{}, () => {}];
  
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.redirect || "/products";
  const message = location.state?.msg || "";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && dispatch) {
        dispatch({
          type: Type.SET_USER,
          user: user
        });
      }
    });

    return () => unsubscribe();
  }, [dispatch, redirectPath]);

  const authHandler = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    setError("");
    setLoading(true);

    try {
      let userInfo;
      
      if (isSignUp) {
        userInfo = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userInfo = await signInWithEmailAndPassword(auth, email, password);
      }

      if (dispatch) {
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
      }

      navigate(redirectPath, { replace: true });

    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError("This email is already registered. Please sign in instead.");
          break;
        case 'auth/invalid-email':
          setError("Please enter a valid email address.");
          break;
        case 'auth/user-not-found':
          setError("No account found with this email. Please create an account first.");
          break;
        case 'auth/wrong-password':
          setError("Incorrect password. Please try again.");
          break;
        default:
          setError(`Authentication failed: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={classes.auth_container}>
      {/* Background Design Elements */}
      <div className={classes.background_shape}></div>
      <div className={classes.background_shape2}></div>
      
      <div className={classes.auth_card}>
        {/* Header */}
        <div className={classes.auth_header}>
          <Link to="/" className={classes.logo}>
            <h2>Dorze Embroidery</h2>
          </Link>
          <h1>{isSignUp ? "Create Account" : "Welcome Back"}</h1>
          <p>{isSignUp ? "Join our community of embroidery lovers" : "Sign in to your account"}</p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={classes.message_alert}>
            {message}
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className={classes.error_alert}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={authHandler} className={classes.auth_form}>
          <div className={classes.input_group}>
            <div className={classes.input_container}>
              <FaEnvelope className={classes.input_icon} />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className={classes.auth_input}
                autoComplete="email"
                required
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className={classes.input_group}>
            <div className={classes.input_container}>
              <FaLock className={classes.input_icon} />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                className={classes.auth_input}
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                minLength="6"
              />
              <button
                type="button"
                className={classes.password_toggle}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={classes.submit_button}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader color="#fff" size={18} />
            ) : isSignUp ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className={classes.divider}>
          <span>or</span>
        </div>

        {/* Toggle Mode */}
        <div className={classes.toggle_section}>
          {isSignUp ? (
            <p>
              Already have an account?{" "}
              <button onClick={toggleMode} className={classes.toggle_button}>
                Sign in
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button onClick={toggleMode} className={classes.toggle_button}>
                Sign up
              </button>
            </p>
          )}
        </div>

        {/* Agreement */}
        <p className={classes.agreement}>
          By {isSignUp ? "creating an account" : "signing in"} you agree to our 
          <Link to="/terms" className={classes.link}> Terms of Service</Link> and 
          <Link to="/privacy" className={classes.link}> Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}

export default Auth;