import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProductItem.module.css'
import { CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function ProductItem({element, isAuth}) {
  const ref = useRef()
  const removeDevice = (e, deviceId) => {
    e.preventDefault()
    const conf = confirm('da?')
    if(conf) {
      removeReq(deviceId)
    }else {
      console.log('net');
    }
  }

  const removeReq = (deviceId) => {

    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/device/${deviceId}`, 
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }).then((res) => {
      ref.current.remove()
    }).catch((e) => {
        alert('Не успешно!')
    })
  }

  const getTruePrice = (price = 0) => {
    let data = JSON.stringify(price)
    if (data.split('').length <= 4) {
      return data.replace(/(.{4})(.)/g,'$1 $2')
    } else if (data.split('').length === 5) {
      return data.replace(/(.{2})(.)/g,'$1 $2')
    } else {
      return data.replace(/(.{3})(.)/g,'$1 $2')
    }
      
  }

  return element ? 
    <Link ref={ref} style={{width: 'calc(50% - 5px)', height: '100%'}} to={`/device/${element.id}`}>
      <div className={styles.product}>
          <div className={styles.img}>
            <img src={`${element.img}`} />
          </div>
          <div className={styles.title}>{element.name.replace(/&quot;/g,'"').replace(/\//g, ' / ')}</div>
          <div className={styles.description}>{element.description}</div>
          <div className={styles.price}>
              <span>Стоимость: <b>{ getTruePrice(element?.price) }</b> руб.</span>
          </div>
          {
            isAuth ?
            <CloseCircleOutlined onClick={(e)=>removeDevice(e, element.id)} className={styles.remove} />
            : null
          }
      </div>
    </Link>
  : null
}
