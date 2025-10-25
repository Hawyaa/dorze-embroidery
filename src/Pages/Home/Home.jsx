import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import classes from "./Home.module.css";
import { 
  FaArrowRight, 
  FaShoppingBag, 
  FaUsers, 
  FaHandHoldingHeart, 
  FaShippingFast,
  FaStar,
  FaHeart,
  FaShieldAlt,
  FaRegSmile
} from "react-icons/fa";

function Home() {
  const categories = [
    {
      name: "Traditional Clothing",
      image: "https://i.pinimg.com/736x/ac/10/86/ac1086aff828dae464b615a95043390d.jpg",
      link: "/auth",
      items: "24 products"
    },
    {
      name: "Handwoven Accessories", 
      image: "https://i.pinimg.com/1200x/76/23/11/7623111403a5d9375dc8389102c15a2e.jpg",
      link: "/auth",
      items: "18 products"
    },
    {
      name: "Home Decor",
      image: "https://i.pinimg.com/1200x/ca/36/7e/ca367e2a824d98ec65c806986b07435a.jpg",
      link: "/auth",
      items: "15 products"
    },
    {
      name: "Gift Items",
      image: "https://i.pinimg.com/1200x/97/b8/09/97b809a0d7d61dd4bdaacf91ed9bd311.jpg",
      link: "/auth",
      items: "12 products"
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "1000+", label: "Handmade Pieces" },
    { number: "50+", label: "Skilled Artisans" },
    { number: "4.9/5", label: "Customer Rating" }
  ];

  return (
    <Layout>
      <div className={classes.home}>
        {/* Modern Hero Section */}
        <section className={classes.hero}>
          <div className={classes.hero_container}>
            <div className={classes.hero_content}>
              <div className={classes.hero_badge}>
                <FaStar /> Authentic Ethiopian Craftsmanship
              </div>
              <h1>
                Wear Art, <span className={classes.highlight}>Tell Stories</span>
              </h1>
              <p>
                Discover exquisite hand-embroidered pieces that blend traditional 
                Ethiopian heritage with contemporary style. Each stitch tells a story 
                of culture and craftsmanship.
              </p>
              <div className={classes.hero_buttons}>
                <Link to="/auth" className={classes.primary_btn}>
                  <FaShoppingBag /> Start Shopping
                </Link>
                <Link to="/about" className={classes.secondary_btn}>
                  Our Story <FaArrowRight />
                </Link>
              </div>
              
              {/* Stats */}
              <div className={classes.hero_stats}>
                {stats.map((stat, index) => (
                  <div key={index} className={classes.stat_item}>
                    <div className={classes.stat_number}>{stat.number}</div>
                    <div className={classes.stat_label}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hero Image Card */}
            <div className={classes.hero_image_card}>
              <div className={classes.image_frame}>
                <img 
                  src="https://i.pinimg.com/1200x/db/11/51/db1151d969de8ecb83fb343f906f6bee.jpg" 
                  alt="Ethiopian Embroidery Art" 
                />
                <div className={classes.floating_badge}>
                  <FaHeart /> Handmade with Love
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className={classes.scroll_indicator}>
            <span>Scroll to explore</span>
            <div className={classes.scroll_arrow}></div>
          </div>
        </section>

        {/* Categories Section */}
        <section className={classes.categories}>
          <div className={classes.container}>
            <div className={classes.section_header}>
              <h2>Curated Collections</h2>
              <p>Explore our beautiful range of handmade treasures</p>
            </div>
            <div className={classes.categories_grid}>
              {categories.map((category, index) => (
                <Link key={index} to={category.link} className={classes.category_card}>
                  <div className={classes.category_image}>
                    <img src={category.image} alt={category.name} />
                    <div className={classes.category_overlay}>
                      <span className={classes.view_btn}>View Collection</span>
                    </div>
                  </div>
                  <div className={classes.category_info}>
                    <h3>{category.name}</h3>
                    <span className={classes.category_items}>{category.items}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={classes.features}>
          <div className={classes.container}>
            <div className={classes.section_header}>
              <h2>Why Choose Dorze?</h2>
              <p>We're more than just a brand - we're a community</p>
            </div>
            <div className={classes.features_grid}>
              <div className={classes.feature_card}>
                <div className={classes.feature_icon}>
                  <FaHandHoldingHeart />
                </div>
                <h3>Artisan Crafted</h3>
                <p>Each piece is meticulously handmade by skilled Ethiopian artisans using traditional techniques</p>
              </div>
              
              <div className={classes.feature_card}>
                <div className={classes.feature_icon}>
                  <FaUsers />
                </div>
                <h3>Community First</h3>
                <p>Your purchase directly supports local artisans and preserves cultural heritage</p>
              </div>
              
              <div className={classes.feature_card}>
                <div className={classes.feature_icon}>
                  <FaShieldAlt />
                </div>
                <h3>Quality Guaranteed</h3>
                <p>We stand behind every piece with our satisfaction guarantee and quality promise</p>
              </div>
              
              <div className={classes.feature_card}>
                <div className={classes.feature_icon}>
                  <FaRegSmile />
                </div>
                <h3>Joy Delivered</h3>
                <p>From our hands to yours - spreading happiness through beautiful craftsmanship</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={classes.cta}>
          <div className={classes.cta_container}>
            <div className={classes.cta_content}>
              <h2>Ready to Adorn Your Story?</h2>
              <p>Join thousands of customers who've found their perfect piece of Ethiopian heritage</p>
              <div className={classes.cta_buttons}>
                <Link to="/auth" className={classes.cta_primary}>
                  <FaShoppingBag /> Shop Now
                </Link>
                <Link to="/collections" className={classes.cta_secondary}>
                  Browse Collections
                </Link>
              </div>
            </div>
            <div className={classes.cta_pattern}></div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Home;