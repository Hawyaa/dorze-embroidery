import React from "react";
import classes from "./Artisans.module.css";
import { FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";

function Artisans() {
  const artisans = [
    {
      id: 1,
      name: "Alem Tesfaye",
      specialty: "Traditional Dress Embroidery",
      experience: "15 years",
      location: "Addis Ababa",
      image: "/api/placeholder/300/300",
      story: "Master artisan specializing in traditional Ethiopian dress patterns"
    },
    {
      id: 2,
      name: "Marta Girma",
      specialty: "Scarf & Textile Design",
      experience: "12 years",
      location: "Hawassa",
      image: "/api/placeholder/300/300",
      story: "Expert in vibrant scarf designs using natural dyes"
    },
    {
      id: 3,
      name: "Eleni Bekele",
      specialty: "Bag & Accessory Crafting",
      experience: "18 years",
      location: "Bahir Dar",
      image: "/api/placeholder/300/300",
      story: "Creates beautiful embroidered bags using traditional motifs"
    }
  ];

  return (
    <div className={classes.artisans}>
      <section className={classes.hero}>
        <div className={classes.container}>
          <h1>Meet Our Artisans</h1>
          <p>The skilled hands behind our beautiful embroidery pieces</p>
        </div>
      </section>

      <section className={classes.artisans_section}>
        <div className={classes.container}>
          <div className={classes.artisans_grid}>
            {artisans.map(artisan => (
              <div key={artisan.id} className={classes.artisan_card}>
                <div className={classes.artisan_image}>
                  <img src={artisan.image} alt={artisan.name} />
                </div>
                <div className={classes.artisan_info}>
                  <h3>{artisan.name}</h3>
                  <p className={classes.specialty}>{artisan.specialty}</p>
                  <div className={classes.artisan_details}>
                    <div className={classes.detail}>
                      <FaMapMarkerAlt />
                      <span>{artisan.location}</span>
                    </div>
                    <div className={classes.detail}>
                      <FaClock />
                      <span>{artisan.experience} experience</span>
                    </div>
                  </div>
                  <p className={classes.story}>{artisan.story}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Artisans;