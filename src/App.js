import { useEffect } from 'react';
import './App.css';
import Button from './components/Button/Button.jsx'
import Header from './components/Header/Header.jsx'
import { useTelegram } from './hooks/useTelegram';
import { Route, Routes } from 'react-router-dom'
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';

function App() {
  const {tg, onToggleButton} = useTelegram()

  useEffect(() => {
    tg.ready()
  }, [])


  return (
    <div> 
      <Header />
      <Routes>
        <Route index element={<ProductList />} />
        <Route path='form' element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
