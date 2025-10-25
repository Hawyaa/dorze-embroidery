import React from "react";
import classes from "./About.module.css";
import { FaHistory, FaUsers, FaHeart, FaAward } from "react-icons/fa";

function About() {
  return (
    <div className={classes.about}>
      {/* Hero Section */}
      <section className={classes.hero}>
        <div className={classes.container}>
          <h1>Our Story</h1>
          <p>Preserving Ethiopian embroidery traditions since 2008</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className={classes.mission}>
        <div className={classes.container}>
          <div className={classes.mission_content}>
            <div className={classes.mission_text}>
              <h2>Our Mission</h2>
              <p>
                Dorze Embroidery is dedicated to preserving and promoting the rich cultural 
                heritage of Ethiopian embroidery while empowering local artisans and their 
                communities through sustainable economic opportunities.
              </p>
            </div>
            <div className={classes.mission_image}>
            <img 
                  src="https://i.pinimg.com/1200x/18/86/01/188601267920ee71226a909da050ff04.jpg" 
                  alt="Ethiopian Embroidery Art" 
                />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={classes.values}>
        <div className={classes.container}>
          <h2>Our Values</h2>
          <div className={classes.values_grid}>
            <div className={classes.value_card}>
              <FaHistory className={classes.value_icon} />
              <h3>Cultural Preservation</h3>
              <p>Keeping traditional embroidery techniques alive for future generations</p>
            </div>
            <div className={classes.value_card}>
              <FaUsers className={classes.value_icon} />
              <h3>Community Empowerment</h3>
              <p>Supporting local artisans with fair wages and sustainable income</p>
            </div>
            <div className={classes.value_card}>
              <FaHeart className={classes.value_icon} />
              <h3>Quality Craftsmanship</h3>
              <p>Every piece tells a story of dedication and exceptional skill</p>
            </div>
            <div className={classes.value_card}>
              <FaAward className={classes.value_icon} />
              <h3>Ethical Practices</h3>
              <p>Transparent and fair trade practices in everything we do</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;