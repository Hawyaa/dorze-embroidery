import React from "react";
import classes from "./Services.module.css";
import { 
  FaPalette, 
  FaUsers, 
  FaTools, 
  FaGraduationCap, 
  FaStar,
  FaHeart,
  FaCheck,
  FaArrowRight,
  FaSeedling,
  FaHandsHelping,
  FaAward
} from "react-icons/fa";

function Services() {
  const services = [
    {
      icon: <FaPalette />,
      title: "Custom Embroidery",
      description: "Bespoke embroidery designs tailored to your specific needs and preferences. Bring your vision to life with our artisan touch.",
      features: ["Personalized patterns", "Custom color schemes", "Unique designs", "Free consultation"],
      popular: true,
      color: "#eabc66"
    },
    {
      icon: <FaUsers />,
      title: "Bulk Orders",
      description: "Large quantity orders for businesses, events, and organizations. Perfect for corporate gifts and special occasions.",
      features: ["Volume discounts", "Consistent quality", "Timely delivery", "Dedicated support"],
      popular: false,
      color: "#667eea"
    },
    {
      icon: <FaTools />,
      title: "Restoration Services",
      description: "Expert restoration of antique and damaged embroidery pieces. Preserve your heritage with our traditional techniques.",
      features: ["Traditional techniques", "Material matching", "Preservation care", "Heritage protection"],
      popular: false,
      color: "#764ba2"
    },
    {
      icon: <FaGraduationCap />,
      title: "Workshops & Training",
      description: "Learn traditional Ethiopian embroidery techniques from master artisans. Keep the craft alive for generations.",
      features: ["Beginner to advanced", "Hands-on training", "Cultural education", "Take-home kits"],
      popular: true,
      color: "#d2af3c"
    }
  ];

  const stats = [
    { icon: <FaStar />, number: "500+", label: "Happy Clients" },
    { icon: <FaHeart />, number: "1000+", label: "Projects Completed" },
    { icon: <FaSeedling />, number: "50+", label: "Artisans Supported" },
    { icon: <FaAward />, number: "4.9/5", label: "Customer Rating" }
  ];

  return (
    <div className={classes.services}>
      {/* Modern Hero Section */}
      <section className={classes.hero}>
        <div className={classes.hero_container}>
          <div className={classes.hero_content}>
            <div className={classes.hero_badge}>
              <FaHandsHelping /> Our Craftsmanship
            </div>
            <h1>
              Weaving <span className={classes.highlight}>Stories</span> Through Every Stitch
            </h1>
            <p>
              From personalized creations to preserving cultural heritage, our master artisans 
              bring your vision to life with traditional Ethiopian embroidery techniques 
              passed down through generations.
            </p>
            
            {/* Stats */}
            <div className={classes.hero_stats}>
              {stats.map((stat, index) => (
                <div key={index} className={classes.stat_item}>
                  <div className={classes.stat_icon}>{stat.icon}</div>
                  <div className={classes.stat_content}>
                    <div className={classes.stat_number}>{stat.number}</div>
                    <div className={classes.stat_label}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className={classes.hero_visual}>
            <div className={classes.visual_cards}>
              <div className={classes.visual_card}>
                <div className={classes.card_icon}>
                  <FaPalette />
                </div>
                <h4>Creative Designs</h4>
                <p>Unique patterns that tell your story</p>
              </div>
              <div className={classes.visual_card}>
                <div className={classes.card_icon}>
                  <FaHeart />
                </div>
                <h4>Made with Love</h4>
                <p>Every piece crafted with passion</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className={classes.scroll_indicator}>
          <span>Discover our services</span>
          <div className={classes.scroll_arrow}></div>
        </div>
      </section>

      {/* Services Section */}
      <section className={classes.services_section}>
        <div className={classes.container}>
          <div className={classes.section_header}>
            <h2>Our Premium Services</h2>
            <p>Discover how we can bring your embroidery dreams to life with our comprehensive solutions</p>
          </div>
          
          <div className={classes.services_grid}>
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`${classes.service_card} ${service.popular ? classes.popular : ''}`}
                style={{ '--accent-color': service.color }}
              >
                {service.popular && (
                  <div className={classes.popular_badge}>
                    <FaStar /> Most Popular
                  </div>
                )}
                
                <div className={classes.service_header}>
                  <div className={classes.service_icon} style={{ color: service.color }}>
                    {service.icon}
                  </div>
                  <h3>{service.title}</h3>
                </div>
                
                <p className={classes.service_description}>{service.description}</p>
                
                <ul className={classes.features_list}>
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <FaCheck className={classes.feature_icon} style={{ color: service.color }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className={classes.service_button} style={{ borderColor: service.color, color: service.color }}>
                  Learn More <FaArrowRight />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={classes.cta_section}>
        <div className={classes.container}>
          <div className={classes.cta_content}>
            <div className={classes.cta_icon}>
              <FaHandsHelping />
            </div>
            <h2>Ready to Start Your Project?</h2>
            <p>Let's discuss how we can create something beautiful together. Get a free consultation today!</p>
            <div className={classes.cta_buttons}>
              <button className={classes.cta_primary}>
                Get Free Consultation
              </button>
              <button className={classes.cta_secondary}>
                View Our Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;