import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Carousel } from 'antd';
import style from './ProductDetail.module.css'
import Button from '../Button/Button';
import { useTelegram } from '../../hooks/useTelegram';

export default function ProductDetail() {
    const {id} = useParams()
    const [data, setData] = useState()
    const { tg } = useTelegram()
    const [color, setColor] = useState()
    const [memory, setMemory] = useState()

    useEffect(()=>{
        axios.get(`https://tg-backend-database.herokuapp.com/api/device/${id}`)
        .then(res => {
            setData(res.data);
            console.log(JSON.parse(res.data.sliderImg));
        })
        
    },[])
    useEffect(()=>{
        data ? document.getElementById('html').innerHTML = data.html : null
        data ? document.querySelector('input[name=color]').checked = true : null
        data ? document.querySelector('input[name=memory]').checked = true : null
    }, [data])

    const sendData = (e) => {
        console.log(tg);
        e.preventDefault()
        const device = {
            name: data.name,
            price: data.price,
            color: color,
            memory: memory
        }

        tg.sendData(JSON.stringify(device))
    }

  return data ? 
  <div className={style.product__detail}>
      <div className={style.image}>
      <Carousel>
        {JSON.parse(data.sliderImg).map(slide =>
            <img src={slide} />
        )}  
        </Carousel>
      </div>
      <form className={style.discription}>
          <h1>{data.name}</h1>
          <h2 className={style.price}>Цена: {data.price} KZT</h2>
          <div className={style.props}>
            <h3>Color:</h3>
            <div className={style.variations}>
                {JSON.parse(data.variations).color.map(e => 
                    <div className={style.color} style={{background: e}}>
                        <input onChange={(e)=>setColor(e.target.value)} value={e} name='color' id={e} type="radio" />
                        <label for={e}></label>
                    </div>    
                )}
            </div>
            <h3>Memory:</h3>
            <div className={style.variations}>
                {JSON.parse(data.variations).memory.map(e => 
                    <div className={style.memory}>
                        <input onChange={(e)=>setMemory(e.target.value)} value={e} name='memory' id={e} type="radio" />
                        <label for={e}>{e}</label>
                    </div>   
                )}
            </div>
          </div>
          
          <Button onClick={(e)=>sendData(e)} style={{display: 'flex', margin: '20px 0', marginLeft: 'auto'}}>Купить</Button>
          <h1>Which {data.name.split(' ')[0]} is right for you?</h1>
          <div id="html">
          </div>
      </form>
  </div>
: null
}
