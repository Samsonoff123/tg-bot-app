import React from 'react'
import ProductItem from '../ProductItem/ProductItem'
import styles from './ProductList.module.css'


export default function ProductList({product, type=0}) {

  return (
    <>
      <div className={styles.list}>
          {product.rows.map(item => 
              (item.typeId === type) ? <ProductItem key={item.id} element={item} /> : null
          )}
    </div>
    </>

  )
}
