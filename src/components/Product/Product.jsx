import React, { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import ProductCard from "./ProductCard";
import classes from "./product.module.css";

function Product() {
  const [{}, dispatch] = useContext(DataContext);

  // Products data with all your images
  const products = [
    {
      id: 1,
      title: "Handwoven Ethiopian Basket",
      description: "Traditional handwoven basket made from natural materials, perfect for home decor and storage. Each piece is uniquely crafted by local artisans.",
      price: 45.99,
      image: "https://i.pinimg.com/736x/52/80/f7/5280f77a72d754d1592868e8301fb96a.jpg",
      rating: { rate: 4.8, count: 124 },
      category: "handcrafts"
    },
    {
      id: 2,
      title: "Ethiopian Ceramic Coffee Set",
      description: "Beautiful hand-painted ceramic coffee set for traditional coffee ceremonies. Includes pot and cups with authentic Ethiopian designs.",
      price: 89.99,
      image: "https://i.pinimg.com/736x/34/27/40/342740c8bd5739d42c015a7d8b56961f.jpg",
      rating: { rate: 4.9, count: 89 },
      category: "ceramics"
    },
    {
      id: 3,
      title: "Traditional Ethiopian Scarf",
      description: "Colorful cotton scarf with authentic Ethiopian patterns and designs. Lightweight and perfect for any season.",
      price: 32.50,
      image: "https://i.pinimg.com/1200x/90/ca/09/90ca09d942de08337729fac4cebbff43.jpg",
      rating: { rate: 4.6, count: 156 },
      category: "textiles"
    },
    {
      id: 4,
      title: "Handcrafted Wooden Bowl",
      description: "Elegant wooden bowl carved from sustainable Ethiopian wood. Perfect for serving or as a decorative piece.",
      price: 67.00,
      image: "https://i.pinimg.com/736x/e0/bc/de/e0bcdeb8e94544dfb9088de6e9d3208a.jpg",
      rating: { rate: 4.7, count: 78 },
      category: "woodwork"
    },
    {
      id: 5,
      title: "Ethiopian Silver Jewelry Set",
      description: "Exquisite silver jewelry featuring traditional cross designs. Handcrafted by skilled Ethiopian silversmiths.",
      price: 120.00,
      image: "https://i.pinimg.com/1200x/9b/de/03/9bde034831cb09707a4b682ce9457035.jpg",
      rating: { rate: 5.0, count: 45 },
      category: "jewelry"
    },
    {
      id: 6,
      title: "Colorful Ethiopian Fabric",
      description: "Vibrant cotton fabric with traditional patterns for clothing and home decor. Each pattern tells a unique story.",
      price: 28.75,
      image: "https://i.pinimg.com/736x/28/22/87/28228752f2406d8044feff17e11b849c.jpg",
      rating: { rate: 4.5, count: 203 },
      category: "textiles"
    },
    {
      id: 7,
      title: "Traditional Coffee Jebena",
      description: "Authentic Ethiopian coffee pot used in traditional coffee ceremonies. Made from polished clay with intricate details.",
      price: 55.00,
      image: "https://i.pinimg.com/736x/21/16/2b/21162b9febdee4c8d18acc6ff3603731.jpg",
      rating: { rate: 4.8, count: 67 },
      category: "ceramics"
    },
    {
      id: 8,
      title: "Handwoven Table Runner",
      description: "Elegant table runner with traditional Ethiopian motifs. Adds cultural elegance to any dining setting.",
      price: 38.50,
      image: "https://i.pinimg.com/736x/c4/25/57/c4255720965d845610a15a5fd7ea9d32.jpg",
      rating: { rate: 4.7, count: 92 },
      category: "textiles"
    },
    {
      id: 9,
      title: "Ethiopian Cross Pendant",
      description: "Beautiful silver cross pendant with traditional Ethiopian design. A symbol of faith and heritage.",
      price: 75.00,
      image: "https://i.pinimg.com/1200x/78/02/f9/7802f91023936a8d55437264a2e1122a.jpg",
      rating: { rate: 4.9, count: 56 },
      category: "jewelry"
    },
    {
      id: 10,
      title: "Woven Storage Baskets Set",
      description: "Set of three handwoven baskets in different sizes. Perfect for organization and home decor.",
      price: 85.00,
      image: "https://i.pinimg.com/1200x/d5/43/04/d54304aa036c285eaa5beb368592b65f.jpg",
      rating: { rate: 4.6, count: 113 },
      category: "handcrafts"
    },
    {
      id: 11,
      title: "Traditional Ethiopian Dress",
      description: "Beautiful white dress with colorful Ethiopian border designs. Perfect for special occasions and ceremonies.",
      price: 95.00,
      image: "https://i.pinimg.com/1200x/ac/86/2c/ac862c1a923fbb8b02c34e878e63fb86.jpg",
      rating: { rate: 4.8, count: 78 },
      category: "clothing"
    },
    {
      id: 12,
      title: "Hand-Painted Ceramic Plates",
      description: "Set of four ceramic plates with traditional Ethiopian patterns. Dishwasher safe and food-friendly.",
      price: 65.00,
      image: "https://i.pinimg.com/1200x/c1/2d/3f/c12d3f4039c98671508a3a618cb7dbc9.jpg",
      rating: { rate: 4.7, count: 134 },
      category: "ceramics"
    },
    {
      id: 13,
      title: "Ethiopian Wool Blanket",
      description: "Warm and cozy wool blanket with traditional patterns. Handwoven using natural dyes.",
      price: 110.00,
      image: "https://i.pinimg.com/1200x/b3/9e/23/b39e23ec23f0e2835919a23ada92478b.jpg",
      rating: { rate: 4.9, count: 45 },
      category: "textiles"
    },
    {
      id: 14,
      title: "Carved Wooden Statue",
      description: "Traditional wooden statue carved from single piece of wood. Represents Ethiopian cultural heritage.",
      price: 150.00,
      image: "https://i.pinimg.com/736x/87/bc/9a/87bc9a4cfcbc1b13bc055cf75040ff66.jpg",
      rating: { rate: 4.8, count: 23 },
      category: "woodwork"
    },
    {
      id: 15,
      title: "Silver Ethiopian Bracelet",
      description: "Handcrafted silver bracelet with intricate traditional designs. Adjustable for perfect fit.",
      price: 42.00,
      image: "https://i.pinimg.com/736x/ae/71/64/ae7164885a03d94944da7198b7b56701.jpg",
      rating: { rate: 4.7, count: 89 },
      category: "jewelry"
    }
  ];

  const addToCart = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: item,
    });
  };

  return (
    <section className={classes.products__section}>
      <div className={classes.section__header}>
        <div className={classes.header__content}>
          <h2>Featured Dorze Products</h2>
          <p>Handcrafted with tradition and love - Each piece tells a story of Ethiopian heritage</p>
        </div>
      </div>

      <div className={classes.products__container}>
        {products.map((item) => (
          <ProductCard 
            key={item.id} 
            product={item} 
            renderDesc={true}
            addToCart={() => addToCart(item)}
          />
        ))}
      </div>
    </section>
  );
}

export default Product;