import { Skeleton } from 'antd'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header/Header'
import ProductItem from '../ProductItem/ProductItem'
import styles from './ProductList.module.css'
import { useInView } from 'react-intersection-observer';


export default function ProductList({isAuth}) {
  const [device, setDevice] = useState('') 
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2)
  const { typeId: type } = useParams()


  useEffect(() => {
    dataReq(true)
  }, [type])

  useEffect(() => {
    dataReq(false)
  }, [page])

  const dataReq = (isType) => {
    axios.get(`https://tg-backend-database.herokuapp.com/api/device/type/${type}?limit=${limit}&page=${page}`)
    .then(res => {
      if (isType) { 
        setDevice([...res.data.rows])
        setPage(1)
      } else {
        setDevice([...device, ...res.data.rows])
      }
      setTotalPages(res.data.count / limit)
    })
  }

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if(inView && totalPages > page) {
      setPage(page + 1)
    }
  }, [inView])

  if (!device) {
    return (
      <>
        <Header typeId={type} />
        <div className={styles.list}>
        {
          [...Array(4)].map((e, id) => 
            <div key={id} className={styles.sc__item}>
              <Skeleton.Image className={styles.sc__image} active={true} />
              <Skeleton className={styles.sc__descrip} />
            </div>
          )
        }
        </div>
      </>
    )
  }

  return (
    <>
      <Header typeId={type} />
      <div className={styles.list}>
          {device.map(item => 
              <ProductItem isAuth={isAuth} key={item.id} element={item} />
          )}
    </div>
    <div style={{marginTop: 0, display: (totalPages > page) ? 'flex' : 'none'}} className={styles.list} ref={ref}>
        {
          [...Array(2)].map((e, id) => 
            <div key={id} className={styles.sc__item}>
              <Skeleton.Image className={styles.sc__image} active={true} />
              <Skeleton className={styles.sc__descrip} />
            </div>
          )
        }
    </div> 
    </>
    )
}
