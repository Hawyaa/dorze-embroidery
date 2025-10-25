import React from "react";
import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer_container}>
        
        {/* Brand Section */}
        <div className={classes.footer_section}>
          <div className={classes.brand}>
            <h3 className={classes.logo}>Dorze Embroidery</h3>
            <p className={classes.tagline}>
              Preserving Ethiopian embroidery traditions through modern e-commerce
            </p>
            <div className={classes.social_links}>
              <a href="#" aria-label="Facebook" className={classes.social_link}>
                <FaFacebook />
              </a>
              <a href="#" aria-label="Instagram" className={classes.social_link}>
                <FaInstagram />
              </a>
              <a href="#" aria-label="Twitter" className={classes.social_link}>
                <FaTwitter />
              </a>
              <a href="#" aria-label="Pinterest" className={classes.social_link}>
                <FaPinterest />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className={classes.footer_section}>
          <h4 className={classes.section_title}>Quick Links</h4>
          <ul className={classes.footer_links}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/craftsmanship">Our Craftsmanship</Link></li>
            <li><Link to="/collaborations">Collaborations</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className={classes.footer_section}>
          <h4 className={classes.section_title}>Customer Service</h4>
          <ul className={classes.footer_links}>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/shipping">Shipping Info</Link></li>
            <li><Link to="/returns">Returns & Exchanges</Link></li>
            <li><Link to="/size-guide">Size Guide</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className={classes.footer_section}>
          <h4 className={classes.section_title}>Contact Info</h4>
          <div className={classes.contact_info}>
            <div className={classes.contact_item}>
              <FaMapMarkerAlt className={classes.contact_icon} />
              <span>Addis Ababa, Ethiopia</span>
            </div>
            <div className={classes.contact_item}>
              <FaEnvelope className={classes.contact_icon} />
              <span>hello@dorzeembroidery.com</span>
            </div>
            <div className={classes.contact_item}>
              <FaPhone className={classes.contact_icon} />
              <span>+251 123 456 789</span>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className={classes.newsletter}>
            <h5 className={classes.newsletter_title}>Stay Updated</h5>
            <div className={classes.newsletter_form}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className={classes.newsletter_input}
              />
              <button className={classes.newsletter_button}>Subscribe</button>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className={classes.footer_bottom}>
        <div className={classes.footer_bottom_container}>
          <div className={classes.copyright}>
            © {new Date().getFullYear()} Dorze Embroidery. All rights reserved.
          </div>
          <div className={classes.legal_links}>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;