import React, { useEffect, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import style from './DrawerHandle.module.css'
import pickup from '../../icons/pickup.png'
import delivery from '../../icons/delivery.png'
import Button from '../Button/Button'
import { useTelegram } from '../../hooks/useTelegram';
import { useRef } from 'react';

export default function DrawerHandle({open, onClose, info}) {
  const [inputValue, setInputValue] = useState("Самовывоз")

  const { tg } = useTelegram()

  const sendData = (e) => {
    e.preventDefault()
    const device = {
        name: info.name,
        price: info.price,
        delivery: inputValue,
    }
    tg.sendData(JSON.stringify(device))
}



  return (
    <Drawer
    title="Выберите способ оплаты и доставки"
    placement={"bottom"}
    width={800}
    height={(inputValue === "Самовывоз") ? 650 : 350}
    onClose={onClose}
    open={open}
    closable={false}
    className={style.drawer}
    extra={
      <div onClick={onClose}>
        <CloseOutlined />
      </div>
    }
  >
    <form onSubmit={e => {sendData(e)}}>
      <>
          <div className={ (inputValue === 'Самовывоз') ? style.element + ' ' + style._active : style.element } onClick={e => setInputValue("Самовывоз")}>
            <img src={pickup} />
            <div className={style.description}>
                <h3>Самовывоз</h3>
                <span>Оплата при получений</span>
            </div>
        </div>  
      </>
      <>
          <div className={ (inputValue === 'Доставка курьером') ? style.element + ' ' + style._active : style.element } onClick={e => setInputValue("Доставка курьером")}>
            <img src={delivery} />
            <div className={style.description}>
                <h3>Доставка курьером</h3>
                <span>Оплата банковской картой</span>
            </div>
        </div>  
      </>
      {
        (inputValue === 'Самовывоз') ? 
          <>
            <iframe src="https://yandex.kz/map-widget/v1/-/CCUnMOaNtA" width="100%" height="300" allowfullscreen="true"></iframe>
          </>
        :null

        
      }
      <Button>Купить</Button>
    </form>
  </Drawer>
  )
}
