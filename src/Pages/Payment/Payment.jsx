import React, { useContext, useState, useEffect } from "react";
import classes from "./payment.module.css";
import Layout from "../../components/Layout/Layout.jsx";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { db } from "../../Utility/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Type } from "../../Utility/action.type";
import numeral from "numeral";
import axiosInstance from "../../Api/axios";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  // Debug: Test backend connection
  useEffect(() => {
    const testBackendConnection = async () => {
      try {
        console.log("🔍 Testing backend connection...");
        const response = await axiosInstance.get("/");
        console.log("✅ Backend is reachable:", response.data);
      } catch (error) {
        console.error("❌ Backend connection failed:", error);
        setCardError("Cannot connect to payment server. Please try again later.");
      }
    };
    
    testBackendConnection();
  }, []);

  // Create payment intent when component loads
  useEffect(() => {
    if (total > 0) {
      createPaymentIntent();
    }
  }, [total]);

  const createPaymentIntent = async () => {
    try {
      console.log("🔄 Step 1: Creating payment intent for amount:", total * 100);

      // Use your actual backend endpoint
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      console.log("✅ Step 2: Payment intent response:", response.data);

      const clientSecret = response.data.client_secret;
      const paymentIntentId = response.data.paymentIntentId;

      if (!clientSecret) {
        throw new Error("No client secret received from backend");
      }

      setClientSecret(clientSecret);
      console.log("✅ Step 3: Payment intent created:", paymentIntentId);
      
    } catch (error) {
      console.error("❌ Error creating payment intent:", error);
      setCardError("Payment system temporarily unavailable. Please try again later.");
    }
  };

  const handleChange = (e) => {
    console.log("💳 Card element change:", e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    console.log("🔄 Payment process started");
    
    if (!stripe || !elements || !clientSecret) {
      console.log("❌ Stripe not ready:", { stripe: !!stripe, elements: !!elements, clientSecret: !!clientSecret });
      setCardError("Payment system not ready. Please wait...");
      return;
    }

    setProcessing(true);
    setCardError(null);

    try {
      console.log("✅ Step 4: Processing REAL Stripe payment...");

      // REAL STRIPE PAYMENT CONFIRMATION
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: user?.displayName || "Customer",
              email: user?.email,
              address: {
                line1: "Addis Ababa",
                country: "ET",
              }
            },
          },
        }
      );

      console.log("✅ Step 5: Stripe confirmation result:", {
        paymentIntent,
        error,
      });

      if (error) {
        console.error("❌ Stripe payment error:", error);
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        console.log("🎉 Step 6: REAL Stripe payment succeeded:", paymentIntent);
        
        // Save order to Firestore
        await saveOrderToFirestore(paymentIntent);

        setSuccess(true);
        setCardError(null);

        // Clear basket
        dispatch({
          type: Type.EMPTY_BASKET,
        });

        // Redirect to orders page after 2 seconds
        setTimeout(() => {
          window.location.href = "/orders";
        }, 2000);
      }
    } catch (error) {
      console.error("❌ Payment process error:", error);
      console.error("Error details:", error.response?.data || error.message);
      setCardError(error.message || "Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const saveOrderToFirestore = async (paymentIntent) => {
    try {
      if (!user) {
        throw new Error("No user logged in");
      }

      const orderData = {
        basket: basket,
        amount: total,
        created: serverTimestamp(),
        status: "completed",
        payment_id: paymentIntent.id,
        customer_email: user.email,
        shipping_address: {
          email: user.email,
          address: "Addis Ababa, Ethiopia",
        },
      };

      const orderRef = doc(collection(db, "users", user.uid, "orders"));
      await setDoc(orderRef, orderData);

      console.log("✅ Order saved to Firestore with ID:", orderRef.id);
    } catch (error) {
      console.error("❌ Error saving order to Firestore:", error);
      throw error;
    }
  };

  return (
    <Layout>
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>

      <section className={classes.payment}>
        {/* Test Card Instructions */}
        <div className={classes.test_notice}>
          <h4>💳 Real Stripe Test Payment</h4>
          <p>This is a <strong>REAL Stripe payment</strong> in test mode.</p>
          <p>Use test card: <strong>4242 4242 4242 4242</strong></p>
          <p>Exp: 12/34 | CVC: 123 | ZIP: 12345</p>
          <p style={{fontSize: '12px', color: '#666', marginTop: '10px'}}>
            Payment will appear in your Stripe dashboard (test mode).
          </p>
        </div>

        {/* Delivery Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>Addis Ababa</div>
            <div>Ethiopia</div>
          </div>
        </div>
        <hr />

        {/* Review Items */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* Payment Method */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/* Error Display */}
                {cardError && (
                  <div className={classes.cardError}>{cardError}</div>
                )}

                {/* Stripe Card Element */}
                <div className={classes.card_element_container}>
                  <label>Card Details</label>
                  <CardElement
                    onChange={handleChange}
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                          padding: "10px 12px",
                        },
                      },
                    }}
                  />
                </div>

                {/* Price and Button */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <p>Total Order |</p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={!stripe || !clientSecret || processing || cardError || success}
                    className={classes.payment__button}
                  >
                    {!clientSecret
                      ? "Loading Payment..."
                      : processing
                      ? "Processing..."
                      : success
                      ? "Payment Successful!"
                      : `Pay ${numeral(total).format('$0,0.00')}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {success && (
          <div className={classes.success}>
            ✅ Real Stripe Payment Successful! Redirecting to orders...
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Payment;