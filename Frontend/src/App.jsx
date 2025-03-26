import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import Map from './components/Map'

function App() {
  const [position, setPosition] = useState([34.06, -118.28]); // Default Location (Los Angeles)

  return (
    <div className="relative w-screen h-screen">
      
      <Map position={position} />
      <Sidebar setPosition={setPosition} />
    </div>
  );
}

export default App
