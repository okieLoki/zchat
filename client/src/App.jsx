import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './screens/HomePage'
import ChatPage from './screens/ChatPage'

const App = () => {
  return (
    <div className='App'>

      <Routes>
        <Route path='/home' element={<HomePage/>} />
        <Route path='/chat' element={<ChatPage/>}/>
      </Routes>

    </div>
  )
}

export default App