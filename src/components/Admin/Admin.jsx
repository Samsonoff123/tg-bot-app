import React, { useEffect, useState } from 'react'
import { Button, Tabs, Upload, Input } from 'antd';
import { useNavigate } from 'react-router-dom'
import style from './Admin.module.css'
import { UploadOutlined } from '@ant-design/icons';
import { storage } from '../../firebase-config'; 
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { v4 } from 'uuid'
import axios from 'axios';

const { TextArea } = Input;

export default function Admin() {
    const [deviceName, setDeviceName] = useState()
    const [price, setPrice] = useState()
    const [brandId, setBrandId] = useState()
    const [typeId, setTypeId] = useState()
    const [image, setImage] = useState()
    const [html, setHtml] = useState()
    const [variations, setVariations] = useState()
    const sliderImg = []

    const [imageUpload, setImageUpload] = useState()
    const [imageMultiple, setImageMultiple] = useState()

    const [typeName, setTypeName] = useState()
    const [brandName, setBrandName] = useState()

    const nav = useNavigate()
    useEffect(() => {
      if (!localStorage.getItem("token")) {
        nav('/')
      }
    }, [])

    const sendData = (e) => {
        e.preventDefault()
        if (imageUpload) {
            const imageRef = ref(storage, `images/${ v4() + imageUpload.name }`)
            uploadBytes(imageRef, imageUpload)
            .then(() => {
                getDownloadURL(imageRef).then((res)=>{
                    setImage(res);
                    uploadMultipleImages(imageRef)
                })
            })
        }
    }

    const uploadMultipleImages = (imageRef) => {
        const arrayRef = []
        if (imageMultiple) {
            for(let i = 0; i < imageMultiple.length; i++) {
                const imageRefMultiple = ref(storage, `images/${ v4() + imageMultiple[i].name }`)
                uploadBytes(imageRefMultiple, imageMultiple[i])
                .then(() => {
                    getDownloadURL(imageRefMultiple).then((res)=>{
                        sliderImg.push(res);
                        arrayRef.push(imageRefMultiple)
                        if (i === imageMultiple.length-1) {
                            sendOtherData(imageRef, arrayRef)
                        }
                    })
                })
            }
        }
    }

    const sendOtherData = (imageRef, arrayRef) => {
        const deviceData = {
            "name": deviceName,
            "price": +price,
            "brandId": +brandId,
            "typeId": +typeId,
            "img": image,
            "html": html + '<div style="display: none" data-ref = "' + imageRef + '" data-array-ref = "' + arrayRef + '"></div>',
            "variations": variations,
            "sliderImg": JSON.stringify(sliderImg),
        }
        axios.post(process.env.REACT_APP_BACKEND_URL + '/api/device', deviceData, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {

            alert('Добавлено!')
        }).catch((e) => {
            console.log(e);
            alert('Не добавлено!')
            console.log("запрос выдал ошибку");    
            deleteObject(imageRef).then(() => {
                console.log("картинки удалены успешно");    
            })

            removeFirebaseImages(arrayRef)

        })
    }

    const removeFirebaseImages = (arrayRef) => {
        for(let i = 0; i < imageMultiple.length; i++) {
            deleteObject(arrayRef[i])
        }
    }

    const sendType = (e) => {
        e.preventDefault()
        axios.post(process.env.REACT_APP_BACKEND_URL + '/api/type', { 
            "name": typeName,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            alert('Добавлено!')
        }).catch((e) => {
            alert('Не добавлено!')
        })
    }

    const sendBrand = (e) => {
        e.preventDefault()
        axios.post(process.env.REACT_APP_BACKEND_URL + '/api/brand', { 
            "name": brandName,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            alert('Добавлено!')
        }).catch((e) => {
            alert('Не добавлено!')
        })
    }

  return (
    <div>
        <Tabs>
            <Tabs.TabPane tab="Type" key="item-1">
                <form>
                    <label className={style.label}>name: </label>
                    <Input onChange={(e) => setTypeName(e.target.value)} type="text" placeholder="name" />
                    <Button onClick={(e) => sendType(e)} type='primary' style={{margin: '10px 0'}}>Submit</Button>
                </form>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Brand" key="item-2">
                <form>
                    <label className={style.label}>name: </label>
                    <Input onChange={(e) => setBrandName(e.target.value)} type="text" placeholder="name" />
                    <Button onClick={(e) => sendBrand(e)} type='primary' style={{margin: '10px 0'}}>Submit</Button>
                </form>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Device" key="item-3">
                <form>
                    <label className={style.label}>name: </label>
                    <Input onChange={(e)=>setDeviceName(e.target.value)} type="text" placeholder="name" />
                    <label className={style.label}>price: </label>
                    <Input onChange={(e)=>setPrice(e.target.value)} type="number" placeholder="price" />
                    <label className={style.label}>brandId: </label>
                    <Input onChange={(e)=>setBrandId(e.target.value)} type="number" placeholder="brandId" />
                    <label className={style.label}>typeId: </label>
                    <Input onChange={(e)=>setTypeId(e.target.value)} type="number" placeholder="typeId" />

                    <label className={style.label}>img: </label>
                    <input onChange={(e)=> setImageUpload(e.target.files[0])} type="file" />

                    <label className={style.label}>html: </label>
                    <TextArea onChange={(e)=>setHtml(e.target.value)} rows={4} placeholder="html" />
                    <label className={style.label}>variations: </label>
                    <TextArea onChange={(e)=>setVariations(e.target.value)} rows={4} placeholder="variations" />
                    <label className={style.label}>sliderImg: </label>
                    <input onChange={(e)=> setImageMultiple(e.target.files)} type="file" multiple />
                    <Button onClick={(e)=>sendData(e)} type='primary' style={{margin: '10px 0'}}>Submit</Button>
                </form>
            </Tabs.TabPane>
        </Tabs>
    </div>
  )
}
