import { useEffect } from 'react';
import './App.css';
import Button from './components/Button/Button.jsx'
const tg = window.Telegram.WebApp;

function App() {

  useEffect(() => {
    tg.ready()
  }, [])


  return (
    <div> 
      <Button>dwadw</Button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default App;
