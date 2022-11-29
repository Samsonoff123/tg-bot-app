import { Button, Tabs } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { useState } from 'react'
import axios from 'axios'

export default function Parser() {
    const [links, setLinks] = useState()

    const sendLinks = (e) => {
        e.preventDefault()
        axios.post(process.env.REACT_APP_BACKEND_URL + '/api/device/parse',
        {
            links
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(() => {
            alert('Добавлено!')
        }).catch((error) => {
            console.log(error)
            alert('Не добавлено!')
        })
    }
  return (
    <form>
        <label>links: </label>
        <TextArea onChange={(e)=>setLinks(e.target.value.replace(/\s/g, '').split(','))} rows={4} placeholder="link, link, link, link" />
        <Button onClick={(e) => sendLinks(e)} type='primary' style={{margin: '10px 0'}}>Submit</Button>
    </form>
  )
}
