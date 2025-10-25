import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

const Header = () => {
  const [{ user, basket }] = useContext(DataContext);
  const navigate = useNavigate();
  const totalItem = basket?.length || 0;

  const handleOrdersClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/auth", { 
        state: { msg: "You must log in to see your orders", redirect: "/orders" }
      });
    }
  };

  // ADD THIS: Handle sign out with redirect
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
      // Redirect to landing page after sign out
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className={classes.header__container}>
      {/* Logo & Location */}
      <div className={classes.logo__container}>
        <Link to="/" className={classes.logoText}>
          Dorze Embroidery
        </Link>
        <div className={classes.delivery}>
          
          
        </div>
      </div>

      {/* Navigation Links */}
      <nav className={classes.navigation}>
        <Link to="/" className={classes.nav_link}>Home</Link>
        <Link to="/about" className={classes.nav_link}>About</Link>
        <Link to="/services" className={classes.nav_link}>Services</Link>
        <Link to="/artisans" className={classes.nav_link}>Artisans</Link>
        <Link to="/contact" className={classes.nav_link}>Contact</Link>
      </nav>

      
      

      {/* Account / Orders / Cart */}
      <div className={classes.order__container}>
        <Link to={user ? "" : "/auth"}>
          <div>
            {user ? (
              <>
                <p>Hello {user?.email?.split("@")[0]}</p>
                {/* CHANGE: Use handleSignOut instead of inline function */}
                <span onClick={handleSignOut}>Sign Out</span>
              </>
            ) : (
              <>
                <p>Hello, Sign In</p>
                <span>Account</span>
              </>
            )}
          </div>
        </Link>

        <Link to={user ? "/orders" : "/auth"} onClick={handleOrdersClick}>
          <p>Returns</p>
          <span>& Orders</span>
        </Link>

        <Link to="/cart" className={classes.cart}>
          <BiCart size={30} />
          <span>{totalItem}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;