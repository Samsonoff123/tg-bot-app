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

    axios.delete(`https://tg-backend-database.herokuapp.com/api/device/${deviceId}`, 
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

  return element ? 
    <Link ref={ref} style={{width: 'calc(50% - 10px)', height: '100%'}} to={`/device/${element.id}`}>
      <div className={styles.product}>
          <div className={styles.img}><img src={`${element.img}`} /></div>
          <div className={styles.title}>{element.name}</div>
          <div className={styles.description}>{element.description}</div>
          <div className={styles.price}>
              <span>Стоимость: <b>{element.price}</b></span>
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
