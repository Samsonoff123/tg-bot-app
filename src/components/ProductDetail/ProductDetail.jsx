import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { Radio, Skeleton, Space, Tabs } from 'antd';
import style from './ProductDetail.module.css'
import Button from '../Button/Button';
import ProductItem from '../ProductItem/ProductItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Header from '../Header/Header';
import { useFetchOneDeviceQuery } from '../../redux/slices/deviceDetailService';
import DrawerHandle from '../Drawer/DrawerHandle';
import Table from '../DetailTable/Table'

export default function ProductDetail() {
    const {id} = useParams()
    const [device, setDevice] = useState()
    const [similarDevices, setSimilarDevices] = useState()
    const [typeDevices, setTypeDevices] = useState()
    const { data, isLoading, error } = useFetchOneDeviceQuery({id})
    const [open, setOpen] = useState(false)
    const [memoryArr, setMemoryArr] = useState([])

    useEffect(() => {

      if (data) {
        setDevice(data.device);
        setSimilarDevices(data.similarDevices)
        setTypeDevices(data.typeDevices)
      }
    }, [data])

    const onClose = () => {
      setOpen(false);
    };

    const showDrawer = (e) => {
      e.preventDefault()
      setOpen(true);
    };

    useEffect(() => {
      const numbers = []
      similarDevices?.map(devs => {
        if (devs.variations.head.includes("Объем памяти")) {
          devs.variations.body.map(body => {
            if (body.includes("GB")) {
              numbers.push({body, id: devs.id, img: devs.img})
            }
          })
        }
      })
        
      const current = numbers.filter((n, i) => n.body !== numbers[i - 1]?.body)

      setMemoryArr(current)
      
    }, [similarDevices])


  return  (!isLoading && !error) ? (
    <>
    <Header typeId={data?.typeId} />
    <div className={style.product__detail}>
      <div className={style.image}>
      <Swiper
          slidesPerView={1}
        >
          {device?.sliderImg.map((slide, index) => (
            <SwiperSlide key={index}>
                <img style={{height: '385px', objectFit: 'contain'}} src={slide} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <form className={style.discription}>
        <h1>{device?.name}</h1>
        <h2 className={style.price}>Цена: { (device?.price || 0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') } руб.</h2>

        <div className={style.props}>
            <div className={style.element}>
              <span>Цвет:</span>
              <div>
                {
                  memoryArr?.map(simmilars => 
                    <Link key={simmilars.id} to={`/device/${simmilars.id}`} className={ (simmilars.id === device.id) && style.active }>
                      <input id={simmilars.id} type="radio" />
                      <label for={simmilars.id} style={{background: `url("${simmilars.img}")50% 50% no-repeat`}}></label>
                    </Link>
                  )
                }
              </div>
            </div>

            <div className={style.element}>
              <span>Объем памяти:</span>
              <div>
                {
                  memoryArr.map(e => 
                    <Link className={ (simmilars.id === device.id) && style.active } to={`/device/${e.id}`}>{e.body}</Link>  
                  )
                }
              </div>
            </div>

            <Table variations={device?.variations} />
        </div>

        <Button
          onClick={e => showDrawer(e)}
          style={{ display: "flex", margin: "20px 0", marginLeft: "auto"}}
          className={style.button}
        >
          Купить
        </Button>
        <h2>Похожие товары</h2>

        <Swiper
          style={{padding: '20px 0'}}
          spaceBetween={10}
          slidesPerView={2}
        >
          {similarDevices?.map((similarDevice) => (
            similarDevice.id !== device.id ? 
            <SwiperSlide key={similarDevice.id}>
            <Link className={style.deviceSlide} to={`/device/${similarDevice.id}`}>
              <ProductItem isAuth={false} element={similarDevice} />{" "}
            </Link>
            </SwiperSlide>
            : null
          ))}
        </Swiper>

        <h2>Рекомендуемые товары</h2>

        <Swiper
          style={{padding: '20px 0'}}
          spaceBetween={10}
          slidesPerView={2}
        >
          {typeDevices?.map((typeDevice) => (
            typeDevice.id !== device.id ? 
            <SwiperSlide key={typeDevice.id}>
              <Link className={style.deviceSlide} to={`/device/${typeDevice.id}`}>
                <ProductItem isAuth={false} element={typeDevice} />{" "}
              </Link>
            </SwiperSlide>
            : null
          ))}
        </Swiper>

        <div id="html" style={{marginTop: '20px'}}>
          <Tabs type="card">
            {device?.html.head.map((text, id) => (
              id !== 2 ? 
              <Tabs.TabPane tab={text} key={id}>
                <div
                  style={{ padding: "10px" }}
                  dangerouslySetInnerHTML={{ __html: device?.html.body[id] }}
                ></div>
              </Tabs.TabPane> 
              : null
            ))}  
          </Tabs> 
        </div> 
      </form>
    </div>
    <DrawerHandle open={open} onClose={onClose} info={{name: device?.name, price: device?.price}} />
    </>
  ) : 
  <div className={style.product__detail}>
  <div className={style.image}>
    <Skeleton.Image className={style.sk__image} active={true} />
  </div>
  <div className={style.discription}>
      <Skeleton className={style.sk__name} active={true} />

        <div className={style.props}>
          {
            [...Array(5)].map((e, index) => 
              <div key={index} className={style.sk__flex}>
                <Skeleton className={style.sk__props} active={true} />
                <Skeleton className={style.sk__props} active={true} />
              </div>
            )
          }

        </div>
      </div>
  </div>
}
