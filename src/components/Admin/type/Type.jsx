import { Button, Input } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import style from '../Admin.module.css'

export default function Type() {
    const [typeName, setTypeName] = useState()

    const sendType = (e) => {
        e.preventDefault()
        axios.post(process.env.REACT_APP_BACKEND_URL + '/api/type', { 
            "name": typeName,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            alert('Добавлено!')
        }).catch((e) => {
            alert('Не добавлено!')
        })
    }

  return (
    <form>
        <label className={style.label}>name: </label>
        <Input onChange={(e) => setTypeName(e.target.value)} type="text" placeholder="name" />
        <Button onClick={(e) => sendType(e)} type='primary' style={{margin: '10px 0'}}>Submit</Button>
    </form>
  )
}
