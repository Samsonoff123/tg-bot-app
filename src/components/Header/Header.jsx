import React, { useEffect, useState } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'


export default function Header({type}) {

    const { user, onClose} = useTelegram()
    const [isAuth, setIsAuth] = useState()
    
    useEffect(() => {
      if (localStorage.getItem("token")) {
        setIsAuth(localStorage.getItem("token"))
      }
    }, [])
  return (
    <div className={styles.header}>
        {
            type.map(e => 
                <div key={e.id} className={styles.element}><Link to={`/${e.name}`}>{e.name}</Link></div>
            )
        }
        {
          isAuth ? <div className={styles.element}><Link to={`/admin`}>A</Link></div> : null
        }
    </div>
  )
}
