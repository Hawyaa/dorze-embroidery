import React from "react";
import classes from "./product.module.css";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";

function ProductCard({ product, flex, renderDesc, addToCart }) {
  return (
    <div className={classes.product__card}>
      <div className={classes.card__image}>
        <img src={product.image} alt={product.title} />
        <div className={classes.image__overlay}></div>
      </div>
      
      <div className={classes.card__content}>
        <div className={classes.category__tag}>
          {product.category}
        </div>
        <h3 className={classes.product__title}>{product.title}</h3>
        
        {renderDesc && (
          <p className={classes.product__description}>{product.description}</p>
        )}
        
        <div className={classes.product__meta}>
          <div className={classes.rating}>
            <div className={classes.stars}>
              {"★".repeat(Math.floor(product.rating?.rate || 0))}
              <span className={classes.rating__count}>({product.rating?.count || 0})</span>
            </div>
          </div>
          
          <div className={classes.price}>
            <CurrencyFormat amount={product.price} />
          </div>
        </div>
        
        <button className={classes.cart__btn} onClick={addToCart}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M17 18C15.89 18 15 18.89 15 20C15 20.5304 15.2107 21.0391 15.5858 21.4142C15.9609 21.7893 16.4696 22 17 22C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20C19 18.89 18.1 18 17 18ZM1 2V4H3L6.6 11.59L5.24 14.04C5.09 14.32 5 14.65 5 15C5 15.5304 5.21071 16.0391 5.58579 16.4142C5.96086 16.7893 6.46957 17 7 17H19V15H7.42C7.3537 15 7.29011 14.9737 7.24322 14.9268C7.19634 14.8799 7.17 14.8163 7.17 14.75C7.17 14.7 7.18 14.66 7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.58 17.3 11.97L20.88 5.48C20.95 5.34 21 5.17 21 5C21 4.73478 20.8946 4.48043 20.7071 4.29289C20.5196 4.10536 20.2652 4 20 4H5.21L4.27 2H1ZM7 18C5.89 18 5 18.89 5 20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22C7.53043 22 8.03914 21.7893 8.41421 21.4142C8.78929 21.0391 9 20.5304 9 20C9 18.89 8.1 18 7 18Z" fill="currentColor"/>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;