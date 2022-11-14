import { useEffect } from 'react';
import './App.css';
import Button from './components/Button/Button.jsx'
import { useTelegram } from './components/hooks/useTelegram';

function App() {
  const {tg, onToggleButton} = useTelegram()

  useEffect(() => {
    tg.ready()
  }, [])


  return (
    <div> 
      <Button>dwadw</Button>
      <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;