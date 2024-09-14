import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CenteredCard from './components/CenterCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <CenteredCard/>
    </div>
  )
}

export default App
