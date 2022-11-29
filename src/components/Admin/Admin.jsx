import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header';
import Parser from './parser/Parser';
import Device from './device/Device';
import Type from './type/Type';
import Brand from './brand/Brand'

export default function Admin() {

    const nav = useNavigate()
    useEffect(() => {
      if (!localStorage.getItem("token")) {
        nav('/')
      }
    }, [])


  return (
    <div>
        <Header />
        <Tabs>
            <Tabs.TabPane tab="Type" key="item-1">
                <Type />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Brand" key="item-2">
                <Brand />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Device" key="item-3">
                <Device />
            </Tabs.TabPane>
            <Tabs.TabPane tab="parser" key="item-4">
                <Parser />
            </Tabs.TabPane>
            
        </Tabs>
    </div>
  )
}
