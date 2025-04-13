import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import Map from './components/Map'


function App() {
  const [position, setPosition] = useState([34.06, -118.28]); // Default Location (Los Angeles)
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
  const [parkingSpots, setParkingSpots] = useState([]);
  

  return (
    <div className="relative w-screen h-screen">
      <Sidebar setPosition={setPosition} 
      position={position}
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
      parkingSpots={parkingSpots}
      setParkingSpots={setParkingSpots} />
      <Map position={position} isDarkMode={isDarkMode} parkingSpots={parkingSpots} />
    </div>
  );
}

export default App
