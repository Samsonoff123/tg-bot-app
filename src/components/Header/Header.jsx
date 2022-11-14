import React from 'react'
import styles from './Header.module.css'

export default function Header() {
    const tg = window.Telegram.WebApp;

    const onClose = () => {
        tg.close()
      }
  return (
    <div className={styles.header}>
        <Button onClick={onClose}>Закрыть</Button>
        <span className={styles.username}>
            {tg.initDataUnsafe?.user?.username}
        </span>
    </div>
  )
}
