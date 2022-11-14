import React from 'react'
import { useTelegram } from '../hooks/useTelegram'
import styles from './Header.module.css'

export default function Header() {
    const { user, onClose} = useTelegram()
  return (
    <div className={styles.header}>
        <Button onClick={onClose}>Закрыть</Button>
        <span className={styles.username}>
            {user?.username}
        </span>
    </div>
  )
}
