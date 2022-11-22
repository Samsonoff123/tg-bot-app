import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header/Header'
import ProductItem from '../ProductItem/ProductItem'
import styles from './ProductList.module.css'


export default function ProductList({isAuth}) {
  const [device, setDevice] = useState() 
  const { typeId: type } = useParams()

  useEffect(() => {
    axios.get(`https://tg-backend-database.herokuapp.com/api/device/type/${type}`)
    .then(res => {
      setDevice(res.data);
      console.log(res.data);
    })
  }, [type])
  if (!device) {
    return 'loading'
  }

  return (
    <>
      <Header typeId={type} />
      <div className={styles.list}>
          {device.map(item => 
              <ProductItem isAuth={isAuth} key={item.id} element={item} />
          )}
    </div>
    </>
    )
}
