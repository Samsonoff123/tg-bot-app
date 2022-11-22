import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { Carousel, Tabs } from 'antd';
import style from './ProductDetail.module.css'
import Button from '../Button/Button';
import { useTelegram } from '../../hooks/useTelegram';
import ProductItem from '../ProductItem/ProductItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Header from '../Header/Header';

export default function ProductDetail() {
    const {id} = useParams()
    const [data, setData] = useState()
    const [similarDevices, setSimilarDevices] = useState()
    const [typeDevices, setTypeDevices] = useState()
    const { tg } = useTelegram()
    const [memory, setMemory] = useState()

    useEffect(()=>{
        axios.get(`https://tg-backend-database.herokuapp.com/api/device/${id}`)
        .then(res => {
            setData(res.data.device);
            setSimilarDevices(res.data.similarDevices)
            setTypeDevices(res.data.typeDevices)
            console.log(res.data);
        })
        
    },[id])

    const sendData = (e) => {
        console.log(tg);
        // e.preventDefault()
        // const device = {
        //     name: data.name,
        //     price: data.price,
        //     color: color,
        //     memory: memory
        // }

        // tg.sendData(JSON.stringify(device))
    }

  return data ? (
    <>
    <Header typeId={data.typeId} />
    <div className={style.product__detail}>
      <div className={style.image}>
      <Swiper
          slidesPerView={1}
        >
          {data.sliderImg.map((slide) => (
            <SwiperSlide>
                <img style={{height: '385px', objectFit: 'contain'}} src={slide} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <form className={style.discription}>
        <h1>{data.name}</h1>
        <h2 className={style.price}>Цена: {data.price} KZT</h2>

        <div className={style.props}>
          <table>
            <tbody>
              <tr>
                <th>Производитель:</th>
                <td>{data.variations.Manufacturer}</td>
              </tr>
              <tr>
                <th>Гарантия:</th>
                <td>12 месяцев</td>
              </tr>
              <tr>
                <th>Объем памяти:</th>
                <td>{data.variations.memory}</td>
              </tr>
              <tr>
                <th>Параметры SIM:</th>
                <td>{data.variations.sim}</td>
              </tr>
              <tr>
                <th>Комплектация:</th>
                <td>{data.variations.set}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Button
          onClick={(e) => sendData(e)}
          style={{ display: "flex", margin: "20px 0", marginLeft: "auto" }}
        >
          Купить
        </Button>

        <h2>Похожие товары</h2>

        <Swiper
          spaceBetween={20}
          slidesPerView={2}
        >
          {similarDevices?.map((device) => (
            <SwiperSlide>
            <Link className={style.deviceSlide} to={`/device/${device.id}`}>
              <ProductItem isAuth={false} key={device.id} element={device} />{" "}
            </Link>
            </SwiperSlide>
          ))}
        </Swiper>
            <br />
        <h2>Рекомендуемые товары</h2>

        <Swiper
          spaceBetween={20}
          slidesPerView={2}
        >
          {typeDevices?.map((device) => (
            <SwiperSlide>
            <Link className={style.deviceSlide} to={`/device/${device.id}`}>
              <ProductItem isAuth={false} key={device.id} element={device} />{" "}
            </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div id="html" style={{marginTop: '20px'}}>
          <Tabs type="card">
            {data.html.head.map((text, id) => (
              <Tabs.TabPane tab={text} key={id}>
                <div
                  style={{ padding: "10px" }}
                  dangerouslySetInnerHTML={{ __html: data.html.body[id] }}
                ></div>
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
      </form>
    </div>
    </>
  ) : null;
}
