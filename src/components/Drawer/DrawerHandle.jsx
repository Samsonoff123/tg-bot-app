import React, { useEffect, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import style from './DrawerHandle.module.css'
import pickup from '../../icons/pickup.png'
import delivery from '../../icons/delivery.png'
import Button from '../Button/Button'
import { useTelegram } from '../../hooks/useTelegram';

export default function DrawerHandle({open, onClose, info}) {
  const [inputValue, setInputValue] = useState("Самовывоз")
  const { tg } = useTelegram()

  const sendData = (e) => {
    e.preventDefault()
    const device = {
        name: info.name,
        price: info.price,
        memory: info.memory,
        delivery: inputValue,
    }
    tg.sendData(JSON.stringify(device))
}

  return (
    <Drawer
    title="Выберите способ оплаты и доставки"
    placement={"bottom"}
    width={500}
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
        <input
          checked={true} 
          name="payment" 
          className={style.input}
          id={1} 
          type="radio"
          onInput={e => setInputValue(e.target.value)} 
          />
          <label for={1} className={style.element}>
            <img src={pickup} />
            <div className={style.description}>
                <h3>Самовывоз</h3>
                <span>Оплата при получений</span>
            </div>
        </label>  
      </>
      <>
        <input
          name="payment" 
          className={style.input} 
          id={2} 
          type="radio" 
          onInput={e => setInputValue(e.target.value)} 
          />
          <label for={2} className={style.element}>
            <img src={delivery} />
            <div className={style.description}>
                <h3>Доставка курьером</h3>
                <span>Оплата банковской картой</span>
            </div>
        </label>  
      </>
      <Button>Купить</Button>
    </form>
  </Drawer>
  )
}
