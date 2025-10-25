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
  const [interestCategories, setInterestCategories] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [personalizedPartners, setPersonalizedPartners] = useState([]);
  const [showInterestSelection, setShowInterestSelection] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  // Load interest categories
  useEffect(() => {
    const loadInterests = async () => {
      try {
        const response = await axiosInstance.get("/interests");
        setInterestCategories(response.data.categories);
      } catch (error) {
        console.log("Could not load interests:", error);
      }
    };
    loadInterests();
  }, []);

  // Create payment intent when component loads
  useEffect(() => {
    if (total > 0) {
      createPaymentIntent();
    }
  }, [total]);

  const createPaymentIntent = async () => {
    try {
      console.log("🔄 Creating payment intent for amount:", total * 100);

      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      const clientSecret = response.data.client_secret;
      if (!clientSecret) {
        throw new Error("No client secret received from backend");
      }

      setClientSecret(clientSecret);
      console.log("✅ Payment intent created");
      
    } catch (error) {
      console.error("❌ Error creating payment intent:", error);
      setCardError("Payment system temporarily unavailable. Please try again later.");
    }
  };

  const handleInterestToggle = (interestId) => {
    setSelectedInterests(prev => {
      if (prev.includes(interestId)) {
        return prev.filter(id => id !== interestId);
      } else if (prev.length < 2) { // Limit to 2 interests
        return [...prev, interestId];
      }
      return prev;
    });
  };

  const handleInterestSubmission = async () => {
    if (selectedInterests.length === 0) {
      setCardError("Please select at least one interest to get personalized offers!");
      return;
    }

    try {
      const response = await axiosInstance.post("/partnerships/interests", {
        interests: selectedInterests
      });
      
      setPersonalizedPartners(response.data.partners);
      setShowInterestSelection(false);
      console.log("✅ Personalized partners loaded:", response.data.partners.length);
    } catch (error) {
      console.error("Error loading partners:", error);
    }
  };

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      setCardError("Payment system not ready. Please wait...");
      return;
    }

    setProcessing(true);
    setCardError(null);

    try {
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

      if (error) {
        console.error("❌ Stripe payment error:", error);
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        console.log("🎉 Payment succeeded!");
        
        // Save order to Firestore
        await saveOrderToFirestore(paymentIntent);
        
        setSuccess(true);
        setCardError(null);
        
        // Show interest selection after payment
        setTimeout(() => {
          setShowInterestSelection(true);
        }, 1000);
      }
    } catch (error) {
      console.error("❌ Payment process error:", error);
      setCardError(error.message || "Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const saveOrderToFirestore = async (paymentIntent) => {
    try {
      if (!user) return;

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
        selected_interests: selectedInterests, // Save user interests
        personalized_partners: personalizedPartners.map(p => p.id) // Save partner IDs
      };

      const orderRef = doc(collection(db, "users", user.uid, "orders"));
      await setDoc(orderRef, orderData);

      console.log("✅ Order saved to Firestore");
    } catch (error) {
      console.error("❌ Error saving order to Firestore:", error);
    }
  };

  // Interest Selection Component
  const InterestSelection = () => (
    <div className={classes.interest_selection}>
      <div className={classes.interest_header}>
        <h3>🎁 Choose Your Interests</h3>
        <p>Select up to 2 categories to get personalized discount links from Ethiopian women entrepreneurs!</p>
      </div>
      
      <div className={classes.interest_grid}>
        {interestCategories.map(category => (
          <div
            key={category.id}
            className={`${classes.interest_card} ${
              selectedInterests.includes(category.id) ? classes.selected : ''
            }`}
            onClick={() => handleInterestToggle(category.id)}
          >
            <div className={classes.interest_icon}>{category.icon}</div>
            <div className={classes.interest_name}>{category.name}</div>
            {selectedInterests.includes(category.id) && (
              <div className={classes.selected_check}>✓</div>
            )}
          </div>
        ))}
      </div>
      
      <div className={classes.interest_footer}>
        <p>Selected: {selectedInterests.length}/2</p>
        <button 
          onClick={handleInterestSubmission}
          disabled={selectedInterests.length === 0}
          className={classes.interest_button}
        >
          Get My Personalized Offers
        </button>
      </div>
    </div>
  );

  // Personalized Partners Component
  const PersonalizedPartners = () => (
    <div className={classes.personalized_partners}>
      <div className={classes.partners_header}>
        <h3>✨ Your Personalized Offers!</h3>
        <p>Based on your interests, here are special discount links just for you:</p>
      </div>
      
      <div className={classes.partners_grid}>
        {personalizedPartners.map(partner => (
          <div key={partner.id} className={classes.partner_card}>
            <h4>{partner.name}</h4>
            <p className={classes.partner_description}>{partner.description}</p>
            <div className={classes.discount_badge}>{partner.discount} OFF</div>
            <div className={classes.partner_code}>
              Use code: <strong>{partner.code}</strong>
            </div>
            <a 
              href={partner.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className={classes.partner_link}
            >
              🔗 Visit {partner.name}
            </a>
          </div>
        ))}
      </div>
      
      <div className={classes.community_message}>
        <p>🌟 <strong>Thank you for supporting Ethiopian women entrepreneurs!</strong></p>
        <p>Your purchase helps build a collaborative business network.</p>
        <button 
          onClick={() => window.location.href = "/orders"}
          className={classes.continue_button}
        >
          Continue to Orders
        </button>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>

      <section className={classes.payment}>
        {/* Collaborative Commerce Header */}
        <div className={classes.collaborative_header}>
          <h3>🌟 Selamta Collaborative Marketplace</h3>
          <p>Choose your interests after payment to get personalized discount links!</p>
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
        {!success && (
          <div className={classes.flex}>
            <h3>Payment Method</h3>
            <div className={classes.payment__card__container}>
              <div className={classes.payment__details}>
                <form onSubmit={handlePayment}>
                  {cardError && (
                    <div className={classes.cardError}>{cardError}</div>
                  )}

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
                          },
                        },
                      }}
                    />
                  </div>

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
        )}

        {/* Success Flow */}
        {success && (
          <div className={classes.success_flow}>
            {showInterestSelection && !personalizedPartners.length && (
              <InterestSelection />
            )}
            
            {personalizedPartners.length > 0 && (
              <PersonalizedPartners />
            )}
            
            {!showInterestSelection && !personalizedPartners.length && (
              <div className={classes.payment_success}>
                <h3>✅ Payment Successful!</h3>
                <p>Preparing your personalized offers...</p>
              </div>
            )}
          </div>
        )}

        {/* Interest Preview */}
        {!success && interestCategories.length > 0 && (
          <div className={classes.interest_preview}>
            <h4>🎯 Personalized Discounts</h4>
            <p>After payment, choose your interests to get customized discount links from Ethiopian women entrepreneurs!</p>
            <div className={classes.preview_interests}>
              {interestCategories.slice(0, 3).map(category => (
                <span key={category.id} className={classes.preview_interest}>
                  {category.icon} {category.name.split(' ')[0]}
                </span>
              ))}
              <span className={classes.preview_more}>+{interestCategories.length - 3} more</span>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Payment;