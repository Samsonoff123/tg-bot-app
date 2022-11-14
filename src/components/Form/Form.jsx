import React, { useCallback, useEffect, useState } from 'react'
import styles from './Form.module.css'
import Button from '../Button/Button.jsx'
import { useTelegram } from '../../hooks/useTelegram'

export default function Form() {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [country, setCountry] = useState('')
    const [street, setStreet] = useState('')
    const [subject, setSubject] = useState('')
    const { tg } = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            name,
            lastName,
            country,
            street,
            subject
        }

        tg.sendData(JSON.stringify(data))
    }, [name, lastName, country, street, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if(!street || country) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [country, street])

  return (
    <div className={styles.form}>
        <h3>Введите ваши данные</h3>
        <input onChange={(e) => {setName(e.target.value)}} className={styles.input} type="text" placeholder={'Имя'} />
        <input onChange={(e) => {setLastName(e.target.value)}} className={styles.input} type="text" placeholder={'Фамилия'} />
        <input onChange={(e) => {setCountry(e.target.value)}} className={styles.input} type="text" placeholder={'Страна'} />
        <input onChange={(e) => {setStreet(e.target.value)}} className={styles.input} type="text" placeholder={'Улица'} />
        <select onChange={(e) => {setSubject(e.target.value)}} className={styles.select}>
            <option value={'physical'}>Физ. лицо</option>
            <option value={'legal'}>Юр. лицо</option>
        </select>
    </div>
  )
}
