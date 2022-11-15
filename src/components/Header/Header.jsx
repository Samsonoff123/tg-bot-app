import React, { useEffect } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'


export default function Header({type}) {

    const { user, onClose} = useTelegram()
  return (
    <div className={styles.header}>
        {
            type.map(e => 
                <div key={e.id} className={styles.element}><Link to={`/${e.name}`}>{e.name}</Link></div>
            )
        }

        <span className={styles.username}>
            {user?.username}
        </span>
    </div>
  )
}
