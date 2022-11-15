import { useEffect, useState } from 'react';
import './App.css';
import './components/ipad.css'
import Header from './components/Header/Header.jsx'
import { useTelegram } from './hooks/useTelegram';
import { Route, Routes } from 'react-router-dom'
import ProductList from './components/ProductList/ProductList';
import ProductDetail from './components/ProductDetail/ProductDetail'
import Form from './components/Form/Form';
import 'antd/dist/antd.css';
import axios from 'axios';
import Container from './components/Container/Container.jsx'

function App() {
  const {tg, onToggleButton} = useTelegram()
  const [type, setType] = useState() 
  const [device, setDevice] = useState() 

  useEffect(() => {
    tg.ready()
    axios.get(`https://tg-backend-database.herokuapp.com/api/type`)
    .then(res => {
      setType(res.data);
    })
    axios.get(`https://tg-backend-database.herokuapp.com/api/device`)
    .then(res => {
      setDevice(res.data);
    })

  }, [])

  return (
    <div> 
      {
      (type && device) ?
      <>
        <Header type={type} />
        <div>
          <Container>
            <Routes>
              {
                type.map(e => 
                  <Route key={e.id} path={`/${e.name}`} element={<ProductList product={device} type={e.id} />} />
                )
              }
              <Route path='/' element={<ProductList product={device} type={1} />} />
              <Route path='form' element={<Form />} />
              <Route path="/device/:id" element={<ProductDetail product={device} />} />
            </Routes>
          </Container>

        </div>
      </>
      : null
      }
    </div>
  );
}

export default App;
