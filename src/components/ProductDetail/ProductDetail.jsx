import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Carousel } from 'antd';
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
  return data ? 
  <div className={style.product__detail}>
      <div className={style.image}>
      <Carousel>
        {JSON.parse(data.sliderImg).map(slide =>
            <img src={slide} />
        )}  
        </Carousel>
      </div>
      <div className={style.discription}>
          <h1>{data.name}</h1>
          <h2 className={style.price}>Цена: {data.price} KZT</h2>
          <div className={style.props}>
            <h3>Color:</h3>
            <div className={style.variations}>
                {JSON.parse(data.variations).color.map(e => 
                    <div className={style.color} style={{background: e}}>
                        <input name='color' id={e} type="radio" />
                        <label for={e}></label>
                    </div>    
                )}
            </div>
            <h3>Memory:</h3>
            <div className={style.variations}>
                {JSON.parse(data.variations).memory.map(e => 
                    <div className={style.memory}>
                        <input name='memory' id={e} type="radio" />
                        <label for={e}>{e}</label>
                    </div>   
                )}
            </div>
          </div>
          
          <Button style={{margin: '0.5em 0'}}>Купить</Button>
          <div id="html">
          </div>
      </div>
  </div>
: null
}
