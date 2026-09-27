import { Link } from 'react-router-dom'
import styles from './CategoryCard.module.css'

export default function CategoryCard({ category }) {
  return (
    <Link to={`/shop/${category.id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={category.image} alt={category.name} loading="lazy" />
      </div>
      <span className={styles.name}>{category.name}</span>
    </Link>
  )
}
