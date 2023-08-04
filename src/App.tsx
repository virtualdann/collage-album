import {Routes, Route} from 'react-router-dom'
import Index from './pages/Index'
import Content from './pages/Content'
import ErrorPage from './pages/ErrorPage'
import PrivacyPage from './pages/Privacy'

// import { getToken, getTracks } from "./calls/apiCall"
// import {useEffect, useState} from 'react'
// import Navbar from './components/Navbar'



function App() {
  
  return (
    <div className=' w-[100vw]'>
      {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Index />}  />
          <Route path="/content" element={<Content />}  />
          <Route path="/privacy-policy" element={<PrivacyPage />}  />
          <Route path="*" element={<ErrorPage />}  />
        </Routes>


    </div>
  )
}

export default App
