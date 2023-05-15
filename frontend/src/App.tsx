import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
<BrowserRouter>
<Routes>
  <Route path='/' element={<Home/>} />
</Routes  >
</BrowserRouter>
      </div>
    
    </>
  )
}

export default App
