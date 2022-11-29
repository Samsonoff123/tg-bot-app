import { Button, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { useState } from 'react'
import style from '../Admin.module.css'
import axios from 'axios'
import { storage } from '../../../firebase-config'; 
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { v4 } from 'uuid'

export default function Device() {
    const [deviceName, setDeviceName] = useState()
    const [price, setPrice] = useState()
    const [brandId, setBrandId] = useState()
    const [typeId, setTypeId] = useState()
    const [image, setImage] = useState()
    const [html, setHtml] = useState()
    const [variations, setVariations] = useState()
    const sliderImg = []
    const [postUrl, setPostUrl] = useState()

    const [imageUpload, setImageUpload] = useState()
    const [imageMultiple, setImageMultiple] = useState()

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
            "postUrl": postUrl
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

  return (
    <form>
        <label className={style.label}>name: </label>
        <Input onChange={(e)=>setDeviceName(e.target.value)} type="text" placeholder="name" />
        <label className={style.label}>price: </label>
        <Input onChange={(e)=>setPrice(e.target.value)} type="number" placeholder="price" />
        <label className={style.label}>brandId: </label>
        <Input onChange={(e)=>setBrandId(e.target.value)} type="number" placeholder="brandId" />
        <label className={style.label}>typeId: </label>
        <Input onChange={(e)=>setTypeId(e.target.value)} type="number" placeholder="typeId" />
        <label className={style.label}>post_url: </label>
        <Input onChange={(e)=>setPostUrl(e.target.value)} type="text" placeholder="post_url" />

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
  )
}
