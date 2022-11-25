import React, { useEffect, useState } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import styles from './Header.module.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import { Skeleton } from 'antd'


export default function Header({typeId}) {
    const [type, setType] = useState() 
    const { user, onClose} = useTelegram()
    const [isAuth, setIsAuth] = useState()
    const [url, setUrl] = useState(window.location.href)
    
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/type`)
      .then(res => {
        setType(res.data);
      })

      if (localStorage.getItem("token")) {
        setIsAuth(localStorage.getItem("token"))
      }
    }, [])

    useEffect(() => {
      console.log(url);
    })

    if (!type) {
      return (
        <div className={styles.header}>
          {
            [...Array(3)].map((e, id) => 
              <Skeleton.Button key={id} active={true} />
            )
          }
        </div>
      )
    }

  return (
    <div className={styles.header}>
        {
            type?.map(e => 
                <div key={e.id} className={`${e.id == typeId ? styles.element__active : styles.element}`}><Link to={`/${e.id}`}>{e.name}</Link></div>
            )
        }
        {
          isAuth ? <div className={styles.element}><Link to={`/admin`}>A</Link></div> : null
        }
    </div>
  )
}
