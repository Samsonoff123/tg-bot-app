import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ProductItem.module.css'

export default function ProductItem({element}) {
  return (
    <Link style={{width: 'calc(50% - 10px)', height: '100%'}} to={`/device/${element.id}`}>
      <div className={styles.product}>
          <div className={styles.img}><img src={`https://tg-backend-database.herokuapp.com/${element.img}`} /></div>
          <div className={styles.title}>{element.name}</div>
          <div className={styles.description}>{element.description}</div>
          <div className={styles.price}>
              <span>Стоимость: <b>{element.price}</b></span>
          </div>
      </div>
    </Link>
  )
}
