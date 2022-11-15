import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Container from '../Container/Container';
import style from './ProductDetail.module.css'
import Button from '../Button/Button';

export default function ProductDetail() {
    const {id} = useParams()
    const [data, setData] = useState()

    useEffect(()=>{
        axios.get(`https://tg-backend-database.herokuapp.com/api/device/${id}`)
        .then(res => {
            setData(res.data);
            console.log(res.data);
        })
        
    },[])
    useEffect(()=>{
        data ? document.getElementById('html').innerHTML = data.html : null
    }, [data])
  return (
    <>
    {
        data ? 
            <div className={style.product__detail}>
                <div className={style.image}>
                    <img src={`https://tg-backend-database.herokuapp.com/${data.img}`} />
                </div>
                <div className={style.discription}>
                    <h1>{data.name}</h1>
                    <div className={style.price}>Цена: {data.price}</div>
                    <Button style={{margin: '0.5em 0'}}>Купить</Button>
                    <div id="html">
                    </div>
                </div>
            </div>
        : null
    }
    </>
  )
}
