import React, { useState, useContext, useEffect } from "react";
import classes from "./SignUp.module.css";
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

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  
  // FIX: Properly access context
  const context = useContext(DataContext);
  const [{ user }, dispatch] = context || [{}, () => {}]; // Fallback if context is undefined
  
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.redirect || "/";

  useEffect(() => {
    console.log("Auth component mounted");
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed, current user:", user);
      if (user && dispatch) {
        dispatch({
          type: Type.SET_USER,
          user: user
        });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

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
        console.log("Creating account...");
        userInfo = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        console.log("Signing in...");
        userInfo = await signInWithEmailAndPassword(auth, email, password);
      }

      // Dispatch to context if available
      if (dispatch) {
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
      }

      console.log("Redirecting to:", redirectPath);
      navigate(redirectPath, { replace: true });

    } catch (err) {
      console.error("Auth error:", err);
      
      // Simplified error handling
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

  return (
    <section className={classes.login}>
      <Link to="/" className={classes.login__logo}>
        {/* Replace Amazon logo with Dorze logo */}
        <h2 style={{ color: '#2c5530', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
          Dorze Embroidery
        </h2>
      </Link>

      <div className={classes.login__container}>
        <h1>{isSignUp ? "Create Account" : "Sign In"}</h1>

        {location.state?.msg && (
          <div style={{ color: "red", backgroundColor: "#ffe6e6", padding: "10px", marginBottom: "15px" }}>
            {location.state.msg}
          </div>
        )}

        <form onSubmit={authHandler}>
          <div className={classes.login__field}>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className={classes.login__field}>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              autoComplete="current-password"
              required
              placeholder="Enter your password (min 6 characters)"
              minLength="6"
            />
          </div>

          <button
            type="submit"
            className={classes.login__signInButton}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader color="#000" size={15} />
            ) : isSignUp ? (
              "Create your Dorze account"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className={classes.login__agreement}>
          By {isSignUp ? "creating an account" : "signing-in"} you agree to the Dorze Embroidery Terms of Service and Privacy Policy.
        </p>

        <div style={{ textAlign: "center", margin: "20px 0", padding: "15px", borderTop: "1px solid #ddd" }}>
          {isSignUp ? (
            <p>
              Already have an account?{" "}
              <button 
                onClick={toggleMode}
                style={{
                  background: "none",
                  border: "none",
                  color: "#0066c0",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: "inherit"
                }}
              >
                Sign in
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button 
                onClick={toggleMode}
                style={{
                  background: "none",
                  border: "none",
                  color: "#0066c0",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: "inherit"
                }}
              >
                Sign up
              </button>
            </p>
          )}
        </div>

        {error && (
          <div style={{ 
            padding: "15px", 
            marginTop: "15px",
            color: "red", 
            backgroundColor: "#ffe6e6",
            border: "1px solid #ffcccc",
            borderRadius: "4px",
            textAlign: "center"
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
    </section>
  );
}

export default Auth;