import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Header from './components/Header/Header.jsx'
import { useTelegram } from './hooks/useTelegram';
import { Route, Routes } from 'react-router-dom'
import ProductList from './components/ProductList/ProductList';
import ProductDetail from './components/ProductDetail/ProductDetail'
import Form from './components/Form/Form';

import Container from './components/Container/Container.jsx'
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import Error from './components/Error/Error';

function App() {
  const {tg, onToggleButton} = useTelegram()
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    tg.ready()

    if (localStorage.getItem('token')) {
      setIsAuth(true)
    }
  }, [])



  return (
    <div> 
        <div>
          <Container>
            <Routes>
            <Route path='/' element={<ProductList isAuth={isAuth} />} />
              <Route path='/:typeId' element={<ProductList isAuth={isAuth} />} />
              <Route path='form' element={<Form />} />
              <Route path="/device/:id" element={<ProductDetail />} />
              <Route path='/*' element={<Error />} />
              <Route path='/login' element={<Login />} />
              <Route path='/admin' element={<Admin />} />
            </Routes>
          </Container>

        </div>

    </div>
  );
}

export default App;
