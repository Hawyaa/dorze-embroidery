import React from 'react'
import { categoryFullInfo } from './categoryFullInfos'
import CategoryCard from './CategoryCard'
import styles from './category.module.css'

function Category() {
    if (!categoryFullInfo || !Array.isArray(categoryFullInfo)) {
        return <div>No categories available</div>;
    }

    return (
        <section className={styles.category__section}>
            <div className={styles.category__header}>
                <h2>Shop by Category</h2>
                <p>Discover our curated collections</p>
            </div>
            <div className={styles.category__container}>
                {categoryFullInfo.map((infos) => ( 
                    <CategoryCard data={infos} key={infos.title} /> 
                ))}
            </div>
        </section>
    )
}

export default Category