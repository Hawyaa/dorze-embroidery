import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// Remove Layout import from here
import Home from './Pages/Home/Home'
import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import Results from './Pages/Results/Results'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import About from './Pages/About/About'
import Services from './Pages/Services/Services'
import Artisans from './Pages/Artisans/Artisans'
import Contact from './Pages/Contact/Contact'
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

const stripePromise = loadStripe('pk_test_51SBA7SAHOFIFWillXqSrfO5JOto9cNGYrQug6MclVqS4ll3FgaJGUUbAFlwSwADEXPKFSjZkq9Fc5l8NBAxXUu8r00oVOUwco0');

function Routing() {
    return (
        <Router>
            <Elements stripe={stripePromise}>
                {/* REMOVE Layout wrapper from here */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Landing />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/artisans" element={<Artisans />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route 
                        path="/payments" 
                        element={
                            <ProtectedRoute 
                                msg="You must log in to pay"
                                redirect="/payments"
                            >
                                <Payment />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/orders" 
                        element={
                            <ProtectedRoute 
                                msg="You must log in to see your orders"
                                redirect="/orders"
                            >
                                <Orders />
                            </ProtectedRoute>
                        } 
                    />
                    <Route path="/category/:categoryName" element={<Results />} />
                    <Route path="/product/:productId" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
                {/* REMOVE Layout closing tag */}
            </Elements>
        </Router>
    );
}

export default Routing;