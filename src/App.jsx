import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  PomodoroTimer from './PomodoroTimer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <PomodoroTimer/>
      
    </>
  )
}

export default App
