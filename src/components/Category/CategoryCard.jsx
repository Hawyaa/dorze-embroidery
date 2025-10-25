import React from 'react'
import classes from './category.module.css'
import { Link } from 'react-router-dom'

function CategoryCard({ data }) {
  if (!data) {
    return (
      <div className={classes.category}>
        <div>Loading category...</div>
      </div>
    )
  }

  const { title = 'Unknown Category', imgLink = '' } = data

  return (
    <div className={classes.category}>
      <div className={classes.category__image}>
        <img src={imgLink} alt={title} />
        <div className={classes.category__overlay}></div>
      </div>
      <Link to={`/category/${data.name}`} className={classes.category__link}>
        <div className={classes.category__content}>
          <h3>{title}</h3>
          <span className={classes.category__cta}>
            Shop Now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
            </svg>
          </span>
        </div>
      </Link>
    </div>
  )
}

export default CategoryCard