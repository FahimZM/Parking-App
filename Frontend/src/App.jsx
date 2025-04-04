import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import Map from './components/Map'

function App() {
  const [position, setPosition] = useState([34.06, -118.28]); // Default Location (Los Angeles)
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="relative w-screen h-screen">
      <Map position={position} isDarkMode={isDarkMode} />
      <Sidebar setPosition={setPosition} 
      position={position}
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode} />
    </div>
  );
}

export default App
