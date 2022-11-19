import axios from 'axios'
import React, { useState } from 'react'
import style from './Login.module.css'
import { useNavigate } from "react-router-dom";
import { Input } from 'antd';

export default function Login() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()
    const [token, setToken] = useState()
    const navigate = useNavigate()

    const submitData = async (e) => {
        e.preventDefault()
        axios.post(`https://tg-backend-database.herokuapp.com/api/user/login`, {
            "email": login,
            "password": password,
        })
        .then((res) => {
            setToken(res.data.token)
            if(token) {
                localStorage.setItem('token', token)
                navigate('/admin')
            }  
        })
        .catch((e) => {
            setError(e.response.data.message);
        })

    }

    const changeLog = (e) => {
        setLogin(e.target.value)
        setError('')
    }

    const changePass = (e) => {
        setPassword(e.target.value)
        setError('')
    }

  return (
    <form onSubmit={(e)=> submitData(e)} className={style.main}>
        <div className={style.item}>
            <label>Login</label>
            <Input onChange={(e)=> changeLog(e)} type="email" />
        </div>
        <div className={style.item}>
            <label>Password</label>
            <Input onChange={(e)=> changePass(e)} type="password" />
        </div>
        { (error !== '') ? <span style={{color: 'red'}}>{error}</span> : null }
        <button>Sign in</button>
    </form>
  )
}
