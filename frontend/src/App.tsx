import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home.js'
import { AuthContextProvider } from './AuthContext.js'
import Protected from './Protected.tsx'
import Account from './Account.tsx'
function App() {
  return (
    <>
      <>
      <AuthContextProvider>

<BrowserRouter>
<Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/account' element={
<Account/>
  }/>
</Routes  >
</BrowserRouter>
      </AuthContextProvider>
      </>
    
    </>
  )
}

export default App
