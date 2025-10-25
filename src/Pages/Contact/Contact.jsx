import React, { useState } from "react";
import classes from "./Contact.module.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className={classes.contact}>
      <section className={classes.hero}>
        <div className={classes.container}>
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you</p>
        </div>
      </section>

      <section className={classes.contact_section}>
        <div className={classes.container}>
          <div className={classes.contact_content}>
            <div className={classes.contact_info}>
              <h2>Contact Information</h2>
              <div className={classes.contact_items}>
                <div className={classes.contact_item}>
                  <FaPhone className={classes.contact_icon} />
                  <div>
                    <h3>Phone</h3>
                    <p>+251 123 456 789</p>
                  </div>
                </div>
                <div className={classes.contact_item}>
                  <FaEnvelope className={classes.contact_icon} />
                  <div>
                    <h3>Email</h3>
                    <p>hello@dorzeembroidery.com</p>
                  </div>
                </div>
                <div className={classes.contact_item}>
                  <FaMapMarkerAlt className={classes.contact_icon} />
                  <div>
                    <h3>Address</h3>
                    <p>Addis Ababa, Ethiopia</p>
                  </div>
                </div>
                <div className={classes.contact_item}>
                  <FaClock className={classes.contact_icon} />
                  <div>
                    <h3>Business Hours</h3>
                    <p>Monday - Friday: 9AM - 6PM</p>
                    <p>Saturday: 10AM - 4PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.contact_form}>
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className={classes.form_group}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={classes.form_group}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={classes.form_group}>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={classes.form_group}>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className={classes.submit_btn}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;