import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Container from '../Container/Container';
import style from './ProductDetail.module.css'

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
  return (
    <>
    {
        data ? 
            <Container>
                <div className={style.product__detail}>
                    <div className={style.image}>
                        <img src={`https://tg-backend-database.herokuapp.com/${data.img}`} />
                    </div>
                    <div className={style.discription}>

                    </div>
                </div>
            </Container>
        : null
    }
    </>
  )
}
