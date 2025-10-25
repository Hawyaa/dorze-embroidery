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

  return (
    <header className={classes.header__container}>
      {/* Logo & Location */}
      <div className={classes.logo__container}>
        <Link to="/" className={classes.logoText}>
          Dorze Embroidery
        </Link>
        <div className={classes.delivery}>
          <span><SlLocationPin /></span>
          <div>
            <p>Deliver to</p>
            <span>Ethiopia</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className={classes.search__container}>
        <input type="text" placeholder="Search..." className={classes.search_input} />
        <button className={classes.search_button}>
          <BsSearch size={14} />
        </button>
      </div>

      {/* Account / Orders / Cart */}
      <div className={classes.order__container}>
        <Link to={user ? "" : "/auth"}>
          <div>
            {user ? (
              <>
                <p>Hello {user?.email?.split("@")[0]}</p>
                <span onClick={() => auth.signOut()}>Sign Out</span>
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
