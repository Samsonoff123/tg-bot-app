import { Skeleton } from 'antd'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header/Header'
import ProductItem from '../ProductItem/ProductItem'
import styles from './ProductList.module.css'
import { useInView } from 'react-intersection-observer';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { fetchDevices } from '../../redux/slices/devices'
import { useFetchAllDevicesQuery } from '../../redux/slices/devicesService'


export default function ProductList({isAuth}) {
  const dispatch = useDispatch()
  const [device, setDevice] = useState([]) 
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10)
  const { typeId: type } = useParams()
  const { data, isLoading, error } = useFetchAllDevicesQuery({type})

  useEffect(() => {
    if (data) {
      setDevice(data.rows)
      setTotalPages(data?.count / limit)
      setPage(1)
    }
  }, [data])

  useEffect(() => {
    if (page > 1) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/device/type/${type}?limit=10&page=${page}`)
      .then((res) => {
        setDevice([...device, ...res.data.rows])
      })
    }
  }, [page])


  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if(inView && totalPages > page) {
      setPage(page + 1)
    }
  }, [inView])


  if (isLoading) {
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
      {
        !isLoading ?
        <div className={styles.list}>
          {device?.map((item) => (
            <ProductItem isAuth={isAuth} key={item.id} element={item} />
          ))}
        </div>
        : null
      }

      <div
        style={{ marginTop: 0, display: totalPages > page ? "flex" : "none" }}
        className={styles.list}
        ref={ref}
      >
        {[...Array(2)].map((e, id) => (
          <div key={id} className={styles.sc__item}>
            <Skeleton.Image className={styles.sc__image} active={true} />
            <Skeleton className={styles.sc__descrip} />
          </div>
        ))}
      </div>
    </>
  );
}

